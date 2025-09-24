'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Projects', href: '/projects', icon: '📁' },
    { name: 'Tasks', href: '/tasks', icon: '📋' },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  const handleLogout = async () => {
    await logout();
  };

  // Navigation styles
  const navigationStyles = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backdropFilter: 'blur(20px)',
    background: 'rgba(15, 23, 42, 0.8)',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  // Container styles
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isSmallMobile ? '0 0.75rem' : '0 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem'
  };

  // Logo styles
  const logoStyles = {
    display: 'flex',
    alignItems: 'center'
  };

  const logoLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    transform: hoveredLogo ? 'scale(1.05)' : 'scale(1)'
  };

  const logoIconStyles = {
    width: '2.5rem',
    height: '2.5rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  };

  const logoTextStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: isSmallMobile ? 'none' : 'inline'
  };

  // Desktop navigation styles
  const desktopNavStyles = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const getNavItemStyles = (itemName, active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    color: active ? '#ffffff' : (hoveredItem === itemName ? '#ffffff' : '#cbd5e1'),
    fontWeight: '500',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    background: active 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
      : (hoveredItem === itemName ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' : 'transparent'),
    border: active ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
    boxShadow: active || hoveredItem === itemName ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none',
    transform: hoveredItem === itemName ? 'translateY(-2px)' : 'translateY(0)'
  });

  const navIconStyles = {
    fontSize: '1.125rem'
  };

  const navTextStyles = {
    fontSize: '0.875rem'
  };

  // User menu styles
  const userMenuStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const userInfoStyles = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const userAvatarStyles = {
    width: '2.5rem',
    height: '2.5rem',
    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.875rem',
    boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.3)'
  };

  const userDetailsStyles = {
    display: isMobile ? 'none' : 'flex',
    flexDirection: 'column',
    gap: '0.125rem'
  };

  const userNameStyles = {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.875rem'
  };

  const userEmailStyles = {
    color: '#94a3b8',
    fontSize: '0.75rem'
  };

  const logoutButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: isMobile ? '0.5rem' : '0.5rem 1rem',
    background: hoveredLogout ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '0.5rem',
    color: hoveredLogout ? '#ffffff' : '#fca5a5',
    fontWeight: '500',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hoveredLogout ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: hoveredLogout ? '0 4px 12px rgba(239, 68, 68, 0.2)' : 'none'
  };

  const logoutIconStyles = {
    fontSize: '1rem'
  };

  const logoutTextStyles = {
    fontSize: '0.875rem',
    display: isMobile ? 'none' : 'inline'
  };

  // Mobile menu button styles
  const mobileMenuButtonStyles = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  };

  const hamburgerStyles = {
    width: '1.5rem',
    height: '2px',
    background: '#cbd5e1',
    borderRadius: '1px',
    transition: 'all 0.3s ease'
  };

  // Mobile menu styles
  const mobileMenuStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const mobileMenuContentStyles = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const getMobileNavItemStyles = (active, hovered) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    color: active ? '#ffffff' : (hovered ? '#ffffff' : '#cbd5e1'),
    fontWeight: '500',
    transition: 'all 0.3s ease',
    background: active 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
      : (hovered ? 'rgba(59, 130, 246, 0.1)' : 'transparent'),
    border: active ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
  });

  const mobileNavIconStyles = {
    fontSize: '1.25rem'
  };

  const mobileNavTextStyles = {
    fontSize: '1rem'
  };

  const mobileLogoutButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    background: hoveredLogout ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '0.75rem',
    color: hoveredLogout ? '#ffffff' : '#fca5a5',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem'
  };

  const mobileLogoutIconStyles = {
    fontSize: '1.25rem'
  };

  const mobileLogoutTextStyles = {
    fontSize: '1rem'
  };

  if (!user) return null;

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
      <nav style={navigationStyles}>
        <div style={containerStyles}>
          {/* Logo */}
          <div style={logoStyles}>
            <Link 
              href="/dashboard" 
              style={logoLinkStyles}
              onMouseEnter={() => setHoveredLogo(true)}
              onMouseLeave={() => setHoveredLogo(false)}
            >
              <div style={logoIconStyles}>⚡</div>
              <span style={logoTextStyles}>TaskFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div style={desktopNavStyles}>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={getNavItemStyles(item.name, isActive(item.href))}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span style={navIconStyles}>{item.icon}</span>
                <span style={navTextStyles}>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div style={userMenuStyles}>
            <div style={userInfoStyles}>
              <div style={userAvatarStyles}>
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div style={userDetailsStyles}>
                <span style={userNameStyles}>{user.name}</span>
                <span style={userEmailStyles}>{user.email}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              style={logoutButtonStyles}
              onMouseEnter={() => setHoveredLogout(true)}
              onMouseLeave={() => setHoveredLogout(false)}
            >
              <span style={logoutIconStyles}>🚪</span>
              <span style={logoutTextStyles}>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            style={mobileMenuButtonStyles}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span style={hamburgerStyles}></span>
            <span style={hamburgerStyles}></span>
            <span style={hamburgerStyles}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={mobileMenuStyles}>
            <div style={mobileMenuContentStyles}>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={getMobileNavItemStyles(isActive(item.href), hoveredItem === item.name)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span style={mobileNavIconStyles}>{item.icon}</span>
                  <span style={mobileNavTextStyles}>{item.name}</span>
                </Link>
              ))}
              <button 
                onClick={handleLogout} 
                style={mobileLogoutButtonStyles}
                onMouseEnter={() => setHoveredLogout(true)}
                onMouseLeave={() => setHoveredLogout(false)}
              >
                <span style={mobileLogoutIconStyles}>🚪</span>
                <span style={mobileLogoutTextStyles}>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}