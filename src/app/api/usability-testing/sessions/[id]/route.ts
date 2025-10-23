// API route for individual session operations
// Handles getting session details and updating session status

import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSessionStatus, getSessionSubmissions, getSessionNotifications } from '@/lib/db/usability-testing';
import { SessionStatus } from '@/types/usability-testing';

// GET /api/usability-testing/sessions/[id] - Get session details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get session
    const session = await getSession(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not found', message: 'Session not found' },
        { status: 404 }
      );
    }

    // Get submissions and notifications
    const [submissions, notifications] = await Promise.all([
      getSessionSubmissions(sessionId),
      getSessionNotifications(sessionId)
    ]);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        session,
        submissions,
        notifications
      }
    });

  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

// PATCH /api/usability-testing/sessions/[id] - Update session status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;
    const body = await request.json();
    const { status, completed_at } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses: SessionStatus[] = ['in_progress', 'completed', 'abandoned'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Invalid status. Must be one of: in_progress, completed, abandoned' },
        { status: 400 }
      );
    }

    // Check if session exists
    const existingSession = await getSession(sessionId);
    if (!existingSession) {
      return NextResponse.json(
        { error: 'Not found', message: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session
    const updatedSession = await updateSessionStatus(
      sessionId,
      status || existingSession.status,
      completed_at ? new Date(completed_at) : undefined
    );

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        session: updatedSession,
        message: 'Session updated successfully'
      }
    });

  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to update session' },
      { status: 500 }
    );
  }
}
