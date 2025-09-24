'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Use replace instead of push to prevent RSC navigation issues
      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: '8rem',
          width: '8rem',
          borderBottom: '2px solid #7c3aed'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          opacity: 0.7
        }}></div>
        <div style={{
          position: 'absolute',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s',
          top: '60%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
          opacity: 0.6
        }}></div>
        <div style={{
          position: 'absolute',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(40px)',
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '4s',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '350px',
          height: '350px',
          background: 'linear-gradient(45deg, #fa709a, #fee140)',
          opacity: 0.5
        }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 2
      }}></div>

      {/* Main Card Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
        <div style={{ textAlign: 'center' }}>
          {/* Hero Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="status-text-desktop">Now Available - Modern Task Management</span>
              <span className="status-text-mobile">New - Task Management</span>
            </div>
            
            <h1 className="hero-title">
              Task Management
              <br />
            </h1>
            
            <p className="hero-description">
              Experience the future of productivity with our AI-powered Kanban system. 
              <span className="highlight-text"> Organize, collaborate, and achieve more</span> than ever before.
            </p>
          </div>
          
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) scale(1); }
              33% { transform: translateY(-20px) scale(1.05); }
              66% { transform: translateY(10px) scale(0.95); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            .status-badge {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              border-radius: 9999px;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #f8fafc;
              font-size: 0.875rem;
              font-weight: 500;
              padding: 0.5rem 1rem;
              margin-bottom: 2rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }
            .status-dot {
              width: 8px;
              height: 8px;
              background-color: #10b981;
              border-radius: 50%;
              animation: pulse 2s infinite;
            }
            .status-text-mobile { display: block; }
            .status-text-desktop { display: none; }
            @media (min-width: 640px) {
              .status-text-mobile { display: none; }
              .status-text-desktop { display: inline; }
            }
            .hero-title {
              font-size: 1.875rem;
              font-weight: 700;
              background: linear-gradient(to right, #ffffff, #f1f5f9, #e2e8f0);
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              margin-bottom: 1rem;
              line-height: 1.1;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            @media (min-width: 640px) { .hero-title { font-size: 2.25rem; margin-bottom: 1.5rem; } }
            @media (min-width: 768px) { .hero-title { font-size: 3rem; } }
            @media (min-width: 1024px) { .hero-title { font-size: 3.75rem; } }
            @media (min-width: 1280px) { .hero-title { font-size: 4.5rem; } }
            .hero-description {
              font-size: 1rem;
              color: #e2e8f0;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
              margin-bottom: 2rem;
              max-width: 20rem;
              margin-left: auto;
              margin-right: auto;
              line-height: 1.625;
              padding: 0 0.5rem;
            }
            @media (min-width: 640px) { .hero-description { font-size: 1.125rem; margin-bottom: 2.5rem; max-width: 42rem; } }
            @media (min-width: 768px) { .hero-description { font-size: 1.25rem; } }
            @media (min-width: 1024px) { .hero-description { font-size: 1.5rem; margin-bottom: 3rem; max-width: 48rem; } }
            .highlight-text {
              color: #ddd6fe;
              font-weight: 600;
              text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
            }
          `}</style>
          
          {/* CTA Buttons */}
          <div className="cta-buttons" style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '4rem'
          }}>
            <button 
              onClick={() => router.replace('/auth/login')} 
              onMouseEnter={() => setHoveredButton('primary')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: hoveredButton === 'primary' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transform: hoveredButton === 'primary' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
              type="button"
              aria-label="Sign in to your account"
            >
              <span style={{ marginRight: '0.5rem' }}>🚀</span>
              <span>Sign In</span>
            </button>
              
            <button 
              onClick={() => router.replace('/auth/register')} 
              onMouseEnter={() => setHoveredButton('secondary')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.75rem',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: hoveredButton === 'secondary' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transform: hoveredButton === 'secondary' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
              type="button"
              aria-label="Create a new account"
            >
              <span style={{ marginRight: '0.5rem' }}>✨</span>
              <span>Get Started Free</span>
            </button>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            padding: '0 1rem'
          }}>
            <div 
              onMouseEnter={() => setHoveredFeature(0)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: hoveredFeature === 0 ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: hoveredFeature === 0 ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                transform: hoveredFeature === 0 ? 'rotate(5deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.75rem'
              }}>Smart Projects</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#e2e8f0',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                lineHeight: '1.625'
              }}>AI-powered project organization with intelligent task suggestions and automated workflow optimization.</p>
            </div>

            <div 
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: hoveredFeature === 1 ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: hoveredFeature === 1 ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                transform: hoveredFeature === 1 ? 'rotate(5deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                📋
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.75rem'
              }}>Dynamic Kanban</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#e2e8f0',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                lineHeight: '1.625'
              }}>Fluid drag-and-drop interface with real-time collaboration and advanced filtering capabilities.</p>
            </div>

            <div 
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: hoveredFeature === 2 ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: hoveredFeature === 2 ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                transform: hoveredFeature === 2 ? 'rotate(5deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                📊
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.75rem'
              }}>Advanced Analytics</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#e2e8f0',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                lineHeight: '1.625'
              }}>Deep insights with predictive analytics, performance metrics, and personalized productivity recommendations.</p>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '2rem',
            padding: '0 1rem'
          }}>
            <div 
              onMouseEnter={() => setHoveredStat(0)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: hoveredStat === 0 ? '#ddd6fe' : '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>10K+</div>
              <div style={{
                fontSize: '0.75rem',
                color: hoveredStat === 0 ? '#e2e8f0' : '#cbd5e1',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                transition: 'color 0.3s ease'
              }}>Active Users</div>
            </div>
            <div 
              onMouseEnter={() => setHoveredStat(1)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: hoveredStat === 1 ? '#ddd6fe' : '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>50K+</div>
              <div style={{
                fontSize: '0.75rem',
                color: hoveredStat === 1 ? '#e2e8f0' : '#cbd5e1',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                transition: 'color 0.3s ease'
              }}>Tasks Completed</div>
            </div>
            <div 
              onMouseEnter={() => setHoveredStat(2)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: hoveredStat === 2 ? '#ddd6fe' : '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>99.9%</div>
              <div style={{
                fontSize: '0.75rem',
                color: hoveredStat === 2 ? '#e2e8f0' : '#cbd5e1',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                transition: 'color 0.3s ease'
              }}>Uptime</div>
            </div>
            <div 
              onMouseEnter={() => setHoveredStat(3)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: hoveredStat === 3 ? '#ddd6fe' : '#f8fafc',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>24/7</div>
              <div style={{
                fontSize: '0.75rem',
                color: hoveredStat === 3 ? '#e2e8f0' : '#cbd5e1',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                transition: 'color 0.3s ease'
              }}>Support</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}