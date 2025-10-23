-- Usability Testing Database Schema
-- PostgreSQL schema for storing usability test sessions and submissions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sessions table - tracks test sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  metadata JSONB DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '48 hours')
);

-- Form submissions table - stores individual form data
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  form_type VARCHAR(100) NOT NULL CHECK (form_type IN ('pretest', 'posttask', 'posttest-sus', 'posttest-nps', 'posttest-feedback')),
  form_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  version VARCHAR(20) DEFAULT '1.0'
);

-- Notifications table - tracks notification delivery
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN ('session_created', 'form_submitted', 'session_completed', 'session_abandoned')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  metadata JSONB DEFAULT '{}',
  webhook_url VARCHAR(500),
  retry_count INTEGER DEFAULT 0
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_participant ON sessions(participant_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_submissions_session ON form_submissions(session_id);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted ON form_submissions(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_session ON notifications(session_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_notifications_sent ON notifications(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);

-- Views for common queries
CREATE OR REPLACE VIEW session_summary AS
SELECT 
  s.id,
  s.participant_id,
  s.created_at,
  s.completed_at,
  s.status,
  s.expires_at,
  COUNT(fs.id) as form_count,
  ARRAY_AGG(DISTINCT fs.form_type) as completed_forms,
  CASE 
    WHEN s.status = 'completed' THEN true
    WHEN s.expires_at < CURRENT_TIMESTAMP THEN true
    ELSE false
  END as is_expired
FROM sessions s
LEFT JOIN form_submissions fs ON s.id = fs.session_id
GROUP BY s.id, s.participant_id, s.created_at, s.completed_at, s.status, s.expires_at;

-- Function to clean up expired sessions (can be called by a cron job)
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM sessions 
  WHERE expires_at < CURRENT_TIMESTAMP - INTERVAL '7 days'
  AND status IN ('abandoned', 'completed');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get session statistics
CREATE OR REPLACE FUNCTION get_session_stats(start_date TIMESTAMP WITH TIME ZONE DEFAULT NULL, end_date TIMESTAMP WITH TIME ZONE DEFAULT NULL)
RETURNS TABLE (
  total_sessions BIGINT,
  completed_sessions BIGINT,
  abandoned_sessions BIGINT,
  in_progress_sessions BIGINT,
  avg_completion_time INTERVAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_sessions,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_sessions,
    COUNT(*) FILTER (WHERE status = 'abandoned') as abandoned_sessions,
    COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_sessions,
    AVG(completed_at - created_at) FILTER (WHERE status = 'completed') as avg_completion_time
  FROM sessions
  WHERE (start_date IS NULL OR created_at >= start_date)
    AND (end_date IS NULL OR created_at <= end_date);
END;
$$ LANGUAGE plpgsql;
