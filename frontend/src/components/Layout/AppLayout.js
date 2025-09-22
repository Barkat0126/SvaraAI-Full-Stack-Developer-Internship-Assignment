'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation/Navigation';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return children; // Return children without navigation for unauthenticated pages
  }

  return (
    <div className={styles.appLayout}>
      <Navigation />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}