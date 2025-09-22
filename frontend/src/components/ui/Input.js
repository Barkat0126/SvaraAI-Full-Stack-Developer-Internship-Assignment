import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.css';

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  label,
  helperText,
  required = false,
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={styles.iconWrapper}>
            <Icon className={styles.icon} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            styles.input,
            Icon && styles.withIcon,
            error && styles.error,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {helperText && (
        <p className={cn(
          styles.helperText,
          error && styles.errorText
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

const Textarea = forwardRef(({ 
  className, 
  error = false,
  label,
  helperText,
  required = false,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          styles.textarea,
          error && styles.error,
          className
        )}
        ref={ref}
        {...props}
      />
      {helperText && (
        <p className={cn(
          styles.helperText,
          error && styles.errorText
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Input, Textarea };