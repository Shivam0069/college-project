'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/Navbar';
import { Sidebar } from '@/components/custom/Sidebar';

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
  ];

  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    {
      label: 'Student Management',
      icon: '👥',
      subItems: [
        { label: 'Pending Approvals', href: '/admin/students/pending' },
        { label: 'Approved Students', href: '/admin/students/approved' },
      ],
    },
    {
      label: 'Content Management',
      icon: '📝',
      subItems: [
        { label: 'Notices', href: '/admin/notices' },
        { label: 'Study Materials', href: '/admin/materials' },
        { label: 'Events', href: '/admin/events' },
        { label: 'Gallery', href: '/admin/gallery' },
      ],
    },
    { label: 'Profile', href: '/admin/profile', icon: '👤' },
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
