// API route for session management
// Handles creating and listing usability testing sessions

import { NextRequest, NextResponse } from 'next/server';
import { createSession, getSessions } from '@/lib/db/usability-testing';
import { CreateSessionRequest, GetSessionsRequest } from '@/types/usability-testing';

// POST /api/usability-testing/sessions - Create new session
export async function POST(request: NextRequest) {
  try {
    const body: CreateSessionRequest = await request.json();
    
    // Validate required fields
    if (!body.participant_id || typeof body.participant_id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'participant_id is required and must be a string' },
        { status: 400 }
      );
    }

    // Create session
    const session = await createSession(body);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        session,
        message: 'Session created successfully'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// GET /api/usability-testing/sessions - List sessions with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Max 100 per page
    const status = searchParams.get('status') as any;
    const participant_id = searchParams.get('participant_id');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    // Validate parameters
    if (page < 1) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Page must be greater than 0' },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }

    const requestParams: GetSessionsRequest = {
      page,
      limit,
      ...(status && { status }),
      ...(participant_id && { participant_id }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date })
    };

    // Get sessions
    const { sessions, total } = await getSessions(requestParams);
    const totalPages = Math.ceil(total / limit);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        sessions,
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages
        }
      }
    });

  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}
