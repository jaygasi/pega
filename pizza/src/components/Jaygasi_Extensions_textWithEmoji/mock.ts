export const configProps = {
  value: 'Failed',
  label: 'Status Text with Emoji',
  placeholder: 'Enter status (e.g., Completed, Failed, In Progress, Pending)',
  helperText: 'Enter a status and see the corresponding emoji appear',
  testId: 'TextWithEmoji-12345678',
  hasSuggestions: false,
  displayMode: '',
  hideLabel: false,
  readOnly: false,
  required: false,
  disabled: false,
  status: '',
  validatemessage: '',
  emojiConfig: '{"status_emojis":[{"status":"Completed","emoji":"✅"},{"status":"In Progress","emoji":"⏳"},{"status":"Pending","emoji":"🕒"},{"status":"Failed","emoji":"❌"},{"status":"Cancelled","emoji":"🚫"},{"status":"On Hold","emoji":"⏸️"}]}'
};

export const stateProps = {
  value: '.StatusSample',
  hasSuggestions: false
};