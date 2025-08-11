import Link from 'next/link';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const footerNavigation = {
  banking: [
    { name: 'Checking Accounts', href: '/products/checking' },
    { name: 'Savings Accounts', href: '/products/savings' },
    { name: 'Credit Cards', href: '/products/cards' },
    { name: 'Loans & Mortgages', href: '/products/loans' },
    { name: 'Investment Services', href: '/products/investments' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Branch Locator', href: '/branches' },
    { name: 'ATM Locator', href: '/atms' },
    { name: 'Customer Service', href: '/support' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Releases', href: '/press' },
    { name: 'Investor Relations', href: '/investors' },
    { name: 'Community', href: '/community' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security Center', href: '/security' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Site Map', href: '/sitemap' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-xl font-bold">SecureBank</span>
            </div>
            <p className="text-gray-300 text-sm mb-6">
              Your trusted financial partner for over 50 years. Secure, reliable, and always here for you.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>1-800-SECURE-1</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span>support@securebank.com</span>
              </div>
              <div className="flex items-start text-sm text-gray-300">
                <MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Financial District<br />New York, NY 10004</span>
              </div>
            </div>
          </div>

          {/* Banking Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Banking Services</h3>
            <ul className="space-y-3">
              {footerNavigation.banking.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security badges and social links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Security badges */}
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="flex items-center text-sm text-gray-300">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" />
                <span>FDIC Insured</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <LockClosedIcon className="h-5 w-5 mr-2 text-green-400" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <GlobeAltIcon className="h-5 w-5 mr-2 text-green-400" />
                <span>Equal Housing Lender</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                    <span className="text-xs font-bold">{item.icon.charAt(0).toUpperCase()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 SecureBank. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">
              Member FDIC. Equal Housing Lender. NMLS ID: 123456
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
