import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiDelete } from '@/lib/api';

export interface Beneficiary {
  id: string;
  name: string;
  bank?: string;
  accountNumber: string;
  type: 'internal' | 'within_bank' | 'international';
}

interface BeneficiaryState {
  list: Beneficiary[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BeneficiaryState = {
  list: [],
  isLoading: false,
  error: null,
};

export const fetchBeneficiaries = createAsyncThunk(
  'beneficiaries/fetch',
  async () => {
    try {
      return await apiGet<Beneficiary[]>('/api/beneficiaries');
    } catch {
      return [] as Beneficiary[];
    }
  }
);

export const addBeneficiary = createAsyncThunk(
  'beneficiaries/add',
  async (b: Omit<Beneficiary, 'id'>, { rejectWithValue: _ }) => {
    try {
      return await apiPost<Beneficiary>('/api/beneficiaries', b);
    } catch (_e: any) {
      // fallback local id
      return { ...b, id: Date.now().toString() } as Beneficiary;
    }
  }
);

export const removeBeneficiary = createAsyncThunk(
  'beneficiaries/remove',
  async (id: string, { rejectWithValue: _ }) => {
    try {
      await apiDelete(`/api/beneficiaries/${id}`);
      return id;
    } catch (_e: any) {
      return id;
    }
  }
);

const beneficiarySlice = createSlice({
  name: 'beneficiaries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeneficiaries.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchBeneficiaries.fulfilled, (state, action: PayloadAction<Beneficiary[]>) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchBeneficiaries.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(addBeneficiary.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(addBeneficiary.fulfilled, (state, action: PayloadAction<Beneficiary>) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(addBeneficiary.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addCase(removeBeneficiary.fulfilled, (state, action) => {
        state.list = state.list.filter((b) => b.id !== action.payload);
      });
  },
});

export default beneficiarySlice.reducer;

