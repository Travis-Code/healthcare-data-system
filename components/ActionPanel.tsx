/**
 * ActionPanel Component
 * Control panel for executing pipeline steps
 */

'use client';

import React from 'react';
import { DataCard } from './DataCard';

interface ActionPanelProps {
  onFetch: () => void;
  onProcess: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  status: string;
}

export function ActionPanel({ onFetch, onProcess, onSubmit, isLoading, status }: ActionPanelProps) {
  return (
    <DataCard title="Actions" icon="⚡">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={onFetch}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            1️⃣ Fetch Data
          </button>
          
          <button
            onClick={onProcess}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            2️⃣ Process & Analyze
          </button>
          
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            3️⃣ Submit Results
          </button>
        </div>

        {status && (
          <div className={`p-3 rounded ${
            status.includes('Error') || status.includes('Failed')
              ? 'bg-red-50 text-red-700'
              : status.includes('Success')
              ? 'bg-green-50 text-green-700'
              : 'bg-blue-50 text-blue-700'
          }`}>
            <p className="text-sm">{status}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="text-sm">Processing...</span>
          </div>
        )}
      </div>
    </DataCard>
  );
}
