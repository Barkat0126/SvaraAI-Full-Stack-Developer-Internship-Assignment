'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { projectsAPI, tasksAPI } from '@/lib/api';
import { Button } from '@/components/ui';
import TaskCard from '@/components/Kanban/TaskCard';
import CreateTaskModal from '@/components/Kanban/CreateTaskModal';
import toast from 'react-hot-toast';

const COLUMNS = {
  todo: {
    id: 'todo',
    title: 'To Do',
    icon: '📋',
    color: 'from-slate-500 to-slate-600',
    borderColor: 'border-slate-400/20',
    bgColor: 'bg-slate-500/10'
  },
  in_progress: {
    id: 'in_progress',
    title: 'In Progress',
    icon: '⚡',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-400/20',
    bgColor: 'bg-blue-500/10'
  },
  done: {
    id: 'done',
    title: 'Done',
    icon: '✅',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-400/20',
    bgColor: 'bg-green-500/10'
  }
};

export default function KanbanPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    done: []
  });
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProjectAndTasks();
    }
  }, [params.id]);

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true);
      const [projectResponse, tasksResponse] = await Promise.all([
        projectsAPI.getById(params.id),
        tasksAPI.getByProject(params.id)
      ]);

      setProject(projectResponse.data.project);
      
      // Group tasks by status
      const tasksByStatus = {
        todo: [],
        in_progress: [],
        done: []
      };

      tasksResponse.data.tasks.forEach(task => {
        if (tasksByStatus[task.status]) {
          tasksByStatus[task.status].push(task);
        }
      });

      setTasks(tasksByStatus);
    } catch (error) {
      console.error('Error fetching project and tasks:', error);
      toast.error('Failed to load project data');
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

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const draggedTask = sourceColumn.find(task => task._id === draggableId);

    if (!draggedTask) return;

    try {
      // Update task status in backend
      await tasksAPI.update(draggableId, {
        status: destination.droppableId
      });

      // Update local state
      const newTasks = { ...tasks };
      
      // Remove from source
      newTasks[source.droppableId] = sourceColumn.filter(task => task._id !== draggableId);
      
      // Add to destination
      const updatedTask = { ...draggedTask, status: destination.droppableId };
      newTasks[destination.droppableId] = [...destColumn];
      newTasks[destination.droppableId].splice(destination.index, 0, updatedTask);

      setTasks(newTasks);
      toast.success('Task moved successfully');
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to move task');
    }
  };

  const handleTaskCreated = () => {
    setIsCreateModalOpen(false);
    fetchProjectAndTasks();
  };

  const handleTaskUpdated = () => {
    fetchProjectAndTasks();
  };

  const handleTaskDeleted = () => {
    fetchProjectAndTasks();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-300 font-medium">Loading kanban board...</p>
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => router.push('/projects')}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200"
                >
                  ← Back
                </Button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {project.name}
                </h1>
              </div>
              <p className="text-slate-400 text-lg">
                {project.description || 'Manage your project tasks'}
              </p>
            </div>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border border-blue-400/20"
            >
              <span className="text-lg">➕</span>
              Add Task
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.values(COLUMNS).map((column) => (
              <div key={column.id} className="flex flex-col">
                {/* Column Header */}
                <div className={`bg-gradient-to-r ${column.color} rounded-t-xl p-4 border ${column.borderColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{column.icon}</span>
                      <h3 className="text-white font-semibold text-lg">{column.title}</h3>
                    </div>
                    <div className="bg-white/20 rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">
                        {tasks[column.id].length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column Content */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 min-h-[500px] p-4 bg-slate-800/30 backdrop-blur-sm border-x border-b ${column.borderColor} rounded-b-xl transition-colors duration-200 ${
                        snapshot.isDraggingOver ? column.bgColor : ''
                      }`}
                    >
                      <div className="space-y-4">
                        {tasks[column.id].map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`transition-transform duration-200 ${
                                  snapshot.isDragging ? 'rotate-3 scale-105' : ''
                                }`}
                              >
                                <TaskCard
                                  task={task}
                                  onUpdate={handleTaskUpdated}
                                  onDelete={handleTaskDeleted}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {tasks[column.id].length === 0 && (
                          <div className="text-center py-12">
                            <div className="text-slate-500 text-lg mb-2">{column.icon}</div>
                            <p className="text-slate-400 text-sm">No tasks yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        projectId={params.id}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}