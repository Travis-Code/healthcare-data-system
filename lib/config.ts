/**
 * Configuration management for the Healthcare Data System
 * Centralizes all environment variables and app configuration
 */

export const config = {
  // API Configuration
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  apiKey: process.env.API_KEY || '',
  postEndpoint: process.env.POST_ENDPOINT || 'https://api.example.com/results',
  
  // Request Configuration
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3', 10),
} as const;

/**
 * Validates that all required configuration is present
 * @throws Error if required config is missing
 */
export function validateConfig(): void {
  if (!config.apiKey && process.env.NODE_ENV === 'production') {
    throw new Error('API_KEY is required in production. Please set it in .env.local');
  }
}
