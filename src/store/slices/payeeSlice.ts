import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiDelete } from '@/lib/api';

export interface Payee {
  id: string;
  name: string;
  category: 'utilities' | 'subscription' | 'government' | 'other';
  accountNumber: string;
}

interface PayeeState {
  list: Payee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PayeeState = {
  list: [],
  isLoading: false,
  error: null,
};

export const fetchPayees = createAsyncThunk(
  'payees/fetch',
  async () => {
    try { return await apiGet<Payee[]>('/api/payees'); } catch { return [] as Payee[]; }
  }
);

export const addPayee = createAsyncThunk(
  'payees/add',
  async (p: Omit<Payee, 'id'>, { rejectWithValue: _ }) => {
    try {
      return await apiPost<Payee>('/api/payees', p);
    } catch (_e: any) {
      return { ...p, id: Date.now().toString() } as Payee;
    }
  }
);

export const removePayee = createAsyncThunk(
  'payees/remove',
  async (id: string, { rejectWithValue: _ }) => {
    try {
      await apiDelete(`/api/payees/${id}`);
      return id;
    } catch (_e: any) {
      return id;
    }
  }
);

const payeeSlice = createSlice({
  name: 'payees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayees.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchPayees.fulfilled, (state, action: PayloadAction<Payee[]>) => { state.isLoading = false; state.list = action.payload; })
      .addCase(fetchPayees.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(addPayee.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(addPayee.fulfilled, (state, action: PayloadAction<Payee>) => { state.isLoading = false; state.list.push(action.payload); })
      .addCase(addPayee.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(removePayee.fulfilled, (state, action) => { state.list = state.list.filter((p) => p.id !== action.payload); });
  },
});

export default payeeSlice.reducer;

