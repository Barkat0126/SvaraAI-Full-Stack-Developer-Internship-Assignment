'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui';

export default function AuthLayout({ children, title, subtitle, icon = "🔐" }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // Container styles
  const containerStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  // Background overlay styles
  const backgroundOverlayStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden'
  };

  // Background element styles
  const backgroundElement1Styles = {
    position: 'absolute',
    top: '-10rem',
    right: '-10rem',
    width: '24rem',
    height: '24rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
    borderRadius: '50%',
    filter: 'blur(3rem)',
    animation: 'pulse 4s ease-in-out infinite'
  };

  const backgroundElement2Styles = {
    position: 'absolute',
    bottom: '-10rem',
    left: '-10rem',
    width: '24rem',
    height: '24rem',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
    borderRadius: '50%',
    filter: 'blur(3rem)',
    animation: 'pulse 4s ease-in-out infinite',
    animationDelay: '1s'
  };

  const backgroundElement3Styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20rem',
    height: '20rem',
    background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
    borderRadius: '50%',
    filter: 'blur(3rem)',
    animation: 'pulse 4s ease-in-out infinite',
    animationDelay: '0.5s'
  };

  // Grid pattern styles
  const gridPatternStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.3,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  };

  // Card container styles
  const cardContainerStyles = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '24rem',
    margin: '0 auto',
    padding: '0 1rem'
  };

  // Card styles
  const cardStyles = {
    backdropFilter: 'blur(2rem)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: isHovered 
      ? '0 25px 50px -12px rgba(168, 85, 247, 0.3)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'all 0.7s ease',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    position: 'relative'
  };

  // Card glow styles
  const cardGlow1Styles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)',
    borderRadius: '1rem'
  };

  const cardGlow2Styles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
    borderRadius: '1rem'
  };

  // Card content styles
  const cardContentStyles = {
    position: 'relative',
    padding: typeof window !== 'undefined' && window.innerWidth >= 640 ? '2rem' : '1.5rem'
  };

  // Header styles
  const headerStyles = {
    textAlign: 'center',
    marginBottom: '1.5rem'
  };

  // Icon container styles
  const iconContainerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
    borderRadius: '0.75rem',
    marginBottom: '1rem',
    boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.5)',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer'
  };

  // Icon styles
  const iconStyles = {
    fontSize: '1.5rem'
  };

  // Title styles
  const titleStyles = {
    fontSize: typeof window !== 'undefined' && window.innerWidth >= 640 ? '1.875rem' : '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #ffffff 0%, #e9d5ff 50%, #dbeafe 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    marginBottom: '0.5rem',
    letterSpacing: '-0.025em'
  };

  // Subtitle styles
  const subtitleStyles = {
    color: '#d1d5db',
    fontSize: typeof window !== 'undefined' && window.innerWidth >= 640 ? '1rem' : '0.875rem',
    fontWeight: '500'
  };

  // Content styles
  const contentStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  // Floating element styles
  const floatingElement1Styles = {
    position: 'absolute',
    top: '-1rem',
    right: '-1rem',
    width: '2rem',
    height: '2rem',
    background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%)',
    borderRadius: '50%',
    filter: 'blur(0.125rem)',
    animation: 'pulse 4s ease-in-out infinite'
  };

  const floatingElement2Styles = {
    position: 'absolute',
    bottom: '-1rem',
    left: '-1rem',
    width: '3rem',
    height: '3rem',
    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.4) 0%, rgba(168, 85, 247, 0.4) 100%)',
    borderRadius: '50%',
    filter: 'blur(0.125rem)',
    animation: 'pulse 4s ease-in-out infinite',
    animationDelay: '0.7s'
  };

  const floatingElement3Styles = {
    position: 'absolute',
    top: '50%',
    right: '-0.5rem',
    width: '1.5rem',
    height: '1.5rem',
    background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.4) 0%, rgba(168, 85, 247, 0.4) 100%)',
    borderRadius: '50%',
    filter: 'blur(0.125rem)',
    animation: 'pulse 4s ease-in-out infinite',
    animationDelay: '0.3s'
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      <div style={containerStyles}>
        {/* Modern background decorative elements */}
        <div style={backgroundOverlayStyles}>
          <div style={backgroundElement1Styles}></div>
          <div style={backgroundElement2Styles}></div>
          <div style={backgroundElement3Styles}></div>
          
          {/* Modern grid pattern overlay */}
          <div style={gridPatternStyles}></div>
        </div>

        {/* Main Card Container - Small and Centered */}
        <div style={cardContainerStyles}>
          <div 
            style={cardStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Modern card glow effect */}
            <div style={cardGlow1Styles}></div>
            <div style={cardGlow2Styles}></div>
            
            <div style={cardContentStyles}>
              {/* Header */}
              <div style={headerStyles}>
                <div 
                  style={iconContainerStyles}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <span style={iconStyles}>{icon}</span>
                </div>
                <h1 style={titleStyles}>
                  {title}
                </h1>
                <p style={subtitleStyles}>{subtitle}</p>
              </div>

              {/* Content */}
              <div style={contentStyles}>
                {children}
              </div>
            </div>
          </div>
          
          {/* Modern floating elements */}
          <div style={floatingElement1Styles}></div>
          <div style={floatingElement2Styles}></div>
          <div style={floatingElement3Styles}></div>
        </div>
      </div>
    </>
  );
}