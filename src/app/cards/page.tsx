'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { Card as UICard, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { requestCard, toggleBlockCard, setCardLimit } from '@/store/slices/cardSlice';
import { fetchCards } from '@/store/slices/cardSlice';
import { useEffect } from 'react';
import { useState } from 'react';

export default function CardsPage() {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((s) => s.userCards);
  const [newLimit, setNewLimit] = useState<Record<string, number>>({});

  // Load cards from API on mount
  useEffect(() => { dispatch(fetchCards()); }, [dispatch]);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
          <div className="flex gap-2">
            <Button onClick={() => dispatch(requestCard({ type: 'debit' }))}>Request Debit Card</Button>
            <Button variant="outline" onClick={() => dispatch(requestCard({ type: 'credit' }))}>Request Credit Card</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <UICard key={c.id}>
              <CardContent>
                <p className="text-sm text-gray-500 capitalize">{c.type} card</p>
                <p className="mt-1 text-lg font-semibold">{c.number}</p>
                <p className="text-sm text-gray-600">Status: {c.status}</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={newLimit[c.id] ?? c.limit}
                    onChange={(e) => setNewLimit((s) => ({ ...s, [c.id]: Number(e.target.value) }))}
                    className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(setCardLimit({ id: c.id, limit: newLimit[c.id] ?? c.limit }))}
                  >
                    Set Limit
                  </Button>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant={c.status === 'active' ? 'danger' : 'secondary'}
                    onClick={() => dispatch(toggleBlockCard(c.id))}
                  >
                    {c.status === 'active' ? 'Block Card' : 'Unblock Card'}
                  </Button>
                </div>
              </CardContent>
            </UICard>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}

