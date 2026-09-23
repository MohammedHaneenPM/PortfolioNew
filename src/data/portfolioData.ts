export interface ProjectItem {
  id: string;
  title: string;
  categoryBadge: string;
  description: string;
  tags: string[];
  category: 'all' | 'frontend' | 'ecommerce' | 'interactive' | 'fullstack';
  accentColor: string;
  iconName: 'sparkles' | 'shopping-cart' | 'activity' | 'glasses' | 'shield' | 'layers';
  liveUrl?: string;
  githubUrl?: string;
  metrics?: string;
  fullDetails?: {
    overview: string;
    features: string[];
    technicalHighlights: string[];
  };
}

export interface FreelanceClient {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  icon: 'truck' | 'zap' | 'cake';
  iconColor: string;
  bgColor: string;
  details: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: 'code' | 'palette' | 'shopping-bag' | 'sparkles' | 'database' | 'terminal';
  skills: string[];
}

export const DEVELOPER_PROFILE = {
  name: 'Mohammed Haneen P M',
  shortName: 'Mohammed Haneen',
  role: 'Frontend Developer',
  specialty: 'React & Next.js Specialist',
  location: 'Manjeri, Malappuram, Kerala, India',
  email: 'connect.haneen@gmail.com',
  phone: '+91 85478 96740',
  availableForHire: true,
  statusText: 'Available for Opportunities',
  portfolioGithubUrl: 'https://mohammedhaneenpm.github.io/Portfolio',
  social: {
    github: 'https://github.com/mohammedhaneenpm',
    linkedin: 'https://linkedin.com/in/mohammedhaneenpm',
    instagram: 'https://instagram.com/mohammedhaneen.pm',
  },
  bio: 'Frontend-focused developer with practical experience in React, JavaScript/TypeScript, Next.js, WordPress, responsive UI development, Shopify, animations, and SEO. Crafting high-performance, visually compelling web applications.',
  stats: [
    { label: 'FEATURED PROJECTS', value: '6+' },
    { label: 'FREELANCE CLIENTS', value: '3+' },
    { label: 'CORE TECH SKILLS', value: '20+' },
  ],
  education: {
    degree: 'B.Tech Computer Science & Engineering',
    college: 'MEA Engineering College, Perinthalmanna',
    university: 'APJ Abdul Kalam Technological University, Kerala',
    period: '2022 – 2026',
    communityLeadership: 'IEEE MEA Student Branch, TACS CS Department, event planning and design work.',
  },
  researchPublication: {
    title: 'Smart Clinic and Pharmacy Management System Integrating AI-Based Prescription Assistance and Inventory Prediction',
    description: 'Published research paper exploring AI assistance for clinical prescriptions and predictive stock inventory management.',
    journal: 'Published in IJERT',
    issn: 'ISSN: 2278-0181',
    scope: 'Health Informatics & AI Prescriptive Modeling',
    link: '#publication-modal',
  },
  certificates: [
    { name: 'Artificial Intelligence', provider: 'Torc Infotech' },
    { name: 'Computer Networking', provider: 'Network Bulls' },
    { name: 'Quantum Data Analytics Job Simulation', provider: 'Forage' },
    { name: 'Deloitte Data Analytics Job Simulation', provider: 'Forage' },
  ],
  careerGoals: [
    {
      title: 'More Freelance Clients',
      desc: 'Partnering with businesses worldwide to craft top-tier storefronts and web apps.',
    },
    {
      title: 'Job in an MNC',
      desc: 'Contributing as a frontend engineer to large-scale distributed systems.',
    },
    {
      title: 'Full-Stack Development',
      desc: 'Expanding end-to-end full-stack architectures.',
    },
  ],
  languages: ['English', 'Hindi', 'Malayalam'],
  interests: ['Building websites', 'UI/UX design', 'Gaming', 'Music'],
};

export const CODE_SNIPPET = `const developer = {
  name: 'Mohammed Haneen P M',
  role: 'Frontend Developer',
  location: 'Manjeri, Kerala, India',
  degree: 'B.Tech CSE (2022-2026)',
  college: 'MEA Engineering College',
  focus: ['React', 'Next.js', 'TypeScript', 'UI/UX'],
  availableForHire: true
};`;

export const TICKER_ITEMS = [
  'REACT & NEXT.JS',
  'GSAP & LENIS ANIMATIONS',
  'SHOPIFY & LIQUID',
  'UI/UX & FIGMA',
  'TAILWIND CSS',
  'TYPESCRIPT ARCHITECTURE',
  'RESPONSIVE WEB DESIGN',
  'REST APIS & PRISMA',
];

export const FREELANCE_CLIENTS: FreelanceClient[] = [
  {
    id: 'bosco',
    title: 'Bosco Transportation',
    subtitle: 'Freelance Web & Logistics UI Development',
    type: 'Logistics Web Platform',
    icon: 'truck',
    iconColor: '#f87171',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    details: 'Designed and engineered responsive dispatch dashboards, booking forms, and driver tracking visual interfaces with optimized loading speeds.',
  },
  {
    id: 'lil-whip',
    title: 'Lil Whip',
    subtitle: 'Freelance Digital Presence & Creative Brand Web',
    type: 'Creative Artist & Brand Platform',
    icon: 'zap',
    iconColor: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.12)',
    details: 'Created an atmospheric multimedia brand experience with audio player integrations, release schedules, and interactive event promos.',
  },
  {
    id: 'gul-nis',
    title: 'Gul Nis Homey Cakes',
    subtitle: 'Freelance Brand E-Commerce & Visual Website',
    type: 'Bakery E-Commerce & Showcase',
    icon: 'cake',
    iconColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    details: 'Crafted a bespoke e-commerce presentation for handcrafted pastries featuring custom inquiry pipelines and mobile-friendly product catalog.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Frameworks & Core',
    subtitle: 'Modern reactive web stacks',
    icon: 'code',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
  },
  {
    id: 'styling',
    title: 'Styling & Design Systems',
    subtitle: 'Responsive & aesthetic layouts',
    icon: 'palette',
    skills: ['Tailwind CSS', 'Bootstrap', 'UI/UX', 'Figma', 'Adobe XD'],
  },
  {
    id: 'cms',
    title: 'CMS & E-Commerce',
    subtitle: 'Custom themes & stores',
    icon: 'shopping-bag',
    skills: ['Shopify', 'Liquid', 'WordPress', 'SEO'],
  },
  {
    id: 'animations',
    title: 'Animations & Dynamics',
    subtitle: 'Smooth scrolling & effects',
    icon: 'sparkles',
    skills: ['GSAP', 'ScrollTrigger', 'Lenis', 'Micro-Interactions'],
  },
  {
    id: 'backend',
    title: 'Backend, APIs & Data',
    subtitle: 'Data integration & persistence',
    icon: 'database',
    skills: ['REST API', 'PostgreSQL', 'MySQL', 'Prisma'],
  },
  {
    id: 'tools',
    title: 'Version Control & Cloud',
    subtitle: 'Deployment & collaboration',
    icon: 'terminal',
    skills: ['Git', 'GitHub', 'Vercel', 'DevTools'],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'snox-ai',
    title: 'Snox AI',
    categoryBadge: 'AI Platform',
    category: 'frontend',
    accentColor: '#ec4899',
    iconName: 'sparkles',
    description:
      'An intelligent AI web platform featuring modern conversational interfaces, responsive UI components, and intuitive interactions designed for seamless AI productivity workflows.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'REST API'],
    metrics: '99.4% User Task Completion',
    liveUrl: 'https://snox-ai.web.app',
    githubUrl: 'https://github.com/mohammedhaneenpm/snox-ai',
    fullDetails: {
      overview:
        'Snox AI reimagines conversational productivity tools by integrating low-latency streaming responses with modular prompt orchestration workspaces.',
      features: [
        'Dynamic conversational thread manager with auto-summaries',
        'Tailwind CSS dark-mode interface with customizable accent themes',
        'Modular prompt playground for prompt engineering testing',
        'Instant copy-to-clipboard and Markdown code execution blocks',
      ],
      technicalHighlights: [
        'Server-side stream parsing using Next.js route handlers',
        'State persistence with optimistic UI updates',
        'Mobile-first responsive drawer layout for fluid smartphone usage',
      ],
    },
  },
  {
    id: 'obsidian-shopify',
    title: 'Obsidian Shopify Theme',
    categoryBadge: 'E-Commerce',
    category: 'ecommerce',
    accentColor: '#a855f7',
    iconName: 'shopping-cart',
    description:
      'A high-performance, conversion-optimized custom dark-mode Shopify theme coded with Liquid, featuring responsive architecture, micro-animations, and fast page load speeds.',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    metrics: '< 1.1s Mobile LCP Speed Score',
    liveUrl: 'https://obsidian-dark-theme.myshopify.com',
    githubUrl: 'https://github.com/mohammedhaneenpm/obsidian-shopify',
    fullDetails: {
      overview:
        'Obsidian is a custom bespoke Shopify Liquid theme built for high-end boutique brands looking for an elevated dark aesthetic without sacrificing mobile conversion.',
      features: [
        'Custom Liquid templates for Collection, Product, and Cart Drawers',
        'Zero bloated third-party dependencies for maximum Core Web Vitals score',
        'Dynamic swatch selectors and instant cart updates via AJAX',
        'Micro-animated product cards with smooth hover state transitions',
      ],
      technicalHighlights: [
        'Bespoke Liquid section schemas tailored for Shopify Theme Editor 2.0',
        'Lazy-loading image optimization with modern webp & srcset generation',
        'Accessible drawer navigation with keyboard trap & ARIA compliant attributes',
      ],
    },
  },
  {
    id: 'apollo-sports',
    title: 'Apollo Sports',
    categoryBadge: 'Sports & Fitness',
    category: 'frontend',
    accentColor: '#06b6d4',
    iconName: 'activity',
    description:
      'A dynamic sports and athletics digital platform built with high visual energy, showcasing sportswear lines, real-time product filters, and interactive fluid layouts.',
    tags: ['React', 'UI/UX', 'Tailwind CSS', 'TypeScript'],
    metrics: 'Dynamic Filter Engine & Realtime Stats',
    liveUrl: 'https://apollo-sports-demo.vercel.app',
    githubUrl: 'https://github.com/mohammedhaneenpm/apollo-sports',
    fullDetails: {
      overview:
        'Apollo Sports delivers an adrenaline-driven shopping and active lifestyle discovery platform designed for marathoners and training enthusiasts.',
      features: [
        'Multi-axis product filtering by sport category, gender, and gear technology',
        'Interactive athlete gear showcase with high-impact editorial photography',
        'Fluid grid transitions with dynamic sizing for featured seasonal collections',
        'Instant cart calculation and order summary breakdown',
      ],
      technicalHighlights: [
        'TypeScript strictly typed state machines for filter and sort parameters',
        'Tailwind CSS micro-interactions on product hover and cart badge updates',
        'Optimized component rendering using React memoization patterns',
      ],
    },
  },
  {
    id: 'ray-ban',
    title: 'Ray-Ban',
    categoryBadge: 'Eyewear Showcase',
    category: 'interactive',
    accentColor: '#f59e0b',
    iconName: 'glasses',
    description:
      'An immersive eyewear brand showcase website with luxury typography, smooth GSAP transitions, 360-style product showcases, and maximalist brand aesthetics.',
    tags: ['GSAP', 'ScrollTrigger', 'JavaScript', 'Lenis'],
    metrics: '60fps Scroll Acceleration',
    liveUrl: 'https://rayban-concept-showcase.vercel.app',
    githubUrl: 'https://github.com/mohammedhaneenpm/rayban-concept',
    fullDetails: {
      overview:
        'A conceptual luxury brand showcase for Ray-Ban iconic Aviator and Wayfarer models that uses parallax storytelling and hardware-accelerated scroll transitions.',
      features: [
        'Smooth scroll normalization with Lenis library',
        'GSAP ScrollTrigger scrub timeline pinning lens breakdown diagrams',
        '360-degree interactive eyewear preview with touch drag controls',
        'Custom luxury typographic layout with subtle lighting gradients',
      ],
      technicalHighlights: [
        'Matrix transform manipulations constrained to GPU composition layer',
        'Responsive viewport calculations with debounce resize hooks',
        'Graceful progressive fallback for reduced-motion accessibility preference',
      ],
    },
  },
  {
    id: 'medtech-healthcare',
    title: 'MedTech Healthcare',
    categoryBadge: 'Healthcare App',
    category: 'fullstack',
    accentColor: '#10b981',
    iconName: 'shield',
    description:
      'Comprehensive clinic and patient management web application with scheduling, real-time prescription tracking, medical records access, and patient-centric dashboard designs.',
    tags: ['React', 'PostgreSQL', 'Prisma', 'REST API'],
    metrics: 'Integrated Clinical & Pharmacy Workflow',
    liveUrl: 'https://medtech-health-app.vercel.app',
    githubUrl: 'https://github.com/mohammedhaneenpm/medtech-healthcare',
    fullDetails: {
      overview:
        'Companion web system to the published IJERT research paper on AI-assisted clinical prescriptions and automated inventory predictions.',
      features: [
        'Doctor dashboard with patient history, diagnosis notes, and dosage calculators',
        'Pharmacy stock inventory predictor with automated low-stock reorder indicators',
        'Patient appointment scheduling calendar with automated conflict alerts',
        'Role-based access view for physicians, pharmacists, and clinic managers',
      ],
      technicalHighlights: [
        'Prisma ORM schema modeling for relational medical and prescription entities',
        'RESTful API endpoints with structured JSON schemas and input sanitization',
        'Clean tabular reporting with sorting, export, and search capabilities',
      ],
    },
  },
  {
    id: 'interactive-websites',
    title: 'Interactive Websites',
    categoryBadge: 'Experimental',
    category: 'interactive',
    accentColor: '#f43f5e',
    iconName: 'layers',
    description:
      'A compilation of creative demo websites, interactive UI experiments, scroll-based animations, Lenis smooth-scroll implementations, and custom micro-interactions.',
    tags: ['GSAP', 'CSS Grid', 'Lenis', 'Figma'],
    metrics: 'Creative Lab & Motion Prototypes',
    liveUrl: 'https://interactive-ui-lab.vercel.app',
    githubUrl: 'https://github.com/mohammedhaneenpm/interactive-experiments',
    fullDetails: {
      overview:
        'An ongoing creative sandbox where new CSS specifications, modern web animation techniques, and experimental layout paradigms are tested and refined.',
      features: [
        'Cursor-following magnetic buttons and custom interactive canvas pointers',
        'Bento-grid masonry layouts with flexible aspect ratio preservation',
        'Kinetic typography scroll animations with SVG path text morphing',
        'Theme palette morpher with ambient background gradient transitions',
      ],
      technicalHighlights: [
        'Zero-layout-shift animation routines using CSS transforms exclusively',
        'Modular reusable animation hooks written in TypeScript',
        'Strict adherence to accessibility standards for interactive focus rings',
      ],
    },
  },
];
