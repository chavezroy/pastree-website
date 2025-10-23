// API route for health checks
// Provides system health status and database connectivity

import { NextRequest, NextResponse } from 'next/server';
import { healthCheck, getSessionStats } from '@/lib/db/usability-testing';

// GET /api/usability-testing/health - Health check endpoint
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Debug: Check if DATABASE_URL is loaded
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 20));
    
    // Check database connectivity
    const dbHealthy = await healthCheck();
    
    // Get basic stats if database is healthy
    let stats = null;
    if (dbHealthy) {
      try {
        stats = await getSessionStats();
      } catch (error) {
        console.warn('Failed to get session stats:', error);
      }
    }

    const responseTime = Date.now() - startTime;

    const healthStatus = {
      status: dbHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      response_time_ms: responseTime,
      database: {
        connected: dbHealthy,
        status: dbHealthy ? 'ok' : 'error'
      },
      stats: stats ? {
        total_sessions: stats.total_sessions,
        completed_sessions: stats.completed_sessions,
        abandoned_sessions: stats.abandoned_sessions,
        in_progress_sessions: stats.in_progress_sessions
      } : null,
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };

    const statusCode = dbHealthy ? 200 : 503;

    return NextResponse.json({
      success: dbHealthy,
      data: healthStatus
    }, { status: statusCode });

  } catch (error) {
    console.error('Error in health check:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
