import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import DarkPatternFlowVisualizer from '@/components/DarkPatternFlowVisualizer';
import VirtualCardAffiliateBanner from '@/components/VirtualCardAffiliateBanner';
import { ServiceRecord } from '@/lib/types';
import servicesData from '@/data/services.json';
import {
  Zap,
  Scale,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';

export default function HomePage() {
  const services = servicesData as ServiceRecord[];
  const featuredServices = services.filter((s) => s.difficultyRating >= 4).slice(0, 6);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-black/5 dark:border-white/10 bg-gradient-to-b from-white/80 via-background to-background dark:from-zinc-950/60 dark:via-background dark:to-background py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.18),rgba(255,255,255,0))]" />
          
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-xl shadow-sm">
                <Zap className="h-3.5 w-3.5 fill-current" />
                Autonomous Anti-Dark-Pattern Engine
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-foreground">
                Break Free From <br />
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  Subscription Traps
                </span>
              </h1>

              <p className="text-base text-muted-foreground sm:text-xl leading-relaxed">
                Direct bypass URLs, retention maze shortcuts, and statutory legal cancellation notices
                for 50+ enterprise services. Skip deceptive exit surveys, cancel phone calls, and
                hidden buttons.
              </p>

              {/* SEARCH BAR INTEGRATION */}
              <div className="mt-8 flex justify-center pt-2">
                <SearchBar autoFocus={false} />
              </div>

              {/* STATS BAR (iOS Glass Badges) */}
              <div className="pt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mx-auto text-left">
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 p-3.5 text-center shadow-sm">
                  <div className="text-2xl font-black text-foreground">50+</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Services Indexed</div>
                </div>
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 p-3.5 text-center shadow-sm">
                  <div className="text-2xl font-black text-red-500">&lt;10ms</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Fuzzy Filter</div>
                </div>
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 p-3.5 text-center shadow-sm">
                  <div className="text-2xl font-black text-emerald-500">100%</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Client-Side PDF</div>
                </div>
                <div className="rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 p-3.5 text-center shadow-sm">
                  <div className="text-2xl font-black text-amber-500">CARL</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">§ 17600 Mandate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON FLOW VISUALIZER SECTION */}
        <section className="py-16 border-b border-black/5 dark:border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center mb-10 space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                The Corporate Deception Architecture
              </h2>
              <p className="text-sm text-muted-foreground">
                How subscription providers deliberately design cancellation friction — and how UnTrap eliminates it.
              </p>
            </div>

            <DarkPatternFlowVisualizer
              serviceName="Enterprise Platforms (e.g. Adobe, WSJ, Planet Fitness)"
              patternType="retention_maze"
              averageMinutes={2}
            />
          </div>
        </section>

        {/* FEATURED HIGH-DIFFICULTY TRAPS */}
        <section className="py-16 bg-black/[0.015] dark:bg-white/[0.015] border-b border-black/5 dark:border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                  Critical Trap Registry
                </span>
                <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  Highest-Friction Subscription Bypasses
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Platforms notorious for phone gates, early termination fees, and retention labyrinths.
                </p>
              </div>

              <Link
                href="/cancel"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-400 transition active:scale-95"
              >
                <span>View all 50 services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* VIRTUAL CARD SHIELD */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <VirtualCardAffiliateBanner />
          </div>
        </section>

        {/* LEGAL GENERATOR TEASER SECTION */}
        <section className="py-16 bg-black/[0.02] dark:bg-zinc-950/40 border-t border-black/5 dark:border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl border border-red-500/30 backdrop-blur-2xl bg-gradient-to-br from-red-950/20 via-card to-card p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30">
                  <Scale className="h-4 w-4" />
                  <span>Statutory Legal Defense</span>
                </div>
                <h2 className="text-2xl font-black sm:text-4xl text-foreground tracking-tight">
                  Faced with a Phone Queue or In-Person Gym Visit?
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                  Generate an enforceable Legal Demand Notice citing California Business & Professions
                  Code § 17600 and the FTC Negative Option Rule. Revoke recurring payment authorization
                  instantly with 100% local client-side PDF generation.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-red-500/25 ring-1 ring-white/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:from-red-500 hover:to-rose-500 active:scale-95"
                >
                  <FileCheck2 className="h-5 w-5" />
                  <span>Launch Notice Generator</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
