# Interactive PDF Advanced - Enhanced Highlighting Component

This component provides **dual highlighting support** for PDF documents:

## 🎯 **Coordinate-Based Highlighting** (Existing)
Precise pixel-perfect highlights using coordinate data:

```json
{
  "pxResults": [
    {
      "id": "coord1",
      "confidence": 0.95,
      "area": {
        "left": 10,        // X coordinate (% or fractional 0-1)
        "top": 10,         // Y coordinate (% or fractional 0-1)  
        "width": 30,       // Width (% or fractional 0-1)
        "height": 15,      // Height (% or fractional 0-1)
        "pageindex": 0     // Page number (0-based)
      }
    }
  ]
}
```

## 📝 **Text-Based Highlighting** (NEW)
Automatically search and highlight words/phrases:

```json
{"textHighlights": [{ "text": "JavaScript", "confidence": 0.95 },{ "text": "Data", "confidence": 0.90 },{ "text": "20", "confidence": 0.88 },{ "text": "Jay", "confidence": 0.85 },{ "text": "01949", "confidence": 0.80 }]}
```

## ✨ **Key Improvements**

### 1. **Constrained Coordinates**
- Highlights are now properly positioned within the **PDF content area only**
- No more highlights floating outside the document boundaries
- Improved accuracy by targeting the actual PDF canvas/text layer

### 2. **Text Search Integration** 
- Searches through PDF text layers to find specified words/phrases
- Creates dynamic highlights based on actual text content
- Fallback positioning if text layers aren't available

### 3. **Outline-Only Highlighting**
- Uses **transparent backgrounds with colored borders**
- Perfect for word highlighting without obscuring text
- Better readability and professional appearance

## 🔧 **Usage**

### Component Properties
- `HighlightData` - Property containing coordinate-based highlights  
- `TextHighlightData` - Property containing text-based highlights (NEW)
- Both can be used simultaneously for maximum flexibility

### Example Configuration
```javascript
<InteractivePDFAdvanced
  getPConnect={getPConnect}
  PDFReference="myPDFProperty"
  HighlightData="coordinateHighlights"    // Traditional coordinates
  TextHighlightData="textHighlights"      // NEW: Text search
  height="700px"
/>
```

## 🎨 **Visual Features**
- **Green borders** (confidence ≥ 0.9)
- **Yellow borders** (confidence ≥ 0.7) 
- **Red borders** (confidence < 0.7)
- Responsive scaling with zoom levels
- Multi-page support