# Pratham Jain - Portfolio Website

A modern, feature-rich portfolio website built with Next.js 15, showcasing professional experience, projects, skills, and achievements. The website includes comprehensive analytics tracking and an interactive user interface.

🌐 **Live Site**: [prathamjain.in](https://prathamjain.in)

## ✨ Features

### 🎨 User Interface
- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark/Light Theme Toggle**: System-aware theme switcher with smooth transitions
- **Animated Hero Section**: Eye-catching hero section with dynamic background elements
- **Interactive Navigation**: Smart navbar with scroll detection and backdrop blur effects
- **Content Filtering**: Quick filter bar to view specific sections (Experience, Projects, Recognition, etc.)
- **Smooth Scrolling**: Enhanced scrolling experience with proper scroll margins
- **Scroll-to-Top Button**: Convenient button to quickly return to the top of the page

### 📄 Resume Download
- **One-Click Download**: Round download button in the navbar for easy resume access
- **Optional Contact Form**: Collects visitor information (Name, Company, Email) for networking
- **Skip Option**: Users can download without providing contact details
- **Google Drive Integration**: Resume hosted on Google Drive for reliability

![Resume Download Dialog](https://github.com/user-attachments/assets/7cac9525-041c-4827-bb82-db94a89bac6a)

### 📊 Content Sections
- **Objective**: Professional summary and career goals
- **Experience**: Detailed work history with expandable descriptions
  - Luminous Power Technologies (Senior Software Engineer & Data Engineer Intern)
  - Bosch Global Software Technologies (Research Assistant)
- **Technical Skills**: Comprehensive skill categorization
  - Languages, Frameworks, Cloud Platforms
  - DevOps, Data Engineering, Database Systems
  - Advanced Topics, Visualization Tools
- **Projects**: Showcase of hackathon wins, research, and personal builds
  - Interactive cards with expandable details in sidebar
  - Achievement badges and metrics
  - Technology tags and external links
- **Freelance Experience**: Consulting and contract work
- **Volunteer Experience**: Community contributions and leadership roles
- **Certifications**: Professional credentials with verification links
- **Recommendations**: Testimonials from mentors and colleagues
- **Education**: Academic background and achievements
- **LinkedIn Posts**: Embedded LinkedIn content carousel

### 📈 Analytics & Tracking
- **Session Tracking**: Unique session IDs for user journey analysis
- **Page View Analytics**: Performance metrics and timing data
- **Interaction Tracking**: Monitors clicks, navigation, and user engagement
- **Scroll Behavior**: Tracks scroll depth and section view times
- **Resume Downloads**: Dedicated tracking for resume download events
- **Form Submissions**: Analytics for contact form completions
- **Theme Preferences**: Tracks user theme choices
- **Engagement Metrics**: Calculates bounce rates and deep engagement

### 🎯 User Experience Features
- **Feedback Widget**: Collects user feedback with thumbs up/down and comments
- **Detail Sidebar**: Expandable project details without page navigation
- **Loading Skeletons**: Smooth loading states for better perceived performance
- **Lazy Loading**: Optimized component loading for faster initial page load
- **Search Parameters**: Deep linking support for direct content access
- **Content Sections Navigation**: Jump to specific sections with visual indicators

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.8 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Theme**: next-themes for dark/light mode

### Backend & APIs
- **API Routes**: Next.js API routes for analytics endpoints
  - `/api/analytics/session` - Session initialization
  - `/api/analytics/interaction` - User interaction tracking
  - `/api/analytics/resume_downloads` - Resume download tracking
  - `/api/analytics/resume_download_form` - Contact form submissions
  - `/api/analytics/performance` - Performance metrics
  - `/api/analytics/scroll` - Scroll behavior tracking
  - `/api/analytics/engagement` - User engagement metrics
  - `/api/analytics/theme` - Theme preference tracking
  - `/api/analytics/feedback` - User feedback collection

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js with Turbopack
- **Version Control**: Git & GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pratham-Jain-3903/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

### Available Scripts

```bash
# Start development server with Turbopack on port 9002
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type check without emitting files
npm run typecheck

# Start Genkit development
npm run genkit:dev

# Start Genkit with watch mode
npm run genkit:watch
```

## 📁 Project Structure

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
│   │   │   ├── Navbar.tsx
│   │   │   ├── ResumeDownloadDialog.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── DetailSidebar.tsx
│   │   │   ├── FeedbackWidget.tsx
│   │   │   ├── ScrollToTopButton.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AnalyticsProvider.tsx
│   │   ├── sections/               # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Objective.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── FreelanceExperience.tsx
│   │   │   ├── VolunteerExperience.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Recommendations.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── ContactInfo.tsx
│   │   │   └── LinkedInPostCarousel.tsx
│   │   └── ui/                     # Shadcn/UI components
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── use-track-click.ts
│   ├── lib/                        # Utility functions
│   │   └── utils.ts
│   └── ai/                         # AI/Genkit integration
├── public/                         # Static assets
├── .gitignore                      # Git ignore rules
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🎨 Key Components

### Navbar
- Fixed position with scroll-aware styling
- Download resume button with analytics tracking
- Theme toggle with smooth transitions
- Responsive design with mobile support

![Navbar with Download Button](https://github.com/user-attachments/assets/bb47e616-ac6a-4f9b-a58e-60af6b9274e1)

### Resume Download Dialog
- Optional contact form for networking
- Skip option for immediate download
- Clean, accessible UI with proper validation
- Integrated analytics tracking

### Analytics Provider
- Session management with unique IDs
- Intersection Observer for section tracking
- Performance monitoring with timing APIs
- Scroll behavior analysis
- Engagement metrics calculation

### Filter Bar
- Quick navigation to specific content types
- Smooth transitions when filtering
- Visual indicators for active filter
- Keyboard accessible

### Detail Sidebar
- Expandable project details
- Smooth slide-in animation
- Close on outside click or ESC key
- Deep linking support with URL parameters

## 📊 Analytics Features

The website includes a comprehensive analytics system that tracks:

1. **Session Data**: User sessions with unique IDs, referrer information, screen resolution
2. **User Interactions**: Clicks, navigation events, button interactions
3. **Content Engagement**: Section view times, scroll depth, time on site
4. **Resume Downloads**: Tracks who downloaded the resume and their details (if provided)
5. **Performance Metrics**: Page load times, TTFB, LCP, FID, CLS
6. **User Preferences**: Theme choices (dark/light mode)
7. **Feedback**: User satisfaction and comments

All analytics data is logged to the console for development and can be easily integrated with services like:
- Firebase Analytics
- Google Analytics
- Mixpanel
- Custom database solutions (MongoDB, PostgreSQL, etc.)

## 🔒 Privacy & Security

- Analytics data is used for improving user experience
- No sensitive information is collected without consent
- Contact form submission is optional
- Resume downloads work without providing personal information
- All API endpoints implement proper error handling
- No security vulnerabilities detected by CodeQL analysis

## 🎯 Future Enhancements

- [ ] Blog section with MDX support
- [ ] Project case studies with detailed write-ups
- [ ] Contact form with email notifications
- [ ] Integration with Firebase for analytics storage
- [ ] Admin dashboard for viewing analytics
- [ ] A/B testing for UI variations
- [ ] Multi-language support (i18n)
- [ ] PWA capabilities for offline access
- [ ] Advanced animations with Framer Motion

## 📝 License

This project is private and proprietary. All rights reserved.

## 👤 Author

**Pratham Jain**
- Website: [prathamjain.in](https://prathamjain.in)
- LinkedIn: [linkedin.com/in/pratham-jain-56682620a/](https://www.linkedin.com/in/pratham-jain-56682620a/)
- GitHub: [github.com/Pratham-Jain-3903](https://github.com/Pratham-Jain-3903)
- Email: Prathamjain3903@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Shadcn for beautiful UI components
- Radix UI for accessible primitives
- Lucide for the icon library
- Tailwind CSS for utility-first styling

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
