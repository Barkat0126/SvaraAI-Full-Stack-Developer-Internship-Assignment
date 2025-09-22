import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Badge.module.css';

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default",
  priority,
  status,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles.badge,
        priority && styles[`priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`],
        status && styles[`status${status.charAt(0).toUpperCase() + status.slice(1).replace('-', '')}`],
        !priority && !status && styles[variant],
        size !== "default" && styles[size],
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

export { Badge, PriorityBadge, StatusBadge };