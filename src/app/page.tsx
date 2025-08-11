import Link from 'next/link';
import {
  ShieldCheckIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const features = [
  {
    name: 'Secure Banking',
    description: 'Bank-level security with 256-bit encryption and fraud protection.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Digital Payments',
    description: 'Send money instantly with our mobile app and online banking.',
    icon: CreditCardIcon,
  },
  {
    name: 'Savings & Checking',
    description: 'Competitive rates on savings accounts and free checking.',
    icon: BanknotesIcon,
  },
  {
    name: 'Investment Services',
    description: 'Grow your wealth with our investment and retirement planning.',
    icon: ChartBarIcon,
  },
];

const products = [
  {
    name: 'Checking Accounts',
    description: 'Free checking with no minimum balance and unlimited transactions.',
    features: ['No monthly fees', 'Free ATM access', 'Mobile banking'],
    href: '/products/checking',
  },
  {
    name: 'Savings Accounts',
    description: 'High-yield savings accounts to help your money grow.',
    features: ['2.5% APY', 'No minimum balance', 'FDIC insured'],
    href: '/products/savings',
  },
  {
    name: 'Credit Cards',
    description: 'Reward credit cards with cashback and travel benefits.',
    features: ['No annual fee', '2% cashback', 'Travel rewards'],
    href: '/products/cards',
  },
  {
    name: 'Home Loans',
    description: 'Competitive mortgage rates for your dream home.',
    features: ['Low rates', 'Fast approval', 'Expert guidance'],
    href: '/products/loans',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Trusted Financial Partner
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              Experience secure, convenient banking with competitive rates and personalized service.
              Join over 1 million customers who trust SecureBank with their financial future.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/register">Open Account</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose SecureBank?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              We provide comprehensive financial services with the security and convenience you deserve.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Banking Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Discover our range of financial products designed to meet your needs.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.name} className="h-full">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    <Link href={product.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Open your account today and experience the difference of banking with SecureBank.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <Link href="/register">Open Account Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <PhoneIcon className="mx-auto h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">1-800-SECURE-1</p>
              <p className="text-sm text-gray-400">24/7 Customer Support</p>
            </div>
            <div className="text-center">
              <MapPinIcon className="mx-auto h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">500+ Branches Nationwide</p>
              <p className="text-sm text-gray-400">
                <Link href="/branches" className="hover:text-white">Find a Branch</Link>
              </p>
            </div>
            <div className="text-center">
              <ClockIcon className="mx-auto h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Banking Hours</h3>
              <p className="text-gray-300">Mon-Fri: 9AM-6PM</p>
              <p className="text-sm text-gray-400">Online Banking: 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
