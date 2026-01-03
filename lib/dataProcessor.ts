/**
 * Data Processor Service
 * Handles cleaning, transformation, and validation of healthcare data
 * 
 * Key Features:
 * - Data cleaning and normalization
 * - Type validation
 * - Data transformation
 */

import { HealthcareRecord } from './types';

class DataProcessor {
  /**
   * Clean raw healthcare data
   * Removes duplicates, handles missing values, normalizes formats
   * @param rawData - Raw data array from API
   * @returns Cleaned data array
   */
  cleanData(rawData: HealthcareRecord[]): HealthcareRecord[] {
    // Remove duplicates based on ID
    const uniqueData = rawData.filter((record, index, self) =>
      index === self.findIndex((r) => r.id === record.id)
    );

    // Filter out invalid records
    const validData = uniqueData.filter(record => 
      record.id && 
      record.patientId && 
      record.recordType
    );

    return validData;
  }

  /**
   * Transform data into standardized format
   * @param data - Cleaned data array
   * @returns Transformed data array
   */
  transformData(data: HealthcareRecord[]): HealthcareRecord[] {
    return data.map(record => ({
      ...record,
      // Normalize timestamp to ISO format
      timestamp: new Date(record.timestamp).toISOString(),
      // Ensure numeric values are numbers
      value: typeof record.value === 'string' && !isNaN(Number(record.value))
        ? Number(record.value)
        : record.value,
    }));
  }

  /**
   * Validate that records have required fields
   * @param data - Data array to validate
   * @param requiredFields - Array of required field names
   * @throws Error if validation fails
   */
  validateData(data: HealthcareRecord[], requiredFields: string[]): boolean {
    for (const record of data) {
      for (const field of requiredFields) {
        if (!(field in record) || record[field as keyof HealthcareRecord] === undefined) {
          throw new Error(`Missing required field: ${field} in record ${record.id}`);
        }
      }
    }
    return true;
  }

  /**
   * Complete processing pipeline
   * @param rawData - Raw data from API
   * @returns Processed and validated data
   */
  process(rawData: HealthcareRecord[]): HealthcareRecord[] {
    const cleaned = this.cleanData(rawData);
    const transformed = this.transformData(cleaned);
    this.validateData(transformed, ['id', 'patientId', 'recordType']);
    return transformed;
  }
}

// Export singleton instance
export const dataProcessor = new DataProcessor();
