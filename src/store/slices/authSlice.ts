import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginForm, RegisterForm } from '@/types';
import { apiPost } from '@/lib/api';

interface ResetPasswordRequest { email: string }
interface ResetPasswordConfirm { token: string; newPassword: string }
interface Verify2FARequest { code: string }

// Mock API calls - replace with actual API endpoints
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginForm, { rejectWithValue }) => {
    try {
      // Try backend login
      try {
        const result = await apiPost<any>('/api/auth/login', credentials);
        if (result.requires2FA) {
          return { user: result.user as User, token: null, requires2FA: true };
        }
        if (result.token && result.user) {
          localStorage.setItem('token', result.token);
          if (result.refreshToken) localStorage.setItem('refreshToken', result.refreshToken);
          localStorage.setItem('user', JSON.stringify(result.user));
          return { user: result.user as User, token: result.token, requires2FA: false };
        }
        throw new Error('Unexpected response');
      } catch (_e) {
        // Fallback demo behavior
        if (credentials.email === 'demo@bank.com' && credentials.password === 'demo123') {
          const requires2FA = true;
          const user: User = {
            id: '1', email: credentials.email, firstName: 'John', lastName: 'Doe',
            phoneNumber: '+1234567890', address: { street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA' },
            dateOfBirth: '1990-01-01', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-01-01T00:00:00Z'
          };
          return { user, token: null, requires2FA };
        }
        throw e;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterForm, { rejectWithValue }) => {
    try {
      try {
        const result = await apiPost<any>('/api/auth/register', userData);
        if (!result?.token || !result?.user) throw new Error('Unexpected response');
        localStorage.setItem('token', result.token);
        if (result.refreshToken) localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.user));
        return { user: result.user as User, token: result.token };
      } catch (_e) {
        // Fallback demo behavior
        const user: User = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          dateOfBirth: userData.dateOfBirth,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const token = 'mock-jwt-token-new-user';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { user, token };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verify2FA = createAsyncThunk(
  'auth/verify2FA',
  async ({ code }: Verify2FARequest, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user!;
      try {
        const result = await apiPost<any>('/api/auth/verify-2fa', { email: user.email, code });
        if (!result?.token) throw new Error('Unexpected response');
        localStorage.setItem('token', result.token);
        if (result.refreshToken) localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        return { token: result.token };
      } catch (e) {
        if (code === '123456') {
          const token = 'mock-jwt-token';
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          return { token };
        }
        throw e;
      }
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async ({ email }: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 800));
      if (!email) throw new Error('Email is required');
      return true;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const confirmPasswordReset = createAsyncThunk(
  'auth/confirmPasswordReset',
  async ({ token, newPassword }: ResetPasswordConfirm, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 800));
      if (!token || !newPassword) throw new Error('Invalid reset request');
      return true;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return { user, token };
    }
    
    throw new Error('No valid session found');
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  requires2FA: false,
  is2FAVerified: false,
  sessionExpiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setTwoFactorEnabled: (state, action: PayloadAction<boolean>) => {
      state.twoFactorEnabled = action.payload;
    },
    setDevices: (state, action: PayloadAction<{ id: string; name: string; lastActiveAt: string }[]>) => {
      state.devices = action.payload;
    },
    addLoginActivity: (state, action: PayloadAction<{ id: string; timestamp: string; ip: string; userAgent: string; status: 'success' | 'failed' }>) => {
      state.loginActivities = [action.payload, ...(state.loginActivities || [])];
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.requires2FA ? null : action.payload.token;
        state.isAuthenticated = !action.payload.requires2FA;
        state.requires2FA = !!action.payload.requires2FA;
        state.is2FAVerified = !action.payload.requires2FA;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // 2FA verify
      .addCase(verify2FA.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.requires2FA = false;
        state.is2FAVerified = true;
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Password reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(confirmPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.requires2FA = false;
        state.is2FAVerified = false;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.is2FAVerified = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.is2FAVerified = false;
      });
  },
});

export const { clearError, updateUser, setTwoFactorEnabled, setDevices, addLoginActivity } = authSlice.actions;
export default authSlice.reducer;
