import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Victor Paul Noel | Senior Software Engineer',
  description: 'Senior full-stack software engineer with ties to Cebu, Philippines and Dieppe, New Brunswick, Canada, specializing in .NET, Angular, Azure, and legacy modernization.',
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
      <body>
        {children}
      </body>
    </html>
  );
}
