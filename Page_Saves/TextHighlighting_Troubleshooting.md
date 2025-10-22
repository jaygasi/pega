# InteractivePDFAdvanced - Text Highlighting Troubleshooting Guide

## 🚨 **Your Issue: Text Highlights Not Appearing**

You're using this JSON but not seeing highlights:
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

## 🔧 **Troubleshooting Steps**

### **Step 1: Enable Debugging**
First, enable debugging to see what's happening:

**In Pega Component Configuration:**
- Set `enableDebugging` to `true` in the component configuration
- OR add it to your component's config properties

**Check Browser Console:**
1. Open Developer Tools (F12)
2. Go to Console tab  
3. Look for debug messages starting with `[InteractivePDFAdvanced]`

### **Step 2: Verify Property Setup**

**Make sure your property setup is correct:**

1. **Property Name**: The property containing your JSON (e.g., `.MyTextHighlights`)
2. **Component Property**: Set `TextHighlightData` to your property name
3. **Property Value**: Must contain the JSON structure above

### **Step 3: Check Data Format**

**Your JSON should be in one of these formats:**

**Option A: String Property**
```json
"{\"textHighlights\":[{\"text\":\"JavaScript\",\"confidence\":0.95},{\"text\":\"Data\",\"confidence\":0.90}]}"
```

**Option B: Page Property with Structure**
```json
{
  "textHighlights": [
    { "text": "JavaScript", "confidence": 0.95 },
    { "text": "Data", "confidence": 0.90 }
  ]
}
```

### **Step 4: Debug Console Messages**

**Look for these messages in the console:**

✅ **Success Messages:**
```
[InteractivePDFAdvanced] TextHighlight Debug: {textHighlightProp: "...", textData: {...}}
[InteractivePDFAdvanced] Processing text data: {...}
[InteractivePDFAdvanced] Extracted textHighlights: [...]
[InteractivePDFAdvanced] Processed text highlights: [...]
```

❌ **Problem Messages:**
```
[InteractivePDFAdvanced] No text data provided
[InteractivePDFAdvanced] Failed to process text highlights: ...
```

## 🎯 **Common Issues & Solutions**

### **Issue 1: Property Not Found**
**Symptoms:** Console shows "No text data provided"
**Solution:** 
- Check property name spelling
- Verify property exists in your data page/case
- Try different property reference formats (`.MyProp` vs `MyProp`)

### **Issue 2: JSON Format Problems**
**Symptoms:** Console shows parsing errors
**Solutions:**
- Ensure valid JSON format
- Check for escaped quotes in string properties
- Verify property contains data, not empty/null

### **Issue 3: Text Not Found in PDF**
**Symptoms:** Debug shows processed highlights but no visual highlights
**Solutions:**
- **Case Sensitivity**: Text search is case-insensitive, but try exact case
- **Exact Text Match**: Use exact text as it appears in PDF
- **Partial Matches**: Try shorter text fragments
- **Text Layer Issues**: PDF might not have searchable text layer

### **Issue 4: PDF Text Layer Missing**
**Symptoms:** No highlights appear even with valid data
**Solutions:**
- PDF might be image-based (no text layer)
- Try OCR'd PDF with text layer
- Use coordinate-based highlighting instead

## 🔍 **Testing Steps**

### **Step 1: Simple Test**
Start with a very simple, obvious word:
```json
{
  "textHighlights": [
    { "text": "the", "confidence": 0.95 }
  ]
}
```

### **Step 2: Debug in Storybook**
1. Open Storybook
2. Navigate to InteractivePDFAdvanced component
3. Check if text highlighting works there
4. Compare working vs non-working scenarios

### **Step 3: Property Value Verification**
**Add a display field to show the property value:**
- Create a Text component
- Bind it to the same property as TextHighlightData
- Verify the JSON structure is correct

## 🛠 **Fixed Issues**

The following issues have been resolved in the latest version:

✅ **Property Resolution Priority**: Fixed to prioritize direct TextHighlightData property over config
✅ **Debug Logging**: Added comprehensive debugging to trace the data flow
✅ **Function Order**: Fixed "use before define" lint error

## 📋 **Working Example**

**Component Configuration:**
- PDFReference: `.MyPDF`
- TextHighlightData: `.MyTextHighlights`  
- enableDebugging: `true`

**Property `.MyTextHighlights` Value:**
```json
{
  "textHighlights": [
    { "text": "JavaScript", "confidence": 0.95 },
    { "text": "React", "confidence": 0.90 },
    { "text": "Node.js", "confidence": 0.85 }
  ]
}
```

## 🚀 **Next Steps**

1. **Enable debugging** and check console messages
2. **Verify property setup** and data format
3. **Test with simple words** first
4. **Check PDF text layer** availability
5. **Report console messages** for further troubleshooting

The enhanced component now has better debugging and should help identify exactly what's preventing the text highlights from appearing!