import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CosmicBadge from '@/components/CosmicBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vyuma Ads Panel - Professional Advertising Platform',
  description: 'Comprehensive advertising management platform with campaign creation, analytics, and admin controls',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}