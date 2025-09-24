'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { tasksAPI, projectsAPI } from '@/lib/api';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';
import { getPriorityConfig, PRIORITY_OPTIONS } from '@/lib/priorityUtils';
import toast from 'react-hot-toast';

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated, projectId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      deadline: '',
      projectId: projectId || '',
      tags: []
    }
  });

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      if (projectId) {
        setValue('projectId', projectId);
      }
    }
  }, [isOpen, projectId, setValue]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateTask = async (data) => {
    try {
      setIsLoading(true);
      
      const taskData = {
        ...data,
        tags: tags,
        project: data.projectId || undefined
      };

      await tasksAPI.create(taskData);
      toast.success('Task created successfully!');
      
      reset();
      setTags([]);
      setTagInput('');
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setTags([]);
    setTagInput('');
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal container with enhanced animations */}
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <Card variant="elevated" className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4 border-0">
          {/* Gradient header */}
          <CardHeader className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-8 rounded-t-3xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30 rounded-t-3xl">
              <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-white mb-2">✨ Create New Task</CardTitle>
                <CardDescription className="text-indigo-100 text-lg">Add a new task to your project with detailed information</CardDescription>
              </div>
              <button
                onClick={handleClose}
                className="h-12 w-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90 hover:scale-110"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
          </CardHeader>

          {/* Form content with enhanced card sections */}
          <CardContent className="p-10 max-h-[calc(95vh-200px)] overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white/50">
            <form onSubmit={handleSubmit(handleCreateTask)} className="space-y-10">
              
              {/* Basic Information Card */}
              <Card variant="glass" className="border-2 border-indigo-200/60 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mx-2 my-6">
                <CardHeader className="pb-6 px-8 pt-8">
                  <CardTitle className="text-2xl text-indigo-800 flex items-center gap-3 mb-2">
                    <span className="text-3xl">📝</span>
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-indigo-600 text-base">
                    Essential details about your task
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-8">
                  {/* Task Title */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      Task Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register('title', { required: 'Task title is required' })}
                      placeholder="Enter a clear and descriptive task title..."
                      className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/90 focus:bg-white text-lg shadow-sm hover:shadow-md"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                        <span>⚠️</span>
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      Description
                    </label>
                    <textarea
                      {...register('description')}
                      placeholder="Provide detailed information about what needs to be done..."
                      rows={4}
                      className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/90 focus:bg-white resize-none text-base shadow-sm hover:shadow-md"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Task Settings Card */}
              <Card variant="glass" className="border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 to-teal-50/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mx-2 my-6">
                <CardHeader className="pb-6 px-8 pt-8">
                  <CardTitle className="text-2xl text-emerald-800 flex items-center gap-3 mb-2">
                    <span className="text-3xl">⚙️</span>
                    Task Settings
                  </CardTitle>
                  <CardDescription className="text-emerald-600 text-base">
                    Configure priority, project, and deadline
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Priority */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="text-lg">🚨</span>
                        Priority Level
                      </label>
                      <select
                        {...register('priority')}
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/90 focus:bg-white text-base shadow-sm hover:shadow-md"
                      >
                        {PRIORITY_OPTIONS.map((priority) => {
                          const config = getPriorityConfig(priority);
                          return (
                            <option key={priority} value={priority}>
                              {config.icon} {config.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* Project */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="text-lg">📁</span>
                        Project
                      </label>
                      <select
                        {...register('projectId')}
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/90 focus:bg-white text-base shadow-sm hover:shadow-md"
                      >
                        <option value="">📂 Select a project</option>
                        {Array.isArray(projects) && projects.map((project) => (
                          <option key={project._id} value={project._id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Deadline */}
                    <div className="space-y-4 lg:col-span-2 mt-4">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="text-lg">📅</span>
                        Deadline (Optional)
                      </label>
                      <Input
                        type="datetime-local"
                        {...register('deadline')}
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/90 focus:bg-white text-base shadow-sm hover:shadow-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags Card */}
              <Card variant="glass" className="border-2 border-purple-200/60 bg-gradient-to-br from-purple-50/70 to-pink-50/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mx-2 my-6">
                <CardHeader className="pb-6 px-8 pt-8">
                  <CardTitle className="text-2xl text-purple-800 flex items-center gap-3 mb-2">
                    <span className="text-3xl">🏷️</span>
                    Tags & Labels
                  </CardTitle>
                  <CardDescription className="text-purple-600 text-base">
                    Add tags to categorize and organize your task
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-8 pb-8">
                  {/* Tag input */}
                  <div className="flex gap-4">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Type a tag and press Enter..."
                      className="flex-1 px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/90 focus:bg-white text-base shadow-sm hover:shadow-md"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                    >
                      Add Tag
                    </Button>
                  </div>

                  {/* Tags display */}
                  {tags.length > 0 && (
                    <div className="p-6 bg-white/70 rounded-xl border-2 border-purple-100 shadow-inner">
                      <p className="text-sm font-semibold text-purple-700 mb-4 flex items-center gap-2">
                        <span>🏷️</span>
                        Current Tags:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 text-purple-500 hover:text-purple-700 transition-colors hover:bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </form>
          </CardContent>

          {/* Action buttons */}
          <CardFooter className="flex items-center justify-end gap-4 px-8 py-6 bg-gray-50/80 rounded-b-3xl border-t border-gray-200">
            <Button
              type="button"
              onClick={handleClose}
              className="px-8 py-4 text-gray-600 bg-white hover:bg-gray-100 rounded-xl transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit(handleCreateTask)}
              className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Task...
                </>
              ) : (
                <>
                  <span className="text-xl">✨</span>
                  Create Task
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}