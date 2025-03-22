'use client';

import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex flex-1 flex-col ml-64">
        <Header title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        
        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Thrivvy Retail Analytics. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
