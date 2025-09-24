import { forwardRef } from 'react';

const Badge = forwardRef(({ 
  variant = "default", 
  size = "default",
  priority,
  status,
  children,
  style = {},
  ...props 
}, ref) => {
  // Base badge styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    transition: 'all 200ms',
    border: '1px solid transparent'
  };

  // Priority styles
  const priorityStyles = {
    High: {
      backgroundColor: 'rgb(254, 226, 226)',
      color: 'rgb(153, 27, 27)',
      borderColor: 'rgb(252, 165, 165)'
    },
    Medium: {
      backgroundColor: 'rgb(254, 243, 199)',
      color: 'rgb(146, 64, 14)',
      borderColor: 'rgb(251, 191, 36)'
    },
    Low: {
      backgroundColor: 'rgb(220, 252, 231)',
      color: 'rgb(21, 128, 61)',
      borderColor: 'rgb(134, 239, 172)'
    }
  };

  // Status styles
  const statusStyles = {
    'todo': {
      backgroundColor: 'rgb(243, 244, 246)',
      color: 'rgb(55, 65, 81)',
      borderColor: 'rgb(209, 213, 219)'
    },
    'in-progress': {
      backgroundColor: 'rgb(219, 234, 254)',
      color: 'rgb(30, 64, 175)',
      borderColor: 'rgb(147, 197, 253)'
    },
    'done': {
      backgroundColor: 'rgb(220, 252, 231)',
      color: 'rgb(21, 128, 61)',
      borderColor: 'rgb(134, 239, 172)'
    }
  };

  // Variant styles
  const variantStyles = {
    default: {
      backgroundColor: 'rgb(243, 244, 246)',
      color: 'rgb(55, 65, 81)'
    },
    secondary: {
      backgroundColor: 'rgb(248, 250, 252)',
      color: 'rgb(71, 85, 105)',
      borderColor: 'rgb(226, 232, 240)'
    },
    destructive: {
      backgroundColor: 'rgb(239, 68, 68)',
      color: 'rgb(255, 255, 255)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'rgb(55, 65, 81)',
      borderColor: 'rgb(209, 213, 219)'
    }
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '0.125rem 0.5rem',
      fontSize: '0.625rem'
    },
    default: {},
    lg: {
      padding: '0.375rem 1rem',
      fontSize: '0.875rem'
    }
  };

  // Determine which styles to apply
  let appliedStyles = { ...baseStyles };

  if (priority && priorityStyles[priority]) {
    appliedStyles = { ...appliedStyles, ...priorityStyles[priority] };
  } else if (status && statusStyles[status]) {
    appliedStyles = { ...appliedStyles, ...statusStyles[status] };
  } else if (variantStyles[variant]) {
    appliedStyles = { ...appliedStyles, ...variantStyles[variant] };
  }

  if (sizeStyles[size]) {
    appliedStyles = { ...appliedStyles, ...sizeStyles[size] };
  }

  // Merge with custom styles
  const finalStyles = { ...appliedStyles, ...style };

  return (
    <div
      ref={ref}
      style={finalStyles}
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
    "High": "High",
    "Medium": "Medium", 
    "Low": "Low"
  };

  return (
    <Badge priority={priority} {...props}>
      {priorityLabels[priority] || priority}
    </Badge>
  );
};

const StatusBadge = ({ status, ...props }) => {
  const statusLabels = {
    "todo": "To Do",
    "in-progress": "In Progress",
    "done": "Done"
  };

  return (
    <Badge status={status} {...props}>
      {statusLabels[status] || status}
    </Badge>
  );
};

export { Badge, PriorityBadge, StatusBadge };