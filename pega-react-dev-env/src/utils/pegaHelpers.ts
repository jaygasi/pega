// Utility functions for working with Pega Constellation components

import { PegaComponentProps, PegaContext } from '../types/pega';

/**
 * Get the PConnect object from component props
 * @param props - Component props that may contain getPConnect
 * @returns PConnect object or null
 */
export const getPConnect = (props: PegaComponentProps) => {
  return props.getPConnect ? props.getPConnect() : null;
};

/**
 * Get a property value from PConnect
 * @param pConnect - PConnect object
 * @param propertyName - Name of the property to retrieve
 * @returns Property value or undefined
 */
export const getPropertyValue = (pConnect: any, propertyName: string) => {
  if (!pConnect) return undefined;
  
  try {
    return pConnect.getValue(propertyName);
  } catch (error) {
    console.warn(`Failed to get property value for ${propertyName}:`, error);
    return undefined;
  }
};

/**
 * Set a property value through PConnect
 * @param pConnect - PConnect object
 * @param propertyName - Name of the property to set
 * @param value - Value to set
 */
export const setPropertyValue = (pConnect: any, propertyName: string, value: any) => {
  if (!pConnect) return;
  
  try {
    pConnect.setValue(propertyName, value);
  } catch (error) {
    console.warn(`Failed to set property value for ${propertyName}:`, error);
  }
};

/**
 * Execute a Pega action
 * @param pConnect - PConnect object
 * @param actionID - ID of the action to execute
 * @param parameters - Optional parameters for the action
 */
export const executeAction = (pConnect: any, actionID: string, parameters?: Record<string, any>) => {
  if (!pConnect) return;
  
  try {
    const actionApi = pConnect.getActionsApi();
    actionApi.executeAction(actionID, parameters);
  } catch (error) {
    console.warn(`Failed to execute action ${actionID}:`, error);
  }
};

/**
 * Get the current Pega context information
 * @param pConnect - PConnect object
 * @returns Context information object
 */
export const getPegaContext = (pConnect: any): PegaContext => {
  if (!pConnect) return {};
  
  try {
    const contextApi = pConnect.getContextApi();
    return {
      caseInfo: contextApi.getCaseInfo(),
      userInfo: contextApi.getUserInfo(),
      applicationInfo: contextApi.getApplicationInfo()
    };
  } catch (error) {
    console.warn('Failed to get Pega context:', error);
    return {};
  }
};

/**
 * Validate a component property value
 * @param value - Value to validate
 * @param required - Whether the property is required
 * @param type - Expected type of the property
 * @returns Validation result object
 */
export const validateProperty = (
  value: any, 
  required: boolean = false, 
  type?: string
): { isValid: boolean; message?: string } => {
  // Check required validation
  if (required && (value === undefined || value === null || value === '')) {
    return { isValid: false, message: 'This field is required' };
  }
  
  // Check type validation
  if (value !== undefined && value !== null && type) {
    const actualType = typeof value;
    if (type === 'number' && actualType !== 'number') {
      return { isValid: false, message: 'Must be a number' };
    }
    if (type === 'string' && actualType !== 'string') {
      return { isValid: false, message: 'Must be a string' };
    }
    if (type === 'boolean' && actualType !== 'boolean') {
      return { isValid: false, message: 'Must be a boolean' };
    }
  }
  
  return { isValid: true };
};

/**
 * Format a value for display based on type
 * @param value - Value to format
 * @param type - Type of formatting to apply
 * @param options - Additional formatting options
 * @returns Formatted value
 */
export const formatValue = (
  value: any, 
  type: 'currency' | 'date' | 'datetime' | 'percentage' | 'text' = 'text',
  options?: Record<string, any>
): string => {
  if (value === undefined || value === null) return '';
  
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: options?.currency || 'USD'
      }).format(Number(value));
      
    case 'date':
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date(value));
      
    case 'datetime':
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(value));
      
    case 'percentage':
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: options?.decimals || 0
      }).format(Number(value) / 100);
      
    default:
      return String(value);
  }
};

