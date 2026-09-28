'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalDemandGenerator from '@/components/LegalDemandGenerator';
import VirtualCardAffiliateBanner from '@/components/VirtualCardAffiliateBanner';
import { Scale, ShieldAlert, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function GeneratorPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-xl">
              <Scale className="h-3.5 w-3.5" />
              {t('generator.badge')}
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-foreground">
              {t('generator.title')}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              {t('generator.desc')}
            </p>
          </div>

          <div className="mt-12">
            <LegalDemandGenerator />
          </div>

          <div className="mt-12">
            <VirtualCardAffiliateBanner />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/50 p-6 shadow-lg space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                California CARL § 17602(c)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                يُلزم القانون أي شركة توفر اشتراكات رقمية بتقديم زر إلغاء إلكتروني فوري وسهل دون فرض محادثات هاتفية أو استبيانات استبقاء معقدة.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/50 p-6 shadow-lg space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Federal ROSCA (15 U.S.C. § 8401)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                يحظر القانون الفيدرالي فرض رسوم تجديد دورية على المستهلكين دون توفير آليات واضحة وبسيطة تمكنهم من إيقاف الخصم التلقائي فوراً.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/50 p-6 shadow-lg space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                EFTA Regulation E (12 CFR § 1005.10)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                يمنح المستهلك الحق القانوني في إلغاء تفويض السحب الإلكتروني من البطاقات في أي وقت، وتُعتبر أي محاولة سحب لاحقة تحويلاً غير مصرح به.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
