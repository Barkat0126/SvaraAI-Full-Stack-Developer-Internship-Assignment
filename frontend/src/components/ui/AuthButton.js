'use client';

import { Button } from '@/components/ui';

export default function AuthButton({ 
  children, 
  loading = false, 
  loadingText = "Loading...", 
  icon = "🚀", 
  variant = "primary",
  ...props 
}) {
  const baseClasses = "group relative w-full h-16 font-semibold text-lg rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white shadow-purple-500/30 hover:shadow-purple-500/50",
    secondary: "border-2 border-gray-400/50 text-gray-700 hover:border-purple-500/70 hover:text-gray-800 hover:bg-gradient-to-r hover:from-purple-50/80 hover:to-blue-50/80 backdrop-blur-sm"
  };

  return (
    <Button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={loading}
      {...props}
    >
      {/* Button background overlay */}
      <div className={`absolute inset-0 ${variant === 'primary' ? 'bg-gradient-to-r from-white/10 to-transparent' : 'bg-gradient-to-r from-purple-500/5 to-blue-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Button content */}
      <div className="relative z-10">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
            <span className="tracking-wide">{loadingText}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
            <span className="tracking-wide">{children}</span>
          </div>
        )}
      </div>
      
      {/* Shine effect */}
      <div className={`absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent ${variant === 'primary' ? 'via-white/20' : 'via-white/10'} to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
    </Button>
  );
}