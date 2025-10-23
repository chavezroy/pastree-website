# Pastree Extension - Usability Testing Framework

## Overview

This folder contains a complete, professional usability testing framework for the Pastree clipboard manager extension. The framework is designed for **unmoderated remote testing** with **5 first-time users** and includes both **qualitative and quantitative data collection** methods.

---

## Quick Start Guide

### 🚀 Modern Workflow (Recommended)

**For Participants**:
1. Open `forms/index.html` in a web browser
2. Complete the **Pre-Test Questionnaire** form
3. Work through the 6 tasks, completing **Post-Task Questions** after each
4. Submit the **Post-Test Questionnaire** when finished
5. All data automatically downloads as JSON files

**For Test Administrators**:
1. Send participants the `forms/index.html` link
2. Collect JSON files from all participants
3. Open `results/dashboard.html` to view aggregate analytics
4. Generate individual reports with `results/participant-report.html`
5. Export findings as PDF, CSV, or JSON

### 📋 Traditional Workflow (Manual)

**Before Testing**:
1. Read `USABILITY_TEST_MASTER.md` for complete overview
2. Review `TEST_SCRIPT.md` for session facilitation
3. Prepare `PARTICIPANT_INSTRUCTIONS.md` for participants
4. Print `CONSENT_FORM.md` for signatures
5. Have `TASK_COMPLETION_SHEET.md` ready for each session

**During Testing**:
1. Follow `TEST_SCRIPT.md` step-by-step
2. Use `OBSERVATION_NOTES_TEMPLATE.md` to record observations
3. Ask `POST_TASK_QUESTIONS.md` after each task
4. Complete `POST_TEST_QUESTIONNAIRE.md` at end

**After Testing**:
1. Use `DATA_ANALYSIS_TEMPLATE.md` to analyze results
2. Create `FINDINGS_REPORT_TEMPLATE.md` with insights
3. Share findings with team

---

## File Structure

### 🎯 Interactive Tools (NEW!)

#### `forms/` - Data Collection Forms
- **`index.html`** - Forms portal with navigation
- **`pre-test-questionnaire.html`** - Interactive demographics form
- **`post-task-questions.html`** - Task feedback form (all 6 tasks)
- **`post-test-questionnaire.html`** - SUS, NPS, satisfaction form

**Features**:
- ✅ Auto-save every 30 seconds
- ✅ Progress bars
- ✅ Field validation
- ✅ JSON download on submit
- ✅ Mobile-responsive design

#### `results/` - Data Analysis & Visualization
- **`index.html`** - Results portal navigation
- **`dashboard.html`** - Aggregate analytics with Chart.js
- **`participant-report.html`** - Individual participant reports
- **`data-processor.js`** - JavaScript data processing utilities
- **`README.md`** - Results documentation

**Dashboard Features**:
- 📊 SUS & NPS score analysis
- 📈 Task performance metrics
- 👥 Demographics breakdown
- 💡 Qualitative insights
- 📥 Export to PDF/CSV/JSON

### 📋 Master Document
- **`USABILITY_TEST_MASTER.md`** - Complete testing guide (all-in-one reference)

### 📝 Test Administration
- **`TEST_SCRIPT.md`** - Moderator guide for running sessions
- **`PARTICIPANT_INSTRUCTIONS.md`** - Setup and think-aloud guidance for participants
- **`CONSENT_FORM.md`** - Participant agreement and data usage consent

### 🎯 Task-Based Testing
- **`TASK_SCENARIOS.md`** - 6 realistic task scenarios with success criteria
- **`TASK_COMPLETION_SHEET.md`** - Tracking sheet for each participant's tasks

### 📊 Data Collection (Manual Templates)
- **`PRE_TEST_QUESTIONNAIRE.md`** - Demographics and background (5-10 min)
- **`POST_TASK_QUESTIONS.md`** - Immediate feedback after each task (1-2 min per task)
- **`POST_TEST_QUESTIONNAIRE.md`** - SUS, NPS, overall satisfaction (10 min)
- **`OBSERVATION_NOTES_TEMPLATE.md`** - Observer notes during testing

### 📈 Analysis & Reporting
- **`DATA_ANALYSIS_TEMPLATE.md`** - Quantitative metrics aggregation
- **`FINDINGS_REPORT_TEMPLATE.md`** - Professional results presentation

### 📁 Data Storage
- **`data/participant-1/`** through **`data/participant-5/`** - Store individual participant data

---

## Test Overview

### Participants
- **Number**: 5 first-time users
- **Profile**: No prior clipboard manager experience
- **Recruitment**: Regular copy/paste users (5+ times/day)

### Duration
- **Total Time**: 40-45 minutes per participant
- **Pre-Test**: 5 minutes
- **Installation**: 3 minutes
- **Tasks**: 25 minutes (6 tasks)
- **Post-Test**: 10 minutes
- **Debrief**: 2 minutes

### Tasks Covered
1. **Installation & First Use** (5 min)
2. **Core Clipboard Operations** (5 min)
3. **List Management** (5 min)
4. **Search & Discovery** (3 min)
5. **Settings & Customization** (4 min)
6. **Context Menu & Shortcuts** (3 min)

### Metrics Collected

**Quantitative**:
- Task success rates (%)
- Task completion times (minutes)
- Ease ratings (1-5 scale)
- System Usability Scale (SUS) score (0-100)
- Net Promoter Score (NPS) (-100 to 100)
- Overall satisfaction (1-5 scale)

**Qualitative**:
- Think-aloud observations
- Pain points and confusion
- Feature discoverability
- User expectations vs. reality
- Feature requests
- Open-ended feedback

---

## Testing Workflow

### Phase 1: Preparation (Before Testing)

1. **Recruit Participants**
   - Screen for qualifications
   - Schedule 5 sessions
   - Send confirmation emails with setup instructions

2. **Prepare Materials**
   - [ ] Extension build (dist-chrome or dist-firefox)
   - [ ] Screen recording software links
   - [ ] All questionnaires printed/digital
   - [ ] Consent forms ready
   - [ ] Observation templates prepared

3. **Technical Setup**
   - [ ] Test extension installation process
   - [ ] Verify download links work
   - [ ] Prepare backup recording options

### Phase 2: Testing Sessions (5 Sessions)

**For Each Participant**:

1. **Welcome & Consent** (5 min)
   - Review consent form
   - Complete pre-test questionnaire
   - Verify participant qualifies

2. **Installation** (3 min)
   - Start screen recording
   - Guide through extension installation
   - Observe first impressions

3. **Task Testing** (25 min)
   - Present each task scenario
   - Observe and take notes
   - Ask post-task questions
   - Record times and success

4. **Post-Test Survey** (10 min)
   - SUS questions (10 items)
   - NPS question
   - Overall satisfaction questions
   - Open-ended feedback

5. **Debrief** (2 min)
   - Thank participant
   - Answer questions
   - Confirm compensation

### Phase 3: Analysis (After All Sessions)

1. **Data Entry** (2-3 hours)
   - Enter quantitative data into analysis template
   - Calculate SUS and NPS scores
   - Aggregate task metrics

2. **Qualitative Analysis** (4-6 hours)
   - Review all recordings
   - Identify common themes
   - Extract key quotes
   - Categorize issues by severity

3. **Report Creation** (4-6 hours)
   - Complete findings report
   - Create visualizations
   - Prioritize recommendations
   - Prepare presentation

### Phase 4: Action (After Analysis)

1. **Share Results**
   - Present to product team
   - Discuss with development
   - Get stakeholder input

2. **Prioritize Fixes**
   - Critical: Must fix before launch
   - Major: Should fix before launch
   - Minor: Nice to have

3. **Implement Changes**
   - Fix critical bugs
   - Address usability issues
   - Update documentation

4. **Follow-Up** (Optional)
   - Conduct validation testing
   - Test specific fixes
   - Verify improvements

---

## Success Criteria

### Minimum Viable Results

For the product to be considered "ready for launch":

| Metric | Target | Threshold |
|--------|--------|-----------|
| SUS Score | ≥ 70 | 60 minimum |
| NPS Score | > 0 | -20 minimum |
| Task Success Rate | ≥ 80% | 70% minimum |
| Overall Satisfaction | ≥ 4.0/5 | 3.5 minimum |
| Critical Bugs | 0 | 0 (non-negotiable) |

### Action Thresholds

- **If SUS < 60**: Major usability overhaul needed
- **If task success < 70%**: Core features need redesign
- **If 3+ participants hit same issue**: Must be fixed
- **If critical bug found**: Immediate fix required

---

## Tips for Success

### For Test Administrators

✅ **Do**:
- Stay neutral and non-leading
- Let participants struggle briefly (valuable data)
- Record everything - you can't have too many notes
- Ask "what" and "why" questions
- Be patient and encouraging

❌ **Don't**:
- Give direct answers during tasks
- Show disappointment at negative feedback
- Rush participants through tasks
- Explain features unless asked
- Defend design choices

### For Participants

✅ **Do**:
- Think aloud constantly
- Be completely honest
- Work at your natural pace
- Share both positive and negative feedback
- Ask questions after tasks

❌ **Don't**:
- Try to be "right" - there are no wrong answers
- Hold back criticism to be polite
- Work faster than normal to finish quickly

---

## Customization Guide

### Adapting for Your Needs

**Fewer/More Participants**:
- Minimum: 3-5 participants reveals 80% of issues
- Optimal: 5-8 participants for first-time testing
- Extended: 10+ for diverse user segments

**Different User Types**:
- Modify pre-test questionnaire screening
- Adjust task scenarios for expertise level
- Create separate analysis by segment

**Remote vs. In-Person**:
- In-person: Use live observation instead of recording
- Remote moderated: Add video call coordination
- Remote unmoderated: Provide clearer written instructions

**Different Time Constraints**:
- Shorter (20-30 min): Reduce to 3-4 core tasks
- Longer (60 min): Add more exploratory tasks
- Split sessions: Part 1 (install/tasks), Part 2 (feedback)

---

## Data Storage & Privacy

### File Organization

```
usability-testing/
└── data/
    ├── participant-1/
    │   ├── screen-recording.mp4
    │   ├── consent-form.pdf
    │   ├── pre-test-responses.md
    │   ├── task-notes.md
    │   └── post-test-responses.md
    ├── participant-2/
    │   └── [same structure]
    └── ...
```

### Privacy & Security

- **Anonymize data**: Use P1, P2, P3 instead of names
- **Secure storage**: Password-protect sensitive files
- **Limited access**: Only research team sees raw data
- **Delete recordings**: After analysis per consent form
- **Aggregate reporting**: Never identify individuals in reports

---

## Deliverables Checklist

### After Each Session
- [ ] Screen recording saved securely
- [ ] Consent form signed and filed
- [ ] Observation notes completed
- [ ] Task completion sheet filled
- [ ] Participant thanked and compensated

### After All Sessions
- [ ] All data entered into analysis template
- [ ] Quantitative metrics calculated
- [ ] Qualitative themes identified
- [ ] Findings report completed
- [ ] Recommendations prioritized
- [ ] Presentation prepared for team

---

## Support & Questions

### Need Help?

**Using These Templates**:
- Each file has detailed instructions
- Start with USABILITY_TEST_MASTER.md for overview
- Follow TEST_SCRIPT.md during sessions

**Interpreting Results**:
- DATA_ANALYSIS_TEMPLATE.md has calculation guides
- Industry benchmarks included for context
- Prioritization frameworks provided

**Next Steps**:
- FINDINGS_REPORT_TEMPLATE.md guides recommendations
- Action items organized by priority
- Implementation guidance included

---

## Credits & References

**Framework Based On**:
- Nielsen Norman Group usability testing guidelines
- System Usability Scale (John Brooke, 1986)
- Net Promoter Score (Fred Reichheld, 2003)
- Think-aloud protocol (Lewis & Clayton, 1982)

**Adapted For**:
- Pastree Clipboard Manager Extension
- First-time user testing
- Browser extension context
- Remote unmoderated testing

---

## Version History

**v1.0** - Initial framework creation
- Complete testing structure
- 12 template files
- 6 task scenarios
- Comprehensive analysis tools

---

**Questions or Feedback?**  
Contact: [Your Name/Team]  
Email: [Your Email]  
Date Created: [Date]

---

**Ready to Start Testing?**

1. Review `USABILITY_TEST_MASTER.md`
2. Recruit 5 participants
3. Follow `TEST_SCRIPT.md` for each session
4. Analyze with `DATA_ANALYSIS_TEMPLATE.md`
5. Report with `FINDINGS_REPORT_TEMPLATE.md`

**Good luck with your usability testing!** 🎯

