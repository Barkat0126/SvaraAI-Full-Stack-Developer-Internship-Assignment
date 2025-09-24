import { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = "text", 
  error = false,
  label,
  helperText,
  required = false,
  icon: Icon,
  style = {},
  ...props 
}, ref) => {
  // Container styles
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  };

  // Label styles
  const labelStyles = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'rgb(55, 65, 81)',
    marginBottom: '0.25rem'
  };

  // Required asterisk styles
  const requiredStyles = {
    color: 'rgb(239, 68, 68)',
    marginLeft: '0.25rem'
  };

  // Input wrapper styles
  const inputWrapperStyles = {
    position: 'relative'
  };

  // Icon wrapper styles
  const iconWrapperStyles = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    paddingLeft: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  };

  // Icon styles
  const iconStyles = {
    height: '1.25rem',
    width: '1.25rem',
    color: 'rgb(156, 163, 175)'
  };

  // Input base styles
  const inputBaseStyles = {
    display: 'block',
    width: '100%',
    padding: Icon ? '0.5rem 0.75rem 0.5rem 2.5rem' : '0.5rem 0.75rem',
    border: error ? '1px solid rgb(239, 68, 68)' : '1px solid rgb(209, 213, 219)',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    transition: 'all 300ms',
    outline: 'none',
    backgroundColor: 'white'
  };

  // Helper text styles
  const helperTextStyles = {
    fontSize: error ? '0.875rem' : '0.75rem',
    color: error ? 'rgb(239, 68, 68)' : 'rgb(107, 114, 128)',
    marginTop: '0.25rem'
  };

  const combinedInputStyles = {
    ...inputBaseStyles,
    ...style
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={requiredStyles}>*</span>}
        </label>
      )}
      <div style={inputWrapperStyles}>
        {Icon && (
          <div style={iconWrapperStyles}>
            <Icon style={iconStyles} />
          </div>
        )}
        <input
          type={type}
          style={combinedInputStyles}
          ref={ref}
          onFocus={(e) => {
            e.target.style.borderColor = error ? 'rgb(239, 68, 68)' : 'rgb(79, 70, 229)';
            e.target.style.boxShadow = error 
              ? '0 0 0 1px rgb(239, 68, 68)' 
              : '0 0 0 1px rgb(79, 70, 229)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'rgb(239, 68, 68)' : 'rgb(209, 213, 219)';
            e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          }}
          {...props}
        />
      </div>
      {helperText && (
        <p style={helperTextStyles}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

const Textarea = forwardRef(({ 
  error = false,
  label,
  helperText,
  required = false,
  rows = 3,
  style = {},
  ...props 
}, ref) => {
  // Container styles
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  // Label styles
  const labelStyles = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'rgb(55, 65, 81)',
    marginBottom: '0.25rem'
  };

  // Required asterisk styles
  const requiredStyles = {
    color: 'rgb(239, 68, 68)',
    marginLeft: '0.25rem'
  };

  // Textarea base styles
  const textareaBaseStyles = {
    display: 'block',
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: error ? '1px solid rgb(239, 68, 68)' : '1px solid rgb(209, 213, 219)',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    resize: 'vertical',
    minHeight: '80px',
    transition: 'all 300ms',
    outline: 'none',
    backgroundColor: 'white'
  };

  // Helper text styles
  const helperTextStyles = {
    fontSize: error ? '0.875rem' : '0.75rem',
    color: error ? 'rgb(239, 68, 68)' : 'rgb(107, 114, 128)',
    marginTop: '0.25rem'
  };

  const combinedTextareaStyles = {
    ...textareaBaseStyles,
    ...style
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={requiredStyles}>*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        style={combinedTextareaStyles}
        ref={ref}
        onFocus={(e) => {
          e.target.style.borderColor = error ? 'rgb(239, 68, 68)' : 'rgb(79, 70, 229)';
          e.target.style.boxShadow = error 
            ? '0 0 0 1px rgb(239, 68, 68)' 
            : '0 0 0 1px rgb(79, 70, 229)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'rgb(239, 68, 68)' : 'rgb(209, 213, 219)';
          e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }}
        {...props}
      />
      {helperText && (
        <p style={helperTextStyles}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Input, Textarea };