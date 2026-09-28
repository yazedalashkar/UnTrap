'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, FileText, PlusCircle, Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-black/65 border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo with Next.js Image & Zero CLS */}
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
            <span className="text-xl font-black tracking-tight leading-none">
              Un<span className="text-red-500">Trap</span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
              Anti-Trap Utility
            </span>
          </div>
          <span className="hidden rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 sm:inline-block">
            PWA Active
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <Link
            href="/cancel"
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-muted-foreground transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-95"
          >
            <ShieldAlert className="h-4 w-4 text-red-400" />
            <span>Directory</span>
          </Link>
          <Link
            href="/generator"
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-muted-foreground transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-95"
          >
            <FileText className="h-4 w-4 text-amber-400" />
            <span>Legal Notice</span>
          </Link>
          <Link
            href="/report-pattern"
            className="flex items-center gap-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-secondary/80 px-3.5 py-2 text-foreground transition-all duration-200 hover:bg-secondary active:scale-95 shadow-sm"
          >
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            <span>Report Pattern</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-90 transition-transform"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (iOS Glass Sheet) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/5 dark:border-white/10 backdrop-blur-2xl bg-white/90 dark:bg-black/90 p-4 space-y-2 animate-fade-in">
          <Link
            href="/cancel"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <ShieldAlert className="h-4 w-4 text-red-400" />
            <span>Browse 50+ Subscription Bypasses</span>
          </Link>
          <Link
            href="/generator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <FileText className="h-4 w-4 text-amber-400" />
            <span>Generate CARL § 17600 Notice</span>
          </Link>
          <Link
            href="/report-pattern"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            <span>Report a Subscription Trap</span>
          </Link>
        </div>
      )}
    </header>
  );
}
