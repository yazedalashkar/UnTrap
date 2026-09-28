'use client';

import React from 'react';
import { CreditCard, Lock, ArrowUpRight, AlertOctagon } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface VirtualCardBannerProps {
  serviceName?: string;
  className?: string;
}

export default function VirtualCardAffiliateBanner({
  serviceName,
  className = '',
}: VirtualCardBannerProps) {
  const { t, lang } = useLanguage();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-amber-500/30 backdrop-blur-2xl bg-amber-500/[0.06] p-7 shadow-xl shadow-amber-500/5 transition-all duration-300 ${className}`}
    >
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm">
            <CreditCard className="h-6 w-6" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30">
                <AlertOctagon className="h-3 w-3" /> {t('vcard.badge')}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline font-mono">
                {lang === 'ar' ? 'حماية استباقية للمدفوعات' : 'Proactive Defense'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {t('vcard.title')}
            </h3>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              {serviceName
                ? (lang === 'ar'
                    ? `تعتمد ${serviceName} والعديد من المنصات على دورات فوترة متأخرة أو رموز خصم دورية قد تستمر في سحب الأموال بعد الإلغاء. احمِ بطاقتك بإنشاء بطاقة افتراضية للاستخدام الواحد بحد أقصى 0 دولار.`
                    : `${serviceName} and other subscription vendors rely on delayed billing cycles or automated recurring merchant tokens that process charges weeks after cancellation. Mask your real credit card using a virtual burner card with a $0 spend limit.`)
                : t('vcard.desc')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
          <a
            href="https://privacy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-extrabold text-amber-950 shadow-md ring-1 ring-white/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:from-amber-400 hover:to-amber-500 active:scale-95 whitespace-nowrap"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>{t('vcard.cta')}</span>
            <ArrowUpRight className={`h-3.5 w-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </a>
          <span className="text-[10px] text-muted-foreground text-center sm:text-right font-mono">
            {t('vcard.features')}
          </span>
        </div>
      </div>
    </div>
  );
}
