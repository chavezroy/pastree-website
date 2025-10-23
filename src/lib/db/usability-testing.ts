// Database utilities for usability testing
// PostgreSQL queries and operations for the usability testing system

import { Pool, PoolClient } from 'pg';
import fs from 'fs';
import {
  Session,
  FormSubmission,
  Notification,
  SessionSummary,
  SessionStats,
  CreateSessionRequest,
  SubmitFormRequest,
  GetSessionsRequest,
  SessionStatus,
  FormType,
  NotificationType,
  NotificationStatus
} from '@/types/usability-testing';

// Database connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

// Session operations
export async function createSession(request: CreateSessionRequest): Promise<Session> {
  const client = await getPool().connect();
  try {
    const query = `
      INSERT INTO sessions (participant_id, metadata, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [
      request.participant_id,
      JSON.stringify(request.metadata || {}),
      new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours from now
    ];
    
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const client = await getPool().connect();
  try {
    const query = 'SELECT * FROM sessions WHERE id = $1';
    const result = await client.query(query, [sessionId]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function updateSessionStatus(sessionId: string, status: SessionStatus, completedAt?: Date): Promise<Session> {
  const client = await getPool().connect();
  try {
    const query = `
      UPDATE sessions 
      SET status = $2, completed_at = $3
      WHERE id = $1
      RETURNING *
    `;
    const result = await client.query(query, [sessionId, status, completedAt]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getSessions(request: GetSessionsRequest = {}): Promise<{ sessions: SessionSummary[], total: number }> {
  const client = await getPool().connect();
  try {
    const {
      page = 1,
      limit = 50,
      status,
      participant_id,
      start_date,
      end_date
    } = request;

    const offset = (page - 1) * limit;
    
    // Build WHERE clause
    const conditions: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    if (status) {
      conditions.push(`status = $${++paramCount}`);
      values.push(status);
    }
    if (participant_id) {
      conditions.push(`participant_id ILIKE $${++paramCount}`);
      values.push(`%${participant_id}%`);
    }
    if (start_date) {
      conditions.push(`created_at >= $${++paramCount}`);
      values.push(start_date);
    }
    if (end_date) {
      conditions.push(`created_at <= $${++paramCount}`);
      values.push(end_date);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM session_summary ${whereClause}`;
    const countResult = await client.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Get sessions with pagination
    const sessionsQuery = `
      SELECT * FROM session_summary 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${++paramCount} OFFSET $${++paramCount}
    `;
    values.push(limit, offset);
    
    const sessionsResult = await client.query(sessionsQuery, values);
    
    return {
      sessions: sessionsResult.rows,
      total
    };
  } finally {
    client.release();
  }
}

// Form submission operations
export async function submitForm(request: SubmitFormRequest): Promise<FormSubmission> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    
    // Insert form submission
    const submissionQuery = `
      INSERT INTO form_submissions (session_id, form_type, form_data, version)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const submissionValues = [
      request.session_id,
      request.form_type,
      JSON.stringify(request.form_data),
      request.version || '1.0'
    ];
    
    const submissionResult = await client.query(submissionQuery, submissionValues);
    const submission = submissionResult.rows[0];

    // Check if session should be marked as completed
    const checkCompletionQuery = `
      SELECT 
        COUNT(DISTINCT form_type) as completed_forms,
        (SELECT COUNT(*) FROM unnest(ARRAY['pretest', 'posttask', 'posttest-sus', 'posttest-nps', 'posttest-feedback']) as expected_forms) as total_forms
      FROM form_submissions 
      WHERE session_id = $1
    `;
    const completionResult = await client.query(checkCompletionQuery, [request.session_id]);
    const { completed_forms, total_forms } = completionResult.rows[0];

    // If all forms are completed, mark session as completed
    if (parseInt(completed_forms) >= parseInt(total_forms)) {
      await client.query(
        'UPDATE sessions SET status = $2, completed_at = $3 WHERE id = $1',
        [request.session_id, 'completed', new Date()]
      );
    }

    await client.query('COMMIT');
    return submission;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getSessionSubmissions(sessionId: string): Promise<FormSubmission[]> {
  const client = await getPool().connect();
  try {
    const query = 'SELECT * FROM form_submissions WHERE session_id = $1 ORDER BY submitted_at ASC';
    const result = await client.query(query, [sessionId]);
    return result.rows;
  } finally {
    client.release();
  }
}

// Notification operations
export async function createNotification(
  sessionId: string,
  type: NotificationType,
  metadata: Record<string, any> = {},
  webhookUrl?: string
): Promise<Notification> {
  const client = await getPool().connect();
  try {
    const query = `
      INSERT INTO notifications (session_id, notification_type, metadata, webhook_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      sessionId,
      type,
      JSON.stringify(metadata),
      webhookUrl
    ];
    
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateNotificationStatus(
  notificationId: string,
  status: NotificationStatus,
  retryCount?: number
): Promise<Notification> {
  const client = await getPool().connect();
  try {
    const query = `
      UPDATE notifications 
      SET status = $2, retry_count = COALESCE($3, retry_count)
      WHERE id = $1
      RETURNING *
    `;
    const result = await client.query(query, [notificationId, status, retryCount]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getSessionNotifications(sessionId: string): Promise<Notification[]> {
  const client = await getPool().connect();
  try {
    const query = 'SELECT * FROM notifications WHERE session_id = $1 ORDER BY sent_at DESC';
    const result = await client.query(query, [sessionId]);
    return result.rows;
  } finally {
    client.release();
  }
}

// Statistics operations
export async function getSessionStats(startDate?: string, endDate?: string): Promise<SessionStats> {
  const client = await getPool().connect();
  try {
    const query = 'SELECT * FROM get_session_stats($1, $2)';
    const result = await client.query(query, [startDate, endDate]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Export operations
export async function exportSessions(
  startDate?: string,
  endDate?: string,
  participantId?: string,
  status?: SessionStatus
): Promise<{ sessions: Session[], submissions: FormSubmission[] }> {
  const client = await getPool().connect();
  try {
    // Build WHERE clause for sessions
    const conditions: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    if (startDate) {
      conditions.push(`created_at >= $${++paramCount}`);
      values.push(startDate);
    }
    if (endDate) {
      conditions.push(`created_at <= $${++paramCount}`);
      values.push(endDate);
    }
    if (participantId) {
      conditions.push(`participant_id ILIKE $${++paramCount}`);
      values.push(`%${participantId}%`);
    }
    if (status) {
      conditions.push(`status = $${++paramCount}`);
      values.push(status);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get sessions
    const sessionsQuery = `SELECT * FROM sessions ${whereClause} ORDER BY created_at DESC`;
    const sessionsResult = await client.query(sessionsQuery, values);
    const sessions = sessionsResult.rows;

    // Get submissions for these sessions
    const sessionIds = sessions.map(s => s.id);
    let submissions: FormSubmission[] = [];
    
    if (sessionIds.length > 0) {
      const placeholders = sessionIds.map((_, i) => `$${i + 1}`).join(',');
      const submissionsQuery = `
        SELECT * FROM form_submissions 
        WHERE session_id IN (${placeholders})
        ORDER BY submitted_at ASC
      `;
      const submissionsResult = await client.query(submissionsQuery, sessionIds);
      submissions = submissionsResult.rows;
    }

    return { sessions, submissions };
  } finally {
    client.release();
  }
}

// Utility functions
export async function cleanupExpiredSessions(): Promise<number> {
  const client = await getPool().connect();
  try {
    const result = await client.query('SELECT cleanup_expired_sessions()');
    return result.rows[0].cleanup_expired_sessions;
  } finally {
    client.release();
  }
}

export async function deleteSession(sessionId: string): Promise<boolean> {
  const client = await getPool().connect();
  try {
    // Start a transaction to ensure all related data is deleted
    await client.query('BEGIN');
    
    // Delete form submissions
    await client.query('DELETE FROM form_submissions WHERE session_id = $1', [sessionId]);
    
    // Delete notifications
    await client.query('DELETE FROM notifications WHERE session_id = $1', [sessionId]);
    
    // Delete the session
    const result = await client.query('DELETE FROM sessions WHERE id = $1', [sessionId]);
    
    // Commit the transaction
    await client.query('COMMIT');
    
    return result.rowCount > 0;
  } catch (error) {
    // Rollback the transaction on error
    await client.query('ROLLBACK');
    console.error('Error deleting session:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    console.log('Attempting database connection...');
    const client = await getPool().connect();
    console.log('Connected to database');
    await client.query('SELECT 1');
    console.log('Query executed successfully');
    client.release();
    console.log('Connection released');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
