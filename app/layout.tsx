import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Victor Paul Noel | Senior Software Engineer',
  description: 'Software architect and senior full-stack engineer specializing in scalable software, legacy modernization, Azure, AI, and high-impact business systems.',
  openGraph: {
    title: 'Victor Paul Noel | Senior Software Engineer',
    description: 'Engineering systems that move business — from legacy modernization to Azure, AI, and scalable product delivery.',
    type: 'website',
    images: [{ url: `${publicBase}/og.png`, width: 1200, height: 630, alt: 'Victor Paul Noel — Senior Software Engineer and Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Victor Paul Noel | Senior Software Engineer',
    description: 'Engineering systems that move business — from legacy modernization to Azure, AI, and scalable product delivery.',
    images: [`${publicBase}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

