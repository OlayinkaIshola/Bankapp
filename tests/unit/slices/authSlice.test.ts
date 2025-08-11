import reducer, { loginUser, verify2FA } from '@/store/slices/authSlice';

const initial = reducer(undefined, { type: 'init' } as any);

test('login sets requires2FA for demo user in fallback', async () => {
  const action = await loginUser({ email: 'demo@bank.com', password: 'demo123', rememberMe: false } as any)(
    () => {},
    () => ({ auth: initial }),
    undefined as any
  ) as any;
  const state = reducer(initial, { type: loginUser.fulfilled.type, payload: action.payload });
  expect(state.requires2FA).toBe(true);
});

