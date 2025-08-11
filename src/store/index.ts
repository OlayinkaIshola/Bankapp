import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import accountSlice from './slices/accountSlice';
import transactionSlice from './slices/transactionSlice';
import notificationSlice from './slices/notificationSlice';
import beneficiarySlice from './slices/beneficiarySlice';
import payeeSlice from './slices/payeeSlice';
import loanSlice from './slices/loanSlice';
import userCardSlice from './slices/cardSlice';
import billSlice from './slices/billSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    accounts: accountSlice,
    transactions: transactionSlice,
    notifications: notificationSlice,
    beneficiaries: beneficiarySlice,
    payees: payeeSlice,
    loans: loanSlice,
    userCards: userCardSlice,
    bills: billSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
