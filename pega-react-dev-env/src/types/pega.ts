// Pega-specific type definitions for Constellation components

export interface PegaComponentProps {
  getPConnect?: () => any;
  value?: any;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  testId?: string;
}

export interface PegaFieldProps extends PegaComponentProps {
  placeholder?: string;
  helperText?: string;
  validationMessages?: string[];
  hasSuggestions?: boolean;
}

export interface PegaActionProps {
  actionID?: string;
  actionType?: string;
  parameters?: Record<string, any>;
}

export interface PegaConfigProps {
  name: string;
  type: 'widget' | 'field' | 'template' | 'region';
  subType?: string;
  label: string;
  description?: string;
  organization: string;
  library: string;
  version: string;
  properties: PegaPropertyConfig[];
  events?: PegaEventConfig[];
  category?: string;
  tags?: string[];
}

export interface PegaPropertyConfig {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'action' | 'object' | 'array';
  required: boolean;
  defaultValue?: any;
  options?: Array<{ value: any; label: string }>;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface PegaEventConfig {
  name: string;
  label: string;
  description?: string;
  parameters?: PegaPropertyConfig[];
}

export interface PegaContext {
  caseInfo?: {
    caseID?: string;
    caseTypeID?: string;
    status?: string;
  };
  userInfo?: {
    userID?: string;
    userName?: string;
    roles?: string[];
  };
  applicationInfo?: {
    applicationID?: string;
    applicationName?: string;
    version?: string;
  };
}

