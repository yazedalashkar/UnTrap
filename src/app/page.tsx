'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import DarkPatternFlowVisualizer from '@/components/DarkPatternFlowVisualizer';
import VirtualCardAffiliateBanner from '@/components/VirtualCardAffiliateBanner';
import { ServiceRecord } from '@/lib/types';
import servicesData from '@/data/services.json';
import { useLanguage } from '@/lib/i18n';
import {
  Zap,
  Scale,
  ArrowRight,
  FileCheck2,
  Tv,
  Dumbbell,
  Cpu,
  Cloud,
  Newspaper,
} from 'lucide-react';

export default function HomePage() {
  const { t, lang } = useLanguage();
  const services = servicesData as ServiceRecord[];
  const featuredServices = services.filter((s) => s.difficultyRating >= 4).slice(0, 6);

  const quickCategories = [
    { label: t('cat.streaming'), icon: Tv, query: 'Streaming' },
    { label: t('cat.gyms'), icon: Dumbbell, query: 'Gyms' },
    { label: t('cat.saas'), icon: Cpu, query: 'SaaS' },
    { label: t('cat.cloud'), icon: Cloud, query: 'Cloud' },
    { label: t('cat.newsMedia'), icon: Newspaper, query: 'News Media' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-black/5 dark:border-white/10 bg-background py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(239,68,68,0.15),transparent)]" />
          
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              {/* Badge with iOS subtle float */}
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-2xl shadow-sm animate-float-subtle">
                <Zap className="h-3.5 w-3.5 fill-current" />
                {t('hero.badge')}
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-foreground leading-[1.15]">
                {t('hero.title1')} <br />
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  {t('hero.titleGradient')}
                </span>
              </h1>

              <p className="text-base text-muted-foreground sm:text-xl leading-relaxed max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>

              {/* SEARCH BAR INTEGRATION */}
              <div className="mt-8 flex flex-col items-center gap-4 pt-2">
                <SearchBar autoFocus={false} />

                {/* Quick Category Chips (Xiaomi / Apple Segmented Style) */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {quickCategories.map((c) => {
                    const Icon = c.icon;
                    return (
                      <Link
                        key={c.query}
                        href={`/cancel?category=${encodeURIComponent(c.query)}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-red-500/30 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-95 shadow-sm"
                      >
                        <Icon className="h-3.5 w-3.5 text-red-400" />
                        <span>{c.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* STATS BAR (iOS Glass Badges with Tactile micro-scaling) */}
              <div className="pt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mx-auto text-left">
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-2xl bg-white/65 dark:bg-zinc-900/50 p-4 text-center shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="text-2xl font-black text-foreground">50+</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{t('hero.statServices')}</div>
                </div>
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-2xl bg-white/65 dark:bg-zinc-900/50 p-4 text-center shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="text-2xl font-black text-red-500">&lt;10ms</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{t('hero.statFuzzy')}</div>
                </div>
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-2xl bg-white/65 dark:bg-zinc-900/50 p-4 text-center shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="text-2xl font-black text-emerald-500">100%</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{t('hero.statPdf')}</div>
                </div>
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-2xl bg-white/65 dark:bg-zinc-900/50 p-4 text-center shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="text-2xl font-black text-amber-500">CARL</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{t('hero.statCarl')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON FLOW VISUALIZER SECTION */}
        <section className="py-16 border-b border-black/5 dark:border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center mb-10 space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                {t('flow.sectionTitle')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('flow.sectionSubtitle')}
              </p>
            </div>

            <DarkPatternFlowVisualizer
              serviceName={lang === 'ar' ? 'المنصات الكبرى (مثل Adobe، Planet Fitness، WSJ)' : 'Enterprise Platforms (e.g. Adobe, WSJ, Planet Fitness)'}
              patternType="retention_maze"
              averageMinutes={2}
            />
          </div>
        </section>

        {/* FEATURED HIGH-DIFFICULTY TRAPS */}
        <section className="py-16 bg-black/[0.015] dark:bg-white/[0.015] border-b border-black/5 dark:border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                  {t('featured.badge')}
                </span>
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {t('featured.title')}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('featured.subtitle')}
                </p>
              </div>

              <Link
                href="/cancel"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-400 transition-all duration-200 active:scale-95"
              >
                <span>{t('featured.viewAll')}</span>
                <ArrowRight className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* VIRTUAL CARD SHIELD */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <VirtualCardAffiliateBanner />
          </div>
        </section>

        {/* LEGAL GENERATOR TEASER SECTION */}
        <section className="py-16 bg-black/[0.02] dark:bg-zinc-950/40 border-t border-black/5 dark:border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-red-500/30 backdrop-blur-2xl bg-gradient-to-br from-red-950/20 via-card to-card p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-red-500/40 before:to-transparent">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30">
                  <Scale className="h-4 w-4" />
                  <span>{t('legalTeaser.badge')}</span>
                </div>
                <h2 className="text-2xl font-black sm:text-4xl text-foreground tracking-tight">
                  {t('legalTeaser.title')}
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                  {t('legalTeaser.subtitle')}
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-red-500/25 ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:from-red-500 hover:to-rose-500 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-0.5 active:scale-95"
                >
                  <FileCheck2 className="h-5 w-5" />
                  <span>{t('legalTeaser.cta')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
