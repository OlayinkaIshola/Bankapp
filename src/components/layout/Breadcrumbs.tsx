'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Route name mappings
const routeNames: Record<string, string> = {
  dashboard: 'Dashboard',
  accounts: 'Accounts',
  transfer: 'Transfer Money',
  bills: 'Pay Bills',
  cards: 'Cards',
  investments: 'Investments',
  loans: 'Loans',
  settings: 'Settings',
  profile: 'Profile',
  security: 'Security',
  notifications: 'Notifications',
  support: 'Help & Support',
  help: 'Help Center',
  contact: 'Contact Us',
  about: 'About Us',
  products: 'Products & Services',
  rates: 'Rates & Fees',
  branches: 'Branch Locator',
  checking: 'Checking Accounts',
  savings: 'Savings Accounts',
  credit: 'Credit Cards',
  personal: 'Personal Loans',
  mortgage: 'Mortgages',
  business: 'Business Banking',
};

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Add home
  breadcrumbs.push({
    name: 'Home',
    href: '/',
  });

  // Generate breadcrumbs from path segments
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const isLast = index === paths.length - 1;
    
    breadcrumbs.push({
      name: routeNames[path] || path.charAt(0).toUpperCase() + path.slice(1),
      href: currentPath,
      current: isLast,
    });
  });

  return breadcrumbs;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbs(pathname);

  // Don't show breadcrumbs on home page
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
            )}
            
            {item.current ? (
              <span className="text-sm font-medium text-gray-900 flex items-center">
                {index === 0 && <HomeIcon className="h-4 w-4 mr-1" />}
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center transition-colors"
              >
                {index === 0 && <HomeIcon className="h-4 w-4 mr-1" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
