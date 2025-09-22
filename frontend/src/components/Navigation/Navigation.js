'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Projects', href: '/projects', icon: '📁' },
    { name: 'Tasks', href: '/tasks', icon: '📋' },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/dashboard" className={styles.logoLink}>
            <div className={styles.logoIcon}>⚡</div>
            <span className={styles.logoText}>TaskFlow</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navItem} ${isActive(item.href) ? styles.navItemActive : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navText}>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className={styles.userMenu}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.logoutIcon}>🚪</span>
            <span className={styles.logoutText}>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.mobileNavItem} ${isActive(item.href) ? styles.mobileNavItemActive : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileNavIcon}>{item.icon}</span>
                <span className={styles.mobileNavText}>{item.name}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className={styles.mobileLogoutButton}>
              <span className={styles.mobileLogoutIcon}>🚪</span>
              <span className={styles.mobileLogoutText}>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}