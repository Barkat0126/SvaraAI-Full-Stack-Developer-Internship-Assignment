import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  disabled = false,
  loading = false,
  children, 
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant] || styles.default,
        styles[size === 'default' ? 'default_size' : size] || styles.default_size,
        loading && styles.loading,
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className={styles.shimmer}></div>
      
      {loading && (
        <div className="mr-2 flex items-center">
          <div className={styles.spinner}></div>
        </div>
      )}
      <span className={styles.content}>{children}</span>
    </button>
  );
});

Button.displayName = "Button";

export { Button };