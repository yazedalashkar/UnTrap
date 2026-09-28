'use client';

import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface DirectCancelButtonProps {
  url: string;
  steps: string[];
  serviceName: string;
  variant?: 'primary' | 'compact' | 'outline';
  className?: string;
}

export default function DirectCancelButton({
  url,
  steps,
  serviceName,
  variant = 'primary',
  className = '',
}: DirectCancelButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t, lang } = useLanguage();

  const handleBypass = async () => {
    const isArabic = lang === 'ar';
    const header = isArabic ? `[دليل تخطي وإلغاء اشتراك ${serviceName} عبر UnTrap]` : `[UnTrap Bypass Guide for ${serviceName}]`;
    const linkLabel = isArabic ? 'رابط الإلغاء الفوري المباشر' : 'Direct Kill-Switch URL';
    const stepsHeading = isArabic ? 'خطوات التنفيذ المباشرة:' : 'Step-by-Step Instructions:';
    const footer = isArabic ? 'مقدم بواسطة منصة UnTrap (https://un-trap.vercel.app)' : 'Provided by UnTrap (https://un-trap.vercel.app)';

    const stepsFormatted = `${header}\n${linkLabel}: ${url}\n\n${stepsHeading}\n${steps
      .map((step, idx) => `${idx + 1}. ${step}`)
      .join('\n')}\n\n${footer}`;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(stepsFormatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.warn('Clipboard write failed, opening URL anyway:', err);
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleBypass}
        title={lang === 'ar' ? `فتح الرابط المباشر ونسخ الخطوات لـ ${serviceName}` : `Open direct bypass link and copy instructions for ${serviceName}`}
        className={`inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm ring-1 ring-white/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-red-500 active:scale-95 ${className}`}
      >
        <Zap className="h-3.5 w-3.5 fill-current" />
        <span>{copied ? t('card.copied') : t('card.directBypass')}</span>
        <ExternalLink className={`h-3 w-3 opacity-80 ${lang === 'ar' ? 'rotate-180' : ''}`} />
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={handleBypass}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 backdrop-blur-xl bg-red-500/10 px-5 py-3.5 text-sm font-bold text-red-400 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-red-500 hover:bg-red-500/20 active:scale-95 ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span>{t('card.copied')}</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-red-400" />
            <span>{t('card.copyAndOpen')}</span>
            <ExternalLink className={`h-4 w-4 opacity-70 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleBypass}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-red-500/30 ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:from-red-500 hover:to-rose-500 hover:shadow-glow hover:-translate-y-0.5 active:scale-[0.98] ${className}`}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 shadow-inner">
        <Zap className="h-4 w-4 fill-white text-white" />
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span>{copied ? t('card.copied') : `${t('card.executeKillSwitch')} ${serviceName}`}</span>
        <span className="text-[11px] font-normal text-red-100 opacity-90">
          {t('card.copiesToClipboard')}
        </span>
      </div>
      <ExternalLink className={`ml-2 h-4 w-4 opacity-75 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${lang === 'ar' ? 'rotate-180 mr-2 ml-0' : ''}`} />
    </button>
  );
}
