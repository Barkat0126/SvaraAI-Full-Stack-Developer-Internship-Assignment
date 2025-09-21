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
    id: 'todo', 
    title: 'To Do', 
    color: 'bg-gradient-to-r from-slate-500 to-gray-500',
    bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50',
    textColor: 'text-slate-700',
    badgeColor: 'bg-slate-100 text-slate-700',
    icon: '📋'
  },
  { 
    id: 'inProgress', 
    title: 'In Progress', 
    color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    textColor: 'text-blue-700',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: '⚡'
  },
  { 
    id: 'completed', 
    title: 'Completed', 
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    textColor: 'text-green-700',
    badgeColor: 'bg-green-100 text-green-700',
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
      setTasks(taskData || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
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

    const draggedTask = tasks.find(task => task._id === draggableId);
    if (!draggedTask) return;

    try {
      // Optimistic update
      const updatedTasks = tasks.map(task => 
        task._id === draggableId 
          ? { ...task, status: destination.droppableId }
          : task
      );
      
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
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {project?.name || 'Project Board'}
              </h1>
              <p className="text-gray-600 text-lg">
                {project?.description || 'Manage your tasks efficiently'}
              </p>
            </div>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">✨</span>
              Add Task
            </Button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg transition-all duration-300 ${
                      snapshot.isDraggingOver 
                        ? 'shadow-2xl scale-105 bg-white/80' 
                        : 'hover:shadow-xl'
                    }`}
                  >
                    {/* Column Header */}
                    <div className={`p-6 border-b border-gray-100 ${column.bgColor}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${column.color} shadow-sm`}></div>
                          <span className={`text-lg font-bold ${column.textColor}`}>
                            {column.icon} {column.title}
                          </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${column.badgeColor}`}>
                          {tasks.filter(task => task.status === column.id).length}
                        </div>
                      </div>
                    </div>

                    {/* Column Content */}
                    <div className="p-4 space-y-4 min-h-[400px]">
                      {tasks
                        .filter(task => task.status === column.id)
                        .map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`transform transition-all duration-200 ${
                                  snapshot.isDragging 
                                    ? 'rotate-3 scale-105 shadow-2xl z-50' 
                                    : 'hover:scale-102 hover:shadow-lg'
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
                        ))}
                      
                      {provided.placeholder}
                      
                      {/* Empty state */}
                      {tasks.filter(task => task.status === column.id).length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl opacity-50">{column.icon}</span>
                          </div>
                          <p className="text-sm font-medium">No tasks yet</p>
                          <p className="text-xs text-center mt-1">
                            {column.id === 'todo' ? 'Add a new task to get started' : 
                             column.id === 'in_progress' ? 'Move tasks here when working on them' :
                             'Completed tasks will appear here'}
                          </p>
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