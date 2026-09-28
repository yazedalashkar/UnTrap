import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Scale,
  Terminal,
  Github,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 text-card-foreground transition-colors">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Main Brand Column */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/logo.png"
                  alt="UnTrap Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-black tracking-tight">
                Un<span className="text-red-500">Trap</span>
              </span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              Autonomous enterprise utility neutralizing deceptive recurring subscription traps.
              Delivering direct kill-switches, bypassing phone-gates, and arming consumers with
              statutory legal cancellation demands under CARL § 17600 and ROSCA.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Zero user tracking. Pure client-side PDF generation.</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Directory
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/cancel" className="hover:text-foreground transition">
                  Browse All 50+ Services
                </Link>
              </li>
              <li>
                <Link href="/cancel?category=Streaming" className="hover:text-foreground transition">
                  Streaming Services
                </Link>
              </li>
              <li>
                <Link href="/cancel?category=Gyms" className="hover:text-foreground transition">
                  Gyms & Fitness Clubs
                </Link>
              </li>
              <li>
                <Link href="/cancel?category=SaaS" className="hover:text-foreground transition">
                  SaaS & Software
                </Link>
              </li>
              <li>
                <Link href="/cancel?category=Cloud" className="hover:text-foreground transition">
                  Cloud & Hosting
                </Link>
              </li>
              <li>
                <Link href="/cancel?category=News%20Media" className="hover:text-foreground transition">
                  News & Publishing
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Attribution & Contact Actions */}
          <div className="md:col-span-4 space-y-4 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-5 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 border border-red-500/20">
                <Code2 className="h-3 w-3" /> Platform Architect
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                <Sparkles className="h-3 w-3 text-amber-400" /> Lead Engineer
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground">Yazed Al-Ashkar</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Frontend Web Developer & AI Solutions Specialist specializing in React, Next.js, and autonomous agent architectures.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://github.com/yazedalashkar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
              </a>

              <a
                href="mailto:yazedalashkar44@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-500 active:scale-95"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Engineer</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-black/5 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} UnTrap.io — Public Consumer Protection Utility.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Terminal className="h-3.5 w-3.5 text-red-500" />
              <span>Vercel Edge Distributed</span>
            </span>
            <span>•</span>
            <span>Progressive Web App (PWA)</span>
            <span>•</span>
            <span>100/100 Core Web Vitals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
