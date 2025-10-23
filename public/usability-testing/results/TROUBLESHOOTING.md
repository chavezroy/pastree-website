# Troubleshooting Guide - Results Dashboard

## 🔍 Charts Not Displaying / Blank Canvas

### Problem
The charts show as blank/empty boxes when viewing the dashboard or participant reports.

### Solutions

#### **1. Check Internet Connection**
Charts require Chart.js library from CDN (internet connection needed on first load).

```
✅ Solution: Ensure you have an active internet connection
```

#### **2. Check Browser Console**
Open Developer Tools (F12 or right-click → Inspect) and check the Console tab for errors.

**Common errors**:
- `Chart is not defined` → Chart.js failed to load from CDN
- `Canvas element not found` → HTML structure issue
- `Failed to load resource` → Network/CDN issue

```
✅ Solution: 
1. Press F12 to open DevTools
2. Click "Console" tab
3. Look for red error messages
4. Share error messages if you need help
```

#### **3. Clear Browser Cache**
Cached files might be corrupted.

```
✅ Solution:
- Chrome/Edge: Ctrl+Shift+Delete → Clear cache
- Firefox: Ctrl+Shift+Delete → Clear cache
- Safari: Cmd+Option+E → Clear cache
Then refresh page (Ctrl+R or Cmd+R)
```

#### **4. Try Different Browser**
Some browsers may have stricter security settings.

```
✅ Solution: Test in:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari (Mac)
```

#### **5. Disable Browser Extensions**
Ad blockers or privacy extensions might block CDN resources.

```
✅ Solution:
1. Try opening in Incognito/Private mode
2. Or temporarily disable extensions
3. Refresh the page
```

#### **6. Check for Mixed Content Issues**
If hosting on HTTPS, ensure Chart.js CDN uses HTTPS.

```
✅ Current CDN URL:
https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js

This should work on both HTTP and HTTPS
```

#### **7. Wait for CDN Load**
Sometimes the CDN takes a few seconds to load.

```
✅ Solution:
1. Wait 5-10 seconds after uploading data
2. Refresh page if needed
3. Check console for "Chart.js loaded successfully" message
```

#### **8. Verify Data Was Uploaded**
Charts won't display if no valid data was loaded.

```
✅ Solution:
1. Check console for "Chart created successfully" messages
2. Verify JSON files are valid (not corrupted)
3. Ensure participant ID is shown at top of page
```

---

## 📁 Files Not Loading

### Problem
JSON files won't upload or show errors.

### Solutions

#### **1. Check File Format**
```
✅ Must be .json files
❌ Not .txt, .csv, or other formats
```

#### **2. Validate JSON Syntax**
```
✅ Solution:
1. Open file in text editor
2. Copy contents
3. Paste into https://jsonlint.com/
4. Fix any syntax errors
```

#### **3. Check File Size**
```
✅ Should be < 1MB per file
❌ Very large files might fail
```

#### **4. Verify File Structure**
Required structure:
```json
{
  "participantId": "P1",
  "timestamp": "2025-10-22T10:30:00.000Z",
  "responses": { ... }
}
```

---

## 🎨 Charts Look Wrong

### Problem
Charts display but data looks incorrect.

### Solutions

#### **1. Check Participant ID Consistency**
```
✅ All files from same participant should have same ID
Example: P1, P1, P1 (not P1, P2, P1)
```

#### **2. Verify Complete Data**
```
✅ Post-task: Should have task1Ease through task6Ease
✅ Post-test: Should have sus1 through sus10
✅ Pre-test: Should have age, gender, occupation, etc.
```

#### **3. Check Required Fields**
```
Make sure all required (*) fields were completed in forms
```

---

## 🖨️ Export Not Working

### Problem
PDF/CSV export buttons don't work.

### Solutions

#### **1. PDF Export**
```
Uses browser's built-in Print to PDF:
1. Click "Print Report" or use Ctrl+P (Cmd+P on Mac)
2. Select "Save as PDF" as destination
3. Click "Save"
```

#### **2. CSV Export**
```
Note: Currently displays alert "Coming soon"
Workaround: Use JSON export instead
```

#### **3. JSON Export**
```
Should download automatically
If not, check browser's download settings
```

---

## 🌐 Hosting Issues

### Problem
Forms/dashboards don't work when hosted online.

### Solutions

#### **1. CORS Issues**
```
✅ Solution: Serve from proper web server (not file://)
Use: python3 -m http.server 8000
Not: Opening HTML file directly
```

#### **2. Relative Paths**
```
✅ All paths use relative URLs (./ and ../)
Should work when hosted in same folder structure
```

#### **3. HTTPS Required**
```
Some browsers require HTTPS for certain features
Use Netlify, Vercel, or GitHub Pages for free HTTPS
```

---

## 🔧 Quick Diagnostic Checklist

Run through this checklist when encountering issues:

```
□ Internet connection is active
□ Using modern browser (Chrome/Firefox/Edge/Safari)
□ Browser cache cleared
□ Extensions disabled (or using Incognito)
□ Console shows no red errors
□ JSON files are valid format
□ Participant IDs are consistent
□ Required form fields were completed
□ Waited a few seconds for charts to load
□ Page fully loaded (no spinning indicators)
```

---

## 💬 Still Having Issues?

### Get Help

1. **Check Browser Console**:
   - Press F12
   - Go to Console tab
   - Screenshot any errors
   
2. **Verify File Contents**:
   - Open JSON file in text editor
   - Copy first few lines
   - Verify structure matches examples
   
3. **Test with Sample Data**:
   - Create test JSON file with minimal valid data
   - Try loading test file first
   
4. **Document the Issue**:
   - What you were trying to do
   - What happened instead
   - Any error messages
   - Browser and version
   - Operating system

---

## 📚 Technical Details

### Chart.js CDN
```
URL: https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js
Version: 4.4.0
Format: UMD (Universal Module Definition)
Size: ~200KB
```

### Browser Requirements
```
- JavaScript: ES6+ (2015+)
- LocalStorage: Required for auto-save
- FileReader API: Required for JSON upload
- Canvas API: Required for charts
- Fetch API: Not used (no server calls)
```

### Network Requirements
```
- Initial Load: Internet required (Chart.js CDN)
- After Load: Can work offline
- Data Processing: 100% client-side
- No server uploads: All local
```

---

## 🎯 Common Scenarios & Solutions

### Scenario 1: "Everything is blank"
```
Cause: Chart.js not loaded
Solution: Check internet, refresh page, check console
```

### Scenario 2: "Some charts show, others don't"
```
Cause: Missing data for specific sections
Solution: Verify all 3 JSON files uploaded (pre/post-task/post-test)
```

### Scenario 3: "Charts show but wrong data"
```
Cause: Mixed participant IDs or incorrect file mapping
Solution: Check participant IDs match, verify file contents
```

### Scenario 4: "Can't upload files"
```
Cause: File format or browser permissions
Solution: Check .json extension, try different browser
```

### Scenario 5: "Charts disappear on refresh"
```
Cause: Data not persisted (normal behavior)
Solution: Re-upload JSON files after refresh
```

---

## 🔄 Reset & Start Fresh

If all else fails:

```bash
1. Close all browser tabs with the dashboard
2. Clear browser cache completely
3. Restart browser
4. Re-open dashboard
5. Upload files one at a time
6. Check console after each upload
```

---

**Remember**: All processing is client-side, so browser console is your best friend for debugging! 🐛

