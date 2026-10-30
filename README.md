# Mohammed Haneen P M — Full Stack Portfolio & Assessment Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%7C%20Auth%20%7C%20Storage-3ecf8e?logo=supabase)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-Email%20API-black?logo=resend)](https://resend.com/)

A modern, full-stack personal portfolio and client acquisition platform built for the **Hue Solutions Full Stack Assessment**. Developed with a high-energy **Neobrutalism** visual identity, GSAP fluid animations, dynamic Supabase PostgreSQL persistence, Supabase Storage image management, server-side admin authentication, and automated dual-email dispatch using Resend.

---

## 1. Features & Architectural Overview

### A. Public Single-Page Portfolio
* **Strict Section Ordering**: **Hero → About → Skills → Projects → Contact → Meeting Booking**.
* **Hero Section**: High-resolution portrait photograph, dynamic status badges, custom Neobrutalist window with an interactive **Portrait / Code view toggle** displaying `developer-profile.ts`.
* **About Section**: Interactive GSAP timeline with animated SVG zig-zag connector, educational background, research paper publication lightbox modal (IJERT), and freelance client project reviews.
* **Skills Section**: Structured into the **5 assessment categories**:
  1. *Frontend Development*
  2. *Backend Development*
  3. *Database*
  4. *UI/UX Design*
  5. *Data Analytics*
* **Dynamic Projects Grid**: Connected directly to Supabase PostgreSQL. Features category filters (`Frontend`, `E-Commerce`, `Interactive`, `Full Stack`), animated staggered card reveals, and an interactive Lightbox Modal with architecture highlights and live preview links.
* **Contact Section**: Direct contact info, social links (GitHub, LinkedIn, Instagram), copy-to-clipboard actions, and client message dispatch.
* **Meeting Booking Section**: Direct calendar scheduling with 5 mandatory fields (`Full Name`, `Email Address`, `Preferred Date`, `Preferred Time`, `Reason for Meeting / Agenda`), client and server-side validation (no past dates), unique idempotency protection against rapid submissions, and rate limiting.

### B. Admin Studio & Dynamic Project Management
* **Secure Authentication**: Accessible via `/admin/login`. Utilizes Supabase Auth with server-side allowlist validation against `ADMIN_EMAIL`. Public registration is disabled.
* **Studio Dashboard (`/admin`)**: Key statistics (total projects, meeting inquiries, storage status), recent project quick actions, and direct logout session clearing.
* **Project CRUD (`/admin/projects`)**:
  - **Create** (`/admin/projects/new`): Direct image upload to Supabase Storage bucket `project-images` with client preview and database persistence.
  - **Read**: Live inventory list with category badges, links, and edit controls.
  - **Update** (`/admin/projects/[id]`): Edit project details or replace existing images with automatic cleanup of obsolete storage files.
  - **Delete**: Confirmation modal and simultaneous deletion of PostgreSQL records and Storage assets.

### C. Automated Email System (Resend)
* **Email 1 (Admin Notification)**: Sent to `ADMIN_EMAIL` with full visitor details, requested time/date, submission timestamp, and formatted agenda with a one-click reply link.
* **Email 2 (Visitor Confirmation)**: Professional acknowledgment email sent to the visitor confirming requested schedule details and reassuring them that a meeting invite link will follow shortly.
* **Persistence Guarantee**: Bookings are committed to PostgreSQL *before* any email transmission attempt. If Resend experiences network timeouts, the booking remains safely preserved.
* **Independent Status Tracking**: Database stores `admin_email_status` and `visitor_email_status` (`pending`, `accepted`, `failed`) and logs failure diagnostics.

---

## 2. Technology Stack

* **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP 3.15 + `@gsap/react`, `lucide-react`.
* **Backend**: Next.js Server Components, Route Handlers, Server-side authorization verification.
* **Database & Storage**: Supabase PostgreSQL, Supabase Storage (`project-images` bucket), Supabase Auth with Row Level Security (RLS).
* **Email API**: Resend API (`resend`).
* **Deployment**: Vercel.

---

## 3. Project Directory Structure

```
PortfolioNew/
├── public/                     # Static assets & public images
│   └── profile.png             # Developer portrait photograph
├── src/
│   ├── app/
│   │   ├── admin/              # Protected admin routes
│   │   │   ├── login/          # /admin/login authentication page
│   │   │   ├── projects/       # /admin/projects inventory & CRUD
│   │   │   │   ├── [id]/       # /admin/projects/[id] edit page
│   │   │   │   ├── new/        # /admin/projects/new creation page
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   └── DeleteProjectButton.tsx
│   │   │   └── page.tsx        # /admin dashboard page
│   │   ├── api/                # Server Route Handlers
│   │   │   ├── admin/
│   │   │   │   ├── auth/       # Admin login/logout/session endpoints
│   │   │   │   ├── projects/   # Protected project CRUD endpoints
│   │   │   │   └── upload/     # Supabase Storage image upload endpoint
│   │   │   ├── meetings/       # Public meeting booking endpoint
│   │   │   └── projects/       # Public dynamic projects query
│   │   ├── globals.css         # Tailwind v4 Neobrutalist design tokens
│   │   ├── layout.tsx          # Root layout with Space_Grotesk font & SEO
│   │   └── page.tsx            # Single-page public portfolio
│   ├── components/             # Reusable UI Components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── MeetingBookingSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── PublicationModal.tsx
│   │   └── ClientModal.tsx
│   ├── data/
│   │   └── portfolioData.ts    # Seed data & developer profile
│   ├── lib/
│   │   ├── email/
│   │   │   └── resend.ts       # Resend client & HTML email templates
│   │   └── supabase/
│   │       ├── client.ts       # Browser Supabase client (@supabase/ssr)
│   │       ├── server.ts       # Authenticated server client (cookies)
│   │       ├── admin.ts        # Privileged service-role client (server only)
│   │       └── auth.ts         # Server-side admin verification helper
│   └── types/
│       └── database.ts         # TypeScript database entity types
├── supabase/
│   ├── schema.sql              # PostgreSQL schema, RLS policies & storage bucket
│   ├── seed.sql                # Initial seed script for existing 6 projects
│   └── migration_phase5_meetings.sql # Idempotency, rate limiting & email columns
├── .env.example                # Documented environment variables template
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration for Tailwind v4
└── tsconfig.json               # TypeScript configuration
```

---

## 4. Local Development Setup

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/MohammedHaneenPM/PortfolioNew.git
cd PortfolioNew
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials, admin email, and Resend API key (see Section 5 below).

### Step 3: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 5. Supabase Configuration Guide

### 1. Execute SQL Migrations
In your [Supabase Dashboard](https://supabase.com/dashboard) → **SQL Editor**:
1. Run [supabase/schema.sql](file:///c:/Users/moham/Desktop/Projects/PortfolioNew/supabase/schema.sql) (Creates `projects`, `meetings`, `project-images` storage bucket, and RLS policies).
2. Run [supabase/migration_phase5_meetings.sql](file:///c:/Users/moham/Desktop/Projects/PortfolioNew/supabase/migration_phase5_meetings.sql) (Adds idempotency constraints, rate limiting functions, and email tracking columns).
3. Run [supabase/seed.sql](file:///c:/Users/moham/Desktop/Projects/PortfolioNew/supabase/seed.sql) (Seeds the 6 existing portfolio projects).

### 2. Configure Authentication
1. Go to **Authentication** → **Providers** → **Email**.
2. Set **Enable sign up** to **OFF** (prevents public administrator registration).
3. Go to **Authentication** → **Users** → **Add User** → **Create User**:
   - Email: `connect.haneen@gmail.com` (must match `ADMIN_EMAIL` in `.env.local`).
   - Password: Your chosen administrator password.
   - Set **Auto Confirm User** to **ON**.

### 3. Copy API Keys
In **Project Settings** → **API**:
* `NEXT_PUBLIC_SUPABASE_URL` = Project URL
* `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `anon` `public` key
* `SUPABASE_SERVICE_ROLE_KEY` = `service_role` `secret` key

---

## 6. Resend Configuration Guide

1. Sign up or log into [Resend](https://resend.com/).
2. Navigate to [API Keys](https://resend.com/api-keys) and generate an API key.
3. Add the key to `.env.local` as `RESEND_API_KEY`.
4. Set `RESEND_FROM_EMAIL=onboarding@resend.dev` (works out of the box for delivering notifications to your registered email).
5. For production domains, add your domain in **Domains** and verify the DNS records (DKIM, SPF).

---

## 7. Vercel Deployment Guide

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Import Git Repository** and choose `PortfolioNew`.
3. Set **Framework Preset** to **Next.js**.
4. In **Environment Variables**, add the 6 variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
5. Click **Deploy**. Vercel will build and assign your production domain.

---

## 8. Verification & Testing Checklist

| Test Item | Verification Method | Status |
|---|---|---|
| **Build Compilation** | `npm run build` | ✅ Exited with code 0 (12 static/dynamic routes) |
| **Secret Leakage** | Grep audit on `.next/static/` | ✅ 0 occurrences of secret keys in client bundles |
| **Section Ordering** | Visual inspection | ✅ Hero → About → Skills → Projects → Contact → Booking |
| **Hero Image & Switcher** | Browser inspection | ✅ Photo renders with portrait badge; Portrait/Code tab works |
| **Dynamic Projects** | PostgreSQL `/api/projects` | ✅ Live query with loading, empty, and error states |
| **Lightbox Modal** | Click project cards | ✅ Large image preview, tags, live URLs, and close button |
| **Meeting Validation** | Submit empty/bad fields | ✅ Server rejects empty names, bad emails, past dates, short agendas |
| **Idempotency** | Double submission | ✅ Deduplicated on server; returns existing booking record |
| **Admin Route Guard** | Unauthenticated `/admin` | ✅ Redirects to `/admin/login` |
| **Admin Authorization** | Server session check | ✅ Non-admin users cannot mutate projects or upload files |
| **Storage Upload** | Admin create project | ✅ Uploads to `project-images` bucket (5 MB limit checked) |
| **Safe Image Cleanup** | Replace/delete project | ✅ Obsolete storage images cleaned up only after database update |

---

## 9. License

Developed for the **Hue Solutions Candidate Assessment** by **Mohammed Haneen P M**. All portfolio designs, components, and project assets are preserved.
