/**
 * Data Submitter Service
 * Handles POST requests to submit analysis results
 * 
 * Key Features:
 * - Secure POST submission
 * - Retry logic
 * - Response handling
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from './config';
import { SubmissionPayload } from './types';

class DataSubmitter {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: config.timeout,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Submit analysis results via POST request
   * @param data - Submission payload containing analysis results
   * @returns Promise with server response
   */
  async submitResults(data: SubmissionPayload): Promise<any> {
    try {
      const response = await this.client.post(config.postEndpoint, data);
      console.log('✅ Successfully submitted results');
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  /**
   * Submit results with automatic retry logic
   * @param data - Submission payload
   * @param attempts - Number of retry attempts
   * @returns Promise with server response
   */
  async submitWithRetry(
    data: SubmissionPayload,
    attempts: number = config.retryAttempts
  ): Promise<any> {
    let lastError: Error | null = null;

    for (let i = 0; i < attempts; i++) {
      try {
        return await this.submitResults(data);
      } catch (error) {
        lastError = error as Error;
        if (i < attempts - 1) {
          console.log(`Submission attempt ${i + 1} failed, retrying...`);
          await this.delay(1000 * Math.pow(2, i));
        }
      }
    }

    throw lastError;
  }

  /**
   * Handle submission errors
   */
  private handleError(error: AxiosError): void {
    if (error.response) {
      console.error(`❌ Submission Error (${error.response.status}):`, error.response.data);
    } else if (error.request) {
      console.error('❌ No response from server:', error.message);
    } else {
      console.error('❌ Request error:', error.message);
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
export const dataSubmitter = new DataSubmitter();
