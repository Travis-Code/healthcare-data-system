/**
 * DataCard Component
 * Reusable card component to display data sections
 */

import React from 'react';

interface DataCardProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
}

export function DataCard({ title, children, icon }: DataCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}
