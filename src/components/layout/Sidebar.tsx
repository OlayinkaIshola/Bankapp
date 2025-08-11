'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Accounts', href: '/accounts', icon: BanknotesIcon },
  { name: 'Transfers', href: '/transfers', icon: ArrowsRightLeftIcon },
  { name: 'Pay Bills', href: '/bills', icon: DocumentTextIcon },
  { name: 'Beneficiaries', href: '/beneficiaries', icon: DocumentTextIcon },
  { name: 'Payees', href: '/payees', icon: DocumentTextIcon },
  { name: 'Cards', href: '/cards', icon: CreditCardIcon },
  { name: 'Loans', href: '/loans', icon: ChartBarIcon },
  { name: 'Investments', href: '/investments', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Help & Support', href: '/support', icon: QuestionMarkCircleIcon },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 transition-all duration-300 ease-in-out lg:static lg:inset-auto lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isOpen ? 'w-64' : 'w-64 lg:w-16'
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-neutral-800">
          {isOpen && (
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">SecureBank</span>
            </div>
          )}
          
          {/* Toggle button - only show on desktop */}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-neutral-800',
                  !isOpen && 'lg:justify-center'
                )}
                title={!isOpen ? item.name : undefined}
              >
                <item.icon
                  className={cn(
                    'flex-shrink-0 h-5 w-5',
                    isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                    isOpen ? 'mr-3' : 'lg:mr-0'
                  )}
                />
                {isOpen && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        {isOpen && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">JD</span>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john.doe@email.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
