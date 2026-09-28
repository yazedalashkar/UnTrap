'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 backdrop-blur-xl bg-black/[0.04] dark:bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-foreground transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/10 dark:hover:bg-white/15 active:scale-95 ${className}`}
    >
      <Globe className="h-3.5 w-3.5 text-red-500" />
      <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
}
