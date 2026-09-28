'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, FileText, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/75 dark:bg-zinc-950/75 border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo with Next.js Image */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight active:scale-95 transition-transform duration-200">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-md shadow-red-500/20 ring-1 ring-white/20">
            <Image
              src="/logo.png"
              alt="UnTrap Brand Logo"
              width={36}
              height={36}
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight leading-none text-foreground">
              Un<span className="text-red-500">Trap</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
              {t('nav.brandSubtitle')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-1 text-sm font-medium">
            <Link
              href="/cancel"
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-muted-foreground transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-95"
            >
              <ShieldAlert className="h-4 w-4 text-red-500" />
              <span>{t('nav.directory')}</span>
            </Link>
            <Link
              href="/generator"
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-muted-foreground transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-95"
            >
              <FileText className="h-4 w-4 text-amber-500" />
              <span>{t('nav.legalNotice')}</span>
            </Link>
            <Link
              href="/report-pattern"
              className="flex items-center gap-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] px-3.5 py-2 text-foreground transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 shadow-sm"
            >
              <PlusCircle className="h-4 w-4 text-emerald-500" />
              <span>{t('nav.reportPattern')}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 border-l border-black/10 dark:border-white/10 pl-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Header Actions: Only Theme Toggle! Language and navigation are in the Floating Dock */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
