# 🚨 InteractivePDFAdvanced Text Highlighting - DEBUGGING GUIDE

## Your Exact Issue
You're using this JSON but NO text highlights are appearing:
```json
{
  "textHighlights": [
    { "text": "JavaScript", "confidence": 0.95 },
    { "text": "Data", "confidence": 0.90 },
    { "text": "20", "confidence": 0.88 },
    { "text": "Jay", "confidence": 0.85 },
    { "text": "01949", "confidence": 0.80 }
  ]
}
```

## 🔍 **STEP-BY-STEP DEBUGGING**

### **Step 1: Test in Storybook First** ⭐ **START HERE**

1. **Open Storybook**: `npm run storybook`
2. **Navigate to**: `Jaygasi/InteractivePDFAdvanced`
3. **Open Browser Console**: Press F12 → Console tab
4. **Look for debug messages**: Should see messages starting with `[InteractivePDFAdvanced]`

**Expected Console Output:**
```
[InteractivePDFAdvanced] All Props: {PDFReference: "pdfBase64", TextHighlightData: "textHighlights", ...}
[InteractivePDFAdvanced] Resolved Properties: {textHighlightProp: "textHighlights", ...}
[InteractivePDFAdvanced] TextHighlight Debug: {textHighlightProp: "textHighlights", textData: {...}}
[InteractivePDFAdvanced] Processing text data: {...}
[InteractivePDFAdvanced] Extracted textHighlights: [...]
[InteractivePDFAdvanced] Processed text highlights: [...]
```

### **Step 2: Check What You See**

**✅ If Storybook Works:**
- You should see green/yellow/red borders around words like "Jay", "PROFESSIONAL", "Data", "20"
- This means the component works and the issue is in your Pega setup

**❌ If Storybook Doesn't Work:**
- Look at console messages to see where it's failing
- Report back what console messages you see

### **Step 3: Pega Setup Verification**

**If Storybook works but Pega doesn't, check:**

1. **Property Name**: Verify the exact property name you're using
2. **Property Value**: Create a text field to display the property value
3. **Component Configuration**: 
   - Set `enableDebugging` to `true` in component config
   - Set `TextHighlightData` to your property name

### **Step 4: Console Debugging in Pega**

**When you load the component in Pega:**

1. **Press F12** → Console tab
2. **Look for debug messages**
3. **Report what you see**

## 🚨 **Common Issues & Solutions**

### **Issue A: No Debug Messages**
**Problem**: `enableDebugging` is not enabled
**Solution**: Add `enableDebugging: true` to component configuration

### **Issue B: "No text data provided"**
**Problem**: Property not found or empty
**Solutions**:
- Check property name spelling
- Verify property contains data
- Try different property reference format

### **Issue C: "Processing text data" but no highlights**
**Problem**: Text not found in PDF or PDF has no text layer
**Solutions**:
- Try different words that definitely exist in the PDF
- Check if PDF is image-based (no text layer)
- Try very common words like "the", "and", "a"

### **Issue D: Highlights appear but in wrong places**
**Problem**: Coordinate calculation issues
**This is expected**: The fix constrains coordinates to PDF area

## 🎯 **Quick Test Words**

Try these super common words that should exist in most PDFs:
```json
{
  "textHighlights": [
    { "text": "the", "confidence": 0.95 },
    { "text": "and", "confidence": 0.90 },
    { "text": "to", "confidence": 0.85 }
  ]
}
```

## 📞 **Next Steps**

**Please report back:**

1. **Storybook Test Results**: Does it work in Storybook? What do you see?
2. **Console Messages**: Copy/paste the exact console messages you see
3. **PDF Type**: Is your PDF text-based or image-based?
4. **Property Setup**: What's the exact property name and value you're using?

The enhanced debugging will help us pinpoint exactly where the issue is occurring!