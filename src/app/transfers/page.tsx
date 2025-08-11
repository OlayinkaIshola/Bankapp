import Link from 'next/link';
import RequireAuth from '@/components/auth/RequireAuth';

export default function TransfersHubPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Transfers</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/transfers/internal" className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300">
            <h3 className="text-lg font-semibold text-gray-900">Internal</h3>
            <p className="text-sm text-gray-600">Between your accounts</p>
          </Link>
          <Link href="/transfers/within-bank" className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300">
            <h3 className="text-lg font-semibold text-gray-900">Within Bank</h3>
            <p className="text-sm text-gray-600">To other SecureBank users</p>
          </Link>
          <Link href="/transfers/international" className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300">
            <h3 className="text-lg font-semibold text-gray-900">International</h3>
            <p className="text-sm text-gray-600">Cross-border transfers</p>
          </Link>
        </div>
      </div>
    </RequireAuth>
  );
}
