import React from 'react';
import './SampleCustomButton.css';

export interface SampleCustomButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * SampleCustomButton - A custom Pega DX component example
 * 
 * This component demonstrates how to create a custom button component
 * that can be used in Pega Constellation applications.
 * 
 * Key features:
 * - TypeScript support with proper interfaces
 * - CSS modules for styling
 * - Configurable props for different variants and sizes
 * - Accessibility support
 * - Event handling
 */
export const SampleCustomButton: React.FC<SampleCustomButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'medium'
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const buttonClasses = [
    'sample-custom-button',
    `sample-custom-button--${variant}`,
    `sample-custom-button--${size}`,
    disabled ? 'sample-custom-button--disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      aria-label={label}
    >
      {label}
    </button>
  );
};

