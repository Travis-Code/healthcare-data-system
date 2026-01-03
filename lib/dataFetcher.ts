/**
 * Data Fetcher Service
 * Handles all API requests for fetching healthcare data
 * 
 * Key Features:
 * - Automatic retry logic
 * - Error handling
 * - Type-safe responses
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from './config';
import { ApiResponse, HealthcareRecord } from './types';

class DataFetcher {
  private client: AxiosInstance;

  constructor() {
    // Create axios instance with default configuration
    this.client = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: config.timeout,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetch healthcare data from a specific endpoint
   * @param endpoint - API endpoint path (e.g., '/patients', '/records')
   * @param params - Optional query parameters
   * @returns Promise with the API response data
   */
  async fetchData<T = HealthcareRecord[]>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const response = await this.client.get<ApiResponse<T>>(endpoint, { params });
      return response.data.data;
    } catch (error) {
      this.handleError(error as AxiosError, endpoint);
      throw error;
    }
  }

  /**
   * Fetch data with automatic retry logic
   * @param endpoint - API endpoint path
   * @param params - Optional query parameters
   * @param attempts - Number of retry attempts (default from config)
   * @returns Promise with the API response data
   */
  async fetchWithRetry<T = HealthcareRecord[]>(
    endpoint: string,
    params?: Record<string, any>,
    attempts: number = config.retryAttempts
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < attempts; i++) {
      try {
        return await this.fetchData<T>(endpoint, params);
      } catch (error) {
        lastError = error as Error;
        if (i < attempts - 1) {
          console.log(`Attempt ${i + 1} failed, retrying...`);
          // Wait before retrying (exponential backoff)
          await this.delay(1000 * Math.pow(2, i));
        }
      }
    }

    throw lastError;
  }

  /**
   * Handle API errors with detailed logging
   */
  private handleError(error: AxiosError, endpoint: string): void {
    if (error.response) {
      // Server responded with error status
      console.error(`API Error (${error.response.status}): ${endpoint}`, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error(`No response from ${endpoint}:`, error.message);
    } else {
      // Request setup error
      console.error(`Request error for ${endpoint}:`, error.message);
    }
  }

  /**
   * Utility function to delay execution
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const dataFetcher = new DataFetcher();
