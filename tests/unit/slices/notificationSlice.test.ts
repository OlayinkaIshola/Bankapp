import reducer, { clearError } from '@/store/slices/notificationSlice';
import { fetchPreferences, savePreferencesThunk } from '@/store/slices/notificationSlice';

test('fetchPreferences.fulfilled updates preferences in state', () => {
  const initial = reducer(undefined, { type: 'init' } as any);
  const prefs = { txEmail: false, txSMS: true, txPush: false, billRemindersEmail: false, marketingEmail: true };
  const state = reducer(initial, { type: fetchPreferences.fulfilled.type, payload: prefs } as any);
  expect(state.preferences).toEqual(prefs);
});

test('savePreferencesThunk.fulfilled merges and updates preferences', () => {
  const initial = reducer(undefined, { type: 'init' } as any);
  const updated = { ...initial.preferences, txEmail: false };
  const state = reducer(initial, { type: savePreferencesThunk.fulfilled.type, payload: updated } as any);
  expect(state.preferences.txEmail).toBe(false);
});

