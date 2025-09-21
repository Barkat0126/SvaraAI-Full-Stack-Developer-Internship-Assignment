'use client';

import { useState } from 'react';
import { tasksAPI } from '@/lib/api';
import EditTaskModal from './EditTaskModal';
import { Card, CardContent } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await tasksAPI.delete(task._id);
      toast.success('Task deleted successfully');
      onDelete();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    setIsEditModalOpen(false);
    onUpdate();
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: {
        color: 'bg-gradient-to-r from-red-500 to-pink-500',
        textColor: 'text-white',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '🔴'
      },
      medium: {
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        textColor: 'text-white',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: '🟡'
      },
      low: {
        color: 'bg-gradient-to-r from-green-500 to-emerald-500',
        textColor: 'text-white',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: '🟢'
      }
    };
    return configs[priority] || configs.medium;
  };

  const getStatusConfig = (status) => {
    const configs = {
      todo: {
        color: 'bg-gradient-to-r from-slate-500 to-gray-500',
        textColor: 'text-white',
        icon: '📋'
      },
      inProgress: {
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        textColor: 'text-white',
        icon: '⚡'
      },
      completed: {
        color: 'bg-gradient-to-r from-green-500 to-emerald-500',
        textColor: 'text-white',
        icon: '✅'
      }
    };
    return configs[status] || configs.todo;
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const statusConfig = getStatusConfig(task.status);

  return (
    <>
      <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/30 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 rounded-xl cursor-pointer">
        {/* Priority accent bar */}
        <div className={`h-1 w-full ${priorityConfig.color}`}></div>
        
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <CardContent className="relative p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-200 line-clamp-2">
                {task.title}
              </h4>
              {task.description && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true);
                }}
                className="h-7 w-7 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <span className="text-xs">✏️</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                className="h-7 w-7 flex items-center justify-center hover:bg-red-100 hover:text-red-600 rounded-lg transition-all duration-200"
                title="Delete task"
              >
                {isDeleting ? (
                  <div className="animate-spin rounded-full h-3 w-3 border border-red-500 border-t-transparent"></div>
                ) : (
                  <span className="text-xs">🗑️</span>
                )}
              </button>
            </div>
          </div>

          {/* Priority and Project */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`${priorityConfig.color} ${priorityConfig.textColor} px-2 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1`}>
              <span>{priorityConfig.icon}</span>
              {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
            </div>
            
            {task.project && (
              <div className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <span>📁</span>
                {task.project.name}
              </div>
            )}
          </div>

          {/* Deadline */}
          {task.deadline && (
            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
              <span className="text-xs">⏰</span>
              <div className="flex-1">
                <div className="text-xs text-gray-600 font-medium">Due</div>
                <div className="text-xs font-semibold text-orange-700">
                  {formatDate(task.deadline)}
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  +{task.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Assignee */}
          {task.assignee && (
            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {task.assignee.name?.charAt(0).toUpperCase() || '👤'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-600 font-medium">Assigned to</div>
                <div className="text-xs font-semibold text-blue-700 truncate">
                  {task.assignee.name || task.assignee.email}
                </div>
              </div>
            </div>
          )}

          {/* Status indicator */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className={`${statusConfig.color} ${statusConfig.textColor} px-2 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1`}>
              <span>{statusConfig.icon}</span>
              {task.status?.charAt(0).toUpperCase() + task.status?.slice(1).replace('_', ' ')}
            </div>
            
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <span>📅</span>
              {formatDate(task.createdAt)}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onTaskUpdated={handleUpdate}
      />
    </>
  );
}