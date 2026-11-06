import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohammed Haneen P M | Frontend & UI/UX Developer',
  description:
    'Frontend-focused developer with practical experience in React, TypeScript, Next.js, responsive UI development, animations, and SEO.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,700;1,900&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800;900&family=VT323&family=Rubik+Glitch&family=Bungee&family=Silkscreen&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0d0d0f] text-slate-100 antialiased selection:bg-[#ff007f] selection:text-white font-['Space_Grotesk',sans-serif]">
        {children}
      </body>
    </html>
  );
}
