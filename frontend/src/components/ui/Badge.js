import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = {
  variant: {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/80",
    primary: "bg-indigo-100 text-indigo-800 border-indigo-200",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    success: "bg-green-500 text-white hover:bg-green-500/80",
    warning: "bg-yellow-500 text-white hover:bg-yellow-500/80",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/80",
    outline: "text-slate-950 border border-slate-200 hover:bg-slate-100",
  },
  size: {
    default: "px-2.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  },
};

// Priority-specific variants
const priorityVariants = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

// Status-specific variants
const statusVariants = {
  todo: "bg-gray-100 text-gray-800 border-gray-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  done: "bg-green-100 text-green-800 border-green-200",
};

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default",
  priority,
  status,
  children,
  ...props 
}, ref) => {
  // Determine which variant to use based on props
  let variantClass = badgeVariants.variant[variant];
  
  if (priority && priorityVariants[priority]) {
    variantClass = priorityVariants[priority];
  } else if (status && statusVariants[status]) {
    variantClass = statusVariants[status];
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClass,
        badgeVariants.size[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Badge.displayName = "Badge";

// Specific badge components for common use cases
const PriorityBadge = ({ priority, ...props }) => {
  const priorityLabels = {
    high: "High",
    medium: "Medium", 
    low: "Low"
  };

  return (
    <Badge priority={priority} {...props}>
      {priorityLabels[priority] || priority}
    </Badge>
  );
};

const StatusBadge = ({ status, ...props }) => {
  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done"
  };

  return (
    <Badge status={status} {...props}>
      {statusLabels[status] || status}
    </Badge>
  );
};

export { Badge, PriorityBadge, StatusBadge, badgeVariants };