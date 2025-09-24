import { forwardRef, useState } from 'react';

const Button = forwardRef(({ 
  variant = "default", 
  size = "default", 
  disabled = false,
  loading = false,
  children, 
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Base button styles
  const baseStyles = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1rem',
    fontWeight: '500',
    transition: 'all 300ms',
    transform: isActive ? 'scale(0.95)' : isHovered && !loading ? 'scale(1.05) translateY(-2px)' : 'translateY(0) scale(1)',
    overflow: 'hidden',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : loading ? 0.7 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    outline: 'none'
  };

  // Variant styles
  const variantStyles = {
    default: {
      background: isHovered ? 'linear-gradient(to right, rgb(67, 56, 202), rgb(126, 34, 206))' : 'linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234))',
      color: 'white',
      boxShadow: isHovered ? '0 20px 25px -5px rgba(79, 70, 229, 0.3)' : '0 10px 15px -3px rgba(79, 70, 229, 0.25)'
    },
    destructive: {
      background: isHovered ? 'linear-gradient(to right, rgb(185, 28, 28), rgb(190, 24, 93))' : 'linear-gradient(to right, rgb(220, 38, 38), rgb(219, 39, 119))',
      color: 'white',
      boxShadow: isHovered ? '0 20px 25px -5px rgba(220, 38, 38, 0.3)' : '0 10px 15px -3px rgba(220, 38, 38, 0.25)'
    },
    outline: {
      border: '2px solid rgb(209, 213, 219)',
      background: isHovered ? 'rgb(249, 250, 251)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(4px)',
      color: 'rgb(55, 65, 81)',
      boxShadow: '0 10px 15px -3px rgba(229, 231, 235, 0.5)',
      borderColor: isHovered ? 'rgb(165, 180, 252)' : 'rgb(209, 213, 219)'
    },
    secondary: {
      background: isHovered ? 'linear-gradient(to right, rgb(55, 65, 81), rgb(31, 41, 55))' : 'linear-gradient(to right, rgb(75, 85, 99), rgb(55, 65, 81))',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(107, 114, 128, 0.25)'
    },
    ghost: {
      color: 'rgb(55, 65, 81)',
      background: isHovered ? 'rgba(243, 244, 246, 0.8)' : 'transparent',
      backdropFilter: isHovered ? 'blur(4px)' : 'none',
      boxShadow: isHovered ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
    },
    link: {
      color: isHovered ? 'rgb(67, 56, 202)' : 'rgb(79, 70, 229)',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      background: 'transparent'
    },
    glass: {
      background: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    gradient: {
      background: isHovered ? 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119), rgb(220, 38, 38))' : 'linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153), rgb(239, 68, 68))',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.25)'
    }
  };

  // Size styles
  const sizeStyles = {
    sm: {
      height: '2.25rem',
      padding: '0.25rem 1rem',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    default: {
      height: '2.75rem',
      padding: '0.5rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    lg: {
      height: '3.5rem',
      padding: '0.75rem 2.5rem',
      fontSize: '1.125rem',
      fontWeight: '600'
    },
    xl: {
      height: '4rem',
      padding: '1rem 3rem',
      fontSize: '1.25rem',
      fontWeight: '700'
    },
    icon: {
      height: '2.75rem',
      width: '2.75rem',
      padding: '0'
    }
  };

  // Shimmer effect styles
  const shimmerStyles = {
    position: 'absolute',
    inset: '0',
    top: '-8px',
    bottom: '-8px',
    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 300ms',
    transform: isHovered ? 'translateX(100%) skewX(-12deg)' : 'translateX(-100%) skewX(-12deg)',
    animation: isHovered ? 'shimmer 1s ease-in-out' : 'none',
    pointerEvents: 'none'
  };

  // Spinner styles
  const spinnerStyles = {
    width: '1rem',
    height: '1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <button
        style={combinedStyles}
        disabled={disabled || loading}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {/* Shimmer effect overlay */}
        <div style={shimmerStyles}></div>
        
        {loading && (
          <div style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <div style={spinnerStyles}></div>
          </div>
        )}
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </button>
    </>
  );
});

Button.displayName = "Button";

export { Button };