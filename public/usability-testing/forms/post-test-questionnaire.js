// Post-Test Questionnaire JavaScript - Session-Based Version

// Custom Modal Functions for Session Errors
function showSessionError(message) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        text-align: center;
    `;

    modal.innerHTML = `
        <div style="font-size: 2em; margin-bottom: 15px;">⚠️</div>
        <h3 style="margin: 0 0 15px 0; color: #333;">Session Error</h3>
        <p style="color: #666; margin-bottom: 25px; line-height: 1.5;">${message}</p>
        <button id="sessionErrorOk" style="
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
        ">OK</button>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Handle OK button click
    document.getElementById('sessionErrorOk').addEventListener('click', function () {
        document.body.removeChild(modalOverlay);
        window.location.href = '../admin-start.html';
    });

    // Handle overlay click
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
            window.location.href = '../admin-start.html';
        }
    });
}

// Check for session ID on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 POST-TEST QUESTIONNAIRE SCRIPT LOADED!');

    // Check for session ID in URL
    const sessionId = sessionManager.getSessionFromURL();
    console.log('Post-test form loaded, session ID from URL:', sessionId);

    if (!sessionId) {
        // No session ID - redirect to admin start page
        console.log('No session ID found in URL, redirecting to admin start');
        showSessionError('No session found. Please start a new test session.');
        return;
    }

    // Try to get session from localStorage
    let session = sessionManager.getSession(sessionId);
    console.log('Retrieved session from localStorage:', session);

    // If not found, create a temporary session from the session ID
    if (!session) {
        console.log('Session not found, creating temporary session from ID');
        session = {
            sessionId: sessionId,
            participantId: 'P1', // Default participant ID for temporary session
            createdAt: Date.now(),
            expiresAt: Date.now() + (48 * 60 * 60 * 1000), // 48 hours
            data: {
                pretest: null,
                posttask: [],
                posttest: {
                    sus: null,
                    nps: null,
                    feedback: null
                }
            }
        };

        // Store the temporary session
        try {
            const storageKey = `session-${sessionId}`;
            localStorage.setItem(storageKey, JSON.stringify(session));
            console.log('✅ Temporary session created and stored');
        } catch (error) {
            console.error('❌ Error storing temporary session:', error);
        }
    }

    // Auto-populate participant ID from session (hidden fields)
    const participantIdFields = document.querySelectorAll('#participantId, #participantId2, #participantId3');
    participantIdFields.forEach(field => {
        if (field && session.participantId) {
            field.value = session.participantId;
        }
    });

    // Check if all parts are completed
    if (session.data.posttest && session.data.posttest.sus && session.data.posttest.nps && session.data.posttest.feedback) {
        showCompletionMessage();
        return;
    }

    console.log('✅ Session loaded:', sessionId, 'for participant:', session.participantId);
    console.log('📊 Completed parts:', {
        sus: !!session.data.posttest?.sus,
        nps: !!session.data.posttest?.nps,
        feedback: !!session.data.posttest?.feedback
    });
});

// Function to show completion message when all parts are completed
function showCompletionMessage() {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="header">
                <img src="../images/pastree-logo.svg" alt="Pastree Logo" class="logo">
                <h2>Post-Test Questionnaire</h2>
                <p class="subtitle">Final Assessment & Feedback</p>
            </div>
            
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4em; margin-bottom: 20px;">🎉</div>
                <h2 style="color: #2ecc71; margin-bottom: 20px;">Testing Complete!</h2>
                <p style="font-size: 1.2em; margin-bottom: 30px; color: #666;">
                    Thank you for completing the usability test. Your feedback is valuable!
                </p>
                <button onclick="viewResults()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    font-size: 1.2em;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                ">View Your Results →</button>
            </div>
        `;
    }
}

// Function to view results
function viewResults() {
    const sessionId = sessionManager.getSessionFromURL();
    window.open(`../results/participant-report.html?session=${sessionId}`, '_blank');
}

// Function to show notification
function showNotification(message, type) {
    const colors = {
        success: { bg: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)', icon: '✅' },
        info: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: 'ℹ️' },
        warning: { bg: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)', icon: '⚠️' },
        error: { bg: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', icon: '❌' }
    };

    const color = colors[type] || colors.info;

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color.bg};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10002;
        font-size: 1em;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `${color.icon} ${message}`;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Function to show inline validation message
function showInlineValidation(message, container) {
    // Remove existing validation message if any
    const existingMsg = document.getElementById('validationBanner');
    if (existingMsg) existingMsg.remove();

    const banner = document.createElement('div');
    banner.id = 'validationBanner';
    banner.style.cssText = `
        background: linear-gradient(135deg, #fee 0%, #fdd 100%);
        border-left: 4px solid #e74c3c;
        color: #721c24;
        padding: 20px 25px;
        border-radius: 8px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
        animation: slideDown 0.3s ease-out;
    `;

    const iconDiv = document.createElement('div');
    iconDiv.style.cssText = 'font-size: 2em; color: #e74c3c;';
    iconDiv.textContent = '⚠️';

    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = 'flex: 1;';

    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = 'font-weight: bold; font-size: 1.1em; margin-bottom: 5px;';
    titleDiv.textContent = 'Incomplete Form';

    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    const dismissBtn = document.createElement('button');
    dismissBtn.style.cssText = `
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
        font-weight: 600;
    `;
    dismissBtn.textContent = 'Dismiss';
    dismissBtn.addEventListener('click', () => banner.remove());

    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(messageDiv);
    banner.appendChild(iconDiv);
    banner.appendChild(contentDiv);
    banner.appendChild(dismissBtn);

    // Insert at the top of the container
    container.insertBefore(banner, container.firstChild);

    // Scroll to show the banner
    banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Function to validate form
function validateForm(form) {
    // Clear previous error styling
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
        input.classList.remove('validation-error');
        input.style.borderColor = '';
        input.style.background = '';
    });

    const allQuestions = form.querySelectorAll('.question');
    allQuestions.forEach(question => {
        question.classList.remove('validation-error');
        question.style.borderColor = '';
        question.style.background = '';
    });

    const participantIdField = form.querySelector('#participantId, #participantId2, #participantId3');
    if (participantIdField) {
        participantIdField.classList.remove('validation-error');
        participantIdField.style.borderColor = '';
        participantIdField.style.background = '';
    }

    const participantIdContainer = form.querySelector('.participant-id');
    if (participantIdContainer) {
        participantIdContainer.classList.remove('validation-error');
        participantIdContainer.style.borderColor = '';
        participantIdContainer.style.background = '';
    }

    let isValid = true;
    let firstInvalidField = null;

    // Check participant ID
    if (participantIdField && !participantIdField.value.trim()) {
        isValid = false;
        participantIdField.classList.add('validation-error');
        participantIdContainer.classList.add('validation-error');
        if (!firstInvalidField) firstInvalidField = participantIdField;
    }

    // Check required fields
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                const questionContainer = field.closest('.question');
                if (questionContainer) {
                    questionContainer.classList.add('validation-error');
                }
                if (!firstInvalidField) firstInvalidField = field;
            }
        } else if (!field.value.trim()) {
            isValid = false;
            field.classList.add('validation-error');
            if (!firstInvalidField) firstInvalidField = field;
        }
    });

    if (!isValid) {
        showInlineValidation('Please answer all required questions before submitting.', form);
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalidField.focus();
        }
    }

    return isValid;
}

// Get participant ID from URL
const urlParams = new URLSearchParams(window.location.search);
const pidFromUrl = urlParams.get('pid');
if (pidFromUrl) {
    // Set participant ID in all forms
    const participantIdFields = document.querySelectorAll('#participantId, #participantId2, #participantId3');
    participantIdFields.forEach(field => {
        field.value = pidFromUrl;
    });
}

// Sync participant ID between all forms
function syncParticipantId(sourceField) {
    const value = sourceField.value;
    const allFields = document.querySelectorAll('#participantId, #participantId2, #participantId3');
    allFields.forEach(field => {
        if (field !== sourceField) {
            field.value = value;
        }
    });
}

// Add event listeners to sync participant ID fields
document.addEventListener('DOMContentLoaded', function () {
    const participantIdFields = document.querySelectorAll('#participantId, #participantId2, #participantId3');
    participantIdFields.forEach(field => {
        field.addEventListener('input', () => syncParticipantId(field));
        field.addEventListener('change', () => syncParticipantId(field));
    });

    // Set proper tabindex for all form elements
    setTabIndexOrder();
});

// Function to set proper tabindex order for all forms
function setTabIndexOrder() {
    let tabIndex = 2; // Start after participant ID (tabindex 1)

    // Get all forms
    const forms = ['susForm', 'npsForm', 'feedbackForm'];

    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;

        // Get all interactive elements in the form (excluding participant ID and submit button)
        const elements = form.querySelectorAll('input[type="radio"], textarea, select');

        elements.forEach(element => {
            // Skip participant ID fields (already have tabindex 1)
            if (element.id.includes('participantId')) return;

            // Make radio inputs focusable and set tabindex
            if (element.type === 'radio') {
                // Only apply hidden styles to rating-scale radio buttons, not radio-group
                const isInRatingScale = element.closest('.rating-scale') || element.closest('.nps-scale');
                if (isInRatingScale) {
                    element.style.position = 'absolute';
                    element.style.opacity = '0';
                    element.style.pointerEvents = 'none';
                }
                element.setAttribute('tabindex', tabIndex);
            } else {
                element.setAttribute('tabindex', tabIndex);
            }
            tabIndex++;
        });
    });
}

// Task switching
const taskTabs = document.querySelectorAll('.task-tab');
const taskForms = document.querySelectorAll('.task-form');

taskTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const taskId = tab.dataset.task;

        // Update active tab
        taskTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active form
        taskForms.forEach(f => {
            f.classList.remove('active');
            // Reset any opacity/pointer-events changes
            f.style.opacity = '';
            f.style.pointerEvents = '';
            f.style.transition = '';
        });
        document.getElementById(`${taskId}-form`).classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Form submissions
document.getElementById('susForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm(this)) {
        return;
    }

    const participantId = document.getElementById('participantId').value;
    const formData = new FormData(this);
    const data = {
        participantId: 'P' + participantId,
        timestamp: new Date().toISOString(),
        part: 'SUS',
        responses: {}
    };

    // Collect all form data
    for (let [key, value] of formData.entries()) {
        data.responses[key] = value;
    }

    // Save to session storage
    const sessionId = sessionManager.getSessionFromURL();
    try {
        sessionManager.saveFormData(sessionId, 'posttest-sus', data);
        console.log('✅ SUS data saved to session:', sessionId);
    } catch (error) {
        console.error('❌ Failed to save to session:', error);
        showNotification('Failed to save data. Please try again.', 'error');
        return;
    }

    // Clear the draft after successful submission
    localStorage.removeItem(`pastree-posttest-sus-draft-P${participantId}`);

    // Mark task as completed
    const part1Tab = document.querySelector('.task-tab[data-task="part1"]');
    part1Tab.classList.add('completed');

    // Show success message
    showNotification('Part 1 (SUS) completed! Moving to Part 2...', 'success');

    // Hide current form content immediately
    const currentForm = document.getElementById('part1-form');
    currentForm.style.opacity = '0.3';
    currentForm.style.pointerEvents = 'none';
    currentForm.style.transition = 'opacity 0.3s ease';

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Switch to Part 2 after delay
    setTimeout(() => {
        document.querySelector('.task-tab[data-task="part2"]').click();
    }, 2000);
});

document.getElementById('npsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm(this)) {
        return;
    }

    const participantId = document.getElementById('participantId2').value;
    const formData = new FormData(this);
    const data = {
        participantId: 'P' + participantId,
        timestamp: new Date().toISOString(),
        part: 'NPS',
        responses: {}
    };

    // Collect all form data
    for (let [key, value] of formData.entries()) {
        data.responses[key] = value;
    }

    // Save to session storage
    const sessionId = sessionManager.getSessionFromURL();
    try {
        sessionManager.saveFormData(sessionId, 'posttest-nps', data);
        console.log('✅ NPS data saved to session:', sessionId);
    } catch (error) {
        console.error('❌ Failed to save to session:', error);
        showNotification('Failed to save data. Please try again.', 'error');
        return;
    }

    // Clear the draft after successful submission
    localStorage.removeItem(`pastree-posttest-nps-draft-P${participantId}`);

    // Mark task as completed
    const part2Tab = document.querySelector('.task-tab[data-task="part2"]');
    part2Tab.classList.add('completed');

    // Show success message
    showNotification('Part 2 (NPS) completed! Moving to Part 3...', 'success');

    // Hide current form content immediately
    const currentForm = document.getElementById('part2-form');
    currentForm.style.opacity = '0.3';
    currentForm.style.pointerEvents = 'none';
    currentForm.style.transition = 'opacity 0.3s ease';

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Switch to Part 3 after delay
    setTimeout(() => {
        document.querySelector('.task-tab[data-task="part3"]').click();
    }, 2000);
});

document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm(this)) {
        return;
    }

    const participantId = document.getElementById('participantId3').value;
    const formData = new FormData(this);
    const data = {
        participantId: 'P' + participantId,
        timestamp: new Date().toISOString(),
        part: 'Feedback',
        responses: {}
    };

    // Collect all form data
    for (let [key, value] of formData.entries()) {
        data.responses[key] = value;
    }

    // Save to session storage
    const sessionId = sessionManager.getSessionFromURL();
    try {
        sessionManager.saveFormData(sessionId, 'posttest-feedback', data);
        console.log('✅ Feedback data saved to session:', sessionId);
    } catch (error) {
        console.error('❌ Failed to save to session:', error);
        showNotification('Failed to save data. Please try again.', 'error');
        return;
    }

    // Clear the draft after successful submission
    localStorage.removeItem(`pastree-posttest-feedback-draft-P${participantId}`);

    // Mark task as completed
    const part3Tab = document.querySelector('.task-tab[data-task="part3"]');
    part3Tab.classList.add('completed');

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show completion modal immediately
    const modal = document.createElement('div');
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        `;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background: white; padding: 40px; border-radius: 12px; text-align: center; max-width: 500px;';

    const title = document.createElement('h2');
    title.style.cssText = 'color: #667eea; font-size: 2.2em; margin-bottom: 20px;';
    title.textContent = '🎉 All Done!';

    const message1 = document.createElement('p');
    message1.style.cssText = 'font-size: 1.1em; margin-bottom: 30px;';
    message1.textContent = 'Thank you for completing the Post-Test Questionnaire!';

    const message2 = document.createElement('p');
    message2.style.cssText = 'margin-bottom: 30px;';
    message2.textContent = 'Your feedback has been saved. Thank you for participating!';

    const viewResultsBtn = document.createElement('button');
    viewResultsBtn.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.2em;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            margin-right: 10px;
        `;
    viewResultsBtn.textContent = 'View Your Results';
    viewResultsBtn.addEventListener('click', () => {
        modal.remove();
        const sessionId = sessionManager.getSessionFromURL();
        window.open(`../results/participant-report.html?session=${sessionId}`, '_blank');
    });

    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
            background: #e0e0e0;
            color: #333;
            border: none;
            padding: 15px 40px;
            font-size: 1.2em;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
        `;
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modalContent.appendChild(title);
    modalContent.appendChild(message1);
    modalContent.appendChild(message2);
    modalContent.appendChild(viewResultsBtn);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
});

// Auto-save functionality for each form
function setupAutoSave(formId, storageKey) {
    const form = document.getElementById(formId);
    const timestampId = formId.replace('Form', '-timestamp');

    setInterval(() => {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        if (Object.keys(data).length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(data));
            updateSaveTimestamp(timestampId);
        }
    }, 30000);
}

function updateSaveTimestamp(timestampId) {
    const timestamp = document.getElementById(timestampId);
    if (timestamp) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        });
        timestamp.querySelector('.time').textContent = timeString;
        timestamp.style.display = 'inline-block';
    }
}

// Setup auto-save for all forms
setupAutoSave('susForm', 'pastree-posttest-sus-draft-P' + (pidFromUrl || ''));
setupAutoSave('npsForm', 'pastree-posttest-nps-draft-P' + (pidFromUrl || ''));
setupAutoSave('feedbackForm', 'pastree-posttest-feedback-draft-P' + (pidFromUrl || ''));

// Restore drafts on page load
function restoreDraft(formId, storageKey) {
    const form = document.getElementById(formId);
    const savedDraft = localStorage.getItem(storageKey);

    if (savedDraft) {
        try {
            const draft = JSON.parse(savedDraft);
            for (let [key, value] of draft) {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'radio') {
                        const radio = form.querySelector(`[name="${key}"][value="${value}"]`);
                        if (radio) radio.checked = true;
                    } else {
                        field.value = value;
                    }
                }
            }
        } catch (e) {
            console.error('Error restoring draft:', e);
        }
    }
}

// Restore drafts for all forms
if (pidFromUrl) {
    restoreDraft('susForm', `pastree-posttest-sus-draft-P${pidFromUrl}`);
    restoreDraft('npsForm', `pastree-posttest-nps-draft-P${pidFromUrl}`);
    restoreDraft('feedbackForm', `pastree-posttest-feedback-draft-P${pidFromUrl}`);
}