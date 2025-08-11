import reducer, { addTransaction } from '@/store/slices/transactionSlice';
import { Transaction } from '@/types';

describe('transactions reducer additions', () => {
  it('addTransaction pushes to transactions and recentTransactions (max 5)', () => {
    const initial = { transactions: [], recentTransactions: [], isLoading: false, error: null } as any;
    const txs: Transaction[] = Array.from({ length: 6 }).map((_, i) => ({
      id: `${i+1}`,
      accountId: '1',
      type: i % 2 === 0 ? 'credit' : 'debit',
      amount: i + 1,
      description: `t${i+1}`,
      category: 'x',
      date: new Date().toISOString(),
      status: 'completed',
      reference: `R${i+1}`,
      balance: 0,
    }));

    let state = initial;
    txs.forEach(tx => { state = reducer(state, addTransaction(tx)); });

    expect(state.transactions.length).toBe(6);
    expect(state.recentTransactions.length).toBe(5);
    expect(state.recentTransactions[0].id).toBe('6');
  });
});

