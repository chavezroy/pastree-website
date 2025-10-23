/**
 * Session Manager for Usability Testing Forms
 * Handles localStorage-based session management with auto-expiration
 */

class SessionManager {
    constructor() {
        this.SESSION_PREFIX = 'session-';
        this.SESSIONS_LIST_KEY = 'usability-sessions';
        this.EXPIRY_HOURS = 48;
        this.WARNING_HOURS = 1; // Show warning 1 hour before expiry

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
     * Create a new test session
     */
    createSession(participantId) {
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

        // Store session data
        const storageKey = `${this.SESSION_PREFIX}${sessionId}`;
        console.log('Storing session with key:', storageKey);
        console.log('Session data to store:', session);
        console.log('Session data size:', JSON.stringify(session).length, 'characters');

        try {
            localStorage.setItem(storageKey, JSON.stringify(session));
            console.log('✅ Session stored successfully');

            // Verify it was stored
            const stored = localStorage.getItem(storageKey);
            console.log('Verification - stored data:', stored ? 'Found' : 'Not found');
        } catch (error) {
            console.error('❌ Error storing session:', error);
            throw error;
        }

        // Update sessions list
        this.updateSessionsList(sessionId, session);

        console.log(`✅ Created new session: ${sessionId} for participant: ${participantId}`);
        return sessionId;
    }

    /**
     * Get session data by ID
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
     * Save form data to session
     */
    saveFormData(sessionId, formType, data) {
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

        // Save updated session
        localStorage.setItem(`${this.SESSION_PREFIX}${sessionId}`, JSON.stringify(session));

        console.log(`💾 Saved ${formType} data for session: ${sessionId}`);
        return true;
    }

    /**
     * Get all active sessions
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
     * Update sessions list
     */
    updateSessionsList(sessionId, session) {
        try {
            const sessionsList = localStorage.getItem(this.SESSIONS_LIST_KEY);
            let sessionIds = sessionsList ? JSON.parse(sessionsList) : [];

            if (!sessionIds.includes(sessionId)) {
                sessionIds.push(sessionId);
                localStorage.setItem(this.SESSIONS_LIST_KEY, JSON.stringify(sessionIds));
            }
        } catch (error) {
            console.error('Error updating sessions list:', error);
        }
    }

    /**
     * Remove session from storage and list
     */
    removeSession(sessionId) {
        localStorage.removeItem(`${this.SESSION_PREFIX}${sessionId}`);

        try {
            const sessionsList = localStorage.getItem(this.SESSIONS_LIST_KEY);
            if (sessionsList) {
                const sessionIds = JSON.parse(sessionsList);
                const updatedIds = sessionIds.filter(id => id !== sessionId);
                localStorage.setItem(this.SESSIONS_LIST_KEY, JSON.stringify(updatedIds));
            }
        } catch (error) {
            console.error('Error removing session from list:', error);
        }
    }

    /**
     * Clean expired sessions
     */
    cleanExpiredSessions() {
        const sessions = this.getAllSessions();
        const now = Date.now();
        let cleanedCount = 0;

        sessions.forEach(session => {
            if (session.expiresAt < now) {
                this.removeSession(session.sessionId);
                cleanedCount++;
            }
        });

        if (cleanedCount > 0) {
            console.log(`🧹 Cleaned ${cleanedCount} expired sessions`);
        }
    }

    /**
     * Check if session is expiring soon
     */
    isSessionExpiringSoon(session) {
        const now = Date.now();
        const warningTime = session.expiresAt - (this.WARNING_HOURS * 60 * 60 * 1000);
        return now >= warningTime && now < session.expiresAt;
    }

    /**
     * Get time remaining until expiry
     */
    getTimeRemaining(session) {
        const now = Date.now();
        const remaining = session.expiresAt - now;

        if (remaining <= 0) return 'Expired';

        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }

    /**
     * Get session progress
     */
    getSessionProgress(session) {
        const progress = {
            pretest: session.data.pretest ? '✅' : '⏳',
            posttask: session.data.posttask.length,
            posttest: {
                sus: session.data.posttest.sus ? '✅' : '⏳',
                nps: session.data.posttest.nps ? '✅' : '⏳',
                feedback: session.data.posttest.feedback ? '✅' : '⏳'
            }
        };

        return progress;
    }

    /**
     * Export session data as JSON
     */
    exportSessionData(sessionId) {
        const session = this.getSession(sessionId);
        if (!session) return null;

        // Create export data structure
        const exportData = {
            participantId: session.participantId,
            sessionId: session.sessionId,
            createdAt: session.createdAt,
            expiresAt: session.expiresAt,
            data: session.data
        };

        return exportData;
    }

    /**
     * Export all sessions data as combined JSON
     */
    exportAllSessions() {
        const sessions = this.getAllSessions();
        const exportData = {
            exportedAt: Date.now(),
            totalSessions: sessions.length,
            sessions: sessions.map(session => this.exportSessionData(session.sessionId))
        };

        return exportData;
    }

    /**
     * Get session from URL parameters
     */
    getSessionFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('session');
    }

    /**
     * Get session data from URL parameters (for file:// protocol)
     */
    getSessionDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionData = urlParams.get('data');
        if (sessionData) {
            try {
                return JSON.parse(decodeURIComponent(sessionData));
            } catch (error) {
                console.error('Error parsing session data from URL:', error);
                return null;
            }
        }
        return null;
    }

    /**
     * Create session URL
     */
    createSessionURL(sessionId, basePath = 'forms/pre-test-questionnaire.html') {
        // Handle file:// protocol (when opening HTML files directly)
        if (window.location.protocol === 'file:') {
            // For file:// URLs, construct relative path
            const currentPath = window.location.pathname;
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
            return `${currentDir}/${basePath}?session=${sessionId}`;
        }

        // For http/https URLs, use proper origin
        const origin = window.location.origin || window.location.protocol + '//' + window.location.host;
        const url = new URL(basePath, origin);
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
        console.log(`🧭 HTTP protocol - navigating to: ${url.toString()}`);
        window.location.href = url.toString();
    }
}

// Create global instance
window.sessionManager = new SessionManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SessionManager;
}
