// Priority utility functions for consistent color-coded priority system

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const getPriorityConfig = (priority) => {
  const configs = {
    [PRIORITY_LEVELS.LOW]: {
      label: 'Low',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      textColor: 'text-white',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      ringColor: 'ring-green-500/20',
      icon: '🟢',
      badgeClass: 'bg-green-100 text-green-800 border-green-200',
      dotClass: 'bg-green-500',
      priority: 1
    },
    [PRIORITY_LEVELS.MEDIUM]: {
      label: 'Medium',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      textColor: 'text-white',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      ringColor: 'ring-yellow-500/20',
      icon: '🟡',
      badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      dotClass: 'bg-yellow-500',
      priority: 2
    },
    [PRIORITY_LEVELS.HIGH]: {
      label: 'High',
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      textColor: 'text-white',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      ringColor: 'ring-orange-500/20',
      icon: '🟠',
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-200',
      dotClass: 'bg-orange-500',
      priority: 3
    },
    [PRIORITY_LEVELS.URGENT]: {
      label: 'Urgent',
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      textColor: 'text-white',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      ringColor: 'ring-red-500/20',
      icon: '🔴',
      badgeClass: 'bg-red-100 text-red-800 border-red-200',
      dotClass: 'bg-red-500',
      priority: 4
    }
  };
  
  return configs[priority] || configs[PRIORITY_LEVELS.MEDIUM];
};

export const getStatusConfig = (status) => {
  const configs = {
    todo: {
      label: 'To Do',
      color: 'bg-gradient-to-r from-slate-500 to-gray-500',
      textColor: 'text-white',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      icon: '📋',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
      dotClass: 'bg-slate-500'
    },
    inProgress: {
      label: 'In Progress',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      textColor: 'text-white',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: '⚡',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      dotClass: 'bg-blue-500'
    },
    completed: {
      label: 'Completed',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      textColor: 'text-white',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '✅',
      badgeClass: 'bg-green-100 text-green-800 border-green-200',
      dotClass: 'bg-green-500'
    }
  };
  
  return configs[status] || configs.todo;
};

export const sortByPriority = (tasks) => {
  return tasks.sort((a, b) => {
    const priorityA = getPriorityConfig(a.priority).priority;
    const priorityB = getPriorityConfig(b.priority).priority;
    return priorityB - priorityA; // Higher priority first
  });
};

export const getPriorityBadge = (priority, size = 'sm') => {
  const config = getPriorityConfig(priority);
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return {
    className: `inline-flex items-center gap-1 rounded-full font-medium border ${config.badgeClass} ${sizeClasses[size]}`,
    icon: config.icon,
    label: config.label
  };
};

export const getStatusBadge = (status, size = 'sm') => {
  const config = getStatusConfig(status);
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return {
    className: `inline-flex items-center gap-1 rounded-full font-medium border ${config.badgeClass} ${sizeClasses[size]}`,
    icon: config.icon,
    label: config.label
  };
};

export const getPriorityDot = (priority, size = 'sm') => {
  const config = getPriorityConfig(priority);
  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  return {
    className: `rounded-full ${config.dotClass} ${sizeClasses[size]}`,
    title: `${config.label} Priority`
  };
};