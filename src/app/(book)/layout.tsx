'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BookHeader } from '@/components/book/BookHeader';
import { TOCPanel } from '@/components/book/TOCPanel';

interface BookLayoutProps {
  children: React.ReactNode;
}

export default function BookLayout({ children }: BookLayoutProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Determine if we're on a chapter page
  const isChapterPage = pathname.startsWith('/book/chapters/');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BookHeader />

      <div className="flex">
        {/* Sidebar Navigation */}
        <div
          className={`fixed md:static z-30 inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-4rem)] md:h-auto`}
        >
          <TOCPanel />
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isChapterPage ? 'md:ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-20 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  );
}