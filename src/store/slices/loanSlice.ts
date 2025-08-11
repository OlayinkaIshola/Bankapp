import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Loan } from '@/types';
import { apiGet, apiPost } from '@/lib/api';

interface LoanState {
  loans: Loan[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LoanState = {
  loans: [],
  isLoading: false,
  error: null,
};

export const fetchLoans = createAsyncThunk('loans/fetch', async () => {
  try { return await apiGet<Loan[]>('/api/loans'); } catch { return [] as Loan[]; }
});

export const applyLoan = createAsyncThunk(
  'loans/apply',
  async (loan: Omit<Loan, 'id' | 'status' | 'createdAt' | 'outstandingBalance' | 'monthlyPayment' | 'nextPaymentDate'>, { rejectWithValue: _ }) => {
    try {
      const created = await apiPost<Loan>('/api/loans/apply', loan);
      return created;
    } catch (_e: any) {
      // fallback local
      const newLoan: Loan = {
        ...loan,
        id: Date.now().toString(),
        outstandingBalance: loan.principalAmount,
        monthlyPayment: loan.principalAmount / loan.termMonths,
        nextPaymentDate: new Date().toISOString(),
        status: 'active',
        createdAt: new Date().toISOString(),
      } as Loan;
      return newLoan;
    }
  }
);

const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchLoans.fulfilled, (state, action: PayloadAction<Loan[]>) => { state.isLoading = false; state.loans = action.payload; })
      .addCase(fetchLoans.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(applyLoan.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(applyLoan.fulfilled, (state, action: PayloadAction<Loan>) => {
        state.isLoading = false;
        state.loans.push(action.payload);
      })
      .addCase(applyLoan.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
  },
});

export default loanSlice.reducer;

