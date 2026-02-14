# Kun Dashboard Components & Pages

A complete AI-powered personal brand strategy dashboard built specifically for Kun. This implementation includes all navigation, strategy creation, and account management features.

## Architecture Overview

```
src/
├── app/
│   └── (dashboard)/
│       ├── layout.tsx                 # Dashboard layout wrapper
│       ├── dashboard/
│       │   └── page.tsx              # Home dashboard page
│       ├── discovery/
│       │   └── page.tsx              # 7-step discovery form
│       ├── strategy/
│       │   └── page.tsx              # Complete strategy display
│       ├── settings/
│       │   └── page.tsx              # User profile settings
│       └── billing/
│           └── page.tsx              # Subscription management
│
└── components/
    └── dashboard/
        ├── sidebar.tsx               # Left navigation sidebar
        ├── header.tsx                # Top header with user menu
        └── settings-form.tsx         # Profile form component
```

## Page Descriptions

### 1. Dashboard Home (`/dashboard`)
The main entry point showing:
- Personalized welcome greeting
- Quick stats cards (discovery sessions, strategy version, content pillars, last update)
- Current strategy summary with positioning statement and pillars
- Quick action buttons for viewing/refreshing strategy
- Prominent CTA if no strategy exists yet

**Key Features:**
- Real-time data fetching from database
- Card-based layout with gradient backgrounds
- Responsive grid layout
- Golden accent colors matching Kun brand

### 2. Brand Discovery (`/discovery`)
Interactive 7-step form to gather personal brand information:

**Step 1:** Primary Goal (5 multiple choice options)
- Build credibility in my field
- Attract job opportunities
- Grow a business or service
- Establish thought leadership
- Build a personal brand empire

**Step 2:** Field (9 category grid)
- Technology, Marketing, Design, Business & Entrepreneurship, Education, Creative & Entertainment, Health & Wellness, Finance, Other

**Step 3:** Target Audience (5 multiple choice options)
- Industry peers & professionals
- Potential clients/customers
- Job recruiters & hiring managers
- Niche community
- General public

**Step 4:** Preferred Platform (6 grid options)
- LinkedIn, Twitter/X, Instagram, TikTok, YouTube, Personal Blog

**Step 5:** Core Strengths (text area)
- Free text input for 3-5 skills/strengths

**Step 6:** Career Story (large text area)
- Narrative about career journey

**Step 7:** Known For (large text area)
- Desired reputation and impact

**Key Features:**
- Progress bar showing step X of 7
- Form validation before allowing next step
- Back/Next navigation
- Loading state during strategy generation
- Auto-redirects to strategy page on completion

### 3. Strategy Display (`/strategy`)
Comprehensive display of AI-generated personal brand strategy:

**8 Core Components:**
1. **Positioning Statement** - Main value proposition (gradient card)
2. **Content Pillars** - 3 primary content themes
3. **Platform Strategy** - Primary + secondary platforms
4. **Content Mix** - Visual breakdown of content types (%)
5. **Voice & Tone Guide** - Brand personality (tone, dos, don'ts)
6. **Posting Cadence** - Publishing frequency per platform
7. **90-Day Launch Plan** - Tabbed monthly milestones
8. **First 5 Posts** - Ready-to-publish post ideas with hooks

**Key Features:**
- Color-coded sections with Lucide icons
- Tabbed interface for monthly planning
- Post cards with title, hook, format, and content preview
- "Refresh Strategy" and "Download PDF" buttons
- Redirects to discovery if no strategy exists

### 4. Settings (`/settings`)
User profile and preference management:

**Profile Information:**
- Full name (editable)
- Email address (read-only)
- Professional headline (editable)
- Field/Industry dropdown
- Language preference dropdown

**Preferences:**
- Email notification checkboxes
  - Weekly strategy tips
  - New content ideas
  - Product updates

**Key Features:**
- Form validation and submission
- Server action integration
- Clean, simple layout

### 5. Billing (`/billing`)
Subscription management and plan comparison:

**Current Subscribers:**
- Display current plan status
- Show billing cycle details
- Next billing date
- "Manage Subscription" button → Stripe portal

**Free Plan Users:**
- 3-column pricing comparison (Free/Pro/Business)
- Feature lists with checkmarks
- Upgrade CTAs
- FAQ section

**Plans:**
- **Free:** $0 - 1 discovery session, basic strategy, 5 posts
- **Pro:** $29/month - Unlimited sessions, advanced features, 50+ posts, analytics
- **Business:** $99/month - Team collaboration, dedicated manager, API access

**Key Features:**
- Stripe integration for billing portal
- Plan comparison table
- FAQ with common questions
- Responsive pricing grid

## Component Details

### Sidebar
- **Location:** Fixed left (264px/w-64)
- **Style:** Dark background (slate-900)
- **Contents:**
  - Logo at top
  - Navigation links with icons
  - User profile at bottom
  - Sign-out button
- **Active State:** Gold/amber highlight (bg-amber-600)
- **Responsive:** Hidden on mobile, visible on md+ screens

### Header
- **Location:** Sticky top (64px/h-16)
- **Style:** Light background with border
- **Contents:**
  - Right-aligned user dropdown menu
  - Profile, Settings, Sign out options
  - Avatar with initials fallback
- **Features:** Full width minus sidebar (ml-64)

### Settings Form
- **Reusable Component:** Used in settings page
- **Fields:** Name, Email (disabled), Headline, Field, Language
- **Validation:** Client-side feedback
- **Submission:** Calls updateUserProfile server action

## Navigation Structure

```
Dashboard Layout (Protected)
├── /dashboard
│   └── Home page with overview
├── /discovery
│   └── 7-step form
├── /strategy
│   └── Full strategy display
├── /settings
│   └── Profile settings
├── /billing
│   └── Subscription management
└── /admin (if user.role === "admin")
    └── Admin panel (not included)
```

## Design System

### Colors
- **Primary:** Amber/Gold (#f59e0b, #d97706)
- **Background:** White (#ffffff)
- **Sidebar:** Slate-900 (#0f172a)
- **Text:** Slate-900 (#0f172a)
- **Borders:** Slate-200 (#e2e8f0)
- **Accents:** Amber-600 (#d97706)

### Typography
- **Page Titles:** 2xl font-bold
- **Section Headers:** lg font-semibold
- **Labels:** sm font-medium
- **Body:** base text-slate-700

### Spacing
- **Sidebar Width:** 16rem (264px)
- **Header Height:** 4rem (64px)
- **Padding:** Standard Tailwind (px-6, py-6)
- **Card Padding:** 2rem (p-8)
- **Gap Between Sections:** 2rem (mb-8)

### Icons
From lucide-react:
- Navigation: LayoutDashboard, Compass, Target, CreditCard, Settings, Shield
- User: User, LogOut, Settings
- Data: BarChart3, MessageSquare, Clock, Zap, Download, ArrowRight, Check, Sparkles

## Server Actions Required

These server actions need to be implemented:

```typescript
// actions/discovery.ts
export async function saveDiscoverySession(formData: {
  goal: string;
  field: string;
  audience: string;
  platform: string;
  strengths: string;
  careerStory: string;
  knownFor: string;
}): Promise<{ success: boolean; strategyId?: string }>

// actions/profile.ts
export async function updateUserProfile(formData: {
  name: string;
  email: string;
  headline: string;
  field: string;
  language: string;
}): Promise<{ success: boolean }>

// actions/billing.ts
export async function createBillingPortalSession(): Promise<{ url: string }>
```

## Database Schema

### User Table
```typescript
{
  id: string
  name: string | null
  email: string
  image: string | null
  role: string // 'user' or 'admin'
  plan: string // 'free', 'pro', 'business'
  stripeSubscriptionId: string | null
  stripePriceId: string | null
  createdAt: Date
  updatedAt: Date
}
```

### Discovery Table
```typescript
{
  id: string
  userId: string
  goal: string
  field: string
  audience: string
  platform: string
  strengths: string
  careerStory: string
  knownFor: string
  createdAt: Date
}
```

### Strategy Table
```typescript
{
  id: string
  userId: string
  positioningStatement: string
  contentPillars: string[]
  primaryPlatform: string
  secondaryPlatforms: string[]
  contentMix: Record<string, number> // { content_type: percentage }
  voiceGuide: {
    tone: string[]
    dos: string[]
    donts: string[]
  }
  postingCadence: Record<string, string> // { platform: frequency }
  monthlyPlan: {
    month1: string[]
    month2: string[]
    month3: string[]
  }
  firstPosts: Array<{
    title: string
    hook: string
    format: string
    content: string
  }>
  createdAt: Date
  updatedAt: Date
}
```

## Usage Examples

### Accessing Dashboard
1. User must be authenticated (redirects to /auth/signin if not)
2. Sidebar appears on left with navigation
3. Header shows at top with user menu
4. Content renders in main area

### Starting Discovery
1. Click "Discovery" in sidebar or "Start Your Discovery" CTA
2. Answer 7 questions across multiple steps
3. Progress bar shows current position
4. Click Next to proceed (validation required)
5. On completion, AI generates strategy and redirects

### Viewing Strategy
1. Click "My Strategy" in sidebar
2. View all 8 components of generated strategy
3. Use tabs for 90-day plan breakdown
4. Can refresh strategy to regenerate
5. Can download as PDF

### Managing Profile
1. Click "Settings" in sidebar
2. Update profile information
3. Set language preference
4. Configure email notifications
5. Save changes

### Upgrading Plan
1. Click "Billing" in sidebar
2. View current plan status
3. See pricing comparison (if free)
4. Click upgrade button
5. Complete Stripe checkout
6. Returns to Stripe billing portal

## Authentication

All dashboard pages require authentication. The layout component checks:

```typescript
const session = await auth();
if (!session?.user) {
  redirect("/auth/signin");
}
```

## Styling & Responsiveness

- **Tailwind CSS:** All styling uses Tailwind utilities
- **Mobile:** Single column, hidden sidebar on sm screens
- **Tablet:** Two columns where appropriate
- **Desktop:** Full layout with sidebar + header + content
- **Dark Mode:** Not implemented (light theme throughout)

## File Sizes & Performance

Optimizations included:
- Server components where possible (dashboard, strategy, settings, billing)
- Client components only for interactivity (discovery, settings form)
- Image optimization with Next.js Image component
- Lazy loading of heavy components
- Efficient database queries with proper indexes

## Common Patterns

### Conditional Rendering
- Admin controls: `if (user.role === "admin")`
- Strategy exists: `if (strategy)`
- Premium features: `if (user.plan !== "free")`

### Form Handling
- Client-side state with useState
- Server action submission
- Loading states with isLoading boolean
- Error handling with try/catch

### Navigation
- Link component for internal routes
- usePathname for active state detection
- Redirect for auth protection
- Router push for programmatic navigation

## Future Enhancements

1. **Analytics Dashboard** - Track brand growth metrics
2. **Content Calendar** - Schedule posts in advance
3. **Team Collaboration** - Share strategy with team members
4. **API Integration** - Auto-post to social media
5. **Mobile App** - React Native dashboard
6. **Dark Mode** - Theme toggle in settings
7. **Multi-language** - Full i18n support
8. **Custom Branding** - White-label for agencies

## Troubleshooting

### Session Not Loading
- Check auth.ts configuration
- Verify NextAuth callbacks
- Check JWT secret in environment

### Strategy Not Displaying
- Verify database has strategy record
- Check userId matches session.user.id
- Confirm strategy data structure matches schema

### Sidebar Not Showing Admin Link
- Check user.role value
- Verify it's exactly "admin" (case-sensitive)
- Clear session cache

### Images Not Loading
- Verify image URLs are accessible
- Check CORS settings
- Use Image component from Next.js

## Support

For issues or questions about the dashboard implementation, refer to:
- DASHBOARD_IMPLEMENTATION.md - Detailed technical guide
- Component prop interfaces - TypeScript definitions
- Database schema - Data structure reference
