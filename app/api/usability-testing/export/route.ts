// API route for data export
// Handles exporting session data in CSV or JSON format

import { NextRequest, NextResponse } from 'next/server';
import { exportSessions } from '@/lib/db/usability-testing';
import { SessionStatus } from '@/types/usability-testing';

// GET /api/usability-testing/export - Export data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const format = searchParams.get('format') || 'json';
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const participant_id = searchParams.get('participant_id');
    const status = searchParams.get('status') as SessionStatus;

    // Validate format
    if (!['json', 'csv'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Format must be either json or csv' },
        { status: 400 }
      );
    }

    // Validate date format if provided
    if (start_date && isNaN(Date.parse(start_date))) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Invalid start_date format' },
        { status: 400 }
      );
    }

    if (end_date && isNaN(Date.parse(end_date))) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Invalid end_date format' },
        { status: 400 }
      );
    }

    // Export data
    const { sessions, submissions } = await exportSessions(
      start_date || undefined,
      end_date || undefined,
      participant_id || undefined,
      status || undefined
    );

    if (format === 'json') {
      // Return JSON format
      const exportData = {
        export_info: {
          exported_at: new Date().toISOString(),
          total_sessions: sessions.length,
          total_submissions: submissions.length,
          filters: {
            start_date,
            end_date,
            participant_id,
            status
          }
        },
        sessions,
        submissions
      };

      return new NextResponse(JSON.stringify(exportData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="usability-testing-export-${new Date().toISOString().split('T')[0]}.json"`
        }
      });
    } else {
      // Return CSV format
      const csvData = generateCSV(sessions, submissions);
      
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="usability-testing-export-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to export data' },
      { status: 500 }
    );
  }
}

// Helper function to generate CSV
function generateCSV(sessions: any[], submissions: any[]): string {
  const headers = [
    'Session ID',
    'Participant ID',
    'Created At',
    'Completed At',
    'Status',
    'Form Type',
    'Form Data',
    'Submitted At'
  ];

  const rows: string[] = [headers.join(',')];

  // Create a map of submissions by session ID
  const submissionsBySession = submissions.reduce((acc, submission) => {
    if (!acc[submission.session_id]) {
      acc[submission.session_id] = [];
    }
    acc[submission.session_id].push(submission);
    return acc;
  }, {} as Record<string, any[]>);

  // Generate rows
  sessions.forEach(session => {
    const sessionSubmissions = submissionsBySession[session.id] || [];
    
    if (sessionSubmissions.length === 0) {
      // Session with no submissions
      const row = [
        session.id,
        session.participant_id,
        session.created_at,
        session.completed_at || '',
        session.status,
        '',
        '',
        ''
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',');
      rows.push(row);
    } else {
      // Session with submissions
      sessionSubmissions.forEach(submission => {
        const row = [
          session.id,
          session.participant_id,
          session.created_at,
          session.completed_at || '',
          session.status,
          submission.form_type,
          JSON.stringify(submission.form_data).replace(/"/g, '""'),
          submission.submitted_at
        ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',');
        rows.push(row);
      });
    }
  });

  return rows.join('\n');
}
