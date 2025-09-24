'use client';

import { useState, useRef, useEffect } from 'react';

export default function ProjectSelector({ projects, selectedProject, onProjectChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProjectSelect = (project) => {
    onProjectChange(project);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 lg:gap-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2 lg:py-3 text-white hover:bg-slate-700/60 hover:border-slate-600/50 transition-all duration-300 min-w-[150px] lg:min-w-[200px] group text-sm lg:text-base"
      >
        <div className="flex items-center gap-1 lg:gap-2 flex-1">
          <span className="text-base lg:text-lg hidden sm:inline">📁</span>
          <div className="text-left">
            <p className="text-xs lg:text-sm font-medium truncate max-w-20 lg:max-w-none">
              {selectedProject ? selectedProject.name : 'All Projects'}
            </p>
            <p className="text-xs text-slate-400 hidden lg:block">
              {selectedProject ? 'Selected project' : `${projects.length} projects available`}
            </p>
          </div>
        </div>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg lg:rounded-xl shadow-2xl z-50 max-h-48 lg:max-h-64 overflow-y-auto">
          {/* All Projects Option */}
          <button
            onClick={() => handleProjectSelect(null)}
            className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 hover:bg-slate-700/60 transition-colors border-b border-slate-700/30 ${
              !selectedProject ? 'bg-blue-600/20 text-blue-300' : 'text-white'
            }`}
          >
            <div className="flex items-center gap-1 lg:gap-2">
              <span className="text-base lg:text-lg hidden sm:inline">🌐</span>
              <div>
                <p className="font-medium text-sm lg:text-base">All Projects</p>
                <p className="text-xs text-slate-400 hidden lg:block">Show tasks from all projects</p>
              </div>
            </div>
          </button>

          {/* Project List */}
          {projects.length > 0 ? (
            projects.map((project) => (
              <button
                key={project._id}
                onClick={() => handleProjectSelect(project)}
                className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 hover:bg-slate-700/60 transition-colors ${
                  selectedProject?._id === project._id ? 'bg-blue-600/20 text-blue-300' : 'text-white'
                } ${projects.indexOf(project) === projects.length - 1 ? '' : 'border-b border-slate-700/30'}`}
              >
                <div className="flex items-center gap-1 lg:gap-2">
                  <span className="text-base lg:text-lg hidden sm:inline">📁</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm lg:text-base truncate">{project.name}</p>
                    <p className="text-xs text-slate-400 hidden lg:block truncate">{project.description || 'No description'}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 lg:px-4 py-4 lg:py-6 text-center text-slate-400">
              <span className="text-xl lg:text-2xl mb-2 block">📂</span>
              <p className="text-xs lg:text-sm">No projects available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}