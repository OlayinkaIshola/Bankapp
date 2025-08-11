import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '@/types';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  error: string | null;
}

// Mock data
const mockAccounts: Account[] = [
  {
    id: '1',
    accountNumber: '****1234',
    accountType: 'checking',
    balance: 15420.50,
    availableBalance: 15420.50,
    currency: 'USD',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    accountNumber: '****5678',
    accountType: 'savings',
    balance: 45230.75,
    availableBalance: 45230.75,
    currency: 'USD',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    accountNumber: '****9012',
    accountType: 'credit',
    balance: -2150.25,
    availableBalance: 7849.75,
    currency: 'USD',
    status: 'active',
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (_arg, { rejectWithValue: _r }) => {
    try {
      // Try backend first
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/api/accounts`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        // Map backend shape to frontend Account if needed
        return (data || []).map((a: any) => ({
          id: a.id,
          accountNumber: a.accountNumber || a.account_number || a.number || '',
          accountType: (a.accountType || a.account_type || 'checking') as Account['accountType'],
          balance: a.balance ?? 0,
          availableBalance: a.availableBalance ?? a.balance ?? 0,
          currency: 'USD',
          status: (a.status || 'active') as Account['status'],
          createdAt: a.createdAt || new Date().toISOString(),
          updatedAt: a.updatedAt || new Date().toISOString(),
        })) as Account[];
      }
      // Fallback to mock
      return mockAccounts;
    } catch (_error: any) {
      // Fallback to mock on network error
      return mockAccounts;
    }
  }
);

export const fetchAccountById = createAsyncThunk(
  'accounts/fetchAccountById',
  async (accountId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const account = mockAccounts.find(acc => acc.id === accountId);
      if (!account) {
        throw new Error('Account not found');
      }
      return account;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAccountBalance = createAsyncThunk(
  'accounts/updateBalance',
  async ({ accountId, amount }: { accountId: string; amount: number }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return { accountId, amount };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    selectAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
    },
    clearSelectedAccount: (state) => {
      state.selectedAccount = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateLocalBalance: (state, action: PayloadAction<{ accountId: string; amount: number }>) => {
      const account = state.accounts.find(acc => acc.id === action.payload.accountId);
      if (account) {
        account.balance += action.payload.amount;
        account.availableBalance += action.payload.amount;
        account.updatedAt = new Date().toISOString();
      }
      if (state.selectedAccount && state.selectedAccount.id === action.payload.accountId) {
        state.selectedAccount.balance += action.payload.amount;
        state.selectedAccount.availableBalance += action.payload.amount;
        state.selectedAccount.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Accounts
      .addCase(fetchAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
        state.error = null;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Account by ID
      .addCase(fetchAccountById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAccount = action.payload;
        state.error = null;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Account Balance
      .addCase(updateAccountBalance.fulfilled, (state, action) => {
        const { accountId, amount } = action.payload;
        const account = state.accounts.find(acc => acc.id === accountId);
        if (account) {
          account.balance += amount;
          account.availableBalance += amount;
          account.updatedAt = new Date().toISOString();
        }
        if (state.selectedAccount && state.selectedAccount.id === accountId) {
          state.selectedAccount.balance += amount;
          state.selectedAccount.availableBalance += amount;
          state.selectedAccount.updatedAt = new Date().toISOString();
        }
      });
  },
});

export const { selectAccount, clearSelectedAccount, clearError, updateLocalBalance } = accountSlice.actions;
export default accountSlice.reducer;
