/**
 * DataTable Component
 * Displays healthcare records in a table format
 */

'use client';

import React from 'react';
import { HealthcareRecord } from '@/lib/types';
import { DataCard } from './DataCard';

interface DataTableProps {
  data: HealthcareRecord[];
  maxRows?: number;
}

export function DataTable({ data, maxRows = 10 }: DataTableProps) {
  const displayData = data.slice(0, maxRows);

  if (data.length === 0) {
    return (
      <DataCard title="Healthcare Records" icon="📋">
        <p className="text-gray-500">No records to display.</p>
      </DataCard>
    );
  }

  return (
    <DataCard title="Healthcare Records" icon="📋">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">ID</th>
              <th className="px-4 py-2 text-left font-semibold">Patient ID</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Value</th>
              <th className="px-4 py-2 text-left font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((record) => (
              <tr key={record.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{record.id}</td>
                <td className="px-4 py-2">{record.patientId}</td>
                <td className="px-4 py-2 capitalize">{record.recordType}</td>
                <td className="px-4 py-2">{record.value}</td>
                <td className="px-4 py-2">
                  {new Date(record.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > maxRows && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {maxRows} of {data.length} records
          </p>
        )}
      </div>
    </DataCard>
  );
}
