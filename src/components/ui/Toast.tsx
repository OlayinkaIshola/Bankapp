"use client";
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';

export type ToastKind = 'success' | 'error' | 'info';
export interface ToastItem { id: string; message: string; kind: ToastKind; }

interface ToastContextValue {
  addToast: (message: string, kind?: ToastKind, ms?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, kind: ToastKind = 'info', ms = 2500) => {
    const id = Date.now().toString();
    setToasts((t) => [...t, { id, message, kind }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ms);
  }, []);

  // Escape to clear all
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setToasts([]); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-2 rounded shadow text-sm border ${
            t.kind === 'success' ? 'bg-green-600 text-white border-green-700' :
            t.kind === 'error' ? 'bg-red-600 text-white border-red-700' :
            'bg-gray-900 text-white border-gray-800'
          }`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

