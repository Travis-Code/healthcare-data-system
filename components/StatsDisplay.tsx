/**
 * StatsDisplay Component
 * Shows statistical analysis of healthcare data
 */

'use client';

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { DataCard } from './DataCard';

interface StatsDisplayProps {
  analysis: AnalysisResult | null;
}

export function StatsDisplay({ analysis }: StatsDisplayProps) {
  if (!analysis) {
    return (
      <DataCard title="Analysis Results" icon="📊">
        <p className="text-gray-500">No analysis data available yet.</p>
      </DataCard>
    );
  }

  return (
    <DataCard title="Analysis Results" icon="📊">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Total Records</p>
            <p className="text-3xl font-bold text-blue-600">{analysis.totalRecords}</p>
          </div>
          
          {analysis.averageValue && (
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600">Average Value</p>
              <p className="text-3xl font-bold text-green-600">
                {analysis.averageValue.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Records by Type</h3>
          <div className="space-y-2">
            {Object.entries(analysis.recordsByType).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="capitalize">{type}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Analyzed at: {new Date(analysis.timestamp).toLocaleString()}
        </p>
      </div>
    </DataCard>
  );
}
