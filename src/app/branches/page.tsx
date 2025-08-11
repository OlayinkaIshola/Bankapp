'use client';

import { useState } from 'react';

const mockBranches = [
  { id: 1, name: 'Downtown Branch', address: '123 Main St, New York, NY', phone: '1-800-SECURE-1' },
  { id: 2, name: 'Uptown Branch', address: '456 Park Ave, New York, NY', phone: '1-800-SECURE-1' },
  { id: 3, name: 'Brooklyn Branch', address: '789 Atlantic Ave, Brooklyn, NY', phone: '1-800-SECURE-1' },
];

export default function BranchesPage() {
  const [query, setQuery] = useState('');

  const filtered = mockBranches.filter(b =>
    `${b.name} ${b.address}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Branch & ATM Locator</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Find a SecureBank branch or ATM near you.
        </p>

        <div className="mt-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, state, or ZIP"
            className="w-full sm:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((b) => (
            <div key={b.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{b.name}</h3>
              <p className="mt-2 text-gray-700">{b.address}</p>
              <p className="mt-1 text-gray-600 text-sm">{b.phone}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
