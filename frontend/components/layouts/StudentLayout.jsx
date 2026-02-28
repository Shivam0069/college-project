'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/Navbar';
import { Sidebar } from '@/components/custom/Sidebar';

export const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
  ];

  const sidebarItems = [
    { label: 'Dashboard', href: '/student/dashboard', icon: '📊' },
    { label: 'Notices', href: '/student/notices', icon: '📢' },
    { label: 'Study Materials', href: '/student/materials', icon: '📚' },
    { label: 'Events', href: '/student/events', icon: '🎉' },
    { label: 'Profile', href: '/student/profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={navLinks} />
      <div className="flex">
        <Sidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 md:ml-64">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
