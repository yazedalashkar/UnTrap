'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Zap, AlertTriangle, Command } from 'lucide-react';
import { ServiceRecord } from '@/lib/types';
import servicesData from '@/data/services.json';
import { useLanguage } from '@/lib/i18n';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSelectService?: (service: ServiceRecord) => void;
  className?: string;
}

export default function SearchBar({
  placeholder,
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
  const { t, lang } = useLanguage();

  const activePlaceholder = placeholder || t('hero.searchPlaceholder');
  const services = servicesData as ServiceRecord[];

const ARABIC_NAME_MAP: Record<string, string[]> = {
  adobe: ['ادوبي', 'أدوبي', 'فوتوشوب', 'تصميم'],
  netflix: ['نتفلكس', 'نتفليكس', 'افلام', 'مسلسلات'],
  'amazon-prime': ['امازون', 'أمازون', 'برايم'],
  spotify: ['سبوتيفاي', 'سبوتفاي', 'موسيقى', 'اغاني'],
  'planet-fitness': ['بلانيت فيتنس', 'بلانيت', 'نادي', 'جيم', 'رياضة'],
  'equinox': ['ايكوينوكس', 'نادي', 'جيم'],
  'la-fitness': ['ال ايه فيتنس', 'نادي', 'جيم'],
  'new-york-times': ['نيويورك تايمز', 'جريدة', 'اخبار', 'صحافة'],
  'wall-street-journal': ['وول ستريت', 'جريدة', 'مال'],
  'disney-plus': ['ديزني', 'ديزني بلس', 'كرتون'],
  'youtube-premium': ['يوتيوب', 'يوتيوب بريميوم', 'فيديوهات'],
  dropbox: ['دروب بوكس', 'دروببوكس', 'سحابة', 'تخزين'],
  'chatgpt-plus': ['شات جي بي تي', 'شات', 'ذكاء اصطناعي'],
  'google-one': ['جوجل', 'غوغل', 'درايف', 'تخزين سحابي'],
  'microsoft-365': ['مايكروسوفت', 'اوفيس', 'وورد'],
  'apple-one': ['ابل', 'أبل', 'اي كلاود'],
};


  // Keyboard shortcut listener (Cmd+K or Ctrl+K or /)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredServices = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const start = performance.now();
    const results = services.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(trimmed);
      const categoryMatch = s.category.toLowerCase().includes(trimmed);
      const patternMatch = s.darkPatternType.replace('_', ' ').toLowerCase().includes(trimmed);
      const stepMatch = s.bypassSteps.some((step) => step.toLowerCase().includes(trimmed));
      const arabicAliases = ARABIC_NAME_MAP[s.slug] || [];
      const arabicMatch = arabicAliases.some((alias) => alias.includes(trimmed) || trimmed.includes(alias));
      return nameMatch || categoryMatch || patternMatch || stepMatch || arabicMatch;
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
          <AlertTriangle className="h-3 w-3" /> {t('card.trapLevel')} {rating}/5
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
        <Zap className="h-3 w-3" /> {t('card.trapLevel')} {rating}/5
      </span>
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
      <div className="group relative flex items-center">
        <div className={`pointer-events-none absolute ${lang === 'ar' ? 'right-4' : 'left-4'} text-muted-foreground transition-colors group-focus-within:text-red-500`}>
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
          placeholder={activePlaceholder}
          className={`h-14 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 ${
            lang === 'ar' ? 'pr-12 pl-24 text-right' : 'pl-12 pr-24 text-left'
          } text-base text-foreground shadow-xl shadow-black/[0.03] dark:shadow-black/30 backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-muted-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/15 focus:shadow-2xl focus:shadow-red-500/10`}
        />

        {/* Keyboard shortcut badge & Clear button */}
        <div className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} flex items-center gap-1.5`}>
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-90 transition-transform"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-1 text-[10px] font-mono text-muted-foreground shadow-sm">
              <Command className="h-3 w-3" />
              <span>K</span>
            </kbd>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full z-50 mt-2.5 w-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white/85 dark:bg-zinc-950/90 p-2.5 shadow-2xl backdrop-blur-3xl ring-1 ring-black/5 dark:ring-white/10 animate-fade-in">
          {filteredServices.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
                <span>{lang === 'ar' ? 'المطابقات الفورية' : 'Matching Kill-Switches'}</span>
                <span>{t('hero.statFuzzy')}</span>
              </div>
              {filteredServices.map((service, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelect(service)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl px-3.5 py-3 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] ${
                      isSelected
                        ? 'bg-red-500/10 text-foreground border border-red-500/30 shadow-sm'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-black/[0.04] to-black/[0.08] dark:from-white/[0.06] dark:to-white/[0.12] text-xs font-black text-foreground shadow-inner">
                        {service.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{service.name}</span>
                          <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-sm mt-0.5">
                          {service.bypassSteps[0] || 'Direct cancellation route available'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getDifficultyBadge(service.difficultyRating)}
                      <ArrowRight className={`h-4 w-4 text-muted-foreground ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                {lang === 'ar' ? `لم يتم العثور على خدمة مطابقة لـ "${query}"` : `No subscription service found matching "${query}"`}
              </p>
              <p className="mt-1 text-xs">
                {lang === 'ar'
                  ? 'يمكنك توليد إخطار قانوني رسمي ملزم لأي خدمة من خلال مُولّد الإخطارات القانونية.'
                  : 'Need a custom notice? Generate a statutory CARL cancellation notice using our Legal Demand Generator.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
