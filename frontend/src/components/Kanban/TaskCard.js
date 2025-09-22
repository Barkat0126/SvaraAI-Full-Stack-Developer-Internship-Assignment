'use client';

import { useState } from 'react';
import { tasksAPI } from '@/lib/api';
import EditTaskModal from './EditTaskModal';
import { Card, CardContent } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { getPriorityConfig, getStatusConfig, getPriorityBadge, getStatusBadge } from '@/lib/priorityUtils';
import toast from 'react-hot-toast';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await tasksAPI.delete(task._id);
      toast.success('Task deleted successfully');
      onDelete();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    setIsEditModalOpen(false);
    onUpdate();
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const statusConfig = getStatusConfig(task.status);
  const priorityBadge = getPriorityBadge(task.priority, 'sm');
  const statusBadge = getStatusBadge(task.status, 'sm');

  return (
    <>
      <Card className={styles.taskCard}>
        {/* Priority accent bar */}
        <div className={`${styles.priorityBar} ${styles[`priority${task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}`]}`}></div>
        
        {/* Hover overlay effect */}
        <div className={styles.hoverOverlay}></div>
        
        <CardContent className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h4 className={styles.title}>
                {task.title}
              </h4>
              {task.description && (
                <p className={styles.description}>
                  {task.description}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div className={styles.actions}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true);
                }}
                className={`${styles.actionButton} ${styles.editButton}`}
                title="Edit task"
              >
                <span className="text-xs">✏️</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                title="Delete task"
              >
                {isDeleting ? (
                  <div className={styles.spinner}></div>
                ) : (
                  <span className="text-xs">🗑️</span>
                )}
              </button>
            </div>
          </div>

          {/* Priority and Project */}
          <div className={styles.badgeContainer}>
            <div className={priorityBadge.className}>
              <span>{priorityBadge.icon}</span>
              {priorityBadge.label}
            </div>
            
            {task.project && (
              <div className={styles.projectBadge}>
                <span>📁</span>
                {task.project.name}
              </div>
            )}
          </div>

          {/* Deadline */}
          {task.deadline && (
            <div className={styles.deadline}>
              <span className="text-xs">⏰</span>
              <div className={styles.deadlineContent}>
                <div className={styles.deadlineLabel}>Due</div>
                <div className={styles.deadlineDate}>
                  {formatDate(task.deadline)}
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className={styles.tags}>
              {task.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={styles.tag}
                >
                  #{tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className={styles.tagMore}>
                  +{task.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Assignee */}
          {task.assignee && (
            <div className={styles.assignee}>
              <div className={styles.assigneeAvatar}>
                {task.assignee.name?.charAt(0).toUpperCase() || '👤'}
              </div>
              <div className={styles.assigneeContent}>
                <div className={styles.assigneeLabel}>Assigned to</div>
                <div className={styles.assigneeName}>
                  {task.assignee.name || task.assignee.email}
                </div>
              </div>
            </div>
          )}

          {/* Status indicator */}
          <div className={styles.footer}>
            <div className={statusBadge.className}>
              <span>{statusBadge.icon}</span>
              {statusBadge.label}
            </div>
            
            <div className={styles.createdDate}>
              <span>📅</span>
              {formatDate(task.createdAt)}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onTaskUpdated={handleUpdate}
      />
    </>
  );
}