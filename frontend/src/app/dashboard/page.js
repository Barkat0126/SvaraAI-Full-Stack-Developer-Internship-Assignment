'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import KanbanBoard from '@/components/Kanban/KanbanBoard';
import CreateTaskModal from '@/components/Kanban/CreateTaskModal';
import { useAuth } from '@/contexts/AuthContext';
import { tasksAPI, projectsAPI } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [tasksResponse, projectsResponse] = await Promise.all([
        tasksAPI.getAll(),
        projectsAPI.getAll()
      ]);

      setTasks(tasksResponse.data.tasks || []);
      setProjects(projectsResponse.data.projects || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const response = await tasksAPI.update(taskId, updates);
      const updatedTask = response.data.task;
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsCreateModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 @container">
        {/* Enhanced loading with Tailwind v4 features */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header skeleton with container queries */}
          <div className="@lg:flex @lg:items-center @lg:justify-between space-y-4 @lg:space-y-0">
            <div className="space-y-3">
              <div className="h-8 @md:h-10 @lg:h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-shimmer @sm:w-80 @md:w-96 @lg:w-[28rem]"></div>
              <div className="h-4 @md:h-5 bg-slate-200 rounded-lg animate-pulse w-64 @md:w-80"></div>
            </div>
            <div className="h-10 @md:h-11 bg-slate-200 rounded-xl animate-pulse w-32 @md:w-40"></div>
          </div>

          {/* Stats skeleton with modern grid */}
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-4 @md:p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded-lg w-20 mb-3"></div>
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-16 animate-shimmer"></div>
              </div>
            ))}
          </div>

          {/* Kanban skeleton with container-aware layout */}
          <Card className="glass border-0 shadow-glow-sm backdrop-blur-xl">
            <CardHeader className="@container">
              <div className="@lg:flex @lg:items-center @lg:justify-between space-y-3 @lg:space-y-0">
                <div className="space-y-2">
                  <div className="h-6 @md:h-7 bg-slate-200 rounded-lg w-40 @md:w-48 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-64 @md:w-80 animate-pulse"></div>
                </div>
                <div className="h-9 @md:h-10 bg-slate-200 rounded-xl w-28 @md:w-32 animate-pulse"></div>
              </div>
            </CardHeader>
            <CardContent className="@container">
              <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4 @lg:gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-6 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
                    <div className="space-y-3">
                      {[1, 2].map((j) => (
                        <div key={j} className="glass-dark rounded-xl p-4 animate-pulse">
                          <div className="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden @container">
      {/* Enhanced background with modern CSS */}
      <div className="absolute inset-0 bg-gradient-mesh from-blue-400/10 via-purple-400/5 to-pink-400/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-conic from-purple-400/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 p-4 @md:p-6 @lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 @md:space-y-8">
          {/* Enhanced header with container queries */}
          <div className="@container">
            <div className="@lg:flex @lg:items-center @lg:justify-between space-y-4 @lg:space-y-0">
              <div className="space-y-2 @md:space-y-3">
                <h1 className="text-3xl @md:text-4xl @lg:text-5xl @xl:text-6xl font-bold text-balance">
                  <span className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent drop-shadow-sm">
                    ✨ Dashboard
                  </span>
                </h1>
                <p className="text-slate-700 text-lg @md:text-xl @lg:text-2xl text-pretty max-w-2xl">
                  Manage your projects and tasks efficiently with modern tools
                </p>
                
                {/* Enhanced status indicators with container-aware layout */}
                <div className="flex flex-wrap items-center gap-3 @md:gap-4 pt-2">
                  <div className="flex items-center gap-2 px-3 @md:px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-full shadow-sm backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 text-sm @md:text-base font-medium">Live updates</span>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 @md:px-4 py-2 glass rounded-full shadow-sm">
                    <span className="text-slate-600 text-sm @md:text-base font-medium">{tasks.length} total tasks</span>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 @md:px-4 py-2 glass rounded-full shadow-sm">
                    <span className="text-slate-600 text-sm @md:text-base font-medium">3 projects</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="group relative px-6 @md:px-8 py-3 @md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-glow-md hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 @container"
              >
                
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Enhanced stats grid with container queries */}
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 @container">
            {[
              { label: 'Total Tasks', value: tasks.length, color: 'blue', icon: '📋' },
              { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'yellow', icon: '⏳' },
              { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'green', icon: '✅' }
            ].map((stat, index) => (
              <div key={stat.label} className="group @container">
                <div className="glass rounded-2xl @md:rounded-3xl p-4 @md:p-6 @lg:p-8 hover:shadow-glow-md transition-all duration-300 transform hover:scale-105 border border-white/20">
                  <div className="flex items-center justify-between mb-3 @md:mb-4">
                    <span className="text-slate-600 text-sm @md:text-base font-medium text-pretty">{stat.label}</span>
                    <span className="text-xl @md:text-2xl">{stat.icon}</span>
                  </div>
                  <div className={`text-2xl @md:text-3xl @lg:text-4xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Kanban Board with modern features */}
          <Card className="glass border-0 shadow-glow-sm backdrop-blur-xl rounded-3xl overflow-hidden @container">
            <CardHeader className="bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border-b border-white/20 @container">
              <div className="@lg:flex @lg:items-center @lg:justify-between space-y-3 @lg:space-y-0">
                <div className="space-y-1 @md:space-y-2">
                  <CardTitle className="text-xl @md:text-2xl @lg:text-3xl font-bold text-slate-800 text-balance">
                    Project Kanban Board
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm @md:text-base @lg:text-lg text-pretty">
                    Organize and track your tasks with drag-and-drop functionality
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 px-3 @md:px-4 py-2 glass rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-heartbeat"></div>
                  <span className="text-slate-600 text-xs @md:text-sm font-medium">Real-time sync</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 @md:p-6 @lg:p-8 @container">
              <div className="w-full">
                <KanbanBoard 
                  tasks={tasks} 
                  onTaskUpdate={handleTaskUpdate}
                  className="@container"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTaskCreated={handleTaskCreated}
          className="@container"
        />
      )}
    </div>
  );
}