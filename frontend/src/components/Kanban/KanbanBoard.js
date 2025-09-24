'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { tasksAPI } from '@/lib/api';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal';
import { Button } from '@/components/ui';
// Heroicons removed - using emoji instead
import toast from 'react-hot-toast';

const columns = [
  { 
    id: 'To Do', 
    title: 'To Do', 
    color: 'bg-gradient-to-br from-slate-500 to-slate-600',
    bgColor: 'bg-gradient-to-br from-slate-50/80 to-gray-50/80',
    textColor: 'text-slate-800',
    badgeColor: 'bg-slate-200/80 text-slate-800 border border-slate-300/50',
    borderColor: 'border-slate-200/60',
    hoverColor: 'hover:bg-slate-50/90',
    icon: '📋'
  },
  { 
    id: 'In Progress', 
    title: 'In Progress', 
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80',
    textColor: 'text-blue-800',
    badgeColor: 'bg-blue-200/80 text-blue-800 border border-blue-300/50',
    borderColor: 'border-blue-200/60',
    hoverColor: 'hover:bg-blue-50/90',
    icon: '⚡'
  },
  { 
    id: 'Done', 
    title: 'Completed', 
    color: 'bg-gradient-to-br from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50/80 to-green-50/80',
    textColor: 'text-emerald-800',
    badgeColor: 'bg-emerald-200/80 text-emerald-800 border border-emerald-300/50',
    borderColor: 'border-emerald-200/60',
    hoverColor: 'hover:bg-emerald-50/90',
    icon: '✅'
  }
];

export default function KanbanBoard({ projectId = null, project = null }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = projectId 
        ? await tasksAPI.getByProject(projectId)
        : await tasksAPI.getAll();
      
      const taskData = response.data.tasks || response.data;
      // Ensure tasks is always an array
      setTasks(Array.isArray(taskData) ? taskData : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
      // Set empty array on error to prevent filter issues
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = Array.isArray(tasks) ? tasks.find(task => task._id === draggableId) : null;
    if (!draggedTask) return;

    try {
      // Optimistic update
      const updatedTasks = Array.isArray(tasks) ? tasks.map(task => 
        task._id === draggableId 
          ? { ...task, status: destination.droppableId }
          : task
      ) : [];
      
      setTasks(updatedTasks);

      // Update on server
      await tasksAPI.updateTaskStatus(draggableId, destination.droppableId);
      toast.success('Task status updated');
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
      // Revert optimistic update
      fetchTasks();
    }
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setIsCreateModalOpen(false);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 font-semibold text-lg">Loading tasks...</p>
            <p className="text-gray-500 text-sm">Please wait while we fetch your data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-300/10 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
                {project?.name || 'Project Board'}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl font-medium">
                {project?.description || 'Manage your tasks efficiently with drag & drop'}
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live updates
                </span>
                <span>•</span>
                <span>{Array.isArray(tasks) ? tasks.length : 0} total tasks</span>
              </div>
            </div>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-600 hover:from-indigo-600 hover:via-blue-600 hover:to-blue-700 text-white font-semibold px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg group"
            >
              <span className="text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300">✨</span>
              <span className="hidden sm:inline font-bold">Add New Task</span>
              <span className="sm:hidden font-bold">Add Task</span>
            </Button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white/70 backdrop-blur-md rounded-2xl border ${column.borderColor} shadow-lg transition-all duration-300 ${
                      snapshot.isDraggingOver 
                        ? 'shadow-2xl scale-[1.02] bg-white/90 border-opacity-80' 
                        : 'hover:shadow-xl hover:bg-white/80'
                    }`}
                  >
                    {/* Enhanced Column Header */}
                    <div className={`p-4 sm:p-5 lg:p-6 border-b border-gray-200/60 ${column.bgColor} rounded-t-2xl ${column.hoverColor} transition-colors duration-200`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${column.color} shadow-md ring-2 ring-white/50`}></div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl sm:text-2xl">{column.icon}</span>
                            <span className={`text-base sm:text-lg lg:text-xl font-bold ${column.textColor}`}>
                              {column.title}
                            </span>
                          </div>
                        </div>
                        <div className={`px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-base font-bold ${column.badgeColor} shadow-sm`}>
                          {Array.isArray(tasks) ? tasks.filter(task => task.status === column.id).length : 0}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Column Content */}
                    <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4 min-h-[350px] sm:min-h-[400px] lg:min-h-[450px]">
                      {Array.isArray(tasks) ? tasks
                        .filter(task => task.status === column.id)
                        .map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`transform transition-all duration-300 ${
                                  snapshot.isDragging 
                                    ? 'rotate-2 scale-105 shadow-2xl z-50 ring-2 ring-indigo-400/50' 
                                    : 'hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1'
                                }`}
                              >
                                <TaskCard
                                  task={task}
                                  onUpdate={fetchTasks}
                                  onDelete={fetchTasks}
                                />
                              </div>
                            )}
                          </Draggable>
                        )) : null}
                      
                      {provided.placeholder}
                      
                      {/* Enhanced Empty state */}
                      {Array.isArray(tasks) && tasks.filter(task => task.status === column.id).length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 lg:py-16 text-gray-400 group">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                            <span className="text-2xl sm:text-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300">{column.icon}</span>
                          </div>
                          <p className="text-sm sm:text-base font-semibold mb-2">No tasks yet</p>
                          <p className="text-xs sm:text-sm text-center max-w-xs leading-relaxed">
                            {column.id === 'To Do' ? 'Create your first task to get started with this project' : 
                             column.id === 'In Progress' ? 'Drag tasks here when you start working on them' :
                             'Completed tasks will appear here when finished'}
                          </p>
                          {column.id === 'To Do' && (
                            <button
                              onClick={() => setIsCreateModalOpen(true)}
                              className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              Create Task
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={fetchTasks}
        projectId={projectId}
      />
    </div>
  );
}