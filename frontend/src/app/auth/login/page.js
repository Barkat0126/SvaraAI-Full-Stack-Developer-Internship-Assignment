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
    
    if (!validateForm()) return;
    
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
      {/* General Error */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center">
            <span className="text-red-400 mr-2">⚠️</span>
            <span className="text-red-300 text-sm">{errors.general}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
        <AuthButton
          type="submit"
          loading={loading}
          loadingText="Signing In..."
          icon="🚀"
          variant="primary"
        >
          Sign In
        </AuthButton>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/10 backdrop-blur-sm text-gray-300 rounded-full">New to our platform?</span>
          </div>
        </div>
        
        <Link href="/auth/register">
          <AuthButton
            variant="secondary"
            icon="✨"
            type="button"
          >
            Create New Account
          </AuthButton>
        </Link>
        
        <Link
          href="/"
          className="inline-block text-sm text-gray-400 hover:text-purple-300 transition-colors duration-300 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </AuthLayout>
  );
}