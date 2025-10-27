
export const configProps = {
  value: '',
  label: 'Search Documents',
  placeholder: 'Enter search terms...',
  helperText: 'Type to search within documents or PDF files',
  testId: 'TextInputSearch-12345678',
  hasSuggestions: false,
  displayMode: '',
  variant: 'inline',
  formatter: 'TextInput',
  hideLabel: false,
  readOnly: false,
  required: false,
  disabled: false,
  status: '',
  validatemessage: '',
  searchPropRef: 'DocumentSearchText' // Added search property reference
} as const;

export const stateProps = {
  value: '.TextInputSample',
  hasSuggestions: false
};

export const fieldMetadata = {
  classID: 'DIXL-MediaCo-Work-NewService',
  type: 'Text',
  maxLength: 256,
  displayAs: 'pxTextInput',
  label: 'TextInput Sample'
};
