import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

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
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
            "transition-all duration-200",
            Icon && "pl-10",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {helperText && (
        <p className={cn(
          "text-xs",
          error ? "text-red-600" : "text-gray-500"
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
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
          "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          "transition-all duration-200 resize-none",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {helperText && (
        <p className={cn(
          "text-xs",
          error ? "text-red-600" : "text-gray-500"
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Input, Textarea };