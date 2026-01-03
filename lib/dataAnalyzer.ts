/**
 * Data Analyzer Service
 * Performs analysis and generates insights from healthcare data
 * 
 * Key Features:
 * - Statistical analysis
 * - Data aggregation
 * - Pattern detection
 */

import { HealthcareRecord, AnalysisResult } from './types';

class DataAnalyzer {
  /**
   * Calculate basic statistics for the dataset
   * @param data - Processed healthcare records
   * @returns Statistical summary
   */
  calculateStatistics(data: HealthcareRecord[]): {
    total: number;
    byType: Record<string, number>;
    averageValue: number | null;
  } {
    const total = data.length;
    
    // Count records by type
    const byType = data.reduce((acc, record) => {
      acc[record.recordType] = (acc[record.recordType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate average for numeric values
    const numericValues = data
      .map(r => r.value)
      .filter((v): v is number => typeof v === 'number');
    
    const averageValue = numericValues.length > 0
      ? numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length
      : null;

    return { total, byType, averageValue };
  }

  /**
   * Perform comprehensive analysis
   * @param data - Processed healthcare records
   * @returns Complete analysis result
   */
  analyze(data: HealthcareRecord[]): AnalysisResult {
    const stats = this.calculateStatistics(data);

    return {
      totalRecords: stats.total,
      averageValue: stats.averageValue || undefined,
      recordsByType: stats.byType,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Aggregate data by a specific field
   * @param data - Healthcare records
   * @param groupBy - Field to group by
   * @returns Aggregated data
   */
  aggregateBy(
    data: HealthcareRecord[],
    groupBy: keyof HealthcareRecord
  ): Record<string, HealthcareRecord[]> {
    return data.reduce((acc, record) => {
      const key = String(record[groupBy]);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    }, {} as Record<string, HealthcareRecord[]>);
  }
}

// Export singleton instance
export const dataAnalyzer = new DataAnalyzer();
