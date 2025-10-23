/**
 * Pastree Usability Testing - Data Processing Utilities
 * 
 * This module provides helper functions for aggregating and analyzing
 * usability test data from multiple participants.
 */

class UsabilityDataProcessor {
    constructor() {
        this.data = {
            pretest: [],
            posttask: [],
            posttest: []
        };
    }

    /**
     * Load and categorize data from JSON files
     */
    loadFile(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

            if (data.responses && data.responses.sus1) {
                this.data.posttest.push(data);
            } else if (data.responses && data.responses.task1Ease) {
                this.data.posttask.push(data);
            } else if (data.responses && data.responses.age) {
                this.data.pretest.push(data);
            }

            return true;
        } catch (error) {
            console.error('Error loading file:', error);
            return false;
        }
    }

    /**
     * Load multiple files at once
     */
    loadFiles(files) {
        const promises = [];

        files.forEach(file => {
            const promise = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const success = this.loadFile(e.target.result);
                    resolve(success);
                };
                reader.onerror = reject;
                reader.readAsText(file);
            });
            promises.push(promise);
        });

        return Promise.all(promises);
    }

    /**
     * Calculate aggregate statistics
     */
    getAggregateStats() {
        return {
            participantCount: this.data.posttest.length,
            avgSUS: this.calculateAverageSUS(),
            nps: this.calculateNPS(),
            taskSuccess: this.calculateTaskSuccess(),
            demographics: this.getDemographics(),
            experience: this.getExperienceLevels(),
            features: this.getFeaturePreferences()
        };
    }

    /**
     * Calculate average SUS score across all participants
     */
    calculateAverageSUS() {
        if (this.data.posttest.length === 0) return null;

        const sum = this.data.posttest.reduce((acc, p) => acc + p.susScore, 0);
        const avg = sum / this.data.posttest.length;

        return {
            score: avg,
            grade: this.getSUSGrade(avg),
            distribution: this.data.posttest.map(p => ({
                participant: p.participantId,
                score: p.susScore
            }))
        };
    }

    /**
     * Calculate Net Promoter Score
     */
    calculateNPS() {
        if (this.data.posttest.length === 0) return null;

        const scores = this.data.posttest.map(p => parseInt(p.responses.nps));
        const promoters = scores.filter(s => s >= 9).length;
        const passives = scores.filter(s => s >= 7 && s <= 8).length;
        const detractors = scores.filter(s => s <= 6).length;
        const total = scores.length;

        const npsScore = Math.round(((promoters - detractors) / total) * 100);

        return {
            score: npsScore,
            category: this.getNPSCategory(npsScore),
            breakdown: {
                promoters,
                passives,
                detractors
            }
        };
    }

    /**
     * Calculate task success rates
     */
    calculateTaskSuccess() {
        if (this.data.posttask.length === 0) return null;

        const taskData = {};

        for (let i = 1; i <= 6; i++) {
            let success = 0;
            let total = 0;
            const easeRatings = [];

            this.data.posttask.forEach(p => {
                const successResponse = p.responses[`task${i}Success`];
                const easeResponse = p.responses[`task${i}Ease`];

                if (successResponse) {
                    total++;
                    if (successResponse === 'yes') success++;
                }

                if (easeResponse) {
                    easeRatings.push(parseInt(easeResponse));
                }
            });

            const avgEase = easeRatings.length > 0
                ? easeRatings.reduce((a, b) => a + b, 0) / easeRatings.length
                : 0;

            taskData[`task${i}`] = {
                successRate: total > 0 ? (success / total) * 100 : 0,
                avgEase: avgEase,
                completed: success,
                attempted: total
            };
        }

        return taskData;
    }

    /**
     * Get demographics breakdown
     */
    getDemographics() {
        if (this.data.pretest.length === 0) return null;

        const demographics = {
            age: {},
            gender: {},
            occupation: {},
            education: {}
        };

        this.data.pretest.forEach(p => {
            const r = p.responses;

            demographics.age[r.age] = (demographics.age[r.age] || 0) + 1;
            demographics.gender[r.gender] = (demographics.gender[r.gender] || 0) + 1;
            demographics.occupation[r.occupation] = (demographics.occupation[r.occupation] || 0) + 1;
            demographics.education[r.education] = (demographics.education[r.education] || 0) + 1;
        });

        return demographics;
    }

    /**
     * Get experience levels distribution
     */
    getExperienceLevels() {
        if (this.data.pretest.length === 0) return null;

        const experience = {
            techProficiency: {},
            browserExtensions: {},
            clipboardManagers: {},
            copyPasteFrequency: {}
        };

        this.data.pretest.forEach(p => {
            const r = p.responses;

            const tech = r['tech-proficiency'];
            const extensions = r['browser-extensions'];
            const clipboard = r['clipboard-managers'];
            const frequency = r['copy-paste-frequency'];

            if (tech) experience.techProficiency[tech] = (experience.techProficiency[tech] || 0) + 1;
            if (extensions) experience.browserExtensions[extensions] = (experience.browserExtensions[extensions] || 0) + 1;
            if (clipboard) experience.clipboardManagers[clipboard] = (experience.clipboardManagers[clipboard] || 0) + 1;
            if (frequency) experience.copyPasteFrequency[frequency] = (experience.copyPasteFrequency[frequency] || 0) + 1;
        });

        return experience;
    }

    /**
     * Get feature preferences
     */
    getFeaturePreferences() {
        if (this.data.posttest.length === 0) return null;

        const features = {};

        this.data.posttest.forEach(p => {
            const feature = p.responses['most-valuable'];
            if (feature) {
                features[feature] = (features[feature] || 0) + 1;
            }
        });

        return features;
    }

    /**
     * Get qualitative feedback
     */
    getQualitativeFeedback() {
        const feedback = {
            delights: [],
            pains: [],
            firstImpressions: [],
            missingFeatures: [],
            useCases: [],
            additional: []
        };

        this.data.posttest.forEach(p => {
            const r = p.responses;
            const pid = p.participantId;

            if (r['biggest-delight']) feedback.delights.push({ participant: pid, text: r['biggest-delight'] });
            if (r['biggest-pain']) feedback.pains.push({ participant: pid, text: r['biggest-pain'] });
            if (r['first-impression']) feedback.firstImpressions.push({ participant: pid, text: r['first-impression'] });
            if (r['missing-features']) feedback.missingFeatures.push({ participant: pid, text: r['missing-features'] });
            if (r['use-cases']) feedback.useCases.push({ participant: pid, text: r['use-cases'] });
            if (r['additional-feedback']) feedback.additional.push({ participant: pid, text: r['additional-feedback'] });
        });

        return feedback;
    }

    /**
     * Export aggregated data as CSV
     */
    exportToCSV() {
        const stats = this.getAggregateStats();
        let csv = 'Pastree Usability Test Results - Summary\n\n';

        csv += 'Metric,Value\n';
        csv += `Total Participants,${stats.participantCount}\n`;
        csv += `Average SUS Score,${stats.avgSUS?.score.toFixed(1) || 'N/A'}\n`;
        csv += `SUS Grade,${stats.avgSUS?.grade || 'N/A'}\n`;
        csv += `NPS Score,${stats.nps?.score || 'N/A'}\n`;
        csv += `NPS Category,${stats.nps?.category || 'N/A'}\n`;

        csv += '\n\nTask Success Rates\n';
        csv += 'Task,Success Rate (%),Average Ease,Completed,Attempted\n';

        if (stats.taskSuccess) {
            for (let i = 1; i <= 6; i++) {
                const task = stats.taskSuccess[`task${i}`];
                csv += `Task ${i},${task.successRate.toFixed(1)},${task.avgEase.toFixed(1)},${task.completed},${task.attempted}\n`;
            }
        }

        return csv;
    }

    /**
     * Export all data as JSON
     */
    exportToJSON() {
        return JSON.stringify({
            metadata: {
                exportDate: new Date().toISOString(),
                participantCount: this.data.posttest.length,
                version: '1.0.0'
            },
            aggregateStats: this.getAggregateStats(),
            qualitativeFeedback: this.getQualitativeFeedback(),
            rawData: this.data
        }, null, 2);
    }

    /**
     * Helper: Get SUS grade
     */
    getSUSGrade(score) {
        if (score >= 80.3) return 'Excellent';
        if (score >= 68) return 'Good';
        if (score >= 51) return 'OK';
        return 'Poor';
    }

    /**
     * Helper: Get NPS category
     */
    getNPSCategory(score) {
        if (score > 70) return 'Excellent';
        if (score > 50) return 'Great';
        if (score > 30) return 'Good';
        if (score > 0) return 'Fair';
        return 'Needs Improvement';
    }

    /**
     * Clear all data
     */
    clear() {
        this.data = {
            pretest: [],
            posttask: [],
            posttest: []
        };
    }
}

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UsabilityDataProcessor;
}

