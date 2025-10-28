// Post-Task Questions JavaScript - Session-Based Version

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
    console.log('🚀 POST-TASK QUESTIONS SCRIPT LOADED!');

    // Check for session ID in URL
    const sessionId = sessionManager.getSessionFromURL();
    console.log('Post-task form loaded, session ID from URL:', sessionId);

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

    // Auto-populate participant ID from session (hidden field)
    const participantIdField = document.getElementById('participantId');
    if (participantIdField && session.participantId) {
        participantIdField.value = session.participantId;
    }

    // Check if all tasks are completed
    if (session.data.posttask && session.data.posttask.length >= 6) {
        showCompletionMessage();
        return;
    }

    console.log('✅ Session loaded:', sessionId, 'for participant:', session.participantId);
    console.log('📊 Completed tasks:', session.data.posttask ? session.data.posttask.length : 0);
});

// Function to show completion message when all tasks are completed
function showCompletionMessage() {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="header">
                <img src="../images/pastree-logo.svg" alt="Pastree Logo" class="logo">
                <h2>Post-Task Questions</h2>
                <p class="subtitle">Task Performance & Feedback</p>
            </div>
            
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4em; margin-bottom: 20px;">✅</div>
                <h2 style="color: #2ecc71; margin-bottom: 20px;">All Tasks Completed!</h2>
                <p style="font-size: 1.2em; margin-bottom: 30px; color: #666;">
                    You have completed all 6 task questionnaires.
                </p>
                <button onclick="continueToPostTest()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    font-size: 1.2em;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                ">Continue to Post-Test →</button>
            </div>
        `;
    }
}

// Function to continue to post-test
function continueToPostTest() {
    const sessionId = sessionManager.getSessionFromURL();
    sessionManager.navigateToNextForm(sessionId, 'post-test-questionnaire.html');
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
                animation: slideInRight 0.3s ease-out;
            `;
    notification.innerHTML = `${color.icon} ${message}`;

    const style = document.createElement('style');
    style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
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
    titleDiv.style.cssText = 'font-weight: 600; font-size: 1.1em; margin-bottom: 5px; color: #c0392b;';
    titleDiv.textContent = 'Incomplete Form';

    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = 'font-size: 0.95em;';
    messageDiv.textContent = message;

    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(messageDiv);

    const dismissBtn = document.createElement('button');
    dismissBtn.style.cssText = `
                background: transparent;
                border: none;
                font-size: 1.5em;
                color: #c0392b;
                cursor: pointer;
                padding: 0 10px;
                line-height: 1;
            `;
    dismissBtn.title = 'Dismiss';
    dismissBtn.textContent = '×';
    dismissBtn.addEventListener('click', () => banner.remove());

    banner.appendChild(iconDiv);
    banner.appendChild(contentDiv);
    banner.appendChild(dismissBtn);

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
    document.head.appendChild(style);

    // Insert at the top of the current task content
    container.insertBefore(banner, container.firstChild);

    // Scroll to banner
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Check for participant ID in URL
const urlParams = new URLSearchParams(window.location.search);
const pidFromUrl = urlParams.get('pid');
if (pidFromUrl) {
    document.getElementById('participantId').value = pidFromUrl;
    // Load completed tasks for this participant
    loadCompletedTasks(pidFromUrl);
}

// Set up proper tabindex order for all form elements
document.addEventListener('DOMContentLoaded', function () {
    setTabIndexOrder();
});

// Function to set proper tabindex order for all forms
function setTabIndexOrder() {
    let tabIndex = 2; // Start after participant ID (tabindex 1)

    // Get the main form
    const form = document.getElementById('postTaskForm');
    if (!form) return;

    // Get all interactive elements in the form (excluding participant ID and submit button)
    const elements = form.querySelectorAll('input[type="radio"], textarea, select');

    elements.forEach(element => {
        // Skip participant ID fields (already have tabindex 1)
        if (element.id.includes('participantId')) return;

        // Make radio inputs focusable and set tabindex
        if (element.type === 'radio') {
            // Only apply hidden styles to rating-scale radio buttons, not radio-group
            const isInRatingScale = element.closest('.rating-scale');
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
}

// Load and display completed tasks
function loadCompletedTasks(participantId) {
    const completedTasks = JSON.parse(localStorage.getItem(`pastree-completed-tasks-${participantId}`) || '[]');
    completedTasks.forEach(taskId => {
        const tab = document.querySelector(`.task-tab[data-task="${taskId}"]`);
        if (tab && !tab.classList.contains('completed')) {
            tab.classList.add('completed');
        }
    });
}

// Mark task as completed
function markTaskCompleted(participantId, taskId) {
    const completedTasks = JSON.parse(localStorage.getItem(`pastree-completed-tasks-${participantId}`) || '[]');
    if (!completedTasks.includes(taskId)) {
        completedTasks.push(taskId);
        localStorage.setItem(`pastree-completed-tasks-${participantId}`, JSON.stringify(completedTasks));
    }

    const tab = document.querySelector(`.task-tab[data-task="${taskId}"]`);
    if (tab && !tab.classList.contains('completed')) {
        tab.classList.add('completed');
    }
}

// Check completion status when participant ID changes
document.getElementById('participantId').addEventListener('input', function () {
    // Clear error styling
    this.style.borderColor = '';
    this.style.background = '';

    // Load completed tasks for this participant
    if (this.value) {
        // Reset all tabs first
        document.querySelectorAll('.task-tab').forEach(tab => {
            tab.classList.remove('completed');
        });
        loadCompletedTasks(this.value);
    }
});

// Tab switching
const tabs = document.querySelectorAll('.task-tab');
const contents = document.querySelectorAll('.task-content');
const currentTaskSelect = document.getElementById('currentTask');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const taskId = tab.dataset.task;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active content
        contents.forEach(c => {
            c.classList.remove('active');
            // Reset any opacity/pointer-events changes
            c.style.opacity = '';
            c.style.pointerEvents = '';
            c.style.transition = '';
        });
        document.querySelector(`.task-content[data-task="${taskId}"]`).classList.add('active');

        // Update select
        currentTaskSelect.value = taskId;

        // Scroll to top of page smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Sync select with tabs
currentTaskSelect.addEventListener('change', function () {
    const taskId = this.value;
    if (taskId) {
        document.querySelector(`.task-tab[data-task="${taskId}"]`).click();
    }
});


// Clear error styling on all form inputs
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', function () {
        this.style.borderColor = '';
        this.style.background = '';
        // Also clear question container styling for radio buttons
        if (this.type === 'radio') {
            const questionDiv = this.closest('.question');
            if (questionDiv) {
                questionDiv.style.borderLeft = '';
                questionDiv.style.background = '';
            }
        }
        // Remove validation banner when user starts fixing the form
        const validationBanner = document.getElementById('validationBanner');
        if (validationBanner) validationBanner.remove();
    });

    // For radio buttons and checkboxes, use 'change' event
    if (field.type === 'radio' || field.type === 'checkbox') {
        field.addEventListener('change', function () {
            const questionDiv = this.closest('.question');
            if (questionDiv) {
                questionDiv.style.borderLeft = '';
                questionDiv.style.background = '';
            }
            // Remove validation banner when user starts fixing the form
            const validationBanner = document.getElementById('validationBanner');
            if (validationBanner) validationBanner.remove();
        });
    }
});

// Form submission
const postTaskForm = document.getElementById('postTaskForm');
postTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const participantId = document.getElementById('participantId').value;
    const currentTask = document.getElementById('currentTask').value;

    // Participant ID is auto-populated from session, no validation needed

    // Validate only current task's required fields
    const currentTaskContent = document.querySelector(`.task-content[data-task="${currentTask}"]`);
    const requiredFields = currentTaskContent.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    let firstInvalidField = null;

    console.log(`🔍 Validating ${currentTask} - Found ${requiredFields.length} required fields`);

    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = currentTaskContent.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            console.log(`🔍 Radio group ${field.name}: ${isChecked ? '✅' : '❌'} (${radioGroup.length} options)`);
            if (!isChecked) {
                isValid = false;
                const questionDiv = field.closest('.question');
                questionDiv.style.borderLeft = '4px solid #e74c3c';
                questionDiv.style.background = 'rgba(231, 76, 60, .1)';
                if (!firstInvalidField) firstInvalidField = questionDiv;
            }
        } else if (!field.value) {
            console.log(`🔍 Field ${field.name}: ❌ (empty)`);
            isValid = false;
            field.style.borderColor = '#e74c3c';
            field.style.background = 'rgba(231, 76, 60, .1)';
            if (!firstInvalidField) firstInvalidField = field;
        } else {
            console.log(`🔍 Field ${field.name}: ✅ (${field.value})`);
        }
    });

    if (!isValid) {
        console.log(`❌ VALIDATION FAILED for ${currentTask} - preventing submission`);
        showInlineValidation('Please answer all required questions for this task.', currentTaskContent.querySelector('.task-section'));
        // Scroll to first invalid field after a short delay
        setTimeout(() => {
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 400);
        return;
    }

    console.log(`✅ VALIDATION PASSED for ${currentTask} - proceeding with submission`);

    const formData = new FormData(this);
    const data = {
        participantId: participantId,
        task: currentTask,
        timestamp: new Date().toISOString(),
        responses: {}
    };

    // Collect form data - only from the current task
    for (let [key, value] of formData.entries()) {
        // Only include fields that belong to the current task
        if (key.startsWith(currentTask + '-') || key === currentTask + '-success') {
            data.responses[key] = value;
        }
    }

    console.log(`📊 Saving data for ${currentTask}:`, data.responses);

    // Save to session storage
    const sessionId = sessionManager.getSessionFromURL();
    try {
        sessionManager.saveFormData(sessionId, 'posttask', data);
        console.log('✅ Post-task data saved to session:', sessionId);
    } catch (error) {
        console.error('❌ Failed to save to session:', error);
        showNotification('Failed to save data. Please try again.', 'error');
        return;
    }

    // Mark task as completed
    markTaskCompleted(participantId, currentTask);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
                color: white;
                padding: 20px 30px;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(46, 204, 113, 0.4);
                z-index: 10000;
                font-size: 1.1em;
                font-weight: 600;
                animation: slideIn 0.3s ease-out;
            `;
    successMessage.innerHTML = `✅ ${currentTask.toUpperCase()} saved!`;
    document.body.appendChild(successMessage);

    // Hide current task content immediately
    if (currentTaskContent) {
        currentTaskContent.style.opacity = '0.3';
        currentTaskContent.style.pointerEvents = 'none';
        currentTaskContent.style.transition = 'opacity 0.3s ease';
    }

    // Scroll to top immediately after form submission
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add animation
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

    // Move to next task after delay
    setTimeout(() => {
        successMessage.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => successMessage.remove(), 300);

        const taskNumber = parseInt(currentTask.replace('task', ''));
        if (taskNumber < 6) {
            const nextTask = `task${taskNumber + 1}`;

            // Clear only the current task's fields
            const currentTaskFields = document.querySelector(`.task-content[data-task="${currentTask}"]`);
            if (currentTaskFields) {
                currentTaskFields.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
                currentTaskFields.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
            }

            // Switch to next task
            currentTaskSelect.value = nextTask;
            document.querySelector(`.task-tab[data-task="${nextTask}"]`).click();

            // Scroll to top after a brief delay to ensure content is switched
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        } else {
            // Show completion modal
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
            title.style.cssText = 'color: #2ecc71; font-size: 2.5em; margin-bottom: 20px;';
            title.textContent = '🎉 All Tasks Complete!';

            const message1 = document.createElement('p');
            message1.style.cssText = 'font-size: 1.2em; margin-bottom: 30px;';
            message1.textContent = "Great work! You've completed all 6 tasks.";

            const message2 = document.createElement('p');
            message2.style.cssText = 'margin-bottom: 30px;';
            message2.textContent = 'Ready to move to the final questionnaire?';

            const continueBtn = document.createElement('button');
            continueBtn.style.cssText = `
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
            continueBtn.textContent = 'Continue to Post-Test →';
            continueBtn.addEventListener('click', () => {
                modal.remove();
                // Navigate to post-test questionnaire with session ID
                sessionManager.navigateToNextForm(sessionId, 'post-test-questionnaire.html');
            });

            const stayBtn = document.createElement('button');
            stayBtn.style.cssText = `
                        background: #e0e0e0;
                        color: #333;
                        border: none;
                        padding: 15px 40px;
                        font-size: 1.2em;
                        font-weight: 600;
                        border-radius: 8px;
                        cursor: pointer;
                    `;
            stayBtn.textContent = 'Stay Here';
            stayBtn.addEventListener('click', () => modal.remove());

            modalContent.appendChild(title);
            modalContent.appendChild(message1);
            modalContent.appendChild(message2);
            modalContent.appendChild(continueBtn);
            modalContent.appendChild(stayBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }
    }, 2000);

});

// Auto-save
setInterval(() => {
    const formData = new FormData(document.getElementById('postTaskForm'));
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    if (Object.keys(data).length > 0) {
        localStorage.setItem('pastree-posttask-draft', JSON.stringify(data));

        // Update timestamp for current active task
        const currentTask = document.getElementById('currentTask').value;
        if (currentTask) {
            updateSaveTimestamp(currentTask);
        }
    }
}, 30000);

// Function to update save timestamp
function updateSaveTimestamp(taskId) {
    const timestamp = document.getElementById(`${taskId}-timestamp`);
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
