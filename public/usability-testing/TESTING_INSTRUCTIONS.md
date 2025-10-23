# 🌳 Pastree Usability Testing - Setup Instructions

## For Participants

### Step 1: Install the Pastree Extension

1. **Download and install** the Pastree browser extension (you should receive this separately)
2. **Verify installation**: You should see the Pastree icon (🌳) in your browser toolbar
3. **Test it works**: Click the Pastree icon to make sure the clipboard manager opens

### Step 2: Open the Testing Portal

1. **Extract this ZIP file** to a folder on your computer
2. **Open `START_TESTING.html`** in your browser
   - Right-click the file → "Open with" → Choose your browser (Chrome, Firefox, etc.)
   - OR simply double-click the file

### Step 3: Complete the Testing

1. **Follow the on-screen instructions** in the START_TESTING.html page
2. **Start with Pre-Test Questionnaire** (opens in a new tab)
3. **Complete the tasks** using the actual Pastree extension (click the 🌳 icon in your toolbar)
4. **Answer Post-Task Questions** after each task
5. **Finish with Post-Test Questionnaire** at the end

### Important Notes

✅ **Keep START_TESTING.html open** - Use it to navigate between forms  
✅ **Use the real Pastree extension** - Click the 🌳 icon to access the clipboard manager  
✅ **Forms auto-save** - Your progress is saved every 30 seconds  
✅ **No internet required** - All forms work offline  

### Troubleshooting

**Q: I don't see the Pastree icon in my toolbar**  
A: The extension isn't installed. Ask the test administrator for the extension installation file.

**Q: Forms won't open**  
A: Make sure you extracted all files from the ZIP. The `forms/` folder must be in the same location as START_TESTING.html.

**Q: I closed a form by accident**  
A: Just click the button in START_TESTING.html again. Your progress is auto-saved!

---

## For Test Administrators

### Distribution Package Contents

```
usability-testing/
├── START_TESTING.html          # Main testing portal (participants open this)
├── TESTING_INSTRUCTIONS.md     # This file
├── forms/
│   ├── index.html
│   ├── pre-test-questionnaire.html
│   ├── pre-test-questionnaire.js
│   ├── post-task-questions.html
│   ├── post-task-questions.js
│   ├── post-test-questionnaire.html
│   └── post-test-questionnaire.js
└── images/
    └── (logo files)
```

### What to Send Participants

**Option A: Two separate files**
1. `pastree-extension.zip` - The actual Pastree browser extension
2. `pastree-usability-testing.zip` - This testing forms package

**Option B: Combined package**
1. Create a folder with both the extension and testing forms
2. Include setup instructions

### Setup Process

1. Participant installs the Pastree extension first
2. Participant extracts the testing forms ZIP
3. Participant opens START_TESTING.html
4. Participant completes testing using the real extension

### Data Collection

- All form data is saved as JSON files downloaded to participant's computer
- Forms auto-save drafts to browser localStorage every 30 seconds
- File naming: `pastree-{form-type}-P{participant-id}-{timestamp}.json`

---

**Need help?** Contact the test administrator.

