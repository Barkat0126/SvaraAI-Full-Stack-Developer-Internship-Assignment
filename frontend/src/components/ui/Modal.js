'use client';

import { Fragment, forwardRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// Heroicons removed - using emoji instead
import { Button } from './Button';

const Modal = forwardRef(({ 
  isOpen, 
  onClose, 
  title,
  description,
  children,
  size = "default",
  style = {},
  ...props 
}, ref) => {
  const sizeStyles = {
    sm: { maxWidth: '28rem' },
    default: { maxWidth: '32rem' },
    lg: { maxWidth: '42rem' },
    xl: { maxWidth: '56rem' },
    full: { maxWidth: '80rem' },
  };

  // Dialog container styles
  const dialogStyles = {
    position: 'relative',
    zIndex: 50
  };

  // Backdrop styles
  const backdropStyles = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(4px)'
  };

  // Modal container styles
  const modalContainerStyles = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflowY: 'auto'
  };

  // Modal wrapper styles
  const modalWrapperStyles = {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    textAlign: 'center'
  };

  // Modal panel styles
  const modalPanelStyles = {
    width: '100%',
    transform: 'scale(1)',
    overflow: 'hidden',
    borderRadius: '1rem',
    backgroundColor: 'white',
    padding: '1.5rem',
    textAlign: 'left',
    verticalAlign: 'middle',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 300ms',
    ...sizeStyles[size],
    ...style
  };

  // Header container styles
  const headerContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  };

  // Title styles
  const titleStyles = {
    fontSize: '1.125rem',
    fontWeight: '600',
    lineHeight: '1.5',
    color: 'rgb(17, 24, 39)',
    margin: 0
  };

  // Description styles
  const descriptionStyles = {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: 'rgb(75, 85, 99)',
    margin: 0
  };

  // Close button styles
  const closeButtonStyles = {
    height: '2rem',
    width: '2rem',
    borderRadius: '50%'
  };

  // Close button text styles
  const closeButtonTextStyles = {
    fontSize: '0.875rem'
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" style={dialogStyles} onClose={onClose} ref={ref} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div style={backdropStyles} />
        </Transition.Child>

        <div style={modalContainerStyles}>
          <div style={modalWrapperStyles}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel style={modalPanelStyles}>
                <div style={headerContainerStyles}>
                  <div>
                    {title && (
                      <Dialog.Title as="h3" style={titleStyles}>
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description style={descriptionStyles}>
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    style={closeButtonStyles}
                  >
                    <span style={closeButtonTextStyles}>✕</span>
                  </Button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

Modal.displayName = "Modal";

const ModalHeader = forwardRef(({ children, style = {}, ...props }, ref) => {
  const headerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    textAlign: 'center',
    '@media (min-width: 640px)': {
      textAlign: 'left'
    },
    ...style
  };

  return (
    <div ref={ref} style={headerStyles} {...props}>
      {children}
    </div>
  );
});
ModalHeader.displayName = "ModalHeader";

const ModalFooter = forwardRef(({ children, style = {}, ...props }, ref) => {
  const footerStyles = {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: '1.5rem',
    '@media (min-width: 640px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: '0.5rem'
    },
    ...style
  };

  return (
    <div ref={ref} style={footerStyles} {...props}>
      {children}
    </div>
  );
});
ModalFooter.displayName = "ModalFooter";

const ModalContent = forwardRef(({ children, style = {}, ...props }, ref) => {
  const contentStyles = {
    marginTop: '1rem',
    ...style
  };

  return (
    <div ref={ref} style={contentStyles} {...props}>
      {children}
    </div>
  );
});
ModalContent.displayName = "ModalContent";

export { Modal, ModalHeader, ModalFooter, ModalContent };