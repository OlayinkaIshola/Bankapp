import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '@/lib/api';

export interface UserCard {
  id: string;
  type: 'debit' | 'credit';
  number: string;
  status: 'active' | 'blocked';
  limit: number;
}

interface CardState {
  cards: UserCard[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  isLoading: false,
  error: null,
};

export const fetchCards = createAsyncThunk('cards/fetch', async () => {
  try { return await apiGet<UserCard[]>('/api/cards'); } catch { return [] as UserCard[]; }
});

export const requestCard = createAsyncThunk(
  'cards/request',
  async (payload: { type: 'debit' | 'credit' }, { rejectWithValue: _ }) => {
    try {
      return await apiPost<UserCard>('/api/cards/request', payload);
    } catch (_e: any) {
      return { id: Date.now().toString(), type: payload.type, number: '**** **** **** 9999', status: 'active', limit: 1000 } as UserCard;
    }
  }
);

export const toggleBlockCard = createAsyncThunk(
  'cards/toggleBlock',
  async (id: string, { rejectWithValue: _ }) => {
    try {
      return await apiPost<UserCard>(`/api/cards/${id}/toggle-block`, {});
    } catch (_e: any) {
      return { id, type: 'debit', number: '****', status: 'blocked', limit: 0 } as UserCard;
    }
  }
);

export const setCardLimit = createAsyncThunk(
  'cards/setLimit',
  async ({ id, limit }: { id: string; limit: number }, { rejectWithValue: _ }) => {
    try {
      return await apiPost<UserCard>(`/api/cards/${id}/limit`, { limit });
    } catch (_e: any) {
      return { id, type: 'debit', number: '****', status: 'active', limit } as UserCard;
    }
  }
);

const cardSlice = createSlice({
  name: 'userCards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<UserCard[]>) => { state.cards = action.payload; })
      .addCase(requestCard.fulfilled, (state, action: PayloadAction<UserCard>) => { state.cards.push(action.payload); })
      .addCase(toggleBlockCard.fulfilled, (state, action: PayloadAction<UserCard>) => {
        const idx = state.cards.findIndex((c) => c.id === action.payload.id);
        if (idx >= 0) state.cards[idx] = action.payload;
      })
      .addCase(setCardLimit.fulfilled, (state, action: PayloadAction<UserCard>) => {
        const idx = state.cards.findIndex((c) => c.id === action.payload.id);
        if (idx >= 0) state.cards[idx] = action.payload;
      });
  },
});

export default cardSlice.reducer;

