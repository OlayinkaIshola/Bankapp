'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNotifications, markAsRead, markAllAsRead, deleteNotification, } from '@/store/slices/notificationSlice';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { fetchPreferences, savePreferencesThunk } from '@/store/slices/notificationSlice';
import { useToast } from '@/components/ui/Toast';

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { notifications, preferences } = useAppSelector((s) => s.notifications);
  const { addToast } = useToast();

  const savePref = async (patch: any) => {
    const res = await dispatch(savePreferencesThunk(patch));
    if (savePreferencesThunk.fulfilled.match(res)) addToast('Preferences saved', 'success');
    else addToast((res as any).payload || 'Failed to save preferences', 'error');
  };

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchPreferences());
  }, [dispatch]);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
          <Button
            variant="outline"
            onClick={async () => {
              const res = await dispatch(markAllAsRead());
              if (markAllAsRead.fulfilled.match(res)) addToast('All notifications marked as read', 'success');
              else addToast('Failed to mark all as read', 'error');
            }}
          >
            Mark all as read
          </Button>
        </div>

        {/* Preferences */}
        <div className="mt-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Preferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={preferences.txEmail} onChange={() => savePref({ txEmail: !preferences.txEmail })} />
              Transaction Email Alerts
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={preferences.txSMS} onChange={() => savePref({ txSMS: !preferences.txSMS })} />
              Transaction SMS Alerts
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={preferences.txPush} onChange={() => savePref({ txPush: !preferences.txPush })} />
              Push Notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={preferences.billRemindersEmail} onChange={() => savePref({ billRemindersEmail: !preferences.billRemindersEmail })} />
              Bill Reminder Emails
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={preferences.marketingEmail} onChange={() => savePref({ marketingEmail: !preferences.marketingEmail })} />
              Marketing Emails
            </label>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {notifications.map((n) => (
            <div key={n.id} className={`border rounded-lg p-4 ${n.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{n.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!n.isRead && (
                    <Button size="sm" variant="outline" onClick={() => dispatch(markAsRead(n.id))}>Mark read</Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => dispatch(deleteNotification(n.id))}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}

