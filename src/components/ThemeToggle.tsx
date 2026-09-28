'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { useLanguage } from '@/lib/i18n';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.08] ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={
        isDark
          ? lang === 'ar' ? 'التحويل إلى الوضع الفاتح' : 'Switch to Light Mode'
          : lang === 'ar' ? 'التحويل إلى الوضع الداكن' : 'Switch to Dark Mode'
      }
      title={
        isDark
          ? lang === 'ar' ? 'الوضع الفاتح' : 'Light Mode'
          : lang === 'ar' ? 'الوضع الداكن' : 'Dark Mode'
      }
      className={`group relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 backdrop-blur-xl bg-black/[0.04] dark:bg-white/[0.08] text-foreground shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-red-500/30 hover:bg-black/10 dark:hover:bg-white/15 active:scale-90 ${className}`}
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-amber-300 transition-transform duration-300 ease-spring group-hover:-rotate-12 group-hover:scale-110" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 ease-spring group-hover:rotate-45 group-hover:scale-110" />
      )}
    </button>
  );
}
