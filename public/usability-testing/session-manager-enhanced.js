/**
 * Enhanced Session Manager for Usability Testing Forms
 * Handles both localStorage and API-based session management with auto-expiration
 * Maintains backward compatibility with existing localStorage implementation
 */

class EnhancedSessionManager {
    constructor() {
        this.SESSION_PREFIX = 'session-';
        this.SESSIONS_LIST_KEY = 'usability-sessions';
        this.EXPIRY_HOURS = 48;
        this.WARNING_HOURS = 1; // Show warning 1 hour before expiry
        
        // API configuration
        this.API_BASE_URL = window.location.origin + '/api/usability-testing';
        this.API_ENABLED = true; // Can be toggled for offline mode
        this.RETRY_ATTEMPTS = 3;
        this.RETRY_DELAY = 1000; // 1 second

        // Clean expired sessions on initialization
        this.cleanExpiredSessions();
    }

    /**
     * Generate a unique session ID
     */
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Create a new test session (API + localStorage)
     */
    async createSession(participantId) {
        const sessionId = this.generateSessionId();
        const now = Date.now();

        const session = {
            sessionId,
            participantId,
            createdAt: now,
            expiresAt: now + (this.EXPIRY_HOURS * 60 * 60 * 1000),
            data: {
                pretest: null,
                posttask: [], // Array of 6 task submissions
                posttest: {
                    sus: null,
                    nps: null,
                    feedback: null
                }
            }
        };

        // Store in localStorage first (for immediate availability)
        const storageKey = `${this.SESSION_PREFIX}${sessionId}`;
        console.log('Storing session locally with key:', storageKey);

        try {
            localStorage.setItem(storageKey, JSON.stringify(session));
            console.log('✅ Session stored locally successfully');

            // Update sessions list
            this.updateSessionsList(sessionId, session);

            // Try to create session in API (async, non-blocking)
            if (this.API_ENABLED) {
                this.createSessionInAPI(sessionId, participantId).catch(error => {
                    console.warn('Failed to create session in API:', error);
                    // Continue with localStorage-only mode
                });
            }

            console.log(`✅ Created new session: ${sessionId} for participant: ${participantId}`);
            return sessionId;
        } catch (error) {
            console.error('❌ Error storing session locally:', error);
            throw error;
        }
    }

    /**
     * Create session in API
     */
    async createSessionInAPI(sessionId, participantId) {
        try {
            const response = await this.apiRequest('POST', '/sessions', {
                participant_id: participantId,
                metadata: {
                    local_session_id: sessionId,
                    created_via: 'enhanced_session_manager'
                }
            });

            if (response.success) {
                console.log('✅ Session created in API:', response.data.session.id);
                // Store API session ID for future reference
                const localSession = this.getSession(sessionId);
                if (localSession) {
                    localSession.apiSessionId = response.data.session.id;
                    localStorage.setItem(`${this.SESSION_PREFIX}${sessionId}`, JSON.stringify(localSession));
                }
            }
        } catch (error) {
            console.error('❌ Error creating session in API:', error);
            throw error;
        }
    }

    /**
     * Get session data by ID (localStorage first, API fallback)
     */
    getSession(sessionId) {
        try {
            const storageKey = `${this.SESSION_PREFIX}${sessionId}`;
            console.log('Looking for session with key:', storageKey);

            const sessionData = localStorage.getItem(storageKey);
            console.log('Raw session data from localStorage:', sessionData);

            if (!sessionData) {
                console.log('No session data found for key:', storageKey);
                return null;
            }

            const session = JSON.parse(sessionData);
            console.log('Parsed session:', session);

            // Check if session has expired
            const now = Date.now();
            console.log('Current time:', now, 'Session expires at:', session.expiresAt);

            if (session.expiresAt < now) {
                console.log('Session has expired, removing it');
                this.removeSession(sessionId);
                return null;
            }

            console.log('Session is valid, returning:', session);
            return session;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }

    /**
     * Save form data to session (localStorage + API)
     */
    async saveFormData(sessionId, formType, data) {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found or expired`);
        }

        // Update session data based on form type
        if (formType === 'pretest') {
            session.data.pretest = data;
        } else if (formType === 'posttask') {
            session.data.posttask.push(data);
        } else if (formType.startsWith('posttest-')) {
            const part = formType.split('-')[1]; // sus, nps, feedback
            session.data.posttest[part] = data;
        } else {
            throw new Error(`Unknown form type: ${formType}`);
        }

        // Save updated session locally
        localStorage.setItem(`${this.SESSION_PREFIX}${sessionId}`, JSON.stringify(session));

        console.log(`💾 Saved ${formType} data locally for session: ${sessionId}`);

        // Try to submit to API (async, non-blocking)
        if (this.API_ENABLED && session.apiSessionId) {
            this.submitFormToAPI(session.apiSessionId, formType, data).catch(error => {
                console.warn('Failed to submit form to API:', error);
                // Continue with localStorage-only mode
            });
        }

        return true;
    }

    /**
     * Submit form data to API
     */
    async submitFormToAPI(apiSessionId, formType, data) {
        try {
            const response = await this.apiRequest('POST', '/submit', {
                session_id: apiSessionId,
                form_type: formType,
                form_data: data,
                version: '1.0'
            });

            if (response.success) {
                console.log('✅ Form submitted to API:', formType);
            }
        } catch (error) {
            console.error('❌ Error submitting form to API:', error);
            throw error;
        }
    }

    /**
     * Get all active sessions (localStorage)
     */
    getAllSessions() {
        try {
            const sessionsList = localStorage.getItem(this.SESSIONS_LIST_KEY);
            if (!sessionsList) return [];

            const sessionIds = JSON.parse(sessionsList);
            const sessions = [];

            sessionIds.forEach(sessionId => {
                const session = this.getSession(sessionId);
                if (session) {
                    sessions.push(session);
                }
            });

            return sessions;
        } catch (error) {
            console.error('Error getting all sessions:', error);
            return [];
        }
    }

    /**
     * Get sessions from API
     */
    async getSessionsFromAPI(params = {}) {
        try {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value);
                }
            });

            const response = await this.apiRequest('GET', `/sessions?${queryParams.toString()}`);
            return response.success ? response.data : null;
        } catch (error) {
            console.error('Error getting sessions from API:', error);
            return null;
        }
    }

    /**
     * Export data from API
     */
    async exportDataFromAPI(format = 'json', filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('format', format);
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value);
                }
            });

            const response = await fetch(`${this.API_BASE_URL}/export?${queryParams.toString()}`);
            
            if (!response.ok) {
                throw new Error(`Export failed: ${response.statusText}`);
            }

            if (format === 'json') {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('Error exporting data from API:', error);
            throw error;
        }
    }

    /**
     * Generic API request method with retry logic
     */
    async apiRequest(method, endpoint, data = null) {
        const url = `${this.API_BASE_URL}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        let lastError;
        for (let attempt = 1; attempt <= this.RETRY_ATTEMPTS; attempt++) {
            try {
                console.log(`API request (attempt ${attempt}): ${method} ${url}`);
                const response = await fetch(url, options);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('API response:', result);
                return result;
            } catch (error) {
                lastError = error;
                console.warn(`API request failed (attempt ${attempt}):`, error);
                
                if (attempt < this.RETRY_ATTEMPTS) {
                    await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * attempt));
                }
            }
        }

        throw lastError;
    }

    /**
     * Update sessions list in localStorage
     */
    updateSessionsList(sessionId, session) {
        try {
            let sessionIds = [];
            const existingList = localStorage.getItem(this.SESSIONS_LIST_KEY);
            if (existingList) {
                sessionIds = JSON.parse(existingList);
            }

            if (!sessionIds.includes(sessionId)) {
                sessionIds.push(sessionId);
                localStorage.setItem(this.SESSIONS_LIST_KEY, JSON.stringify(sessionIds));
            }
        } catch (error) {
            console.error('Error updating sessions list:', error);
        }
    }

    /**
     * Remove session from localStorage
     */
    removeSession(sessionId) {
        try {
            const storageKey = `${this.SESSION_PREFIX}${sessionId}`;
            localStorage.removeItem(storageKey);

            // Remove from sessions list
            const sessionsList = localStorage.getItem(this.SESSIONS_LIST_KEY);
            if (sessionsList) {
                const sessionIds = JSON.parse(sessionsList);
                const updatedIds = sessionIds.filter(id => id !== sessionId);
                localStorage.setItem(this.SESSIONS_LIST_KEY, JSON.stringify(updatedIds));
            }

            console.log(`🗑️ Removed session: ${sessionId}`);
        } catch (error) {
            console.error('Error removing session:', error);
        }
    }

    /**
     * Clean expired sessions
     */
    cleanExpiredSessions() {
        try {
            const sessionsList = localStorage.getItem(this.SESSIONS_LIST_KEY);
            if (!sessionsList) return;

            const sessionIds = JSON.parse(sessionsList);
            const now = Date.now();
            const validIds = [];

            sessionIds.forEach(sessionId => {
                const session = this.getSession(sessionId);
                if (session && session.expiresAt > now) {
                    validIds.push(sessionId);
                } else {
                    this.removeSession(sessionId);
                }
            });

            localStorage.setItem(this.SESSIONS_LIST_KEY, JSON.stringify(validIds));
        } catch (error) {
            console.error('Error cleaning expired sessions:', error);
        }
    }

    /**
     * Get session from URL parameters
     */
    getSessionFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('session');
    }

    /**
     * Create session URL for navigation
     */
    createSessionURL(sessionId, basePath = 'forms/pre-test-questionnaire.html') {
        // Handle file:// protocol (when opening HTML files directly)
        if (window.location.protocol === 'file:') {
            // For file:// URLs, construct relative path
            const currentPath = window.location.pathname;
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
            return `${currentDir}/${basePath}?session=${sessionId}`;
        }

        // For http/https URLs, use proper origin with usability-testing prefix
        const origin = window.location.origin || window.location.protocol + '//' + window.location.host;
        const fullPath = `/usability-testing/${basePath}`;
        const url = new URL(fullPath, origin);
        url.searchParams.set('session', sessionId);
        return url.toString();
    }

    /**
     * Navigate to next form with session ID
     */
    navigateToNextForm(sessionId, nextForm) {
        console.log(`🧭 Navigating to next form: ${nextForm} with session: ${sessionId}`);
        console.log(`🧭 Current URL: ${window.location.href}`);
        console.log(`🧭 Current protocol: ${window.location.protocol}`);
        console.log(`🧭 Current pathname: ${window.location.pathname}`);

        // Handle file:// protocol (when opening HTML files directly)
        if (window.location.protocol === 'file:') {
            // For file:// URLs, construct relative path
            const currentPath = window.location.pathname;
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
            const newUrl = `${currentDir}/${nextForm}?session=${sessionId}`;
            console.log(`🧭 File protocol - navigating to: ${newUrl}`);
            window.location.href = newUrl;
            return;
        }

        // For http/https URLs, preserve current directory structure
        const origin = window.location.origin || window.location.protocol + '//' + window.location.host;
        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
        const fullPath = `${currentDir}/${nextForm}`;
        const url = new URL(fullPath, origin);
        url.searchParams.set('session', sessionId);
        console.log(`🧭 HTTP protocol - origin: ${origin}`);
        console.log(`🧭 HTTP protocol - current dir: ${currentDir}`);
        console.log(`🧭 HTTP protocol - full path: ${fullPath}`);
        console.log(`🧭 HTTP protocol - final URL: ${url.toString()}`);
        window.location.href = url.toString();
    }

    /**
     * Check if session is near expiry
     */
    isSessionNearExpiry(sessionId) {
        const session = this.getSession(sessionId);
        if (!session) return false;

        const now = Date.now();
        const timeUntilExpiry = session.expiresAt - now;
        const warningTime = this.WARNING_HOURS * 60 * 60 * 1000;

        return timeUntilExpiry <= warningTime && timeUntilExpiry > 0;
    }

    /**
     * Get time remaining for session
     */
    getTimeRemaining(sessionId) {
        const session = this.getSession(sessionId);
        if (!session) return null;

        const now = Date.now();
        const timeRemaining = session.expiresAt - now;

        if (timeRemaining <= 0) return 'Expired';

        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }

    /**
     * Toggle API mode
     */
    setApiMode(enabled) {
        this.API_ENABLED = enabled;
        console.log(`API mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Get API status
     */
    async getApiStatus() {
        try {
            const response = await this.apiRequest('GET', '/health');
            return response.success ? response.data : null;
        } catch (error) {
            console.error('Error getting API status:', error);
            return null;
        }
    }
}

// Create global instance
window.enhancedSessionManager = new EnhancedSessionManager();

// Also create a backward-compatible alias
window.sessionManager = window.enhancedSessionManager;
