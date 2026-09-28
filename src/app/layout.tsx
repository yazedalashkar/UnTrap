import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'UnTrap | Subscription Cancellation Bypass & Dark Pattern Killer',
  description:
    'Direct bypass links and instant kill-switches for over 10,000 subscription services. Skip endless surveys, retention mazes, and hidden cancel buttons.',
  applicationName: 'UnTrap',
  keywords: [
    'cancel subscription',
    'dark patterns',
    'subscription trap',
    'direct cancel link',
    'legal cancellation notice',
    'FTC negative option',
    'CARL California cancellation',
    'PWA subscription manager',
  ],
  authors: [{ name: 'Yazed Al-Ashkar', url: 'https://github.com/yazedalashkar' }],
  creator: 'Yazed Al-Ashkar',
  publisher: 'UnTrap',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'UnTrap',
  },
  formatDetection: {
    telephone: true,
  },
  metadataBase: new URL('https://untrap.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://untrap.io',
    title: 'UnTrap | Subscription Cancellation Bypass Engine',
    description:
      'Direct bypass links and instant kill-switches for online subscription services. Skip retention mazes and dark patterns.',
    siteName: 'UnTrap',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'UnTrap Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnTrap | Subscription Cancellation Bypass',
    description:
      'Direct bypass links and instant kill-switches for subscription services.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-red-500/20 selection:text-red-400">
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
