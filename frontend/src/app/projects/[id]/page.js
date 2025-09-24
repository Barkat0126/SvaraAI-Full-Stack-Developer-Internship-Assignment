'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsAPI, tasksAPI } from '@/lib/api';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0
  });

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const [projectResponse, tasksResponse] = await Promise.all([
        projectsAPI.getById(params.id),
        tasksAPI.getByProject(params.id)
      ]);
      
      setProject(projectResponse.data.project);
      
      // Calculate task statistics
      const tasks = tasksResponse.data.tasks;
      setStats({
        totalTasks: tasks.length,
        todoTasks: tasks.filter(task => task.status === 'todo').length,
        inProgressTasks: tasks.filter(task => task.status === 'in-progress').length,
        doneTasks: tasks.filter(task => task.status === 'done').length
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      router.push('/projects');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      'active': {
        bg: 'bg-green-500/10',
        border: 'border-green-400/20',
        text: 'text-green-400',
        icon: '🟢'
      },
      'on-hold': {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-400/20',
        text: 'text-yellow-400',
        icon: '🟡'
      },
      'completed': {
        bg: 'bg-blue-500/10',
        border: 'border-blue-400/20',
        text: 'text-blue-400',
        icon: '🔵'
      },
      'cancelled': {
        bg: 'bg-red-500/10',
        border: 'border-red-400/20',
        text: 'text-red-400',
        icon: '🔴'
      }
    };
    return configs[status] || configs.active;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-300 font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/20">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <p className="text-slate-400 mb-8">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Button
            onClick={() => router.push('/projects')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-blue-400/20"
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(project.status);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Button
              onClick={() => router.push('/projects')}
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200"
            >
              ← Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Project Details
            </h1>
          </div>
        </div>

        {/* Project Header Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8 hover:border-slate-600/50 transition-all duration-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📁</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{project.name}</h2>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusConfig.bg} border ${statusConfig.border}`}>
                    <span className="text-sm">{statusConfig.icon}</span>
                    <span className={`text-sm font-medium ${statusConfig.text}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {project.description && (
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">{project.description}</p>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-400/20">
                    <span className="text-blue-400">📅</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Deadline</p>
                    <p className="text-white font-medium">{formatDate(project.deadline)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-400/20">
                    <span className="text-green-400">🕒</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Created</p>
                    <p className="text-white font-medium">{formatDate(project.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push(`/projects/${params.id}/kanban`)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-blue-400/20 flex items-center gap-2"
              >
                <span className="text-lg">📋</span>
                Open Kanban Board
              </Button>
              
              <Button
                onClick={() => router.push('/projects')}
                variant="outline"
                className="bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-white px-6 py-3 rounded-xl transition-all duration-200"
              >
                Back to Projects
              </Button>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Tasks</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500/20 to-slate-600/20 rounded-xl flex items-center justify-center border border-slate-400/20">
                <span className="text-slate-400 text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">To Do</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.todoTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500/20 to-slate-600/20 rounded-xl flex items-center justify-center border border-slate-400/20">
                <span className="text-slate-400 text-xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.inProgressTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-400/20">
                <span className="text-blue-400 text-xl">⚡</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.doneTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center border border-green-400/20">
                <span className="text-green-400 text-xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => router.push(`/projects/${params.id}/kanban`)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-blue-400/20 flex flex-col items-center gap-3 h-auto"
            >
              <span className="text-3xl">📋</span>
              <div className="text-center">
                <p className="font-semibold">Kanban Board</p>
                <p className="text-sm opacity-80">Manage tasks with drag & drop</p>
              </div>
            </Button>

            <Button
              onClick={() => router.push('/projects')}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-slate-500/20 flex flex-col items-center gap-3 h-auto"
            >
              <span className="text-3xl">📁</span>
              <div className="text-center">
                <p className="font-semibold">All Projects</p>
                <p className="text-sm opacity-80">View all your projects</p>
              </div>
            </Button>

            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-green-400/20 flex flex-col items-center gap-3 h-auto"
            >
              <span className="text-3xl">📊</span>
              <div className="text-center">
                <p className="font-semibold">Dashboard</p>
                <p className="text-sm opacity-80">View analytics & insights</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}