'use client';

import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import ProjectSelector from './ProjectSelector';



export default function KanbanBoard({ tasks = [], onTaskUpdate, projects = [] }) {
  const [activeTask, setActiveTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter tasks by selected project if one is selected
  const filteredTasks = useMemo(() => {
    if (!selectedProject) return tasks;
    return tasks.filter(task => task.project?._id === selectedProject._id);
  }, [tasks, selectedProject]);

  // Define columns
  const columns = useMemo(() => [
    {
      id: 'pending',
      title: 'Todo',
      icon: '📋',
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500/50',
      bgColor: 'from-blue-50/10 to-blue-100/10',
      count: filteredTasks.filter(task => task.status === 'pending').length
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      borderColor: 'border-yellow-500/50',
      bgColor: 'from-yellow-50/10 to-orange-100/10',
      count: filteredTasks.filter(task => task.status === 'in-progress').length
    },
    {
      id: 'completed',
      title: 'Done',
      icon: '✅',
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500/50',
      bgColor: 'from-green-50/10 to-emerald-100/10',
      count: filteredTasks.filter(task => task.status === 'completed').length
    }
  ], [filteredTasks]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    return {
      pending: filteredTasks.filter(task => task.status === 'pending'),
      'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
      completed: filteredTasks.filter(task => task.status === 'completed')
    };
  }, [filteredTasks]);

  const handleDragStart = (event) => {
    const { active } = event;
    const task = filteredTasks.find(t => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = filteredTasks.find(t => t._id === active.id);
    if (!activeTask) return;

    // Check if we're dropping on a column or another task
    let newStatus = over.id;
    
    // If dropping on another task, get that task's status
    if (!columns.find(col => col.id === over.id)) {
      const overTask = filteredTasks.find(t => t._id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    // Only update if status actually changed
    if (activeTask.status !== newStatus) {
      onTaskUpdate(activeTask._id, { status: newStatus });
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Find the containers
    const activeTask = filteredTasks.find(t => t._id === activeId);
    const overTask = filteredTasks.find(t => t._id === overId);

    if (!activeTask) return;

    // Handle dropping on a column
    if (columns.find(col => col.id === overId)) {
      if (activeTask.status !== overId) {
        onTaskUpdate(activeTask._id, { status: overId });
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-red-400';
      case 'medium':
        return 'bg-amber-400';
      case 'low':
        return 'bg-emerald-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Project Kanban Board
          </h2>
          <p className="text-slate-400 text-sm lg:text-base">
            {selectedProject 
              ? `Managing tasks for ${selectedProject.name}` 
              : `Managing ${filteredTasks.length} tasks across all projects`
            }
          </p>
        </div>
        
        {/* Project Selector */}
        <div className="flex items-center gap-4">
          <ProjectSelector
            projects={projects}
            selectedProject={selectedProject}
            onProjectChange={setSelectedProject}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`bg-gradient-to-r ${column.color} rounded-xl p-4 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{column.icon}</span>
                <span className="font-medium text-sm lg:text-base">{column.title}</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold">{column.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 min-h-0">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id] || []}
              getPriorityColor={getPriorityColor}
              getPriorityLabel={getPriorityLabel}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              getPriorityColor={getPriorityColor}
              getPriorityLabel={getPriorityLabel}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}