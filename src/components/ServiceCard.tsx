'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Zap, Clock } from 'lucide-react';
import { ServiceRecord } from '@/lib/types';
import DirectCancelButton from '@/components/DirectCancelButton';
import { useLanguage } from '@/lib/i18n';

interface ServiceCardProps {
  service: ServiceRecord;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: ServiceCardProps) {
  const { t, lang } = useLanguage();

  const getDifficultyColor = (rating: number) => {
    switch (rating) {
      case 5:
        return 'text-red-400 bg-red-500/10 border-red-500/30 shadow-sm shadow-red-500/10';
      case 4:
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 3:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Streaming': return t('cat.streaming');
      case 'Gyms': return t('cat.gyms');
      case 'SaaS': return t('cat.saas');
      case 'Cloud': return t('cat.cloud');
      case 'News Media': return t('cat.newsMedia');
      default: return category;
    }
  };

  const getPatternBadge = (type: string) => {
    const key = `pattern.${type}`;
    return t(key) || type;
  };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/50 border border-black/5 dark:border-white/10 p-6 sm:p-7 shadow-lg shadow-black/[0.02] dark:shadow-black/25 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/15 active:scale-[0.98] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-xl bg-black/[0.04] dark:bg-white/[0.06] px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {getCategoryLabel(service.category)}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getDifficultyColor(
              service.difficultyRating
            )}`}
          >
            {service.difficultyRating >= 4 ? (
              <AlertTriangle className="h-3 w-3" />
            ) : (
              <Zap className="h-3 w-3" />
            )}
            {t('card.trapLevel')} {service.difficultyRating}/5
          </span>
        </div>

        <div className="mt-4">
          <Link href={`/cancel/${service.slug}`} className="block">
            <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-red-500">
              {service.name}
            </h3>
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              {getPatternBadge(service.darkPatternType)}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Clock className="h-3 w-3 text-emerald-500" /> ~{service.averageCancellationTimeMinutes} {t('card.bypassTime')}
            </span>
          </div>
        </div>

        <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {service.bypassSteps[0]}
        </p>
      </div>

      <div className="mt-6 border-t border-black/5 dark:border-white/10 pt-4 flex items-center justify-between gap-2">
        <Link
          href={`/cancel/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground transition-all duration-200 hover:text-foreground active:scale-95"
        >
          <span>{t('card.fullGuide')}</span>
          <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </Link>

        <DirectCancelButton
          url={service.directBypassUrl}
          steps={service.bypassSteps}
          serviceName={service.name}
          variant="compact"
        />
      </div>
    </div>
  );
}
