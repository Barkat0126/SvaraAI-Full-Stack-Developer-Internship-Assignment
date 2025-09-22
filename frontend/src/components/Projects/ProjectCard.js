'use client';

import { useState } from 'react';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import EditProjectModal from './EditProjectModal';
import { projectsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProjectCard({ project, onUpdate, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await projectsAPI.delete(project._id);
      toast.success('Project deleted successfully');
      onDelete();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    setIsEditModalOpen(false);
    onUpdate();
  };

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        color: 'bg-gradient-to-r from-green-500 to-emerald-500',
        textColor: 'text-white',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: '🟢'
      },
      planning: {
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        textColor: 'text-white',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: '🟡'
      },
      completed: {
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        textColor: 'text-white',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: '🔵'
      },
      on_hold: {
        color: 'bg-gradient-to-r from-gray-500 to-slate-500',
        textColor: 'text-white',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        icon: '⏸️'
      }
    };
    return configs[status] || configs.planning;
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <>
      <Card className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 rounded-2xl">
        {/* Gradient accent bar */}
        <div className={`h-1.5 w-full ${statusConfig.color}`}></div>
        
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <CardContent className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200 truncate">
                {project.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                {project.description || 'No description provided'}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-all duration-200"
                title="Edit project"
              >
                <span className="text-sm">✏️</span>
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200"
                title="Delete project"
              >
                {isDeleting ? (
                  <div className="animate-spin rounded-full h-3 w-3 border border-red-400 border-t-transparent"></div>
                ) : (
                  <span className="text-sm">🗑️</span>
                )}
              </Button>
            </div>
          </div>

          {/* Status and Date */}
          <div className="flex items-center justify-between">
            <Badge 
              className={`${statusConfig.color} ${statusConfig.textColor} px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5`}
            >
              <span>{statusConfig.icon}</span>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
            </Badge>
            
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <span>📅</span>
              {formatDate(project.createdAt)}
            </div>
          </div>

          {/* Deadline */}
          {project.deadline && (
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-400/20">
              <span className="text-sm">⏰</span>
              <div>
                <div className="text-xs text-slate-400 font-medium">Deadline</div>
                <div className="text-sm font-semibold text-orange-400">
                  {formatDate(project.deadline)}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <span>📋</span>
                <span>{project.taskCount || 0} tasks</span>
              </div>
            </div>
            
            <Button
              onClick={() => window.location.href = `/projects/${project._id}/kanban`}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-1.5 border border-blue-400/20"
            >
              <span>👁️</span>
              View Board
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Progress</span>
              <span>{project.completionPercentage || 0}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${project.completionPercentage || 0}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={project}
        onProjectUpdated={handleUpdate}
      />
    </>
  );
}