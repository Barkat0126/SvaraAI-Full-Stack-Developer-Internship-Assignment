'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './page.module.css';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.backgroundContainer}>
        <div className={`${styles.backgroundElement} ${styles.backgroundElement1}`}></div>
        <div className={`${styles.backgroundElement} ${styles.backgroundElement2}`}></div>
        <div className={`${styles.backgroundElement} ${styles.backgroundElement3}`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className={styles.gridPattern}></div>

      {/* Main Card Container */}
      <div className={styles.mainContainer}>
        <div className={styles.mainCard}>
        <div className={styles.textCenter}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusTextMobile}>Now Available - Modern Task Management</span>
              <span className="sm:hidden">New - Task Management</span>
            </div>
            
            <h1 className={styles.title}>
              Task Management
              <br />
              {/* <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Reimagined</span> */}
            </h1>
            
            <p className={styles.description}>
              Experience the future of productivity with our AI-powered Kanban system. 
              <span className={styles.highlightText}> Organize, collaborate, and achieve more</span> than ever before.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={styles.ctaContainer}>
            <button 
              onClick={() => router.replace('/auth/login')} 
              className={styles.primaryButton}
              type="button"
              aria-label="Sign in to your account"
            >
              {/* Button background overlay */}
              <div className={styles.buttonOverlay}></div>
              
              {/* Button content */}
              <div className={styles.buttonContent}>
                <span className={styles.buttonIcon}>🚀</span>
                <span className={styles.buttonText}>Sign In</span>
              </div>
              
              {/* Shine effect */}
              <div className={styles.buttonShine}></div>
            </button>
              
            <button 
              onClick={() => router.replace('/auth/register')} 
              className={styles.secondaryButton}
              type="button"
              aria-label="Create a new account"
            >
              {/* Button background overlay */}
              <div className={styles.secondaryButtonOverlay}></div>
              
              {/* Button content */}
              <div className={styles.buttonContent}>
                <span className={styles.buttonIcon}>✨</span>
                <span className={styles.buttonText}>Get Started Free</span>
              </div>
              
              {/* Shine effect */}
              <div className={styles.buttonShine}></div>
            </button>
          </div>

          {/* Feature Cards */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={`${styles.featureCardOverlay} ${styles.featureCardOverlay1}`}></div>
              <div className={styles.featureCardContent}>
                <div className={`${styles.featureIcon} ${styles.featureIcon1}`}></div>
                <h3 className={styles.featureTitle}>Smart Projects</h3>
                <p className={styles.featureDescription}>AI-powered project organization with intelligent task suggestions and automated workflow optimization.</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={`${styles.featureCardOverlay} ${styles.featureCardOverlay2}`}></div>
              <div className={styles.featureCardContent}>
                <div className={`${styles.featureIcon} ${styles.featureIcon2}`}></div>
                <h3 className={styles.featureTitle}>Dynamic Kanban</h3>
                <p className={styles.featureDescription}>Fluid drag-and-drop interface with real-time collaboration and advanced filtering capabilities.</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={`${styles.featureCardOverlay} ${styles.featureCardOverlay3}`}></div>
              <div className={styles.featureCardContent}>
                <div className={`${styles.featureIcon} ${styles.featureIcon3}`}></div>
                <h3 className={styles.featureTitle}>Advanced Analytics</h3>
                <p className={styles.featureDescription}>Deep insights with predictive analytics, performance metrics, and personalized productivity recommendations.</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Active Users</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Tasks Completed</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Uptime</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}