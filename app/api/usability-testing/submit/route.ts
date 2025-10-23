// API route for form submissions
// Handles submitting form data and updating session status

import { NextRequest, NextResponse } from 'next/server';
import { submitForm, getSession, createNotification } from '@/lib/db/usability-testing';
import { SubmitFormRequest, FormType } from '@/types/usability-testing';

// POST /api/usability-testing/submit - Submit form data
export async function POST(request: NextRequest) {
  try {
    const body: SubmitFormRequest = await request.json();
    
    // Validate required fields
    if (!body.session_id || typeof body.session_id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'session_id is required and must be a string' },
        { status: 400 }
      );
    }

    if (!body.form_type || typeof body.form_type !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'form_type is required and must be a string' },
        { status: 400 }
      );
    }

    if (!body.form_data || typeof body.form_data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'form_data is required and must be an object' },
        { status: 400 }
      );
    }

    // Validate form_type
    const validFormTypes: FormType[] = ['pretest', 'posttask', 'posttest-sus', 'posttest-nps', 'posttest-feedback'];
    if (!validFormTypes.includes(body.form_type)) {
      return NextResponse.json(
        { error: 'Invalid request', message: `Invalid form_type. Must be one of: ${validFormTypes.join(', ')}` },
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

    // Check if session is still active
    if (session.status === 'completed') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Cannot submit to completed session' },
        { status: 400 }
      );
    }

    if (new Date(session.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Session has expired' },
        { status: 400 }
      );
    }

    // Submit form
    const submission = await submitForm(body);

    // Create notification for form submission
    await createNotification(
      body.session_id,
      'form_submitted',
      {
        form_type: body.form_type,
        submission_id: submission.id
      }
    );

    // Check if this was the final form submission
    const updatedSession = await getSession(body.session_id);
    if (updatedSession?.status === 'completed') {
      // Create completion notification
      await createNotification(
        body.session_id,
        'session_completed',
        {
          participant_id: session.participant_id,
          completed_at: updatedSession.completed_at
        }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        submission,
        session: updatedSession,
        message: 'Form submitted successfully'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
