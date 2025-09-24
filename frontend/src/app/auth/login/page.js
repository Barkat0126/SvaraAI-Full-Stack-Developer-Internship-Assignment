'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton, AuthFormField } from '@/components/ui';
import AuthLayout from '@/components/Layout/AuthLayout';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || loading) return;
    
    try {
      const result = await login(formData);
      
      if (!result.success) {
        setErrors({ general: result.error });
      }
      // AuthContext handles success navigation and toast
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Login failed. Please try again.';
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="🚀 Sign in to continue to your dashboard"
      icon="🔐"
    >
      {/* Error Message */}
      {errors.general && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          color: '#f87171',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1rem' }}>⚠️</span>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* Email Field */}
        <AuthFormField
          label="Email Address"
          icon="📧"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          error={errors.email}
          disabled={loading}
        />

        {/* Password Field */}
        <AuthFormField
          label="Password"
          icon="🔒"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          disabled={loading}
        />

        {/* Submit Button */}
        <div style={{ paddingTop: '0.5rem' }}>
          <AuthButton
            type="submit"
            loading={loading}
            loadingText="Signing in..."
            icon="🚀"
          >
            Sign In
          </AuthButton>
        </div>
      </form>

      {/* Footer */}
      <div style={{
        marginTop: '1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '0',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              width: '100%',
              borderTop: '1px solid rgba(255, 255, 255, 0.3)'
            }}></div>
          </div>
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
              padding: '0 1rem',
              color: '#9ca3af'
            }}>or</span>
          </div>
        </div>
        
        <p style={{
          color: '#d1d5db',
          fontSize: '0.875rem'
        }}>
          <span style={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem'
          }}>New to our platform?</span>{' '}
          <Link 
            href="/auth/register" 
            style={{
              color: '#a855f7',
              fontWeight: '600',
              transition: 'color 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.target.style.color = '#d8b4fe'}
            onMouseLeave={(e) => e.target.style.color = '#a855f7'}
          >
            Create an account
          </Link>
        </p>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '0.75rem'
        }}>
          <Link 
            href="/" 
            style={{
              transition: 'color 0.3s ease',
              textDecoration: 'none',
              color: 'inherit'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}