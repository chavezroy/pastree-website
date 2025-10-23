// Pre-Test Questionnaire JavaScript - Session-Based Version

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
    console.log('🚀 PRE-TEST QUESTIONNAIRE SCRIPT LOADED!');

    // Check for session ID in URL
    console.log('Current URL:', window.location.href);
    console.log('URL search params:', window.location.search);

    const sessionId = sessionManager.getSessionFromURL();
    console.log('Pre-test form loaded, session ID from URL:', sessionId);

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

    // Check if form is already completed
    if (session.data.pretest) {
        showCompletionMessage();
        return;
    }

    console.log('✅ Session loaded:', sessionId, 'for participant:', session.participantId);
});

// Function to show completion message when form is already completed
function showCompletionMessage() {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="header">
                <img src="../images/PastreeLogo-drk.svg" alt="Pastree Logo" class="logo">
                <h2>Pre-Test Questionnaire</h2>
                <p class="subtitle">Background Information & Demographics</p>
            </div>
            
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4em; margin-bottom: 20px;">✅</div>
                <h2 style="color: #2ecc71; margin-bottom: 20px;">Already Completed!</h2>
                <p style="font-size: 1.2em; margin-bottom: 30px; color: #666;">
                    You have already completed the pre-test questionnaire.
                </p>
                <button onclick="continueToTasks()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    font-size: 1.2em;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                ">Continue to Tasks →</button>
            </div>
        `;
    }
}

// Function to continue to tasks
function continueToTasks() {
    const sessionId = sessionManager.getSessionFromURL();
    sessionManager.navigateToNextForm(sessionId, 'post-task-questions.html');
}

// Function to show inline validation banner
function showInlineValidation(message) {
    console.log('🚨 showInlineValidation() called with message:', message);

    // Remove existing banner if any
    const existingBanner = document.querySelector('.validation-banner');
    console.log('Existing banner found:', !!existingBanner);
    if (existingBanner) {
        existingBanner.remove();
        console.log('Removed existing banner');
    }

    // Create validation banner
    console.log('Creating new validation banner...');
    const banner = document.createElement('div');
    banner.className = 'validation-banner';
    banner.style.cssText = `
        position: sticky;
        top: 0;
        background: linear-gradient(135deg, rgba(231, 76, 60, 0.95) 0%, rgba(192, 57, 43, 0.95) 100%);
        border: 2px solid #c0392b;
        border-radius: 8px;
        padding: 20px;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
        animation: slideDown 0.3s ease-out;
        z-index: 1000;
        color: white;
    `;
    console.log('Banner element created:', banner);

    const iconDiv = document.createElement('div');
    iconDiv.style.cssText = 'font-size: 2em; color: white;';
    iconDiv.textContent = '⚠️';

    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = 'flex: 1;';

    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = 'font-weight: 600; font-size: 1.1em; margin-bottom: 5px; color: white;';
    titleDiv.textContent = 'Incomplete Form';

    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = 'font-size: 0.95em; color: rgba(255, 255, 255, 0.95);';
    messageDiv.textContent = message;

    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(messageDiv);

    const dismissBtn = document.createElement('button');
    dismissBtn.style.cssText = `
        background: transparent;
        border: none;
        font-size: 1.5em;
        color: white;
        cursor: pointer;
        padding: 0 10px;
        line-height: 1;
    `;
    dismissBtn.title = 'Dismiss';
    dismissBtn.textContent = '×';
    dismissBtn.addEventListener('click', () => {
        console.log('Dismiss button clicked');
        banner.remove();
    });

    banner.appendChild(iconDiv);
    banner.appendChild(contentDiv);
    banner.appendChild(dismissBtn);
    console.log('Banner content assembled');

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Insert at the top of the form
    const form = document.getElementById('preTestForm');
    console.log('Form element:', form);
    console.log('Form first child:', form?.firstChild);

    if (form) {
        form.insertBefore(banner, form.firstChild);
        console.log('✅ Banner inserted into form');
        console.log('Banner now in DOM:', document.querySelector('.validation-banner'));

        // Scroll to top of form to show banner
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Scrolled to form');
    } else {
        console.error('❌ Form element not found!');
    }
}

// Function to validate required fields
function validateForm() {
    console.log('🔍 validateForm() called');

    const errors = [];
    let firstInvalidField = null;

    // Clear previous error styling
    console.log('🧹 Clearing previous error styling...');
    document.querySelectorAll('.validation-banner').forEach(el => el.remove());
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '';
        field.style.background = '';
    });

    // Clear all question container styling
    const questionContainers = document.querySelectorAll('.question');
    console.log('Found .question containers:', questionContainers.length);
    questionContainers.forEach(container => {
        container.style.borderColor = '';
        container.style.background = '';
        container.style.border = '';
    });

    // Clear participant-id container styling
    const pidContainer = document.querySelector('.participant-id');
    console.log('Found .participant-id container:', !!pidContainer);
    if (pidContainer) {
        pidContainer.style.borderColor = '';
        pidContainer.style.background = '';
        pidContainer.style.border = '';
        pidContainer.style.padding = '';
        pidContainer.style.borderRadius = '';
    }

    // Clear all radio option label styling
    const radioLabels = document.querySelectorAll('label.radio-option');
    console.log('Found .radio-option labels:', radioLabels.length);
    radioLabels.forEach(label => {
        label.style.borderColor = '';
        label.style.background = '';
    });

    // Check participant ID
    // Participant ID is hidden and auto-populated, no validation needed
    console.log('✅ Participant ID is auto-populated from session');

    // Check required radio button groups
    console.log('📻 Checking radio button groups...');
    const radioGroups = [
        { name: 'age', label: 'Age Range' },
        { name: 'computerUsage', label: 'Computer Usage' },
        { name: 'techProficiency', label: 'Technical Proficiency' },
        { name: 'copyPasteFreq', label: 'Copy/Paste Frequency' },
        { name: 'clipboardManagerExp', label: 'Clipboard Manager Experience' }
    ];

    radioGroups.forEach(group => {
        const radios = document.querySelectorAll(`input[name="${group.name}"]`);
        const isChecked = Array.from(radios).some(radio => radio.checked);

        console.log(`Checking ${group.name}:`, {
            found: radios.length,
            checked: isChecked
        });

        if (!isChecked) {
            console.log(`❌ ${group.label} is empty!`);
            errors.push(group.label);

            // Highlight the parent .question container
            const questionContainer = radios[0]?.closest('.question');
            console.log(`Found .question container for ${group.name}:`, !!questionContainer);
            if (questionContainer) {
                questionContainer.style.borderColor = '#e74c3c';
                questionContainer.style.background = 'rgba(231, 76, 60, .1)';
                questionContainer.style.border = '2px solid #e74c3c';
                console.log(`Applied error styles to .question container for ${group.name}`);
            }

            // Also highlight all radio option labels
            radios.forEach(radio => {
                const label = radio.closest('label.radio-option');
                if (label) {
                    label.style.borderColor = '#e74c3c';
                    label.style.background = 'rgba(231, 76, 60, .1)';
                }
            });
            console.log(`Highlighted ${radios.length} radio option labels`);

            if (!firstInvalidField) firstInvalidField = radios[0];
        } else {
            console.log(`✅ ${group.label} is filled`);
        }
    });

    // Check required select fields
    const browser = document.querySelector('select[name="browser"]');
    if (!browser.value) {
        errors.push('Primary Browser');
        browser.style.borderColor = '#e74c3c';
        browser.style.background = 'rgba(231, 76, 60, .1)';

        // Highlight the parent .question container
        const questionContainer = browser.closest('.question');
        if (questionContainer) {
            questionContainer.style.borderColor = '#e74c3c';
            questionContainer.style.background = 'rgba(231, 76, 60, .1)';
            questionContainer.style.border = '2px solid #e74c3c';
        }

        if (!firstInvalidField) firstInvalidField = browser;
    }

    // If there are errors, show validation banner
    console.log('🚨 Total errors found:', errors.length);
    console.log('Error list:', errors);

    if (errors.length > 0) {
        const message = errors.length === 1
            ? `Please complete: ${errors[0]}`
            : `Please complete ${errors.length} required fields: ${errors.slice(0, 3).join(', ')}${errors.length > 3 ? '...' : ''}`;

        console.log('💬 Showing validation banner with message:', message);
        showInlineValidation(message);

        // Focus on first invalid field
        if (firstInvalidField) {
            console.log('🎯 Focusing on first invalid field:', firstInvalidField);
            setTimeout(() => {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }

        console.log('❌ Returning false - form is invalid');
        return false;
    }

    console.log('✅ No errors - form is valid');
    return true;
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

// Check if script is loaded
console.log('✅ pre-test-questionnaire.js loaded!');
console.log('Document ready state:', document.readyState);
console.log('Current time:', new Date().toISOString());

// Test basic functionality
console.log('Testing basic DOM access...');
console.log('document.body exists:', !!document.body);
console.log('document.getElementById exists:', typeof document.getElementById);

// Check if form exists
const formCheck = document.getElementById('preTestForm');
console.log('Form element found:', !!formCheck);
if (!formCheck) {
    console.error('❌ Form with id "preTestForm" not found!');
    console.log('Available elements with IDs:');
    const allElements = document.querySelectorAll('[id]');
    allElements.forEach(el => console.log('- ID:', el.id, 'Tag:', el.tagName));
} else {
    console.log('Form details:', {
        id: formCheck.id,
        tagName: formCheck.tagName,
        children: formCheck.children.length
    });

    // Test if we can find the submit button
    const submitBtn = formCheck.querySelector('button[type="submit"]');
    console.log('Submit button found:', !!submitBtn);
    if (submitBtn) {
        console.log('Submit button details:', {
            type: submitBtn.type,
            text: submitBtn.textContent,
            class: submitBtn.className
        });
    }
}

// Add event listener with more debugging
const form = document.getElementById('preTestForm');
console.log('Attempting to add submit event listener to form:', form);

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        console.log('🚀 FORM SUBMIT TRIGGERED');
        console.log('Form element:', this);
        console.log('Form ID:', this.id);
        console.log('Event object:', e);

        // Validate all required fields
        console.log('📋 Starting validation...');
        const isValid = validateForm();
        console.log('Validation result:', isValid);

        if (!isValid) {
            console.log('❌ Validation failed - stopping submission');
            return;
        }

        console.log('✅ Validation passed - continuing with submission');

        const participantId = document.getElementById('participantId').value;

        const formData = new FormData(this);
        const data = {
            participantId: 'P' + participantId,
            timestamp: new Date().toISOString(),
            responses: {}
        };

        // Collect all form data
        for (let [key, value] of formData.entries()) {
            if (key === 'useCases') {
                if (!data.responses[key]) {
                    data.responses[key] = [];
                }
                data.responses[key].push(value);
            } else {
                data.responses[key] = value;
            }
        }

        // Save to session storage
        const sessionId = sessionManager.getSessionFromURL();
        try {
            sessionManager.saveFormData(sessionId, 'pretest', data);
            console.log('✅ Pre-test data saved to session:', sessionId);
        } catch (error) {
            console.error('❌ Failed to save to session:', error);
            showNotification('Failed to save data. Please try again.', 'error');
            return;
        }

        // Clear the participant-specific draft after successful submission
        localStorage.removeItem(`pastree-pretest-draft-P${participantId}`);

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
        successMessage.innerHTML = `✅ Pre-Test Questionnaire saved! Redirecting to tasks...`;
        document.body.appendChild(successMessage);

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

        // Show modal after delay
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => successMessage.remove(), 300);

            // Show transition modal
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
            modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
        `;

            const title = document.createElement('h2');
            title.style.cssText = 'color: #667eea; font-size: 2.2em; margin-bottom: 20px;';
            title.textContent = '✅ Profile Complete!';

            const message1 = document.createElement('p');
            message1.style.cssText = 'font-size: 1.1em; margin-bottom: 30px;';
            message1.textContent = 'Your background information has been saved.';

            const message2 = document.createElement('p');
            message2.style.cssText = 'margin-bottom: 30px;';
            message2.textContent = 'Ready to start the task testing?';

            const beginBtn = document.createElement('button');
            beginBtn.style.cssText = `
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
            beginBtn.textContent = 'Begin Tasks →';
            beginBtn.addEventListener('click', () => {
                modal.remove();
                // Navigate to post-task questions with session ID
                sessionManager.navigateToNextForm(sessionId, 'post-task-questions.html');
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
            stayBtn.addEventListener('click', () => {
                modal.remove();
            });

            modalContent.appendChild(title);
            modalContent.appendChild(message1);
            modalContent.appendChild(message2);
            modalContent.appendChild(beginBtn);
            modalContent.appendChild(stayBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }, 2000);
    });
    console.log('✅ Submit event listener added successfully');

    // Also add direct click listener to submit button as backup
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        console.log('Adding backup click listener to submit button...');
        submitBtn.addEventListener('click', function (e) {
            console.log('🔥 SUBMIT BUTTON CLICKED DIRECTLY!');
            console.log('Button element:', this);
            console.log('Event:', e);

            // Prevent default and trigger form submit
            e.preventDefault();
            console.log('Triggering form submit event...');
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        });
        console.log('✅ Backup click listener added to submit button');
    } else {
        console.error('❌ Submit button not found for backup listener');
    }
} else {
    console.error('❌ Cannot add event listener - form not found');
}

// Add a global test function for manual testing
window.testValidation = function () {
    console.log('🧪 MANUAL VALIDATION TEST TRIGGERED');
    console.log('Calling validateForm() directly...');
    const result = validateForm();
    console.log('Validation result:', result);
    return result;
};

console.log('💡 You can also test validation manually by typing: testValidation()');

// Auto-save to localStorage every 30 seconds (participant-specific)
setInterval(() => {
    const participantId = document.getElementById('participantId').value;
    if (!participantId) return; // Don't save until participant ID is entered

    const formData = new FormData(document.getElementById('preTestForm'));
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    if (Object.keys(data).length > 0) {
        localStorage.setItem(`pastree-pretest-draft-P${participantId}`, JSON.stringify(data));
        console.log(`Auto-saved for Participant P${participantId}`);
        updateSaveTimestamp();
    }
}, 30000);

// Function to update save timestamp
function updateSaveTimestamp() {
    const timestamp = document.getElementById('pretest-timestamp');
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

// Restore from auto-save when participant ID is entered
document.getElementById('participantId').addEventListener('input', function () {
    // Clear error styling
    this.style.borderColor = '';
    this.style.background = '';

    // Clear parent .participant-id container styling
    const pidContainer = this.closest('.participant-id');
    if (pidContainer) {
        pidContainer.style.borderColor = '';
        pidContainer.style.background = '';
        pidContainer.style.border = '';
        pidContainer.style.padding = '';
        pidContainer.style.borderRadius = '';
    }

    // Remove validation banner when user starts fixing
    const banner = document.querySelector('.validation-banner');
    if (banner) {
        banner.remove();
    }

    const participantId = this.value;
    if (!participantId) return;

    const draftKey = `pastree-pretest-draft-P${participantId}`;
    const draft = localStorage.getItem(draftKey);

    if (draft && !this.dataset.restored) {
        // Show custom modal instead of confirm()
        showRestoreModal(participantId, draft);
        // Mark as prompted so we don't ask again
        this.dataset.restored = 'true';
    }
});

// Clear error styling on all form inputs
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', function () {
        this.style.borderColor = '';
        this.style.background = '';

        // Clear parent question container styling
        const questionContainer = this.closest('.question');
        if (questionContainer) {
            questionContainer.style.borderColor = '';
            questionContainer.style.background = '';
            questionContainer.style.border = '';
        }

        // Also clear parent label styling for radio/checkbox
        const label = this.closest('label');
        if (label) {
            label.style.borderColor = '';
            label.style.background = '';
        }

        // Remove validation banner when user starts fixing
        const banner = document.querySelector('.validation-banner');
        if (banner) {
            banner.remove();
        }
    });

    // For radio buttons and checkboxes, use 'change' event
    if (field.type === 'radio' || field.type === 'checkbox') {
        field.addEventListener('change', function () {
            this.style.borderColor = '';
            this.style.background = '';

            // Clear parent question container styling
            const questionContainer = this.closest('.question');
            if (questionContainer) {
                questionContainer.style.borderColor = '';
                questionContainer.style.background = '';
                questionContainer.style.border = '';
            }

            // Clear all labels in the same radio group
            const name = this.name;
            if (name) {
                document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                    const label = radio.closest('label.radio-option');
                    if (label) {
                        label.style.borderColor = '';
                        label.style.background = '';
                    }
                });
            }

            // Remove validation banner when user starts fixing
            const banner = document.querySelector('.validation-banner');
            if (banner) {
                banner.remove();
            }
        });
    }
});

// Function to show restore draft modal
function showRestoreModal(participantId, draftData) {
    const modal = document.createElement('div');
    modal.id = 'restoreModal';
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
        animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease-out;
    `;

    const icon = document.createElement('div');
    icon.style.cssText = 'font-size: 3em; margin-bottom: 20px;';
    icon.textContent = '📋';

    const title = document.createElement('h2');
    title.style.cssText = 'color: #667eea; font-size: 2em; margin-bottom: 20px;';
    title.textContent = 'Previous Draft Found';

    const message1 = document.createElement('p');
    message1.style.cssText = 'font-size: 1.1em; color: #2c3e50; margin-bottom: 10px;';
    message1.innerHTML = `We found an unfinished questionnaire for <strong>Participant P${participantId}</strong>.`;

    const message2 = document.createElement('p');
    message2.style.cssText = 'font-size: 0.95em; color: #7f8c8d; margin-bottom: 30px;';
    message2.textContent = 'Would you like to continue where you left off?';

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 15px; justify-content: center;';

    const restoreBtn = document.createElement('button');
    restoreBtn.id = 'restoreBtn';
    restoreBtn.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.1em;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    `;
    restoreBtn.textContent = '✓ Restore Draft';

    const startFreshBtn = document.createElement('button');
    startFreshBtn.id = 'startFreshBtn';
    startFreshBtn.style.cssText = `
        background: #e0e0e0;
        color: #333;
        border: none;
        padding: 15px 30px;
        font-size: 1.1em;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
    `;
    startFreshBtn.textContent = '✗ Start Fresh';

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        #restoreBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        #startFreshBtn:hover {
            background: #d0d0d0;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    buttonContainer.appendChild(restoreBtn);
    buttonContainer.appendChild(startFreshBtn);

    modalContent.appendChild(icon);
    modalContent.appendChild(title);
    modalContent.appendChild(message1);
    modalContent.appendChild(message2);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Restore button handler
    restoreBtn.addEventListener('click', () => {
        const data = JSON.parse(draftData);
        for (let [key, value] of Object.entries(data)) {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'radio' || element.type === 'checkbox') {
                    const radio = document.querySelector(`[name="${key}"][value="${value}"]`);
                    if (radio) radio.checked = true;
                } else {
                    element.value = value;
                }
            }
        }
        console.log(`Draft restored for Participant P${participantId}`);
        modal.remove();

        // Show success notification
        showNotification('Draft restored successfully!', 'success');
    });

    // Start fresh button handler
    startFreshBtn.addEventListener('click', () => {
        // Clear the draft
        localStorage.removeItem(`pastree-pretest-draft-P${participantId}`);
        console.log(`Draft cleared for Participant P${participantId}`);
        modal.remove();

        // Show notification
        showNotification('Starting fresh - previous draft deleted', 'info');
    });
}

