#  Text with Emoji - Configuration Guide

## Quick Setup Guide

### 1. Adding the Component to Your Form

1. Open your form or view in Pega App Studio
2. Drag and drop a **Field** component onto your form
3. In the Field properties, select **Component Type**: `Jaygasi_Extensions_TextWithEmoji`

### 2. Basic Configuration

#### Required Settings:
- **Property**: Bind to the property that will contain your status values
- **Label**: Display label for the field (e.g., "Project Status")

#### Optional Settings:
- **Placeholder**: Hint text when field is empty
- **Required**: Make the field mandatory
- **Read Only**: Make the field display-only

### 3. Emoji Configuration

In the **Emoji Configuration (JSON)** field, enter your status-to-emoji mapping:

#### Example 1: Basic Status Mapping
```json
{
  "status_emojis": [
    {"status": "Completed", "emoji": "✅"},
    {"status": "In Progress", "emoji": "⏳"},
    {"status": "Pending", "emoji": "🕒"},
    {"status": "Failed", "emoji": "❌"}
  ]
}
```

#### Example 2: Project Phases
```json
{
  "status_emojis": [
    {"status": "Planning", "emoji": "📋"},
    {"status": "Development", "emoji": "💻"},
    {"status": "Testing", "emoji": "🧪"},
    {"status": "Deployment", "emoji": "🚀"},
    {"status": "Complete", "emoji": "🎉"}
  ]
}
```

#### Example 3: Priority Levels
```json
{
  "status_emojis": [
    {"status": "Low", "emoji": "🟢"},
    {"status": "Medium", "emoji": "🟡"},
    {"status": "High", "emoji": "🟠"},
    {"status": "Critical", "emoji": "🔴"}
  ]
}
```

### 4. Property Data Setup

Make sure your property contains values that match the status strings in your configuration. The matching is case-insensitive, so "completed", "Completed", and "COMPLETED" will all work.

#### In a Data Transform or Activity:
```
.Status = "In Progress"
```

#### In a Dropdown/Picklist:
Set the dropdown values to match your emoji configuration statuses.

### 5. Testing Your Configuration

1. **Preview the form** in App Studio
2. **Type different status values** in the field
3. **Verify emojis appear** for matching statuses
4. **Test case variations** (e.g., "failed" vs "Failed")

### Common Use Cases

#### Case Management Status
```json
{
  "status_emojis": [
    {"status": "New", "emoji": "🆕"},
    {"status": "Open", "emoji": "📂"},
    {"status": "In Review", "emoji": "👀"},
    {"status": "Resolved", "emoji": "✅"},
    {"status": "Closed", "emoji": "🔒"}
  ]
}
```

#### Order Management
```json
{
  "status_emojis": [
    {"status": "Cart", "emoji": "🛒"},
    {"status": "Ordered", "emoji": "📦"},
    {"status": "Processing", "emoji": "⚙️"},
    {"status": "Shipped", "emoji": "🚚"},
    {"status": "Delivered", "emoji": "📍"}
  ]
}
```

#### Task Management
```json
{
  "status_emojis": [
    {"status": "To Do", "emoji": "📝"},
    {"status": "Doing", "emoji": "🔄"},
    {"status": "Review", "emoji": "👁️"},
    {"status": "Done", "emoji": "✅"},
    {"status": "Blocked", "emoji": "🚫"}
  ]
}
```

### Troubleshooting

**Q: Emoji not showing up?**
- Check that your property value exactly matches a status in your JSON
- Verify your JSON syntax is correct (use a JSON validator)
- Check browser console for any error messages

**Q: Invalid JSON error?**
- Make sure all strings are in double quotes
- Check for trailing commas
- Validate structure matches the required format

**Q: Component not available?**
- Ensure the component is properly installed and built
- Check that it appears in your component library
- Verify you have the correct permissions

### Best Practices

1. **Keep status names consistent** across your application
2. **Use recognizable emojis** that clearly represent the status
3. **Document your status values** for your development team
4. **Test thoroughly** with different input variations
5. **Consider accessibility** - don't rely solely on emojis for meaning