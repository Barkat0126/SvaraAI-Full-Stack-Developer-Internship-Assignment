'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton, AuthFormField } from '@/components/ui';
import AuthLayout from '@/components/Layout/AuthLayout';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { register, loading } = useAuth();

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
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    console.log('Form validation passed, making API call...');
    
    try {
      const { confirmPassword, ...userData } = formData;
      console.log('Sending user data to API:', userData);
      await register(userData);
      // AuthContext handles success navigation and toast
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    }
  };

  return (
    <AuthLayout 
      title="Join Us Today"
      subtitle="Create your account to get started"
      icon="✨"
    >

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl">
                <div className="flex items-center">
                  <span className="text-red-400 mr-2">⚠️</span>
                  <span className="text-red-300 text-sm">{errors.general}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <AuthFormField
                label="Full Name"
                icon="👤"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                disabled={loading}
              />

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
                placeholder="Create a strong password"
                error={errors.password}
                disabled={loading}
              />

              {/* Confirm Password Field */}
              <AuthFormField
                label="Confirm Password"
                icon="🔐"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                disabled={loading}
              />

              {/* Submit Button */}
              <AuthButton
                type="submit"
                loading={loading}
                loadingText="Creating Account..."
                icon="✨"
                variant="primary"
              >
                Create Account
              </AuthButton>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/10 backdrop-blur-sm text-gray-300">Already have an account?</span>
                </div>
              </div>
              
              <Link href="/auth/login">
                <AuthButton
                  variant="secondary"
                  icon="🚀"
                  className="w-full"
                >
                  Sign In Instead
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