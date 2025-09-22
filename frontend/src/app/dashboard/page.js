'use client';

import { useState, useEffect } from 'react';
import { KanbanBoard } from '@/components/KanbanBoard';
import { tasksAPI, projectsAPI } from '@/lib/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-700/50 rounded-lg w-64"></div>
          <div className="h-96 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Task Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Manage your tasks with drag and drop</p>
          </div>
        </div>

        <KanbanBoard 
           tasks={tasks} 
           onTaskUpdate={handleTaskUpdate}
           projects={projects}
         />
      </div>
    </div>
  );
}