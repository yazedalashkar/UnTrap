'use client';

import React from 'react';
import {
  XCircle,
  CheckCircle2,
  Clock,
  PhoneCall,
  Zap,
} from 'lucide-react';
import { DarkPatternType } from '@/lib/types';
import { useLanguage } from '@/lib/i18n';

interface FlowVisualizerProps {
  serviceName: string;
  patternType: DarkPatternType;
  averageMinutes: number;
  className?: string;
}

export default function DarkPatternFlowVisualizer({
  serviceName,
  patternType,
  averageMinutes,
  className = '',
}: FlowVisualizerProps) {
  const { t, lang } = useLanguage();

  const getPatternLabel = (type: DarkPatternType) => {
    switch (type) {
      case 'hidden_button':
        return lang === 'ar' ? 'أزرار إلغاء مخفية' : 'Submerged UI / Hidden Cancel Trigger';
      case 'phone_gate':
        return lang === 'ar' ? 'بوابة اتصال هاتفي أو بريد ورقي' : 'Mandatory Phone / Certified Mail Gate';
      case 'retention_maze':
        return lang === 'ar' ? 'متاهة استبيانات ومحاولات استبقاء' : 'Multi-Screen Retention Labyrinth';
      case 'delay_tactic':
        return lang === 'ar' ? 'مماطلة وفرض فترات انتظار وتأخير' : 'Forced Wait Period / Cooldown Stall';
    }
  };

  return (
    <div className={`space-y-6 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 sm:p-8 shadow-2xl ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
            {lang === 'ar' ? 'مقارنة هندسة المسار البرمجي' : 'Workflow Architecture Comparison'}
          </span>
          <h3 className="text-xl font-black text-foreground tracking-tight">
            {t('flow.comparisonHeading')}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 border border-red-500/20">
            {getPatternLabel(patternType)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-red-500/20 bg-red-950/[0.15] backdrop-blur-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
              <XCircle className="h-4 w-4" /> {t('flow.corporateTitle')}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-red-400" /> ~{averageMinutes * 3} {lang === 'ar' ? 'دقيقة تعقيد' : 'mins friction'}
            </span>
          </div>

          <ol className="space-y-3.5 text-xs text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-400">
                1
              </span>
              <span className="leading-relaxed">{t('flow.step1Corp')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-400">
                2
              </span>
              <span className="leading-relaxed">{t('flow.step2Corp')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-400">
                3
              </span>
              <span className="leading-relaxed">{t('flow.step3Corp')}</span>
            </li>
            {patternType === 'phone_gate' && (
              <li className="flex items-start gap-3 text-red-300 font-semibold">
                <PhoneCall className="h-4 w-4 shrink-0 text-red-400" />
                <span className="leading-relaxed">{t('flow.stepPhoneCorp')}</span>
              </li>
            )}
          </ol>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/[0.15] backdrop-blur-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> {t('flow.untrapTitle')}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
              <Zap className="h-3.5 w-3.5 fill-current" /> ~{averageMinutes} {lang === 'ar' ? 'دقيقة تخطي' : 'min bypass'}
            </span>
          </div>

          <ol className="space-y-3.5 text-xs text-muted-foreground">
            <li className="flex items-start gap-3 text-foreground font-semibold">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                1
              </span>
              <span className="leading-relaxed">
                {lang === 'ar'
                  ? `رابط مباشر بنقرة واحدة ينقلك فوراً لنقطة الإلغاء البرمجية الداخلية في ${serviceName}.`
                  : `One-click deep link directly into ${serviceName}'s internal termination endpoint.`}
              </span>
            </li>
            <li className="flex items-start gap-3 text-foreground font-semibold">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                2
              </span>
              <span className="leading-relaxed">{t('flow.step2Untrap')}</span>
            </li>
            <li className="flex items-start gap-3 text-foreground font-semibold">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                3
              </span>
              <span className="leading-relaxed">{t('flow.step3Untrap')}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
