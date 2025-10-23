// Usability Testing Types
// TypeScript definitions for the usability testing data management system

export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';
export type FormType = 'pretest' | 'posttask' | 'posttest-sus' | 'posttest-nps' | 'posttest-feedback';
export type NotificationType = 'session_created' | 'form_submitted' | 'session_completed' | 'session_abandoned';
export type NotificationStatus = 'sent' | 'failed' | 'pending';

// Database entity types
export interface Session {
  id: string;
  participant_id: string;
  created_at: string;
  completed_at?: string;
  status: SessionStatus;
  metadata: Record<string, any>;
  expires_at: string;
}

export interface FormSubmission {
  id: string;
  session_id: string;
  form_type: FormType;
  form_data: Record<string, any>;
  submitted_at: string;
  version: string;
}

export interface Notification {
  id: string;
  session_id: string;
  notification_type: NotificationType;
  sent_at: string;
  status: NotificationStatus;
  metadata: Record<string, any>;
  webhook_url?: string;
  retry_count: number;
}

// API request/response types
export interface CreateSessionRequest {
  participant_id: string;
  metadata?: Record<string, any>;
}

export interface CreateSessionResponse {
  session: Session;
  message: string;
}

export interface SubmitFormRequest {
  session_id: string;
  form_type: FormType;
  form_data: Record<string, any>;
  version?: string;
}

export interface SubmitFormResponse {
  submission: FormSubmission;
  message: string;
}

export interface GetSessionsRequest {
  page?: number;
  limit?: number;
  status?: SessionStatus;
  participant_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface GetSessionsResponse {
  sessions: SessionSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface SessionSummary {
  id: string;
  participant_id: string;
  created_at: string;
  completed_at?: string;
  status: SessionStatus;
  expires_at: string;
  form_count: number;
  completed_forms: FormType[];
  is_expired: boolean;
}

export interface GetSessionResponse {
  session: Session;
  submissions: FormSubmission[];
  notifications: Notification[];
}

export interface ExportDataRequest {
  format: 'csv' | 'json';
  start_date?: string;
  end_date?: string;
  participant_id?: string;
  status?: SessionStatus;
}

export interface WebhookRequest {
  session_id: string;
  notification_type: NotificationType;
  data: Record<string, any>;
  timestamp: string;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
}

// Statistics types
export interface SessionStats {
  total_sessions: number;
  completed_sessions: number;
  abandoned_sessions: number;
  in_progress_sessions: number;
  avg_completion_time?: string;
}

// Error types
export interface ApiError {
  error: string;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// Client-side types for localStorage compatibility
export interface LocalSessionData {
  sessionId: string;
  participantId: string;
  createdAt: number;
  expiresAt: number;
  data: {
    pretest?: Record<string, any>;
    posttask?: Record<string, any>[];
    posttest?: {
      sus?: Record<string, any>;
      nps?: Record<string, any>;
      feedback?: Record<string, any>;
    };
  };
}

// Form data types (matching existing structure)
export interface PreTestData {
  participantId: string;
  timestamp: string;
  responses: {
    age?: string;
    gender?: string;
    experience?: string;
    frequency?: string;
    [key: string]: any;
  };
}

export interface PostTaskData {
  participantId: string;
  timestamp: string;
  taskId: string;
  responses: {
    ease?: string;
    success?: string;
    time?: string;
    comments?: string;
    [key: string]: any;
  };
}

export interface PostTestData {
  participantId: string;
  timestamp: string;
  responses: {
    sus1?: string;
    sus2?: string;
    sus3?: string;
    sus4?: string;
    sus5?: string;
    sus6?: string;
    sus7?: string;
    sus8?: string;
    sus9?: string;
    sus10?: string;
    nps?: string;
    'liked-most'?: string;
    improvements?: string;
    'additional-feedback'?: string;
    [key: string]: any;
  };
}

// Configuration types
export interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface NotificationConfig {
  webhookUrl?: string;
  emailEnabled: boolean;
  emailRecipients: string[];
  realTimeEnabled: boolean;
}

// Utility types
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: ApiError;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};
