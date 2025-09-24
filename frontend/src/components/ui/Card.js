import { forwardRef } from 'react';

const Card = forwardRef(({ variant = "default", style = {}, ...props }, ref) => {
  // Base card styles
  const baseStyles = {
    borderRadius: '1rem',
    border: '1px solid rgba(229, 231, 235, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(2px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    transition: 'all 300ms'
  };

  // Variant styles
  const variantStyles = {
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(6px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    elevated: {
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
    },
    flat: {
      boxShadow: 'none',
      border: '1px solid rgb(229, 231, 235)'
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...(variant !== "default" && variantStyles[variant]),
    ...style
  };

  return (
    <div
      ref={ref}
      style={combinedStyles}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = forwardRef(({ style = {}, ...props }, ref) => {
  const headerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1.5rem',
    paddingBottom: '0',
    ...style
  };

  return (
    <div
      ref={ref}
      style={headerStyles}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ style = {}, ...props }, ref) => {
  const titleStyles = {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1',
    letterSpacing: '-0.025em',
    color: 'rgb(17, 24, 39)',
    margin: '0',
    ...style
  };

  return (
    <h3
      ref={ref}
      style={titleStyles}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ style = {}, ...props }, ref) => {
  const descriptionStyles = {
    fontSize: '0.875rem',
    color: 'rgb(107, 114, 128)',
    lineHeight: '1.5',
    margin: '0',
    ...style
  };

  return (
    <p
      ref={ref}
      style={descriptionStyles}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ style = {}, ...props }, ref) => {
  const contentStyles = {
    padding: '1.5rem',
    ...style
  };

  return (
    <div 
      ref={ref} 
      style={contentStyles} 
      {...props} 
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ style = {}, ...props }, ref) => {
  const footerStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    paddingTop: '0',
    ...style
  };

  return (
    <div
      ref={ref}
      style={footerStyles}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };