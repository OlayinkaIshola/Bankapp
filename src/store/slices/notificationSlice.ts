import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/types';

import { NotificationPreferences } from '@/types';
import { apiGet, apiPatch, apiPost, apiDelete } from '@/lib/api';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  preferences: NotificationPreferences;
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Transaction Alert',
    message: 'Your account was debited $45.99 for Grocery Store Purchase',
    type: 'info',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Salary Credited',
    message: 'Your salary of $2,500.00 has been credited to your account',
    type: 'success',
    isRead: false,
    createdAt: '2024-01-14T09:00:00Z'
  },
  {
    id: '3',
    title: 'Security Alert',
    message: 'New device login detected from Chrome on Windows',
    type: 'warning',
    isRead: true,
    createdAt: '2024-01-13T15:20:00Z'
  },
  {
    id: '4',
    title: 'Bill Reminder',
    message: 'Your electricity bill of $120.00 is due in 3 days',
    type: 'warning',
    isRead: false,
    createdAt: '2024-01-12T08:00:00Z'
  },
  {
    id: '5',
    title: 'Interest Earned',
    message: 'You earned $150.00 interest on your savings account',
    type: 'success',
    isRead: true,
    createdAt: '2024-01-11T12:00:00Z'
  }
];

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    try {
      return await apiGet<Notification[]>(`/api/notifications`);
    } catch (_error: any) {
      return mockNotifications;
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string, { rejectWithValue: _ }) => {
    try {
      await apiPost(`/api/notifications/read/${notificationId}`, {});
      return notificationId;
    } catch (_error: any) {
      return notificationId;
    }
  }
);

export const markAllAsRead = createAsyncThunk<boolean, void>(
  'notifications/markAllAsRead',
  async (_: void, { rejectWithValue: _r }) => {
    try {
      await apiPost(`/api/notifications/read-all`, {});
      return true;
    } catch (_error: any) {
      return true;
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId: string, { rejectWithValue: _ }) => {
    try {
      await apiDelete(`/api/notifications/${notificationId}`);
      return notificationId;
    } catch (_error: any) {
      return notificationId;
    }
  }
);

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  preferences: {
    txEmail: true,
    txSMS: false,
    txPush: true,
    billRemindersEmail: true,
    marketingEmail: false,
  },
};


export const fetchPreferences = createAsyncThunk('notifications/fetchPreferences', async () => {
  try { return await apiGet<NotificationPreferences>('/api/preferences'); } catch { return null as any; }
});

export const savePreferencesThunk = createAsyncThunk('notifications/savePreferences', async (prefs: Partial<NotificationPreferences>, { rejectWithValue }) => {
  try { return await apiPatch<NotificationPreferences>('/api/preferences', prefs); } catch (e: any) { return rejectWithValue(e?.message || 'Failed to save preferences'); }
});
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.notifications.unshift(newNotification);
      if (!newNotification.isRead) {
        state.unreadCount += 1;
      }
    },
    updateUnreadCount: (state) => {
      state.unreadCount = state.notifications.filter(n => !n.isRead).length;
    },
    updatePreferences: (state, action: PayloadAction<Partial<NotificationPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    savePreferences: () => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Mark as Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // Mark All as Read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach(notification => {
          notification.isRead = true;
        });
        state.unreadCount = 0;
      })
      // Delete Notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1) {
          const notification = state.notifications[index];
          if (!notification.isRead) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.notifications.splice(index, 1);
        }
      })
      // Preferences server sync
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        if (action.payload) state.preferences = action.payload as NotificationPreferences;
      })
      .addCase(savePreferencesThunk.fulfilled, (state, action) => {
        if (action.payload) state.preferences = action.payload as NotificationPreferences;
      });
  },
});

export const { clearError, addNotification, updateUnreadCount } = notificationSlice.actions;
export default notificationSlice.reducer;
