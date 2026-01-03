/**
 * API Route: Fetch Healthcare Data
 * GET /api/fetch
 * 
 * Purpose: Server-side endpoint to fetch data from external healthcare API
 * This keeps API keys secure by handling requests server-side
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for testing (remove when using real API)
    const mockData = [
      {
        id: '1',
        patientId: 'P001',
        recordType: 'blood_pressure',
        value: 120,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '2',
        patientId: 'P002',
        recordType: 'heart_rate',
        value: 72,
        timestamp: new Date(Date.now() - 43200000).toISOString(),
      },
      {
        id: '3',
        patientId: 'P001',
        recordType: 'blood_pressure',
        value: 118,
        timestamp: new Date().toISOString(),
      },
      {
        id: '4',
        patientId: 'P003',
        recordType: 'temperature',
        value: 98.6,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '5',
        patientId: 'P002',
        recordType: 'heart_rate',
        value: 75,
        timestamp: new Date().toISOString(),
      },
      {
        id: '6',
        patientId: 'P003',
        recordType: 'blood_pressure',
        value: 122,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
    ];

    // TODO: Replace with real API call when ready
    // const data = await dataFetcher.fetchWithRetry(endpoint);
    
    return NextResponse.json({
      success: true,
      data: mockData,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Fetch API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}
