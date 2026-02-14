# Kun Dashboard Implementation Guide

## Overview
This document outlines all dashboard components and pages created for Kun, the AI personal brand strategy builder. The dashboard is specifically designed for Kun's brand discovery and strategy features, not a generic dashboard.

## Files Created

### 1. Sidebar Component
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/components/dashboard/sidebar.tsx`

**Type:** "use client" component

**Features:**
- Fixed left sidebar with dark background (slate-900)
- Logo at the top
- Navigation with Lucide icons:
  - Dashboard (LayoutDashboard)
  - Discovery (Compass) - start/continue brand discovery
  - My Strategy (Target) - view generated strategy
  - Billing (CreditCard)
  - Settings (Settings)
  - Admin (Shield) - only if user.role === "admin"
- Active state highlighting with gold/amber accent
- User profile section at bottom with:
  - Avatar with initials fallback
  - Name and email
  - Sign out button
- Uses next/link for navigation and usePathname for active detection

**Props Interface:**
```typescript
interface SidebarProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role?: string;
  };
}
```

### 2. Header Component
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/components/dashboard/header.tsx`

**Type:** "use client" component

**Features:**
- Sticky top header with light background
- Right-aligned user dropdown menu
- Dropdown menu items:
  - Profile link
  - Settings link
  - Sign out button (red/danger color)
- Uses DropdownMenu from @/components/ui/dropdown-menu
- Uses Avatar component with initials fallback
- Proper spacing (ml-64 for sidebar offset)

**Props Interface:**
```typescript
interface HeaderProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}
```

### 3. Dashboard Home Page
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/app/(dashboard)/dashboard/page.tsx`

**Type:** Server component (async function)

**Features:**
- Fetches user session from auth
- Gets latest strategy and discovery data from database
- Displays personalized welcome message with user's first name
- Quick stats cards showing:
  - Discovery Sessions completed
  - Strategy version
  - Content pillars defined
  - Days since last update (formatted as "Xd ago" or "Today")
- Current Strategy Summary card (if strategy exists) showing:
  - Positioning statement preview
  - Content pillars as badges
  - Recommended primary platform
- Quick Actions section with:
  - "View Full Strategy" button
  - "Refresh Strategy" button
- If NO strategy exists, displays prominent CTA:
  - "Ready to uncover your personal brand?"
  - "Start Your Discovery" button
- Uses PageHeader, Card, Button, Badge components
- Golden/amber color scheme consistent with Kun brand

### 4. Discovery Flow Page
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/app/(dashboard)/discovery/page.tsx`

**Type:** "use client" component - interactive multi-step form

**Features:**
- 7-step discovery form (UNCOVER phase):
  1. **Primary Goal** - Multiple choice selection (5 options)
  2. **Field** - Multiple choice grid (9 options)
  3. **Target Audience** - Multiple choice (5 options)
  4. **Preferred Platform** - Grid selection (6 platforms)
  5. **Core Strengths** - Text area input
  6. **Career Story** - Large text area for narrative
  7. **Known For** - Large text area for desired reputation
- Progress bar at top showing step X of 7 with percentage
- Each step has:
  - Clear question heading
  - Descriptive subtitle
  - Input options/fields with clear visual feedback
  - Next/Back navigation buttons
  - Disabled state for invalid steps
- Form validation before allowing next step
- Loading state while "Generating Strategy"
- Calls `saveDiscoverySession` server action on completion
- Redirects to `/strategy` when done
- Uses Progress component from shadcn/ui

### 5. Strategy Display Page
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/app/(dashboard)/strategy/page.tsx`

**Type:** Server component

**Features:**
- Displays complete 8-component personal brand strategy:
  1. **Positioning Statement** - Highlighted card with gradient background
  2. **Content Pillars** - Grid of pillar cards
  3. **Platform Strategy** - Primary and secondary platforms
  4. **Content Mix** - Visual bar chart showing content type percentages
  5. **Voice & Tone Guide** - Tone descriptors, dos, and don'ts
  6. **Posting Cadence** - Frequency for each platform
  7. **90-Day Launch Plan** - Tabbed monthly breakdown (Month 1, 2, 3)
  8. **First 5 Posts** - Post cards with title, hook, format, and content
- Top action buttons:
  - "Refresh Strategy" button
  - "Download PDF" button (placeholder)
- Color-coded sections with icons
- Tabbed interface for 90-day plan
- Redirects to /discovery if no strategy exists
- Uses Card, Tabs, Badge components
- Kun-specific design with amber/gold accents

### 6. Settings Page
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/app/(dashboard)/settings/page.tsx`

**Type:** Server component

**Features:**
- Profile settings section with form
- Settings form component for user editable fields:
  - Full name
  - Email (disabled, read-only)
  - Professional headline
  - Field/Industry dropdown
  - Language preference dropdown
- Additional preferences section:
  - Email notification checkboxes
  - Weekly strategy tips
  - New content ideas
  - Product updates
- Form calls `updateUserProfile` server action
- Uses SettingsForm client component for interactivity
- Clean, simple layout with Card components

### 7. Billing & Subscription Page
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/app/(dashboard)/billing/page.tsx`

**Type:** Server component

**Features:**
- Shows current plan status (Free/Pro/Business) prominently
- Current plan card with gradient background
- If on Free plan, displays pricing comparison:
  - Free plan card (current)
  - Pro plan card (popular/highlighted with banner)
  - Business plan card
- Each plan shows:
  - Price and billing period
  - Description
  - Feature list with checkmarks
  - Call-to-action button
- For subscribed users shows:
  - Current plan info
  - Billing cycle details
  - Next billing date
  - "Manage Subscription" button
- FAQ section answering common questions
- Integrates with `createBillingPortalSession` for Stripe
- Free tier vs. Pro tier feature comparison

### 8. Settings Form Component
**File:** `/sessions/vigilant-vibrant-meitner/mnt/outputs/kun/src/components/dashboard/settings-form.tsx`

**Type:** "use client" component

**Features:**
- Reusable form for updating user profile
- Form fields:
  - Full Name (editable text input)
  - Email Address (disabled/read-only)
  - Professional Headline (text input)
  - Field/Industry (select dropdown)
  - Language Preference (select dropdown)
- Calls `updateUserProfile` server action on submit
- Loading state on submit button
- Error handling
- Amber/gold button styling

## Key Design Decisions

### Architecture
- **Sidebar + Header Layout:** Fixed sidebar for navigation, sticky header for user menu
- **70/30 Split:** Navigation (30%) and main content (70%)
- **Card-based UI:** Consistent use of Card components for content sections
- **Progressive Disclosure:** Multi-step discovery form reveals information progressively

### Styling
- **Color Scheme:** Amber/gold (primary), slate grays (backgrounds/text)
- **Tailwind Classes:** Comprehensive use of Tailwind for responsive design
- **Accessibility:** Proper semantic HTML, color contrast, interactive states

### Data Flow
- **Dashboard Page:** Fetches latest strategy/discovery, displays overview
- **Discovery Page:** Multi-step form with client-side state management
- **Strategy Page:** Server-rendered complete strategy display
- **Settings Page:** Server component with client form for updates
- **Billing Page:** Server component with subscription data integration

## Database Interactions

The components expect the following database structure:
- `User` table with fields: id, name, email, image, role, plan, stripeSubscriptionId, stripePriceId
- `Strategy` table with fields: userId, positioningStatement, contentPillars, primaryPlatform, secondaryPlatforms, contentMix, voiceGuide, postingCadence, monthlyPlan, firstPosts, updatedAt
- `Discovery` table with fields: userId, createdAt

## Server Actions Referenced

The implementation references these server actions that need to be created:
- `/actions/discovery.ts` - `saveDiscoverySession(formData)`
- `/actions/profile.ts` - `updateUserProfile(formData)`
- `/actions/billing.ts` - `createBillingPortalSession()`

## UI Components Used

From shadcn/ui:
- Button
- Card
- Badge
- Avatar
- AvatarImage
- AvatarFallback
- Progress
- Tabs
- TabsContent
- TabsList
- TabsTrigger
- DropdownMenu (and sub-components)

From next/auth:
- auth() for session
- signOut() for logout
- Session types

From lucide-react:
- LayoutDashboard
- Compass
- Target
- CreditCard
- Settings
- Shield
- LogOut
- User
- Download
- Sparkles
- ArrowRight
- BarChart3
- MessageSquare
- Clock
- Zap
- Check

## Layout Structure

```
Root (dashboard layout)
├── Sidebar (fixed left)
├── Header (sticky top)
└── Main Content
    ├── Dashboard Page (home overview)
    ├── Discovery Page (7-step form)
    ├── Strategy Page (full strategy display)
    ├── Settings Page (profile & preferences)
    └── Billing Page (subscription management)
```

## Responsive Design

- **Sidebar:** Hidden on mobile, visible on md+ screens
- **Grid Layouts:** Responsive columns (1 col mobile, 2-4 cols on larger screens)
- **Cards:** Stack vertically on mobile, grid layout on larger screens
- **Header:** Adjusts padding and spacing responsively

## Next Steps

1. Create the referenced server actions in `/actions/` directory
2. Implement database models/migrations for Strategy and Discovery
3. Create the shared PageHeader component
4. Set up Stripe integration for billing
5. Configure auth callbacks in NextAuth
6. Add error boundaries for better error handling
7. Implement actual PDF download functionality
8. Add analytics tracking for dashboard interactions
