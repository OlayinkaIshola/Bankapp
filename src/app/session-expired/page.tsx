import Link from 'next/link';

export default function SessionExpiredPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Session expired</h1>
        <p className="mt-2 text-sm text-gray-600">
          For your security, we signed you out after inactivity. Please sign in again.
        </p>
        <div className="mt-6">
          <Link href="/login" className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
