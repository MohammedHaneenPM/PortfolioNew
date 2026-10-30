import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mohammed Haneen P M | Frontend & Full Stack Developer',
  description:
    'Frontend-focused developer with practical experience in React, TypeScript, Next.js, responsive UI development, animations, and SEO.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-pink-500/30 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
