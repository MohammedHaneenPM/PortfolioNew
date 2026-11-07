import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohammed Haneen P M | Java Full Stack Developer & UI/UX Engineer',
  description:
    'Full Stack Engineer specializing in Java, Spring Boot, React, Next.js, PostgreSQL, and scalable web architectures. Open for Java Full Stack opportunities.',
  keywords: [
    'Mohammed Haneen',
    'Java Full Stack Developer',
    'Spring Boot Developer',
    'Full Stack Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Java Backend Developer',
    'PostgreSQL',
    'Portfolio',
    'Kerala',
    'India',
  ],
  authors: [{ name: 'Mohammed Haneen P M' }],
  creator: 'Mohammed Haneen P M',
  metadataBase: new URL('https://mohammedhaneenpm.github.io'),
  alternates: {
    canonical: 'https://mohammedhaneenpm.github.io/Portfolio',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohammedhaneenpm.github.io/Portfolio',
    title: 'Mohammed Haneen P M // Java Full Stack Developer',
    description:
      'Full Stack Engineer specializing in Java, Spring Boot, React, Next.js, and high-performance cloud architectures.',
    siteName: 'Mohammed Haneen P M Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Haneen P M // Java Full Stack Developer',
    description:
      'Full Stack Engineer specializing in Java, Spring Boot, React, Next.js, and high-performance cloud architectures.',
    creator: '@mohammedhaneenpm',
  },
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
        <link rel="preload" as="image" href="/hero-portrait-sm.webp" type="image/webp" media="(max-width: 640px)" />
        <link rel="preload" as="image" href="/hero-portrait.webp" type="image/webp" media="(min-width: 641px)" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700;1,900&family=Space+Grotesk:wght@500;700&family=Syne:wght@800;900&family=VT323&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mohammed Haneen P M',
              url: 'https://mohammedhaneenpm.github.io/Portfolio',
              jobTitle: 'Java Full Stack Developer & Software Engineer',
              knowsAbout: [
                'Java',
                'Spring Boot',
                'React',
                'Next.js',
                'TypeScript',
                'PostgreSQL',
                'RESTful APIs',
                'Microservices',
                'UI/UX Design',
              ],
              sameAs: [
                'https://github.com/mohammedhaneenpm',
                'https://linkedin.com/in/mohammedhaneenpm',
                'https://instagram.com/mohammedhaneen.pm',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0d0d0f] text-slate-100 antialiased selection:bg-[#ff007f] selection:text-white font-['Space_Grotesk',sans-serif]">
        {children}
      </body>
    </html>
  );
}
