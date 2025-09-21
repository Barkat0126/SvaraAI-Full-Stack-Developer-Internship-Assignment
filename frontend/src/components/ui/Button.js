import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = {
  variant: {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    link: "text-indigo-600 underline-offset-4 hover:underline focus:ring-indigo-500",
  },
  size: {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1 text-xs",
    lg: "h-12 px-8 py-3 text-base",
    icon: "h-10 w-10 p-0",
  },
};

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
        // Base styles
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variant styles
        buttonVariants.variant[variant],
        // Size styles
        buttonVariants.size[size],
        // Loading state
        loading && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <span className="mr-2 animate-pulse">⏳</span>
      )}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };