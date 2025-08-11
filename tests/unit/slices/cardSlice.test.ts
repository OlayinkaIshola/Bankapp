import reducer, { requestCard, toggleBlockCard, setCardLimit } from '@/store/slices/cardSlice';

const initial = reducer(undefined, { type: 'init' } as any);

test('requestCard adds a new card', async () => {
  const action = await requestCard({ type: 'debit' })(
    () => {},
    () => ({ userCards: initial }),
    undefined as any
  ) as any;
  const state = reducer(initial, { type: requestCard.fulfilled.type, payload: action.payload });
  expect(state.cards).toHaveLength(1);
  expect(state.cards[0].type).toBe('debit');
});

test('toggleBlockCard changes status', async () => {
  const withCard = { ...initial, cards: [{ id: 'c1', type: 'debit' as const, number: '****1234', status: 'active' as const, limit: 1000 }] };
  const action = await toggleBlockCard('c1')(
    () => {},
    () => ({ userCards: withCard }),
    undefined as any
  ) as any;
  const state = reducer(withCard, { type: toggleBlockCard.fulfilled.type, payload: action.payload });
  expect(state.cards[0].status).toBe('blocked');
});
