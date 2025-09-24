'use client';

import { useState } from 'react';
import { tasksAPI } from '@/lib/api';
import EditTaskModal from './EditTaskModal';
import { Card, CardContent } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { getPriorityConfig, getStatusConfig, getPriorityBadge, getStatusBadge } from '@/lib/priorityUtils';
import toast from 'react-hot-toast';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

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

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Priority bar styles
  const getPriorityBarStyles = (priority) => {
    const baseStyles = {
      height: '0.25rem',
      width: '100%'
    };

    switch (priority) {
      case 'high':
        return { ...baseStyles, background: 'linear-gradient(to right, rgb(239, 68, 68), rgb(236, 72, 153))' };
      case 'medium':
        return { ...baseStyles, background: 'linear-gradient(to right, rgb(245, 158, 11), rgb(249, 115, 22))' };
      case 'low':
        return { ...baseStyles, background: 'linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129))' };
      default:
        return { ...baseStyles, background: 'linear-gradient(to right, rgb(100, 116, 139), rgb(107, 114, 128))' };
    }
  };

  // Task card styles
  const taskCardStyles = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: isHovered 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 300ms',
    transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
  };

  // Hover overlay styles
  const hoverOverlayStyles = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), rgba(59, 130, 246, 0.05))',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 300ms',
    pointerEvents: 'none'
  };

  // Content styles
  const contentStyles = {
    position: 'relative',
    padding: isMobile ? '0.75rem' : '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '0.5rem' : '0.75rem'
  };

  // Header styles
  const headerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  };

  const headerContentStyles = {
    flex: 1,
    minWidth: 0
  };

  const titleStyles = {
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: '700',
    color: isHovered ? 'rgb(79, 70, 229)' : 'rgb(17, 24, 39)',
    marginBottom: '0.25rem',
    transition: 'color 200ms',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const descriptionStyles = {
    color: 'rgb(75, 85, 99)',
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    lineHeight: isMobile ? '1.4' : '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  // Action buttons styles
  const actionsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginLeft: '0.5rem',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 200ms'
  };

  const getActionButtonStyles = (buttonType) => {
    const baseStyles = {
      height: isMobile ? '2rem' : '1.75rem',
      width: isMobile ? '2rem' : '1.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.5rem',
      transition: 'all 200ms',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    };

    if (hoveredButton === buttonType) {
      if (buttonType === 'edit') {
        return { ...baseStyles, backgroundColor: 'rgb(238, 242, 255)', color: 'rgb(79, 70, 229)' };
      } else if (buttonType === 'delete') {
        return { ...baseStyles, backgroundColor: 'rgb(254, 242, 242)', color: 'rgb(220, 38, 38)' };
      }
    }

    return baseStyles;
  };

  // Badge container styles
  const badgeContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap'
  };

  const projectBadgeStyles = {
    background: 'linear-gradient(to right, rgb(224, 231, 255), rgb(219, 234, 254))',
    color: 'rgb(79, 70, 229)',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  // Deadline styles
  const deadlineStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    background: 'linear-gradient(to right, rgb(255, 247, 237), rgb(254, 242, 242))',
    borderRadius: '0.5rem',
    border: '1px solid rgb(254, 215, 170)'
  };

  const deadlineContentStyles = {
    flex: 1
  };

  const deadlineLabelStyles = {
    fontSize: '0.75rem',
    color: 'rgb(75, 85, 99)',
    fontWeight: '500'
  };

  const deadlineDateStyles = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'rgb(194, 65, 12)'
  };

  // Tags styles
  const tagsStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem'
  };

  const tagStyles = {
    background: 'linear-gradient(to right, rgb(243, 232, 255), rgb(252, 231, 243))',
    color: 'rgb(126, 34, 206)',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
  };

  const tagMoreStyles = {
    backgroundColor: 'rgb(243, 244, 246)',
    color: 'rgb(75, 85, 99)',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
  };

  // Assignee styles
  const assigneeStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    background: 'linear-gradient(to right, rgb(239, 246, 255), rgb(224, 231, 255))',
    borderRadius: '0.5rem',
    border: '1px solid rgb(191, 219, 254)'
  };

  const assigneeAvatarStyles = {
    width: '1.5rem',
    height: '1.5rem',
    background: 'linear-gradient(to bottom right, rgb(79, 70, 229), rgb(59, 130, 246))',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '700'
  };

  const assigneeContentStyles = {
    flex: 1,
    minWidth: 0
  };

  const assigneeLabelStyles = {
    fontSize: '0.75rem',
    color: 'rgb(75, 85, 99)',
    fontWeight: '500'
  };

  const assigneeNameStyles = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'rgb(29, 78, 216)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  // Footer styles
  const footerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '0.5rem',
    borderTop: '1px solid rgb(243, 244, 246)'
  };

  const createdDateStyles = {
    fontSize: '0.75rem',
    color: 'rgb(107, 114, 128)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  // Spinner styles
  const spinnerStyles = {
    animation: 'spin 1s linear infinite',
    borderRadius: '50%',
    height: '0.75rem',
    width: '0.75rem',
    border: '1px solid rgb(239, 68, 68)',
    borderTopColor: 'transparent'
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <Card 
        style={taskCardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Priority accent bar */}
        <div style={getPriorityBarStyles(task.priority)}></div>
        
        {/* Hover overlay effect */}
        <div style={hoverOverlayStyles}></div>
        
        <CardContent style={contentStyles}>
          {/* Header */}
          <div style={headerStyles}>
            <div style={headerContentStyles}>
              <h4 style={titleStyles}>
                {task.title}
              </h4>
              {task.description && (
                <p style={descriptionStyles}>
                  {task.description}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div style={actionsStyles}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true);
                }}
                style={getActionButtonStyles('edit')}
                onMouseEnter={() => setHoveredButton('edit')}
                onMouseLeave={() => setHoveredButton(null)}
                title="Edit task"
              >
                <span style={{ fontSize: '0.75rem' }}>✏️</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                style={getActionButtonStyles('delete')}
                onMouseEnter={() => setHoveredButton('delete')}
                onMouseLeave={() => setHoveredButton(null)}
                title="Delete task"
              >
                {isDeleting ? (
                  <div style={spinnerStyles}></div>
                ) : (
                  <span style={{ fontSize: '0.75rem' }}>🗑️</span>
                )}
              </button>
            </div>
          </div>

          {/* Priority and Project */}
          <div style={badgeContainerStyles}>
            <div style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'white',
              background: priorityConfig.gradient
            }}>
              <span>{priorityBadge.icon}</span>
              {priorityBadge.label}
            </div>
            
            {task.project && (
              <div style={projectBadgeStyles}>
                <span>📁</span>
                {task.project.name}
              </div>
            )}
          </div>

          {/* Deadline */}
          {task.deadline && (
            <div style={deadlineStyles}>
              <span style={{ fontSize: '0.75rem' }}>⏰</span>
              <div style={deadlineContentStyles}>
                <div style={deadlineLabelStyles}>Due</div>
                <div style={deadlineDateStyles}>
                  {formatDate(task.deadline)}
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div style={tagsStyles}>
              {task.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  style={tagStyles}
                >
                  #{tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span style={tagMoreStyles}>
                  +{task.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Assignee */}
          {task.assignee && (
            <div style={assigneeStyles}>
              <div style={assigneeAvatarStyles}>
                {task.assignee.name?.charAt(0).toUpperCase() || '👤'}
              </div>
              <div style={assigneeContentStyles}>
                <div style={assigneeLabelStyles}>Assigned to</div>
                <div style={assigneeNameStyles}>
                  {task.assignee.name || task.assignee.email}
                </div>
              </div>
            </div>
          )}

          {/* Status indicator */}
          <div style={footerStyles}>
            <div style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'white',
              background: statusConfig.gradient
            }}>
              <span>{statusBadge.icon}</span>
              {statusBadge.label}
            </div>
            
            <div style={createdDateStyles}>
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