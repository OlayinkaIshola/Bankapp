"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(next: Theme) {
  const root = document.documentElement;
  const isDark = next === 'dark' || (next === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', isDark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'system';
    setThemeState(saved);
    applyTheme(saved);
    const handler = (_e: MediaQueryListEvent) => { if (theme === 'system') applyTheme('system'); };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

