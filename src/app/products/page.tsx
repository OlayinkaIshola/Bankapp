import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';

const products = [
  { name: 'Savings Accounts', href: '/products/savings', description: 'Grow your money with competitive interest rates.' },
  { name: 'Checking Accounts', href: '/products/checking', description: 'Everyday banking with no hidden fees.' },
  { name: 'Loans & Mortgages', href: '/products/loans', description: 'Finance your dreams with flexible loans.' },
  { name: 'Credit/Debit Cards', href: '/products/cards', description: 'Rewards and security for your purchases.' },
  { name: 'Investments & Wealth', href: '/products/investments', description: 'Build wealth with smart investing.' },
];

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products & Services</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Explore our comprehensive suite of banking products designed to meet your financial needs.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card key={p.name}>
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                <p className="mt-2 text-gray-600">{p.description}</p>
                <div className="mt-4">
                  <Link href={p.href} className="text-blue-600 hover:text-blue-700 font-medium">
                    Learn more →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
