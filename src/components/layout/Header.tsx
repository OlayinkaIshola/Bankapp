'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  UserIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { logoutUser } from '@/store/slices/authSlice';
import { cn } from '@/utils';
import { useTheme } from '@/components/ui/ThemeProvider';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

const publicNavigation = [
  { name: 'Home', href: '/' },
  // Products mega menu handled separately
  { name: 'Rates & Fees', href: '/rates' },
  { name: 'Help Center', href: '/help' },
  { name: 'Branch Locator', href: '/branches' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const productLinks = [
  { name: 'Savings Accounts', href: '/products/savings' },
  { name: 'Checking Accounts', href: '/products/checking' },
  { name: 'Loans & Mortgages', href: '/products/loans' },
  { name: 'Cards (Credit/Debit)', href: '/products/cards' },
  { name: 'Investments & Wealth', href: '/products/investments' },
];

const authenticatedNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Accounts', href: '/accounts' },
  { name: 'Transfers', href: '/transfers' },
  { name: 'Pay Bills', href: '/bills' },
  { name: 'Cards', href: '/cards' },
];

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { unreadCount } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const navigation = isAuthenticated ? authenticatedNavigation : publicNavigation;
  const { theme, toggle } = useTheme();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onMobileMenuToggle?.();
  };

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm border-b border-gray-200 dark:border-neutral-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">SecureBank</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Products & Services megamenu */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                Products & Services
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-20 mt-2 w-72 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {productLinks.map((p) => (
                    <Menu.Item key={p.name}>
                      {({ active }) => (
                        <Link
                          href={p.href}
                          className={cn(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          {p.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link href="/notifications" className="relative p-2 text-gray-600 hover:text-blue-600">
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-2">
                    <UserCircleIcon className="h-8 w-8" />
                    <span className="hidden sm:block text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={cn(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <UserIcon className="mr-3 h-4 w-4" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings"
                            className={cn(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <CogIcon className="mr-3 h-4 w-4" />
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={cn(
                              active ? 'bg-gray-100' : '',
                              'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Open Account
                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={toggle}
                  className="p-2 rounded hover:bg-gray-100 text-gray-600"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Mobile: Products dropdown as list */}
              <details>
                <summary className="px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 cursor-pointer">Products & Services</summary>
                <div className="pl-4">
                  {productLinks.map((p) => (
                    <Link key={p.name} href={p.href} className="block px-3 py-2 text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                      {p.name}
                    </Link>
                  ))}
                </div>
              </details>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="border-t border-gray-200 pt-4">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Open Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
