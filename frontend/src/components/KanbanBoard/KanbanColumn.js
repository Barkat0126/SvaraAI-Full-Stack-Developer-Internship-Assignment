'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function KanbanColumn({ column, tasks, getPriorityColor, getPriorityLabel }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${column.color} rounded-xl lg:rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="text-xl lg:text-2xl">{column.icon}</span>
            <div>
              <h3 className="text-white font-bold text-base lg:text-lg">{column.title}</h3>
              <p className="text-white/80 text-xs lg:text-sm">{column.count} tasks</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 lg:px-3 py-1">
            <span className="text-white font-semibold text-xs lg:text-sm">{column.count}</span>
          </div>
        </div>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[300px] lg:min-h-[400px] rounded-xl lg:rounded-2xl border-2 border-dashed transition-all duration-300 p-3 lg:p-4 ${
          isOver 
            ? `${column.borderColor} bg-gradient-to-br ${column.bgColor} border-opacity-60` 
            : 'border-slate-700/30 bg-slate-800/20'
        }`}
      >
        <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 lg:space-y-3">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-24 lg:h-32 text-slate-400">
                <span className="text-2xl lg:text-4xl mb-1 lg:mb-2 opacity-50">{column.icon}</span>
                <p className="text-xs lg:text-sm font-medium">No tasks yet</p>
                <p className="text-xs hidden lg:block">Drag tasks here</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  getPriorityColor={getPriorityColor}
                  getPriorityLabel={getPriorityLabel}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}