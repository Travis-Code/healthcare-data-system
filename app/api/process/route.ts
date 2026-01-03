/**
 * API Route: Process Healthcare Data
 * POST /api/process
 * 
 * Purpose: Process and analyze healthcare data
 * Accepts raw data, cleans it, transforms it, and performs analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { dataProcessor } from '@/lib/dataProcessor';
import { dataAnalyzer } from '@/lib/dataAnalyzer';
import { HealthcareRecord } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawData: HealthcareRecord[] = body.data;
    
    if (!Array.isArray(rawData)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid data format. Expected array of records.',
      }, { status: 400 });
    }
    
    // Process the data
    const processedData = dataProcessor.process(rawData);
    
    // Analyze the data
    const analysis = dataAnalyzer.analyze(processedData);
    
    return NextResponse.json({
      success: true,
      processedData,
      analysis,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error: any) {
    console.error('Process API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process data',
    }, { status: 500 });
  }
}
