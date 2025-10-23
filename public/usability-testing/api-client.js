/**
 * API Client for Usability Testing
 * Provides easy-to-use methods for interacting with the backend API
 */

class UsabilityTestingAPI {
    constructor() {
        this.baseUrl = window.location.origin + '/api/usability-testing';
        this.timeout = 10000; // 10 seconds
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
    }

    /**
     * Generic API request method with retry logic
     */
    async request(method, endpoint, data = null, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            signal: AbortSignal.timeout(this.timeout),
            ...options
        };

        if (data) {
            requestOptions.body = JSON.stringify(data);
        }

        let lastError;
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                console.log(`API request (attempt ${attempt}): ${method} ${url}`);
                const response = await fetch(url, requestOptions);
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
                }

                const result = await response.json();
                console.log('API response:', result);
                return result;
            } catch (error) {
                lastError = error;
                console.warn(`API request failed (attempt ${attempt}):`, error);
                
                if (attempt < this.retryAttempts && !error.name === 'AbortError') {
                    await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
                }
            }
        }

        throw lastError;
    }

    /**
     * Create a new session
     */
    async createSession(participantId, metadata = {}) {
        return await this.request('POST', '/sessions', {
            participant_id: participantId,
            metadata
        });
    }

    /**
     * Get session details
     */
    async getSession(sessionId) {
        return await this.request('GET', `/sessions/${sessionId}`);
    }

    /**
     * Update session status
     */
    async updateSessionStatus(sessionId, status, completedAt = null) {
        return await this.request('PATCH', `/sessions/${sessionId}`, {
            status,
            completed_at: completedAt
        });
    }

    /**
     * Get sessions with pagination and filters
     */
    async getSessions(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value);
            }
        });

        const endpoint = queryParams.toString() ? `/sessions?${queryParams.toString()}` : '/sessions';
        return await this.request('GET', endpoint);
    }

    /**
     * Submit form data
     */
    async submitForm(sessionId, formType, formData, version = '1.0') {
        return await this.request('POST', '/submit', {
            session_id: sessionId,
            form_type: formType,
            form_data: formData,
            version
        });
    }

    /**
     * Export data
     */
    async exportData(format = 'json', filters = {}) {
        const queryParams = new URLSearchParams();
        queryParams.append('format', format);
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value);
            }
        });

        const response = await fetch(`${this.baseUrl}/export?${queryParams.toString()}`, {
            method: 'GET',
            signal: AbortSignal.timeout(this.timeout)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Export failed: ${errorData.message || response.statusText}`);
        }

        if (format === 'json') {
            return await response.json();
        } else {
            return await response.text();
        }
    }

    /**
     * Send webhook notification
     */
    async sendWebhook(sessionId, notificationType, data = {}) {
        return await this.request('POST', '/webhook', {
            session_id: sessionId,
            notification_type: notificationType,
            data,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Get webhook configuration
     */
    async getWebhookInfo() {
        return await this.request('GET', '/webhook');
    }

    /**
     * Health check
     */
    async healthCheck() {
        return await this.request('GET', '/health');
    }

    /**
     * Download exported data as file
     */
    async downloadExport(format = 'json', filters = {}, filename = null) {
        try {
            const data = await this.exportData(format, filters);
            
            if (!filename) {
                const date = new Date().toISOString().split('T')[0];
                filename = `usability-testing-export-${date}.${format}`;
            }

            const blob = new Blob([format === 'json' ? JSON.stringify(data, null, 2) : data], {
                type: format === 'json' ? 'application/json' : 'text/csv'
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return { success: true, filename };
        } catch (error) {
            console.error('Error downloading export:', error);
            throw error;
        }
    }

    /**
     * Check if API is available
     */
    async isApiAvailable() {
        try {
            const health = await this.healthCheck();
            return health.success && health.data.status === 'healthy';
        } catch (error) {
            console.warn('API not available:', error);
            return false;
        }
    }

    /**
     * Get API statistics
     */
    async getStats(startDate = null, endDate = null) {
        try {
            const health = await this.healthCheck();
            return health.success ? health.data.stats : null;
        } catch (error) {
            console.error('Error getting stats:', error);
            return null;
        }
    }

    /**
     * Utility method to handle API errors gracefully
     */
    handleApiError(error, fallbackValue = null) {
        console.error('API Error:', error);
        
        // Show user-friendly error message
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            console.warn('Network error - API may be unavailable');
            return fallbackValue;
        }
        
        if (error.message.includes('HTTP 404')) {
            console.warn('Resource not found');
            return fallbackValue;
        }
        
        if (error.message.includes('HTTP 500')) {
            console.error('Server error - please try again later');
            return fallbackValue;
        }
        
        // Re-throw other errors
        throw error;
    }

    /**
     * Batch submit multiple forms
     */
    async batchSubmitForms(sessionId, forms) {
        const results = [];
        
        for (const form of forms) {
            try {
                const result = await this.submitForm(
                    sessionId,
                    form.type,
                    form.data,
                    form.version
                );
                results.push({ success: true, form: form.type, result });
            } catch (error) {
                results.push({ success: false, form: form.type, error: error.message });
            }
        }
        
        return results;
    }

    /**
     * Sync local data with API
     */
    async syncLocalData(localSessionId, apiSessionId) {
        try {
            // Get local session data
            const localSession = window.sessionManager?.getSession(localSessionId);
            if (!localSession) {
                throw new Error('Local session not found');
            }

            const forms = [];
            
            // Collect all form data
            if (localSession.data.pretest) {
                forms.push({
                    type: 'pretest',
                    data: localSession.data.pretest,
                    version: '1.0'
                });
            }
            
            if (localSession.data.posttask && localSession.data.posttask.length > 0) {
                localSession.data.posttask.forEach((taskData, index) => {
                    forms.push({
                        type: 'posttask',
                        data: taskData,
                        version: '1.0'
                    });
                });
            }
            
            if (localSession.data.posttest) {
                Object.entries(localSession.data.posttest).forEach(([type, data]) => {
                    if (data) {
                        forms.push({
                            type: `posttest-${type}`,
                            data: data,
                            version: '1.0'
                        });
                    }
                });
            }

            // Submit all forms
            const results = await this.batchSubmitForms(apiSessionId, forms);
            
            return {
                success: true,
                synced_forms: results.filter(r => r.success).length,
                total_forms: results.length,
                results
            };
        } catch (error) {
            console.error('Error syncing local data:', error);
            throw error;
        }
    }
}

// Create global instance
window.usabilityAPI = new UsabilityTestingAPI();
