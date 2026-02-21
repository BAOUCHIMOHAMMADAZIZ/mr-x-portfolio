import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mohammed (Mr X) - AI Systems Architect & Full-Stack Developer',
  description:
    'Professional portfolio of Mohammed (Mr X), an AI Systems Architect and Full-Stack Developer specializing in building intelligent systems and scalable automation solutions.',
  keywords: [
    'AI',
    'Full Stack Developer',
    'Systems Architect',
    'Machine Learning',
    'Web Development',
    'Automation',
  ],
  authors: [{ name: 'Mohammed (Mr X)' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'Mohammed (Mr X) Studio',
    title: 'Mohammed (Mr X) - AI Systems Architect & Full-Stack Developer',
    description:
      'Professional portfolio showcasing AI and full-stack development expertise.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-dark-bg text-white antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
