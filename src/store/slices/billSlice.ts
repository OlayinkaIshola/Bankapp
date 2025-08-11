import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface RecurringBill {
  id: string;
  payeeName: string;
  amount: number;
  fromAccountId: string;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  nextRun: string;
}

interface BillState {
  recurring: RecurringBill[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BillState = {
  recurring: [],
  isLoading: false,
  error: null,
};

export const addRecurringBill = createAsyncThunk(
  'bills/addRecurring',
  async (b: Omit<RecurringBill, 'id'>, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 500));
      return { ...b, id: Date.now().toString() } as RecurringBill;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeRecurringBill = createAsyncThunk(
  'bills/removeRecurring',
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 300));
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRecurringBill.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(addRecurringBill.fulfilled, (state, action: PayloadAction<RecurringBill>) => {
        state.isLoading = false;
        state.recurring.push(action.payload);
      })
      .addCase(addRecurringBill.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(removeRecurringBill.fulfilled, (state, action) => {
        state.recurring = state.recurring.filter((r) => r.id !== action.payload);
      });
  },
});

export default billSlice.reducer;

