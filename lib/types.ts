/**
 * Type definitions for the Healthcare Data System
 * These interfaces define the structure of data throughout the application
 */

export interface HealthcareRecord {
  id: string;
  patientId: string;
  recordType: string;
  value: number | string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface AnalysisResult {
  totalRecords: number;
  averageValue?: number;
  recordsByType: Record<string, number>;
  timestamp: string;
}

export interface SubmissionPayload {
  analysis: AnalysisResult;
  recordCount: number;
  status: 'completed' | 'failed' | 'pending';
  processedAt: string;
}
