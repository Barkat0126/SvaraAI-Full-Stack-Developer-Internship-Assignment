'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

export default function AuthButton({ 
  children, 
  loading = false, 
  loadingText = "Loading...", 
  icon = "🚀", 
  variant = "primary",
  style = {},
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Base button styles
  const baseButtonStyles = {
    position: 'relative',
    width: '100%',
    height: '3rem',
    fontWeight: '600',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.5s ease',
    transform: isHovered && !loading ? 'scale(1.02) translateY(-0.125rem)' : 'scale(1)',
    overflow: 'hidden',
    cursor: loading ? 'not-allowed' : 'pointer',
    border: 'none',
    opacity: loading ? 0.5 : 1
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      background: isHovered 
        ? 'linear-gradient(90deg, #7c3aed 0%, #1d4ed8 50%, #7c3aed 100%)'
        : 'linear-gradient(90deg, #9333ea 0%, #2563eb 50%, #9333ea 100%)',
      color: '#ffffff',
      boxShadow: isHovered 
        ? '0 25px 50px -12px rgba(168, 85, 247, 0.7)'
        : '0 25px 50px -12px rgba(168, 85, 247, 0.5)',
      border: '1px solid rgba(168, 85, 247, 0.3)'
    },
    secondary: {
      border: isHovered 
        ? '2px solid rgba(168, 85, 247, 0.7)'
        : '2px solid rgba(255, 255, 255, 0.3)',
      color: isHovered ? '#ffffff' : '#e5e7eb',
      backdropFilter: 'blur(0.125rem)',
      background: isHovered 
        ? 'linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
        : 'rgba(255, 255, 255, 0.1)'
    }
  };

  // Background overlay styles
  const backgroundOverlayStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.5s ease',
    background: variant === 'primary' 
      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)'
      : 'linear-gradient(90deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
  };

  // Content styles
  const contentStyles = {
    position: 'relative',
    zIndex: 10
  };

  // Loading content styles
  const loadingContentStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Spinner styles with animation
  const spinnerStyles = {
    width: '1rem',
    height: '1rem',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    marginRight: '0.5rem',
    animation: 'spin 1s linear infinite'
  };

  // Loading text styles
  const loadingTextStyles = {
    letterSpacing: '0.05em',
    fontSize: '0.875rem'
  };

  // Normal content styles
  const normalContentStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Icon styles
  const iconStyles = {
    marginRight: '0.5rem',
    fontSize: '1.125rem',
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
  };

  // Text styles
  const textStyles = {
    letterSpacing: '0.05em',
    fontSize: '0.875rem'
  };

  // Shine effect styles
  const shineEffectStyles = {
    position: 'absolute',
    top: '-0.5rem',
    right: 0,
    bottom: '-0.5rem',
    left: 0,
    transform: isHovered ? 'skewX(12deg) translateX(100%)' : 'skewX(12deg) translateX(-100%)',
    transition: 'transform 1s ease',
    background: variant === 'primary'
      ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
      : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
  };

  // Combine all button styles
  const finalButtonStyles = {
    ...baseButtonStyles,
    ...variantStyles[variant],
    ...style
  };

  return (
    <>
      {/* Add keyframes for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <Button
        style={finalButtonStyles}
        disabled={loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Button background overlay */}
        <div style={backgroundOverlayStyles}></div>
        
        {/* Button content */}
        <div style={contentStyles}>
          {loading ? (
            <div style={loadingContentStyles}>
              <div style={spinnerStyles}></div>
              <span style={loadingTextStyles}>{loadingText}</span>
            </div>
          ) : (
            <div style={normalContentStyles}>
              <span style={iconStyles}>{icon}</span>
              <span style={textStyles}>{children}</span>
            </div>
          )}
        </div>
        
        {/* Shine effect */}
        <div style={shineEffectStyles}></div>
      </Button>
    </>
  );
}