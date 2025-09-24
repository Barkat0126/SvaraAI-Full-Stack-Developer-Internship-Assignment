'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation/Navigation';

export default function AppLayout({ children }) {
  const { user, loading } = useAuth();

  // App layout styles
  const appLayoutStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    position: 'relative',
    overflowX: 'hidden'
  };

  // App layout before pseudo-element styles (using a div)
  const backgroundOverlayStyles = {
    content: '',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
    zIndex: 0
  };

  // Main content styles
  const mainContentStyles = {
    position: 'relative',
    zIndex: 1,
    minHeight: 'calc(100vh - 4rem)',
    paddingTop: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1rem' : '2rem'
  };

  // Content container styles
  const contentContainerStyles = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '0 0.75rem' : '0 1rem'
  };

  // Loading container styles
  const loadingContainerStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  // Loading container before pseudo-element styles
  const loadingBackgroundOverlayStyles = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none'
  };

  // Loading spinner container styles
  const loadingSpinnerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative',
    zIndex: 1
  };

  // Spinner styles
  const spinnerStyles = {
    width: '3rem',
    height: '3rem',
    border: '3px solid rgba(59, 130, 246, 0.2)',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  // Loading text styles
  const loadingTextStyles = {
    color: '#e2e8f0',
    fontSize: '1.125rem',
    fontWeight: '500',
    margin: 0
  };

  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <div style={loadingContainerStyles}>
          <div style={loadingBackgroundOverlayStyles}></div>
          <div style={loadingSpinnerStyles}>
            <div style={spinnerStyles}></div>
            <p style={loadingTextStyles}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return children; // Return children without navigation for unauthenticated pages
  }

  return (
    <div style={appLayoutStyles}>
      <div style={backgroundOverlayStyles}></div>
      <Navigation />
      <main style={mainContentStyles}>
        <div style={contentContainerStyles}>
          {children}
        </div>
      </main>
    </div>
  );
}