# Pratham Jain — Portfolio Website

[Live site → prathamjain.in](https://prathamjain.in)

Badges

- ![Next.js](https://img.shields.io/badge/Next.js-15.2.8-black?logo=nextdotjs&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?logo=tailwindcss&logoColor=white)
- ![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node-20.x-green?logo=node.js&logoColor=white)
- ![Vercel](https://img.shields.io/badge/Hosting-Vercel-black?logo=vercel&logoColor=white)
- ![Analytics](https://img.shields.io/badge/Analytics-Console%2C%20Firebase-lightgrey)
- ![License](https://img.shields.io/badge/License-Private-lightgrey)

Overview

This repository contains the source for a personal portfolio built with Next.js (App Router) and TypeScript. The site focuses on performance, accessibility, and a clean developer experience. It includes a configurable analytics system and is ready for production deployment.

Live Demo

- https://prathamjain.in

Key Highlights

- Responsive, accessible UI with light/dark theme support
- Comprehensive analytics and interaction tracking (sessions, page views, scroll depth, interactions, resume downloads)
- Component-driven UI using Radix UI primitives and Tailwind CSS
- 3D interactive hero element powered by Spline
- Resume download flow with optional contact form and tracking
- Deployable to Vercel for production

Features

- Responsive layout with theme toggle and smooth transitions
- Animated hero section with interactive 3D element
- Smart navigation with scroll detection and content filtering
- Resume download dialog with optional contact form and analytics tracking
- Feedback widget, loading skeletons, and lazy loading for performance
- Deep linking and URL-driven state for sharing specific content

User interface preview

<img width="2240" height="1400" alt="image" src="https://github.com/user-attachments/assets/b359daaa-31f1-4db0-b18b-57924d8797a6" />

Resume download preview

![Resume Download Dialog](https://github.com/user-attachments/assets/7cac9525-041c-4827-bb82-db94a89bac6a)

Tech Stack

Frontend
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Radix UI (primitives)
- Lucide React (icons)
- @splinetool/react-spline (3D interaction)
- React Query (data fetching)
- Recharts (visualizations)

Backend & APIs
- Next.js API routes (analytics endpoints)
- Optional integrations: Firebase, PostgreSQL, MongoDB

Development
- Node.js 20
- npm
- ESLint, TypeScript strict mode
- Turbopack for development
- Genkit for AI integrations

Analytics & Tracking

This project includes a configurable analytics provider and development-first logging. Key tracked data:

- Session initialization and unique session IDs
- Page views and performance metrics (TTFB, LCP, CLS, FID)
- Interaction and event tracking (clicks, navigation, resume downloads)
- Scroll depth and section engagement via Intersection Observer
- Theme preference events and feedback submissions

API routes (examples)
- /api/analytics/session — session initialization
- /api/analytics/interaction — interaction events
- /api/analytics/resume_downloads — resume download events
- /api/analytics/resume_download_form — contact form submissions
- /api/analytics/performance — performance metrics
- /api/analytics/scroll — scroll behavior
- /api/analytics/engagement — engagement metrics
- /api/analytics/theme — theme preference events
- /api/analytics/feedback — feedback submissions

By default analytics are logged to the console for development. Integrations with Firebase, Google Analytics, Mixpanel, or a custom backend are possible and straightforward.

Hosting & Deployment

Recommended platform: Vercel (native Next.js support). Standard build commands:

- Build: `npm run build`
- Start (production): `npm start`

Continuous deployment on Vercel is recommended for instant previews and production deployments.

Getting Started

Prerequisites

- Node.js 20.x or higher
- npm

Installation

1. Clone the repository

```bash
git clone https://github.com/Pratham-Jain-3903/portfolio-website.git
cd portfolio-website
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

4. Open locally at http://localhost:9002

Available Scripts

```bash
npm run dev       # Start development server with Turbopack on port 9002
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run typecheck # Type check without emitting files
npm run genkit:dev    # Start Genkit development
npm run genkit:watch  # Start Genkit with watch mode
```

Project Structure

```
portfolio-website/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   │   └── analytics/          # Analytics endpoints
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/
│   │   ├── common/                 # Reusable components
│   │   └── sections/               # Page sections
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions
│   └── ai/                         # AI/Genkit integration
├── public/                         # Static assets
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

Key Components

- Navbar with resume download and theme toggle
- Resume download dialog with optional contact form
- Analytics provider with session management and performance metrics
- Filter bar and detail sidebar for projects
- Feedback widget and interactive components

Privacy & Security

- Analytics used to improve UX only. No sensitive data is collected without consent.
- Contact forms are optional and validated before submission.
- Resume downloads do not require providing personal information.

Future Enhancements

- Blog with MDX support
- Admin dashboard for analytics
- PWA support and offline capabilities
- Multi-language support (i18n)
- A/B testing for UI variations

Author

Pratham Jain — https://prathamjain.in
LinkedIn: https://www.linkedin.com/in/pratham-jain-56682620a/
GitHub: https://github.com/Pratham-Jain-3903

---

Built with Next.js, TypeScript, and Tailwind CSS