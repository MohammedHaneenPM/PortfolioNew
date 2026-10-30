-- ==============================================================================
-- HUE SOLUTIONS CANDIDATE ASSESSMENT: INITIAL DATABASE SEED SCRIPT
-- Migrates existing portfolio projects from portfolioData.ts into Supabase
-- ==============================================================================

INSERT INTO public.projects (id, title, description, image_url, live_url, github_url, tags, category)
VALUES
(
  'a1111111-1111-1111-1111-111111111111',
  'Snox AI',
  'An intelligent AI web platform featuring modern conversational interfaces, responsive UI components, and intuitive interactions designed for seamless AI productivity workflows.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://snox-ai.web.app',
  'https://github.com/mohammedhaneenpm/snox-ai',
  ARRAY['React', 'Next.js', 'Tailwind CSS', 'REST API'],
  'frontend'
),
(
  'b2222222-2222-2222-2222-222222222222',
  'Obsidian Shopify Theme',
  'A high-performance, conversion-optimized custom dark-mode Shopify theme coded with Liquid, featuring responsive architecture, micro-animations, and fast page load speeds.',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  'https://obsidian-dark-theme.myshopify.com',
  'https://github.com/mohammedhaneenpm/obsidian-shopify',
  ARRAY['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
  'ecommerce'
),
(
  'c3333333-3333-3333-3333-333333333333',
  'Apollo Sports',
  'A dynamic sports and athletics digital platform built with high visual energy, showcasing sportswear lines, real-time product filters, and interactive fluid layouts.',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  'https://apollo-sports-demo.vercel.app',
  'https://github.com/mohammedhaneenpm/apollo-sports',
  ARRAY['React', 'UI/UX', 'Tailwind CSS', 'TypeScript'],
  'frontend'
),
(
  'd4444444-4444-4444-4444-444444444444',
  'Ray-Ban Concept',
  'An immersive eyewear brand showcase website with luxury typography, smooth GSAP transitions, 360-style product showcases, and maximalist brand aesthetics.',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
  'https://rayban-concept-showcase.vercel.app',
  'https://github.com/mohammedhaneenpm/rayban-concept',
  ARRAY['GSAP', 'ScrollTrigger', 'JavaScript', 'Lenis'],
  'interactive'
),
(
  'e5555555-5555-5555-5555-555555555555',
  'MedTech Healthcare',
  'Comprehensive clinic and patient management web application with scheduling, real-time prescription tracking, medical records access, and patient-centric dashboard designs.',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  'https://medtech-health-app.vercel.app',
  'https://github.com/mohammedhaneenpm/medtech-healthcare',
  ARRAY['React', 'PostgreSQL', 'Prisma', 'REST API'],
  'fullstack'
),
(
  'f6666666-6666-6666-6666-666666666666',
  'Interactive Websites Lab',
  'A compilation of creative demo websites, interactive UI experiments, scroll-based animations, Lenis smooth-scroll implementations, and custom micro-interactions.',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'https://interactive-ui-lab.vercel.app',
  'https://github.com/mohammedhaneenpm/interactive-experiments',
  ARRAY['GSAP', 'CSS Grid', 'Lenis', 'Figma'],
  'interactive'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  live_url = EXCLUDED.live_url,
  github_url = EXCLUDED.github_url,
  tags = EXCLUDED.tags,
  category = EXCLUDED.category;
