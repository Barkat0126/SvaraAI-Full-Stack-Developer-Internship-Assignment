'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { projectsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const projectColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
];

export default function EditProjectModal({ isOpen, onClose, project, onProjectUpdated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(projectColors[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    if (isOpen && project) {
      setValue('name', project.name);
      setValue('description', project.description || '');
      setValue('status', project.status);
      setValue('deadline', project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '');
      setSelectedColor(project.color || projectColors[0]);
    }
  }, [isOpen, project, setValue]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      const projectData = {
        ...data,
        color: selectedColor,
        deadline: data.deadline || undefined
      };

      await projectsAPI.updateProject(project._id, projectData);
      toast.success('Project updated successfully');
      onProjectUpdated();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedColor(projectColors[0]);
    onClose();
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Edit Project</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="label">Project Name *</label>
            <input
              type="text"
              className={`input ${errors.name ? 'border-red-300' : ''}`}
              placeholder="Enter project name"
              {...register('name', { required: 'Project name is required' })}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Enter project description"
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select className="input" {...register('status')}>
                <option value="active">Active</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="label">Deadline</label>
              <input
                type="date"
                className="input"
                {...register('deadline')}
              />
            </div>
          </div>

          <div>
            <label className="label">Project Color</label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {projectColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}