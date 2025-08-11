import reducer, { setCardLimit, toggleBlockCard } from '@/store/slices/cardSlice';
import { UserCard } from '@/store/slices/cardSlice';

describe('card slice extra reducers', () => {
  it('setCardLimit fulfilled updates card in state', () => {
    const card: UserCard = { id: '1', type: 'debit', number: '****', status: 'active', limit: 500 };
    const state: any = { cards: [card], isLoading: false, error: null };
    const updated: UserCard = { ...card, limit: 900 };
    const action: any = { type: setCardLimit.fulfilled.type, payload: updated };
    const newState = reducer(state, action);
    expect(newState.cards[0].limit).toBe(900);
  });

  it('toggleBlockCard fulfilled replaces card', () => {
    const card: UserCard = { id: '1', type: 'debit', number: '****', status: 'active', limit: 500 };
    const state: any = { cards: [card], isLoading: false, error: null };
    const updated: UserCard = { ...card, status: 'blocked' };
    const action: any = { type: toggleBlockCard.fulfilled.type, payload: updated };
    const newState = reducer(state, action);
    expect(newState.cards[0].status).toBe('blocked');
  });
});

