'use client';

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  FileText,
  Download,
  Copy,
  Check,
  Scale,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { LegalDemandData } from '@/lib/types';
import { generateLegalDemandText } from '@/lib/legal-templates';
import { useLanguage } from '@/lib/i18n';

interface LegalDemandGeneratorProps {
  initialServiceName?: string;
  initialAccountIdentifier?: string;
}

export default function LegalDemandGenerator({
  initialServiceName = '',
  initialAccountIdentifier = '',
}: LegalDemandGeneratorProps) {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState<LegalDemandData>({
    userName: '',
    userEmail: '',
    serviceName: initialServiceName,
    accountIdentifier: initialAccountIdentifier,
    billingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastFourDigits: '',
    userAddress: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    statutoryBasis: 'COMBINED_FEDERAL_STATE',
  });

  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const previewText = generateLegalDemandText(formData, lang);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const generatePDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 45;
      const contentWidth = pageWidth - margin * 2;
      let y = 50;

      // Header Banner with high contrast
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y, contentWidth, 36, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(
        'FORMAL NOTICE OF SUBSCRIPTION TERMINATION',
        margin + 12,
        y + 22
      );

      y += 55;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        'PURSUANT TO CAL. BUS. & PROF. CODE § 17600 (CARL) | 15 U.S.C. § 8401 (ROSCA) | 16 CFR PART 425',
        margin,
        y
      );

      y += 18;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.75);
      doc.line(margin, y, pageWidth - margin, y);

      y += 20;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 30, 30);

      const meta = [
        ['EFFECTIVE DATE:', formData.effectiveDate || new Date().toISOString().split('T')[0]],
        ['RECIPIENT / ENTITY:', formData.serviceName || '[Service Provider Legal Department]'],
        ['CONSUMER / SUBSCRIBER:', `${formData.userName || '[Subscriber Name]'} <${formData.userEmail || '[Email]'}>`],
        ['ACCOUNT / USER ID:', formData.accountIdentifier || '[Account ID / Username]'],
        ['PAYMENT INSTRUMENT:', formData.lastFourDigits ? `Account Ending in ****${formData.lastFourDigits}` : 'All Authorized Billing Instruments on File'],
        ['TARGETED BILLING DATE:', formData.billingDate || 'Immediate upcoming cycle'],
      ];

      meta.forEach(([label, val]) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(val, margin + 160, y);
        y += 15;
      });

      if (formData.userAddress) {
        doc.setFont('helvetica', 'bold');
        doc.text('SUBSCRIBER ADDRESS:', margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(formData.userAddress, margin + 160, y);
        y += 15;
      }

      y += 10;
      doc.line(margin, y, pageWidth - margin, y);
      y += 20;

      // Section 1
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(180, 20, 20);
      doc.text('1. STATUTORY DEMAND FOR IMMEDIATE CANCELLATION', margin, y);
      y += 14;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const sec1 = doc.splitTextToSize(
        `Pursuant to the California Automatic Renewal Law (California Business and Professions Code §§ 17600–17606), the federal Restore Online Shoppers' Confidence Act (ROSCA, 15 U.S.C. §§ 8401–8405), and the FTC Negative Option Rule (16 CFR Part 425), I hereby formally, unequivocally, and permanently terminate my subscription to ${formData.serviceName || 'your service'} and all related automated renewals.`,
        contentWidth
      );
      doc.text(sec1, margin, y);
      y += sec1.length * 12 + 10;

      // Section 2
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(180, 20, 20);
      doc.text('2. REVOCATION OF AUTOMATED DEBIT AUTHORIZATION', margin, y);
      y += 14;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const sec2 = doc.splitTextToSize(
        `Effective immediately, any prior authorization granted to ${formData.serviceName || 'your organization'} or third-party payment processors to debit, draft, or charge my bank account, credit card, debit card, or electronic wallet is fully REVOKED under the Electronic Fund Transfer Act (15 U.S.C. § 1693e) and Regulation E (12 CFR § 1005.10(c)). Any subsequent charges will be disputed as unauthorized transfers.`,
        contentWidth
      );
      doc.text(sec2, margin, y);
      y += sec2.length * 12 + 10;

      // Section 3
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(180, 20, 20);
      doc.text("3. STATUTORY 'CLICK-TO-CANCEL' CONFORMANCE MANDATE", margin, y);
      y += 14;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const sec3 = doc.splitTextToSize(
        `California Business and Professions Code § 17602(c) mandates that any business offering online subscriptions must provide an immediate, unobstructed online termination mechanism. Forcing consumers through retention phone queues, in-person club appearances, or multi-step delay traps constitutes an unlawful business practice under Cal. Bus. & Prof. Code § 17200. This formal demand serves as statutory proof of cancellation notice.`,
        contentWidth
      );
      doc.text(sec3, margin, y);
      y += sec3.length * 12 + 15;

      const sec4 = doc.splitTextToSize(
        `Please transmit written confirmation of permanent account termination and confirmation of zero balance to ${formData.userEmail || '[Subscriber Email]'} within three (3) business days.`,
        contentWidth
      );
      doc.text(sec4, margin, y);
      y += sec4.length * 12 + 25;

      doc.setFont('helvetica', 'bold');
      doc.text('Respectfully submitted,', margin, y);
      y += 30;

      doc.line(margin, y, margin + 200, y);
      y += 14;
      doc.text(formData.userName || '[Subscriber Signature]', margin, y);
      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(110, 110, 110);
      doc.text('Executed under penalty of perjury pursuant to 28 U.S.C. § 1746.', margin, y);

      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(
        'Generated via UnTrap.io Client-Side Legal Engine | Fully processed in local browser memory | No server logging',
        margin,
        doc.internal.pageSize.getHeight() - 30
      );

      const fileName = `cancellation-demand-${(formData.serviceName || 'service').toLowerCase().replace(/\s+/g, '-')}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Error generating PDF. Please ensure all fields are valid.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Form Container */}
      <div className="rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 shadow-2xl lg:col-span-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/10 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('generator.formTitle')}</h2>
            <p className="text-xs text-muted-foreground">{t('generator.formSubtitle')}</p>
          </div>
        </div>

                <div className="mt-3 rounded-2xl bg-amber-500/10 p-3.5 text-xs text-amber-500 dark:text-amber-400 border border-amber-500/20 leading-relaxed">
          <strong>{lang === 'ar' ? 'تنبيه قانوني:' : 'Legal Notice:'}</strong>{' '}
          {t('legal.disclaimer')}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-3.5 text-xs text-emerald-400 border border-emerald-500/20">
          <Lock className="h-4 w-4 shrink-0" />
          <span>{t('generator.privacyBadge')}</span>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('generator.fullName')}
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder={lang === 'ar' ? 'فلان الفلاني' : 'Jane Doe'}
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('generator.accountEmail')}
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="jane.doe@example.com"
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('generator.serviceName')}
              </label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                placeholder={lang === 'ar' ? 'اسم النادي أو المنصة (مثال: Adobe أو Planet Fitness)' : 'Planet Fitness, Adobe, etc.'}
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('generator.accountId')}
              </label>
              <input
                type="text"
                name="accountIdentifier"
                value={formData.accountIdentifier}
                onChange={handleInputChange}
                placeholder={lang === 'ar' ? 'رقم المشترك أو اسم المستخدم' : 'Member #109284 / user_login'}
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('generator.billingDate')}
              </label>
              <input
                type="date"
                name="billingDate"
                value={formData.billingDate}
                onChange={handleInputChange}
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('generator.cardDigits')}
              </label>
              <input
                type="text"
                name="lastFourDigits"
                maxLength={4}
                value={formData.lastFourDigits}
                onChange={handleInputChange}
                placeholder="4321"
                className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('generator.address')}
            </label>
            <input
              type="text"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleInputChange}
              placeholder={lang === 'ar' ? 'دمشق، حمص، الرياض، أو أي عنوان بريدي رسمي' : '123 Market St, Suite 400, San Francisco, CA 94105'}
              className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t('generator.basis')}
            </label>
            <select
              name="statutoryBasis"
              value={formData.statutoryBasis}
              onChange={handleInputChange}
              className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
            >
              <option value="COMBINED_FEDERAL_STATE">{t('generator.basisCombined')}</option>
              <option value="CARL_BPC_17600">{t('generator.basisCarl')}</option>
              <option value="ROSCA_FTC_RULE">{t('generator.basisRosca')}</option>
            </select>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={generatePDF}
              disabled={isGenerating || !formData.userName || !formData.serviceName}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 ring-1 ring-white/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:from-red-500 hover:to-rose-500 active:scale-95 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>{isGenerating ? t('generator.rendering') : t('generator.downloadBtn')}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 px-5 py-4 text-sm font-bold text-foreground transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>{t('generator.copiedBtn')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>{t('generator.copyBtn')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview Container */}
      <div className="flex flex-col rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 shadow-2xl lg:col-span-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-red-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t('generator.previewTitle')}
            </h3>
          </div>
          <span className="rounded-full bg-black/[0.04] dark:bg-white/[0.08] px-3 py-1 text-[10px] font-bold text-muted-foreground font-mono">
            {t('generator.previewBadge')}
          </span>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-black/40 p-5 font-mono text-xs leading-relaxed text-foreground/90 max-h-[520px]">
          <pre className="whitespace-pre-wrap font-mono text-[11px]">{previewText}</pre>
        </div>

        <div className="mt-4 rounded-2xl bg-amber-500/10 p-3.5 text-xs text-amber-400 border border-amber-500/20 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{t('generator.howToUse')}</p>
        </div>
      </div>
    </div>
  );
}
