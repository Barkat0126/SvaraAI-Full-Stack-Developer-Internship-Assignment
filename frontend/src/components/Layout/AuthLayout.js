'use client';

import { Card, CardContent } from '@/components/ui';
import styles from '@/app/auth/auth.module.css';

export default function AuthLayout({ children, title, subtitle, icon = "🔐" }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Light background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Light grid pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <Card className="backdrop-blur-xl bg-white/80 border border-gray-200/60 shadow-2xl shadow-gray-500/20 hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-[1.02] rounded-3xl overflow-hidden">
          {/* Light card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-transparent to-blue-100/20 rounded-3xl"></div>
          
          <CardContent className="relative p-10 sm:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-8 shadow-xl shadow-purple-500/30 transform hover:scale-110 transition-all duration-300 ring-4 ring-purple-100/50">
                <span className="text-4xl">{icon}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-4 tracking-tight">
                {title}
              </h1>
              <p className="text-gray-600 text-lg sm:text-xl font-medium">{subtitle}</p>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {children}
            </div>
          </CardContent>
        </Card>
        
        {/* Light floating elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-200/40 to-blue-200/40 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}