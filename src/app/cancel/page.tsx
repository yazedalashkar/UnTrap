'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import VirtualCardAffiliateBanner from '@/components/VirtualCardAffiliateBanner';
import { ServiceRecord, ServiceCategory } from '@/lib/types';
import servicesData from '@/data/services.json';
import { Filter, Zap } from 'lucide-react';

const CATEGORIES: Array<'All' | ServiceCategory> = [
  'All',
  'Streaming',
  'Gyms',
  'SaaS',
  'Cloud',
  'News Media',
];

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>('All');
  const [minDifficulty, setMinDifficulty] = useState<number>(1);

  const services = servicesData as ServiceRecord[];

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const categoryMatch = activeCategory === 'All' || s.category === activeCategory;
      const difficultyMatch = s.difficultyRating >= minDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [services, activeCategory, minDifficulty]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-xl">
              <Zap className="h-3.5 w-3.5 fill-current" />
              Verified Kill-Switch Directory
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-foreground">
              Direct Subscription <span className="text-red-500">Bypass Links</span>
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              Bypass 45-minute customer support hold lines, hidden cancel links, and multi-tier
              retention mazes. Direct unmasked URLs and step-by-step kill switches for 50 enterprise platforms.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <SearchBar placeholder="Quick search any service (e.g. Netflix, Planet Fitness, Adobe)..." />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/25 ring-1 ring-white/20'
                      : 'border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-muted-foreground flex items-center gap-1 font-mono">
                <Filter className="h-3.5 w-3.5" /> Minimum Trap Level:
              </span>
              <div className="flex rounded-xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 p-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setMinDifficulty(lvl)}
                    className={`h-7 w-7 rounded-lg font-bold transition-all text-xs active:scale-90 ${
                      minDifficulty === lvl
                        ? 'bg-secondary text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>
              Showing <strong>{filteredServices.length}</strong> verified cancellation bypasses
            </span>
            <span className="hidden sm:inline">
              Continuously audited for counter-retention bypasses
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-16">
            <VirtualCardAffiliateBanner />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
