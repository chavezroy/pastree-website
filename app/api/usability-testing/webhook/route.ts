// API route for webhook notifications
// Handles incoming webhook calls and outgoing webhook notifications

import { NextRequest, NextResponse } from 'next/server';
import { createNotification, getSession } from '@/lib/db/usability-testing';
import { WebhookRequest, NotificationType } from '@/types/usability-testing';

// POST /api/usability-testing/webhook - Handle webhook notifications
export async function POST(request: NextRequest) {
  try {
    const body: WebhookRequest = await request.json();
    
    // Validate required fields
    if (!body.session_id || typeof body.session_id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'session_id is required and must be a string' },
        { status: 400 }
      );
    }

    if (!body.notification_type || typeof body.notification_type !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'notification_type is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate notification_type
    const validTypes: NotificationType[] = ['session_created', 'form_submitted', 'session_completed', 'session_abandoned'];
    if (!validTypes.includes(body.notification_type)) {
      return NextResponse.json(
        { error: 'Invalid request', message: `Invalid notification_type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if session exists
    const session = await getSession(body.session_id);
    if (!session) {
      return NextResponse.json(
        { error: 'Not found', message: 'Session not found' },
        { status: 404 }
      );
    }

    // Create notification record
    const notification = await createNotification(
      body.session_id,
      body.notification_type,
      {
        ...body.data,
        webhook_timestamp: body.timestamp,
        webhook_source: 'external'
      }
    );

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        notification,
        message: 'Webhook notification processed successfully'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// GET /api/usability-testing/webhook - Get webhook configuration info
export async function GET(request: NextRequest) {
  try {
    const webhookInfo = {
      endpoint: '/api/usability-testing/webhook',
      method: 'POST',
      description: 'Webhook endpoint for usability testing notifications',
      supported_notification_types: [
        'session_created',
        'form_submitted', 
        'session_completed',
        'session_abandoned'
      ],
      request_format: {
        session_id: 'string (required)',
        notification_type: 'string (required)',
        data: 'object (optional)',
        timestamp: 'string (optional)'
      },
      example_request: {
        session_id: 'uuid-string',
        notification_type: 'session_completed',
        data: {
          participant_id: 'P001',
          completion_time: '2024-01-15T10:30:00Z'
        },
        timestamp: '2024-01-15T10:30:00Z'
      }
    };

    return NextResponse.json({
      success: true,
      data: webhookInfo
    });

  } catch (error) {
    console.error('Error getting webhook info:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to get webhook info' },
      { status: 500 }
    );
  }
}
