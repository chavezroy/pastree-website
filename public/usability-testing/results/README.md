# Pastree Usability Test Results

This folder contains interactive data analysis tools for processing and visualizing usability test results.

## 📊 Available Reports

### 1. Aggregate Dashboard (`dashboard.html`)
Comprehensive analytics across all participants with:
- **Summary Metrics**: Total participants, average SUS score, NPS score, task success rates
- **Demographics Charts**: Age distribution, experience levels, technical proficiency
- **Task Performance**: Ease ratings trends, success rates per task
- **SUS Analysis**: Individual scores, distribution, grade classification
- **NPS Breakdown**: Promoters/Passives/Detractors visualization
- **Feature Preferences**: Most valuable features ranked
- **Qualitative Insights**: Key quotes, pain points, delights
- **Export Options**: PDF, CSV, and JSON exports

### 2. Individual Participant Report (`participant-report.html`)
Deep dive into a single participant's complete journey:
- **Profile Overview**: Demographics and background information
- **Score Summary**: SUS score, NPS rating, tasks completed
- **Task Journey**: Detailed task-by-task performance with feedback
- **SUS Breakdown**: Individual question responses with color coding
- **Feature Assessment**: Most valuable features and satisfaction ratings
- **Qualitative Feedback**: All open-ended responses organized by theme
- **Comparison Notes**: How the participant compares to average scores
- **Print & Export**: Browser print functionality and JSON export

### 3. Results Portal (`index.html`)
Navigation hub for accessing all reports and documentation.

## 🚀 How to Use

### Step 1: Collect Data
1. Have participants complete the testing forms in the `forms/` folder
2. Each form automatically downloads a JSON file when submitted
3. Collect all JSON files from all participants

### Step 2: Open a Report
1. Open either `dashboard.html` or `participant-report.html` in a web browser
2. Or start from `index.html` for the full portal experience

### Step 3: Upload Data
1. Click "Choose Files" or drag-and-drop JSON files
2. Upload multiple files for the dashboard (aggregates all data)
3. Upload one participant's files for individual reports

### Step 4: Analyze & Export
1. Explore interactive charts and visualizations
2. Read qualitative feedback and insights
3. Export results as PDF (print), CSV, or JSON

## 📁 Data Format

The tools expect JSON files in this format:

```json
{
  "participantId": "P1",
  "timestamp": "2025-10-22T10:30:00.000Z",
  "responses": {
    // Form-specific responses
  },
  "susScore": 85.0  // Post-test only
}
```

## 🎯 Key Metrics Explained

### System Usability Scale (SUS)
- **Range**: 0-100
- **Calculation**: Based on 10 standardized questions
- **Grading**:
  - 80.3-100: Excellent (🌟)
  - 68-80.2: Good (✅)
  - 51-67.9: OK (⚠️)
  - 0-50.9: Poor (❌)
- **Industry Benchmark**: 68 is average

### Net Promoter Score (NPS)
- **Range**: -100 to +100
- **Calculation**: % Promoters - % Detractors
- **Categories**:
  - Promoters (9-10): Enthusiastic supporters
  - Passives (7-8): Satisfied but not enthusiastic
  - Detractors (0-6): Unlikely to recommend
- **Grading**:
  - 70+: Excellent
  - 50-70: Great
  - 30-50: Good
  - 0-30: Fair
  - Below 0: Needs Improvement

### Task Success Rate
- Percentage of participants who successfully completed each task
- **Benchmarks**:
  - 80%+: Excellent usability
  - 60-79%: Acceptable, but room for improvement
  - Below 60%: Significant usability issues

### Task Ease Rating
- 1-5 scale (1=Very Difficult, 5=Very Easy)
- **Target**: Average of 4.0+ per task
- Lower ratings indicate areas needing UX improvements

## 📊 Visualization Libraries

All reports use **Chart.js v4.4.0** for interactive visualizations:
- Line charts for task performance trends
- Bar charts for success rates and comparisons
- Doughnut/pie charts for distributions
- Radar charts for multi-dimensional data

Charts are responsive and interactive (hover for details).

## 💾 Data Processing

### Data Processor Utility (`data-processor.js`)
A JavaScript class that provides:
- Automatic data categorization (pre-test, post-task, post-test)
- Aggregate statistics calculation
- SUS and NPS score computation
- Demographics and experience analysis
- Qualitative feedback extraction
- CSV and JSON export functionality

### Usage Example
```javascript
const processor = new UsabilityDataProcessor();
processor.loadFiles(fileArray);
const stats = processor.getAggregateStats();
const csv = processor.exportToCSV();
```

## 🔒 Privacy & Security

- **Local Processing**: All data analysis happens in your browser
- **No Server Uploads**: Files are never sent to external servers
- **Client-Side Only**: JavaScript processes everything locally
- **Data Control**: You maintain full control of participant data

## 📈 Recommended Workflow

1. **During Testing**: Collect JSON files from participants
2. **Initial Review**: Use individual reports to review each participant
3. **Aggregate Analysis**: Load all data into dashboard for patterns
4. **Export Findings**: Generate PDF report and CSV for stakeholders
5. **Action Items**: Identify top pain points and improvement opportunities

## 🎨 Customization

### Branding
- Logo: Update `../images/Pastree Logo - drk.svg`
- Colors: Modify CSS variables in each HTML file
- Primary: `#667eea` and `#764ba2` (gradient)

### Task Descriptions
Edit the `taskDescriptions` object in `participant-report.html`:
```javascript
const taskDescriptions = {
    1: "Your task description here",
    // ...
};
```

### SUS Grading Thresholds
Modify in `getSUSGrade()` function if using different benchmarks.

## 🐛 Troubleshooting

**Charts not displaying:**
- Ensure internet connection (Chart.js loads from CDN)
- Check browser console for errors
- Try refreshing the page

**Files not loading:**
- Verify JSON format is correct
- Check file extension is `.json`
- Ensure files aren't corrupted

**Data looks incorrect:**
- Verify participant IDs match across files
- Check that form responses were saved correctly
- Ensure required fields were completed

## 📚 Additional Resources

- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [SUS Score Information](https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html)
- [NPS Score Guide](https://www.netpromoter.com/know/)

## 🤝 Contributing

To add new visualizations or metrics:
1. Add chart container in HTML
2. Create Chart.js instance with data
3. Update `data-processor.js` with new calculations
4. Document the metric in this README

## 📄 License

Part of the Pastree Extension usability testing suite.

