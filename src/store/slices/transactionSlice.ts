import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransferForm } from '@/types';
import { apiGet, apiPost } from '@/lib/api';

interface TransactionState {
  transactions: Transaction[];
  recentTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    accountId: '1',
    type: 'debit',
    amount: -45.99,
    description: 'Grocery Store Purchase',
    category: 'Food & Dining',
    date: '2024-01-15T10:30:00Z',
    status: 'completed',
    reference: 'TXN001',
    balance: 15420.50
  },
  {
    id: '2',
    accountId: '1',
    type: 'credit',
    amount: 2500.00,
    description: 'Salary Deposit',
    category: 'Income',
    date: '2024-01-14T09:00:00Z',
    status: 'completed',
    reference: 'TXN002',
    balance: 15466.49
  },
  {
    id: '3',
    accountId: '2',
    type: 'credit',
    amount: 150.00,
    description: 'Interest Payment',
    category: 'Interest',
    date: '2024-01-13T12:00:00Z',
    status: 'completed',
    reference: 'TXN003',
    balance: 45230.75
  },
  {
    id: '4',
    accountId: '1',
    type: 'debit',
    amount: -1200.00,
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-12T08:00:00Z',
    status: 'completed',
    reference: 'TXN004',
    balance: 12966.49
  },
  {
    id: '5',
    accountId: '3',
    type: 'debit',
    amount: -89.50,
    description: 'Online Shopping',
    category: 'Shopping',
    date: '2024-01-11T16:45:00Z',
    status: 'completed',
    reference: 'TXN005',
    balance: -2150.25
  }
];

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (accountId?: string, { rejectWithValue: _ }) => {
    try {
      // Try backend first
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || undefined : undefined;
      const data = await apiGet<Transaction[]>(`/api/transactions${accountId ? `?accountId=${accountId}` : ''}`, token);
      return data;
    } catch (_error: any) {
      // Fallback to mock
      if (accountId) return mockTransactions.filter(txn => txn.accountId === accountId);
      return mockTransactions;
    }
  }
);

export const fetchRecentTransactions = createAsyncThunk(
  'transactions/fetchRecent',
  async (limit: number = 5, { rejectWithValue: _ }) => {
    try {
      // Try backend
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || undefined : undefined;
      const data = await apiGet<Transaction[]>(`/api/transactions${limit ? '' : ''}`, token);
      return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
    } catch (_error: any) {
      return mockTransactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }
  }
);

export const createTransfer = createAsyncThunk(
  'transactions/createTransfer',
  async (transferData: TransferForm, { rejectWithValue: _ }) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || undefined : undefined;
      const txn = await apiPost<Transaction>('/api/transactions/transfer', transferData, token);
      return txn;
    } catch (_error: any) {
      // Fallback mock
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        accountId: transferData.fromAccountId,
        type: 'debit',
        amount: -transferData.amount,
        description: transferData.description || 'Transfer',
        category: 'Transfer',
        date: new Date().toISOString(),
        status: 'completed',
        reference: `TXN${Date.now()}`,
        balance: 0,
      };
      return newTransaction;
    }
  }
);

export const createBillPayment = createAsyncThunk(
  'transactions/createBillPayment',
  async (billData: { payeeName: string; amount: number; accountId: string; description: string }, { rejectWithValue: _ }) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || undefined : undefined;
      const txn = await apiPost<Transaction>('/api/transactions/bill', billData, token);
      return txn;
    } catch (_error: any) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        accountId: billData.accountId,
        type: 'debit',
        amount: -billData.amount,
        description: `Bill Payment - ${billData.payeeName}`,
        category: 'Bills & Utilities',
        date: new Date().toISOString(),
        status: 'completed',
        reference: `BILL${Date.now()}`,
        balance: 0,
      };
      return newTransaction;
    }
  }
);

const initialState: TransactionState = {
  transactions: [],
  recentTransactions: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      state.recentTransactions.unshift(action.payload);
      // Keep only the 5 most recent transactions
      if (state.recentTransactions.length > 5) {
        state.recentTransactions = state.recentTransactions.slice(0, 5);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Recent Transactions
      .addCase(fetchRecentTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentTransactions = action.payload;
        state.error = null;
      })
      .addCase(fetchRecentTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Transfer
      .addCase(createTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.recentTransactions.unshift(action.payload);
        if (state.recentTransactions.length > 5) {
          state.recentTransactions = state.recentTransactions.slice(0, 5);
        }
        state.error = null;
      })
      .addCase(createTransfer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Bill Payment
      .addCase(createBillPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBillPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.recentTransactions.unshift(action.payload);
        if (state.recentTransactions.length > 5) {
          state.recentTransactions = state.recentTransactions.slice(0, 5);
        }
        state.error = null;
      })
      .addCase(createBillPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
