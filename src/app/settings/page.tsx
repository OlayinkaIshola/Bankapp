'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Button from '@/components/ui/Button';
import { setTwoFactorEnabled, setDevices, addLoginActivity } from '@/store/slices/authSlice';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { twoFactorEnabled, devices = [], loginActivities = [] } = useAppSelector((s) => s.auth);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Security & Settings</h1>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
            <p className="mt-2 text-sm text-gray-600">Add an extra layer of security to your account.</p>
            <div className="mt-4 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-900">
                <input type="checkbox" checked={!!twoFactorEnabled} onChange={() => dispatch(setTwoFactorEnabled(!twoFactorEnabled))} />
                Enable 2FA
              </label>
              <Button variant="outline" size="sm" onClick={() => alert('This would open a QR/OTP setup flow (mock).')}>Setup</Button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Devices</h2>
            <p className="mt-2 text-sm text-gray-600">Manage devices that have accessed your account.</p>
            <ul className="mt-3 space-y-2 text-sm">
              {devices.length === 0 && <li className="text-gray-500">No devices recorded.</li>}
              {devices.map((d) => (
                <li key={d.id} className="flex items-center justify-between">
                  <span>{d.name}</span>
                  <span className="text-gray-500">Last active: {new Date(d.lastActiveAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Button size="sm" variant="outline" onClick={() => dispatch(setDevices([{ id: 'dev1', name: 'Chrome on Windows', lastActiveAt: new Date().toISOString() }]))}>Refresh</Button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">Login Activity</h2>
            <p className="mt-2 text-sm text-gray-600">Recent sign-ins and attempts.</p>
            <div className="mt-3 overflow-hidden rounded-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-500">Time</th>
                    <th className="px-4 py-2 text-left text-gray-500">IP</th>
                    <th className="px-4 py-2 text-left text-gray-500">User Agent</th>
                    <th className="px-4 py-2 text-left text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loginActivities.length === 0 && (
                    <tr><td className="px-4 py-3 text-gray-500" colSpan={4}>No activity recorded.</td></tr>
                  )}
                  {loginActivities.map((l) => (
                    <tr key={l.id}>
                      <td className="px-4 py-3">{new Date(l.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-3">{l.ip}</td>
                      <td className="px-4 py-3">{l.userAgent}</td>
                      <td className="px-4 py-3 capitalize">{l.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <Button size="sm" variant="outline" onClick={() => dispatch(addLoginActivity({ id: Date.now().toString(), timestamp: new Date().toISOString(), ip: '127.0.0.1', userAgent: 'Chrome', status: 'success' }))}>Mock Add Entry</Button>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

