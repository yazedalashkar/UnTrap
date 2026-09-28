import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DirectCancelButton from '@/components/DirectCancelButton';
import DarkPatternFlowVisualizer from '@/components/DarkPatternFlowVisualizer';
import VirtualCardAffiliateBanner from '@/components/VirtualCardAffiliateBanner';
import LegalDemandGenerator from '@/components/LegalDemandGenerator';
import { ServiceRecord } from '@/lib/types';
import servicesData from '@/data/services.json';
import {
  ShieldAlert,
  Zap,
  Clock,
  ExternalLink,
  ChevronRight,
  Scale,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  FileText,
} from 'lucide-react';

const services = servicesData as ServiceRecord[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | UnTrap' };

  const title = `How to Cancel ${service.name} (Direct Bypass & Kill-Switch) | UnTrap`;
  const description = `Skip the ${service.name} cancellation maze. Direct unmasked bypass URL, step-by-step kill-switch instructions, and CARL § 17600 legal notice generator.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://untrap.io/cancel/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://untrap.io/cancel/${service.slug}`,
      siteName: 'UnTrap',
      type: 'article',
      publishedTime: '2026-09-28T00:00:00.000Z',
      authors: ['Yazed Al-Ashkar', 'UnTrap Consumer Defense Team'],
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: `${service.name} Cancellation Kill-Switch Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}

export default async function ServiceCancelPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Schema.org HowTo Microdata
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Cancel ${service.name} Immediately`,
    description: `Step-by-step verified instructions to bypass retention screens and cancel ${service.name} online.`,
    totalTime: `PT${service.averageCancellationTimeMinutes}M`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: service.bypassSteps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: step,
      url: `https://untrap.io/cancel/${service.slug}#step-${idx + 1}`,
    })),
  };

  // Schema.org FAQPage Microdata
  const faqList = [
    {
      question: `What is the direct bypass link to cancel ${service.name}?`,
      answer: `The direct unmasked cancellation endpoint for ${service.name} is ${service.directBypassUrl}. Navigating directly to this URL bypasses deceptive retention funnels.`,
    },
    {
      question: `What dark pattern does ${service.name} use?`,
      answer: `${service.name} utilizes the ${service.darkPatternType.replace('_', ' ')} dark pattern, categorized with a trap difficulty score of ${service.difficultyRating}/5.`,
    },
    ...(service.faqs?.map((f) => ({
      question: f.question,
      answer: f.answer,
    })) || []),
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main className="min-h-screen bg-background py-10 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8 font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/cancel" className="hover:text-foreground transition-colors">
              Directory
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-bold">{service.name}</span>
          </nav>

          {/* Hero Header Card */}
          <div className="rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 shadow-2xl sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-black/[0.04] dark:bg-white/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {service.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/20">
                    <ShieldAlert className="h-3.5 w-3.5" /> Trap Level {service.difficultyRating}/5
                  </span>
                </div>
                <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-foreground">
                  How to Cancel <span className="text-red-500">{service.name}</span>
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] px-4 py-2 text-xs font-mono text-foreground">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Bypass Time: ~{service.averageCancellationTimeMinutes}m</span>
                </div>
              </div>
            </div>

            {/* Direct Kill-Switch Action Box */}
            <div className="mt-8 rounded-2xl border border-red-500/30 backdrop-blur-xl bg-red-950/[0.18] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                    <Zap className="h-4 w-4 fill-current" />
                    Verified Direct Kill-Switch
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Instant {service.name} Cancellation Route
                  </h2>
                  <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                    Click below to copy verified bypass instructions to your clipboard and immediately
                    launch the unmasked destination portal in a new tab.
                  </p>
                </div>

                <div className="shrink-0">
                  <DirectCancelButton
                    url={service.directBypassUrl}
                    steps={service.bypassSteps}
                    serviceName={service.name}
                    variant="primary"
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-red-500/20 flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-2 font-mono">
                <span className="truncate max-w-xs sm:max-w-md">
                  Target Endpoint: <strong className="text-foreground">{service.directBypassUrl}</strong>
                </span>
                <a
                  href={service.standardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-1 transition"
                >
                  <span>Standard Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Step-by-Step Bypass Instructions */}
          <div className="mt-12 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 shadow-2xl sm:p-10 space-y-6">
            <div className="border-b border-black/5 dark:border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                Execution Protocol
              </span>
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Step-by-Step Kill-Switch Instructions
              </h2>
            </div>

            <ol className="space-y-4">
              {service.bypassSteps.map((step, idx) => (
                <li
                  key={idx}
                  id={`step-${idx + 1}`}
                  className="flex items-start gap-4 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4.5 transition hover:border-black/10 dark:hover:border-white/20"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-extrabold text-white shadow-sm ring-1 ring-white/20">
                    {idx + 1}
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-foreground leading-relaxed">{step}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Retention Offer Countermeasure */}
            {service.retentionOfferWorkaround && (
              <div className="mt-8 rounded-2xl border border-amber-500/30 backdrop-blur-xl bg-amber-950/20 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  Counter-Retention Strategy & Workaround
                </div>
                <p className="text-xs text-foreground font-mono leading-relaxed">
                  {service.retentionOfferWorkaround}
                </p>
              </div>
            )}

            {/* Statutory Legal Citation */}
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-secondary/50 p-4.5 flex items-start gap-3 text-xs text-muted-foreground">
              <Scale className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="text-foreground">Governing Legal Defense: </strong>
                <span>{service.legalStatuteReference}</span>
              </div>
            </div>

            {service.phoneContactFallback && (
              <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-secondary/30 p-4.5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-foreground" />
                  <span>Phone Fallback: <strong>{service.phoneContactFallback}</strong></span>
                </span>
                <span className="text-[11px] font-mono">Invoke CARL § 17600 if phone agent stalls.</span>
              </div>
            )}
          </div>

          {/* Workflow Architecture Comparison */}
          <div className="mt-12">
            <DarkPatternFlowVisualizer
              serviceName={service.name}
              patternType={service.darkPatternType}
              difficultyRating={service.difficultyRating}
              averageMinutes={service.averageCancellationTimeMinutes}
            />
          </div>

          {/* Card Shield Banner */}
          <div className="mt-12">
            <VirtualCardAffiliateBanner serviceName={service.name} />
          </div>

          {/* Embedded Legal Generator Pre-Filled */}
          <div className="mt-12 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 shadow-2xl sm:p-10 space-y-6">
            <div className="border-b border-black/5 dark:border-white/10 pb-4 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                <FileText className="h-3.5 w-3.5" />
                Escalation Engine
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Generate Legal Notice for {service.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                If {service.name} ignores your online request or attempts to bill you after this
                date, download this statutory PDF demand notice and submit it to billing or your bank.
              </p>
            </div>

            <LegalDemandGenerator initialServiceName={service.name} />
          </div>

          {/* FAQ Section */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mt-12 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 p-6 shadow-2xl sm:p-10 space-y-6">
              <div className="border-b border-black/5 dark:border-white/10 pb-4">
                <h2 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-red-500" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4.5 space-y-1.5">
                    <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
