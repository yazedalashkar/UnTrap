'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import { ServiceRecord } from '@/lib/types';
import servicesData from '@/data/services.json';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSelectService?: (service: ServiceRecord) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search 50+ services (e.g. Adobe, Planet Fitness, Netflix, AWS)...',
  autoFocus = false,
  onSelectService,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const services = servicesData as ServiceRecord[];

  const filteredServices = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const start = performance.now();
    const results = services.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(trimmed);
      const categoryMatch = s.category.toLowerCase().includes(trimmed);
      const patternMatch = s.darkPatternType.replace('_', ' ').toLowerCase().includes(trimmed);
      const stepMatch = s.bypassSteps.some((step) => step.toLowerCase().includes(trimmed));
      return nameMatch || categoryMatch || patternMatch || stepMatch;
    });

    results.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(trimmed);
      const bStarts = b.name.toLowerCase().startsWith(trimmed);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.difficultyRating - b.difficultyRating;
    });

    const elapsed = performance.now() - start;
    if (elapsed > 10) {
      console.warn(`[UnTrap Search] Filter duration: ${elapsed.toFixed(2)}ms`);
    }

    return results.slice(0, 8);
  }, [query, services]);

  useEffect(() => {
    setSelectedIndex(0);
    setIsOpen(query.trim().length > 0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (service: ServiceRecord) => {
    setIsOpen(false);
    if (onSelectService) {
      onSelectService(service);
    } else {
      router.push(`/cancel/${service.slug}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredServices.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredServices.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredServices.length) % filteredServices.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredServices[selectedIndex];
      if (selected) handleSelect(selected);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const getDifficultyBadge = (rating: number) => {
    if (rating >= 4) {
      return (
        <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/20">
          <AlertTriangle className="h-3 w-3" /> Trap Level {rating}/5
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
        <Zap className="h-3 w-3" /> Difficulty {rating}/5
      </span>
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-4 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 pl-12 pr-11 text-base text-foreground shadow-xl shadow-black/[0.03] dark:shadow-black/30 backdrop-blur-2xl transition-all duration-200 placeholder:text-muted-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/15"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3.5 rounded-full p-1.5 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-90 transition"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full z-50 mt-2.5 w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-950/85 p-2 shadow-2xl backdrop-blur-2xl animate-fade-in">
          {filteredServices.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
                <span>Matching Kill-Switches</span>
                <span>Sub-10ms Fuzzy Filter</span>
              </div>
              {filteredServices.map((service, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelect(service)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 ${
                      isSelected
                        ? 'bg-red-500/10 text-foreground border border-red-500/30'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.08] text-xs font-black text-foreground">
                        {service.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{service.name}</span>
                          <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-sm">
                          Bypass: {service.bypassSteps[0] || 'Direct cancellation route available'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getDifficultyBadge(service.difficultyRating)}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">No subscription service found matching &quot;{query}&quot;</p>
              <p className="mt-1 text-xs">
                Need a custom notice? Generate a statutory CARL cancellation notice using our Legal Demand Generator.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
