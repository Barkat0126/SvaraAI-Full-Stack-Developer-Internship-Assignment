'use client';

import { useState, useEffect } from 'react';
import { projectsAPI } from '@/lib/api';
import ProjectCard from '@/components/Projects/ProjectCard';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';
import { Button } from '@/components/ui';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-300 font-medium">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-slate-400 text-lg">
                Manage and organize your projects efficiently
              </p>
            </div>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border border-blue-400/20"
            >
              <span className="text-lg">✨</span>
              New Project
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-700/50 text-center max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/20">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Projects Yet
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Start your journey by creating your first project. Organize your tasks and boost your productivity!
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto border border-blue-400/20"
              >
                <span className="text-lg">🚀</span>
                Create Your First Project
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <ProjectCard
                  project={project}
                  onUpdate={fetchProjects}
                  onDelete={fetchProjects}
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {projects.length > 0 && (
          <div className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📊</span>
              Project Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-400/20">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {projects.length}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  Total Projects
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/20">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {projects.filter(p => p.status === 'active').length}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  Active Projects
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/20">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {projects.filter(p => p.status === 'planning').length}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  In Planning
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-400/20">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  Completed
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreated={fetchProjects}
      />
    </div>
  );
}