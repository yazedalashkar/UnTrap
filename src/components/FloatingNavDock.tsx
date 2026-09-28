'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldAlert, FileText, PlusCircle, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function FloatingNavDock() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { href: '/', icon: Home, label: lang === 'ar' ? 'الرئيسية' : 'Home' },
    { href: '/cancel', icon: ShieldAlert, label: t('nav.directory') },
    { href: '/generator', icon: FileText, label: t('nav.legalNotice') },
    { href: '/report-pattern', icon: PlusCircle, label: t('nav.reportPattern') },
  ];

  return (
    <aside
      aria-label="Floating Navigation Dock"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/85 dark:bg-zinc-950/85 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 ${
                isActive
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                  : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
            </Link>
          );
        })}

        <div className="h-5 w-px bg-black/10 dark:bg-white/15 mx-0.5" />

        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          aria-label={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          className="flex h-10 px-2.5 items-center justify-center gap-1 rounded-full text-xs font-bold text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90"
        >
          <Globe className="h-3.5 w-3.5 text-red-500" />
          <span className="text-[11px]">{lang === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
      </div>
    </aside>
  );
}
