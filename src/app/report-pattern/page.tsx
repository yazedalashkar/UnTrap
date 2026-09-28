'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DarkPatternType } from '@/lib/types';

export default function ReportPatternPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceName: '',
    serviceUrl: '',
    patternType: 'retention_maze' as DarkPatternType,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-10 sm:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-xl">
              <ShieldAlert className="h-3.5 w-3.5" />
              Crowdsourced Deception Radar
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
              Report a <span className="text-red-500">Subscription Trap</span>
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
              Discovered a service forcing 45-minute phone calls, hiding cancellation buttons in CSS,
              or charging unauthorized renewal fees? Report it to our consumer watch database.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-2xl bg-white/75 dark:bg-zinc-900/60 p-6 shadow-2xl sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Report Submitted for Verification</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Our consumer security team will audit the reported workflow, extract the direct
                  unmasked bypass URL, and index the counter-measures into UnTrap.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      serviceName: '',
                      serviceUrl: '',
                      patternType: 'retention_maze',
                      description: '',
                    });
                  }}
                  className="mt-4 rounded-xl bg-secondary px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-muted active:scale-95 transition"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Subscription Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.serviceName}
                    onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                    placeholder="e.g. Acme Cloud or Regional Fitness Club"
                    className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Service URL or Website *
                  </label>
                  <input
                    type="url"
                    required
                    value={form.serviceUrl}
                    onChange={(e) => setForm({ ...form, serviceUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Dark Pattern Classification *
                  </label>
                  <select
                    value={form.patternType}
                    onChange={(e) => setForm({ ...form, patternType: e.target.value as DarkPatternType })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
                  >
                    <option value="phone_gate">Phone Gate (Forced call center queue or certified mail)</option>
                    <option value="hidden_button">Hidden Button (Concealed or low-contrast cancellation toggle)</option>
                    <option value="retention_maze">Retention Maze (3+ screens of guilt-tripping surveys and traps)</option>
                    <option value="delay_tactic">Delay Tactic (Mandatory multi-week wait period or cooldown)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Description of Deceptive Practice *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe what occurred when attempting to cancel..."
                    className="mt-1.5 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-3.5 text-sm text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 py-4 text-sm font-extrabold text-white shadow-lg shadow-red-500/25 ring-1 ring-white/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:from-red-500 hover:to-rose-500 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Pattern for Analysis</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
