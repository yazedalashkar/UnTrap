import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalDemandGenerator from '@/components/LegalDemandGenerator';
import VirtualCardAffiliateBanner from '@/components/VirtualCardAffiliateBanner';
import { Scale, ShieldAlert, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client-Side Legal Cancellation Demand Generator | UnTrap',
  description:
    'Generate legally binding subscription cancellation demand letters invoking California CARL § 17600 and FTC negative option regulations. 100% private client-side PDF generation.',
};

export default function GeneratorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-xl">
              <Scale className="h-3.5 w-3.5" />
              Statutory Consumer Defense Engine
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-foreground">
              Legally Binding <span className="text-red-500">Cancellation Notice</span> Generator
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              When subscription services gate cancellations behind 45-minute phone queues,
              hidden buttons, or deceptive retention mazes, invoke federal and California law to
              force immediate termination and revoke payment authorization.
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
                Requires that any consumer who enrolled in a continuous service or automatic renewal
                online must be provided an immediate, prominent, and unobstructed online cancellation
                mechanism. Retention phone queues are strictly non-compliant.
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
                The Restore Online Shoppers&apos; Confidence Act makes it illegal to charge consumers
                for goods or services sold over the internet through negative option features without
                providing simple mechanisms for a consumer to stop recurring billing.
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
                Empowers consumers to revoke consent for pre-authorized recurring electronic fund
                transfers at any time. Any subsequent bank draw or credit debit executed by the merchant
                is legally classified as an unauthorized electronic transaction.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
