'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { checkAuthStatus } from '@/store/slices/authSlice';
import { fetchNotifications } from '@/store/slices/notificationSlice';
import { cn } from '@/utils';
import SessionTimeout from '@/components/auth/SessionTimeout';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/support/ChatWidget'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

// Pages that should not show the sidebar
const noSidebarPages = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/products',
  '/rates',
  '/branches',
  '/help',
  '/privacy',
  '/terms',
  '/security',
];

// Pages that should not show the footer
const noFooterPages = [
  '/dashboard',
  '/accounts',
  '/transfer',
  '/bills',
  '/cards',
  '/investments',
  '/settings',
  '/profile',
  '/notifications',
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const showSidebar = isAuthenticated && !noSidebarPages.includes(pathname);
  const showFooter = !noFooterPages.includes(pathname);
  const showBreadcrumbs = isAuthenticated && showSidebar;

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Fetch notifications for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications());
    }
  }, [isAuthenticated, dispatch]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <Header onMobileMenuToggle={handleSidebarToggle} />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            isOpen={!sidebarCollapsed}
            onToggle={handleSidebarCollapse}
          />
        )}

        {/* Mobile sidebar overlay */}
        {showSidebar && sidebarOpen && (
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={handleSidebarToggle}
          />
        )}

        {/* Main content */}
        <main
          className={cn(
            'flex-1 flex flex-col',
            showSidebar && !sidebarCollapsed && 'lg:ml-0',
            showSidebar && sidebarCollapsed && 'lg:ml-0'
          )}
        >
          {/* Breadcrumbs */}
          {showBreadcrumbs && (
            <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 px-4 py-3 sm:px-6 lg:px-8">
              <Breadcrumbs />
            </div>
          )}

          {/* Page content */}
          <div className="flex-1">
            {/* Inactivity-based session timeout (client-side only) */}
            {isAuthenticated && <SessionTimeout minutes={20} />}
            {children}
            {/* Site-wide support chat widget */}
            <ChatWidget />
          </div>
        </main>
      </div>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
