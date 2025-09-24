'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { projectsAPI } from '@/lib/api';
import ProjectCard from '@/components/Projects/ProjectCard';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';
import { Button } from '@/components/ui';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #475569 100%)'
      }}>
        <div style={{
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: '8rem',
          width: '8rem',
          borderBottom: '2px solid #7c3aed'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #475569 100%)',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: typeof window !== 'undefined' && window.innerWidth >= 640 ? 'row' : 'column',
          alignItems: typeof window !== 'undefined' && window.innerWidth >= 640 ? 'center' : 'stretch',
          justifyContent: typeof window !== 'undefined' && window.innerWidth >= 640 ? 'space-between' : 'flex-start',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #ffffff, #cbd5e1, #a855f7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              lineHeight: '1.2'
            }}>
              Projects
            </h1>
            <p style={{
              color: '#94a3b8',
              marginTop: '0.5rem',
              fontSize: '1rem'
            }}>
              Create and manage your projects
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            onMouseEnter={() => setHoveredButton('create')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              background: 'linear-gradient(to right, #7c3aed, #a855f7)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: hoveredButton === 'create' ? '0 8px 15px rgba(124, 58, 237, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
              transform: hoveredButton === 'create' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            <span>➕</span>
            Create Project
          </button>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: '1px solid rgba(51, 65, 85, 0.5)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>📋</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              No projects yet
            </h3>
            <p style={{
              color: '#94a3b8',
              marginBottom: '2rem',
              fontSize: '1rem'
            }}>
              Create your first project to get started with organizing your tasks
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              onMouseEnter={() => setHoveredButton('createFirst')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                background: 'linear-gradient(to right, #7c3aed, #a855f7)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: hoveredButton === 'createFirst' ? '0 8px 15px rgba(124, 58, 237, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                transform: hoveredButton === 'createFirst' ? 'translateY(-1px)' : 'translateY(0)',
                margin: '0 auto'
              }}
            >
              <span>➕</span>
              Create Your First Project
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 && (
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
          <div style={{
            marginTop: '4rem',
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(51, 65, 85, 0.5)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📊</span>
              Project Overview
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'repeat(4, 1fr)' : 
                                 typeof window !== 'undefined' && window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
              gap: '1.5rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
              }}>
                <div style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#60a5fa'
                }}>
                  {projects.length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
                  Total Projects
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
              }}>
                <div style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#4ade80'
                }}>
                  {projects.filter(p => p.status === 'active').length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
                  Active Projects
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(234, 179, 8, 0.2)',
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
              }}>
                <div style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#fbbf24'
                }}>
                  {projects.filter(p => p.status === 'planning').length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
                  In Planning
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)'
              }}>
                <div style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#a78bfa'
                }}>
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
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