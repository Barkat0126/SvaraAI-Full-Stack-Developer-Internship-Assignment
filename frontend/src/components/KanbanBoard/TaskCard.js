'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

export default function TaskCard({ task, getPriorityColor, getPriorityLabel, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';
  
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return '🔥';
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative bg-slate-800/60 backdrop-blur-sm rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing border border-slate-700/50 hover:border-slate-600/50 touch-manipulation ${
        isDragging ? 'rotate-3 scale-105 shadow-2xl' : ''
      } ${isOverdue ? 'ring-2 ring-red-500/50' : ''}`}
    >
      {/* Priority Indicator */}
      <div className="flex items-center justify-between mb-2 lg:mb-3">
        <div className="flex items-center gap-1 lg:gap-2">
          <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${getPriorityColor(task.priority)} shadow-lg`}></div>
          <span className="text-xs font-medium text-slate-300">
            <span className="hidden lg:inline">{getPriorityIcon(task.priority)} </span>
            {getPriorityLabel(task.priority)}
          </span>
        </div>
        {isOverdue && (
          <div className="flex items-center gap-1 text-red-400">
            <span className="text-xs">⏰</span>
            <span className="text-xs font-medium hidden lg:inline">Overdue</span>
          </div>
        )}
      </div>

      {/* Task Title */}
      <h4 className="text-white font-semibold text-xs lg:text-sm mb-1 lg:mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-slate-400 text-xs mb-2 lg:mb-3 line-clamp-1 lg:line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Task Meta Information */}
      <div className="space-y-1 lg:space-y-2">
        {/* Deadline */}
        {task.deadline && (
          <div className="flex items-center gap-1 lg:gap-2 text-xs">
            <span className="text-slate-500 hidden lg:inline">📅</span>
            <span className={`${isOverdue ? 'text-red-400' : 'text-slate-400'} truncate`}>
              {format(new Date(task.deadline), 'MMM dd')}
              <span className="hidden lg:inline">, yyyy</span>
            </span>
          </div>
        )}

        {/* Project */}
        {task.project && (
          <div className="flex items-center gap-1 lg:gap-2 text-xs">
            <span className="text-slate-500 hidden lg:inline">📁</span>
            <span className="text-slate-400 truncate">{task.project.name}</span>
          </div>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 lg:mt-2">
            {task.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-1 lg:px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/50 truncate max-w-16 lg:max-w-none"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="px-1 lg:px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full border border-slate-600/50">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Drag Handle Indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex flex-col gap-1">
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}