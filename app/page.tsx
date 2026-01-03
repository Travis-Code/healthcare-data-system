/**
 * Healthcare Data System - Main Page
 * 
 * This is the main interface for the healthcare data pipeline.
 * It orchestrates: Fetch → Process → Analyze → Submit
 */

'use client';

import { useState } from 'react';
import { HealthcareRecord, AnalysisResult } from '@/lib/types';
import { ActionPanel } from '@/components/ActionPanel';
import { DataTable } from '@/components/DataTable';
import { StatsDisplay } from '@/components/StatsDisplay';

export default function Home() {
  const [rawData, setRawData] = useState<HealthcareRecord[]>([]);
  const [processedData, setProcessedData] = useState<HealthcareRecord[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  /**
   * Step 1: Fetch data from external API
   */
  const handleFetch = async () => {
    setIsLoading(true);
    setStatus('Fetching data from API...');
    
    try {
      const response = await fetch('/api/fetch?endpoint=/data');
      const result = await response.json();
      
      if (result.success) {
        setRawData(result.data);
        setStatus(`✅ Successfully fetched ${result.data.length} records`);
      } else {
        setStatus(`❌ Error: ${result.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Failed to fetch: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Step 2: Process and analyze data
   */
  const handleProcess = async () => {
    if (rawData.length === 0) {
      setStatus('⚠️ Please fetch data first');
      return;
    }

    setIsLoading(true);
    setStatus('Processing and analyzing data...');
    
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: rawData }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setProcessedData(result.processedData);
        setAnalysis(result.analysis);
        setStatus(`✅ Processed ${result.processedData.length} records`);
      } else {
        setStatus(`❌ Error: ${result.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Failed to process: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Step 3: Submit results to external endpoint
   */
  const handleSubmit = async () => {
    if (!analysis) {
      setStatus('⚠️ Please process data first');
      return;
    }

    setIsLoading(true);
    setStatus('Submitting results...');
    
    try {
      const payload = {
        analysis,
        recordCount: processedData.length,
        status: 'completed' as const,
        processedAt: new Date().toISOString(),
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('✅ Results submitted successfully!');
      } else {
        setStatus(`❌ Error: ${result.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Failed to submit: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Healthcare Data System</h1>
          <p className="text-blue-100">
            Complete pipeline: Fetch → Process → Analyze → Submit
          </p>
        </div>

        {/* Action Panel */}
        <ActionPanel
          onFetch={handleFetch}
          onProcess={handleProcess}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          status={status}
        />

        {/* Analysis Results */}
        <StatsDisplay analysis={analysis} />

        {/* Data Table */}
        {processedData.length > 0 && (
          <DataTable data={processedData} maxRows={10} />
        )}

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Built with Next.js, TypeScript, and React</p>
          <p className="mt-1">Complete healthcare data integration system</p>
        </div>
      </div>
    </div>
  );
}
