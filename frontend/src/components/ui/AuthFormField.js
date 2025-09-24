import { useState } from 'react';
import { Input } from './index';

export default function AuthFormField({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  style = {}
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Field container styles
  const fieldContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    ...style
  };

  // Label styles
  const labelStyles = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#e5e7eb'
  };

  // Icon in label styles
  const iconInLabelStyles = {
    marginRight: '0.5rem'
  };

  // Input group styles
  const inputGroupStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  // Icon container styles
  const iconContainerStyles = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    paddingLeft: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    zIndex: 10,
    color: isFocused ? '#a855f7' : '#9ca3af',
    fontSize: '1rem',
    transition: 'color 0.3s ease'
  };

  // Input styles
  const inputStyles = {
    height: '3rem',
    background: isFocused 
      ? (error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.15)')
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(0.125rem)',
    border: error 
      ? (isFocused ? '2px solid #f87171' : '2px solid rgba(248, 113, 113, 0.7)')
      : (isFocused ? '2px solid #a855f7' : (isHovered ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(255, 255, 255, 0.2)')),
    borderRadius: '0.5rem',
    color: '#ffffff',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    width: '100%',
    paddingLeft: icon ? '2.5rem' : '0.75rem',
    paddingRight: '0.75rem',
    outline: 'none',
    boxShadow: isFocused 
      ? (error ? '0 0 0 3px rgba(248, 113, 113, 0.2)' : '0 0 0 3px rgba(168, 85, 247, 0.2)')
      : 'none'
  };

  // Glow effect styles
  const glowEffectStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: '0.5rem',
    background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
    opacity: isFocused ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  };

  // Error message styles
  const errorMessageStyles = {
    color: '#f87171',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginTop: '0.25rem',
    background: 'rgba(239, 68, 68, 0.1)',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  };

  // Error icon styles
  const errorIconStyles = {
    fontSize: '0.875rem'
  };

  return (
    <div style={fieldContainerStyles}>
      <label style={labelStyles}>
        {icon && <span style={iconInLabelStyles}>{icon}</span>}
        {label}
      </label>
      <div style={inputGroupStyles}>
        {icon && (
          <div style={iconContainerStyles}>
            <span>{icon}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={inputStyles}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {/* Modern input glow effect */}
        <div style={glowEffectStyles}></div>
      </div>
      {error && (
        <p style={errorMessageStyles}>
          <span style={errorIconStyles}>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}