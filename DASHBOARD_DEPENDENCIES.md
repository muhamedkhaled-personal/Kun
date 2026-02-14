# Kun Dashboard - Dependencies & Imports

## Complete File Structure & Dependencies

### 1. Sidebar Component
**File:** `src/components/dashboard/sidebar.tsx`

**Dependencies:**
- `next/link` - Navigation linking
- `next/navigation` - `usePathname` hook
- `lucide-react` - Icons (LayoutDashboard, Compass, Target, CreditCard, Settings, Shield, LogOut)
- `@/components/ui/avatar` - Avatar component
- `@/components/ui/button` - Button component
- `@/components/shared/logo` - Logo component
- `next-auth/react` - `signOut` function

**Type Definitions:**
```typescript
interface SidebarProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role?: string;
  };
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}
```

**Key Functions:**
- `getInitials(name: string): string` - Generate avatar initials
- `isActive(href: string): boolean` - Check if route is active
- `signOut()` - NextAuth sign out

---

### 2. Header Component
**File:** `src/components/dashboard/header.tsx`

**Dependencies:**
- `next/link` - Navigation linking
- `next-auth/react` - `signOut` function
- `lucide-react` - Icons (Settings, LogOut, User)
- `@/components/ui/avatar` - Avatar components
- `@/components/ui/dropdown-menu` - Dropdown menu components
- `@/components/ui/button` - Button component

**Sub-components Used:**
- `DropdownMenu`
- `DropdownMenuTrigger`
- `DropdownMenuContent`
- `DropdownMenuLabel`
- `DropdownMenuSeparator`
- `DropdownMenuItem`
- `Avatar`
- `AvatarImage`
- `AvatarFallback`

**Type Definitions:**
```typescript
interface HeaderProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}
```

---

### 3. Dashboard Layout
**File:** `src/app/(dashboard)/layout.tsx`

**Dependencies:**
- `next/navigation` - `redirect` function
- `@/lib/auth/auth` - `auth` function
- `@/components/dashboard/sidebar` - Sidebar component
- `@/components/dashboard/header` - Header component

**Usage:**
```typescript
const session = await auth();
if (!session?.user) {
  redirect("/auth/signin");
}
```

---

### 4. Dashboard Home Page
**File:** `src/app/(dashboard)/dashboard/page.tsx`

**Dependencies:**
- `next/navigation` - `redirect` function
- `next/link` - Link component
- `lucide-react` - Icons (ArrowRight, Sparkles)
- `@/lib/auth/auth` - `auth` function
- `@/components/shared/page-header` - PageHeader component
- `@/components/ui/card` - Card component
- `@/components/ui/button` - Button component
- `@/components/ui/badge` - Badge component
- `@/lib/db` - Database client

**Database Queries:**
```typescript
// Get latest strategy
db.strategy.findFirst({
  where: { userId },
  orderBy: { updatedAt: "desc" }
});

// Get latest discovery
db.discovery.findFirst({
  where: { userId },
  orderBy: { createdAt: "desc" }
});
```

**Async Operations:**
- `getStrategyData(userId: string)` - Fetch strategy and discovery data

**Utility Functions:**
- Calculate days since update: `Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24))`

---

### 5. Discovery Page (7-Step Form)
**File:** `src/app/(dashboard)/discovery/page.tsx`

**Dependencies:**
- `react` - `useState` hook
- `next/navigation` - `useRouter` hook
- `lucide-react` - Loader2 icon
- `@/components/ui/button` - Button component
- `@/components/ui/card` - Card component
- `@/components/ui/progress` - Progress component
- `@/components/shared/page-header` - PageHeader component
- `@/actions/discovery` - `saveDiscoverySession` server action

**Type Definitions:**
```typescript
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface FormData {
  goal: string;
  field: string;
  audience: string;
  platform: string;
  strengths: string;
  careerStory: string;
  knownFor: string;
}
```

**Constants:**
- `GOALS` - 5 options for primary goal
- `FIELDS` - 9 options for industry/field
- `AUDIENCES` - 5 options for target audience
- `PLATFORMS` - 6 platform options

**State Management:**
```typescript
const [currentStep, setCurrentStep] = useState<Step>(1);
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState<FormData>({...});
```

**Key Functions:**
- `handleNext()` - Navigate to next step or submit
- `handleBack()` - Go to previous step
- `handleSubmit()` - Call server action and redirect
- `isStepValid()` - Validate current step

---

### 6. Strategy Display Page
**File:** `src/app/(dashboard)/strategy/page.tsx`

**Dependencies:**
- `next/navigation` - `redirect` function
- `next/link` - Link component
- `lucide-react` - Icons (Download, Sparkles, ArrowRight, Target, BarChart3, MessageSquare, Clock, Zap)
- `@/lib/auth/auth` - `auth` function
- `@/lib/db` - Database client
- `@/components/shared/page-header` - PageHeader component
- `@/components/ui/card` - Card component
- `@/components/ui/button` - Button component
- `@/components/ui/badge` - Badge component
- `@/components/ui/tabs` - Tab components

**Tab Components:**
- `Tabs`
- `TabsContent`
- `TabsList`
- `TabsTrigger`

**Database Query:**
```typescript
db.strategy.findFirst({
  where: { userId },
  orderBy: { updatedAt: "desc" }
});
```

**Async Operations:**
- `getStrategy(userId: string)` - Fetch user's strategy

**Conditional Rendering:**
- Check if strategy exists
- Display 8 components conditionally based on data

---

### 7. Settings Page
**File:** `src/app/(dashboard)/settings/page.tsx`

**Dependencies:**
- `next/navigation` - `redirect` function
- `@/lib/auth/auth` - `auth` function
- `@/components/shared/page-header` - PageHeader component
- `@/components/ui/card` - Card component
- `@/components/dashboard/settings-form` - SettingsForm component

---

### 8. Settings Form Component
**File:** `src/components/dashboard/settings-form.tsx`

**Dependencies:**
- `react` - `useState` hook
- `@/components/ui/button` - Button component
- `@/actions/profile` - `updateUserProfile` server action

**Type Definitions:**
```typescript
interface SettingsFormProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

interface FormState {
  name: string;
  email: string;
  headline: string;
  field: string;
  language: string;
}
```

**Form Fields:**
- Full Name (text input)
- Email Address (disabled text input)
- Professional Headline (text input)
- Field/Industry (select dropdown)
- Language Preference (select dropdown)

**Server Action Call:**
```typescript
await updateUserProfile({
  name: string;
  email: string;
  headline: string;
  field: string;
  language: string;
});
```

---

### 9. Billing Page
**File:** `src/app/(dashboard)/billing/page.tsx`

**Dependencies:**
- `next/navigation` - `redirect` function
- `next/link` - Link component
- `lucide-react` - Icons (ArrowRight, Check)
- `@/lib/auth/auth` - `auth` function
- `@/lib/db` - Database client
- `@/components/shared/page-header` - PageHeader component
- `@/components/ui/card` - Card component
- `@/components/ui/button` - Button component
- `@/components/ui/badge` - Badge component
- `@/actions/billing` - `createBillingPortalSession` server action

**Database Query:**
```typescript
db.user.findUnique({
  where: { id: userId },
  select: {
    plan: true;
    stripeSubscriptionId: true;
    stripePriceId: true;
  }
});
```

**Plan Configuration:**
```typescript
const PLANS = {
  free: { name, price, description, features },
  pro: { name, price, period, description, features, cta },
  business: { name, price, period, description, features, cta }
};
```

**Server Action:**
```typescript
await createBillingPortalSession();
```

---

## UI Component Dependencies

### shadcn/ui Components Used

```typescript
// Buttons & Forms
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Navigation
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Progress & Tabs
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Shared Components
import { PageHeader } from "@/components/shared/page-header";
import { Logo } from "@/components/shared/logo";
```

### Lucide Icons Used

```typescript
// Navigation Icons
LayoutDashboard, Compass, Target, CreditCard, Settings, Shield, LogOut, User

// Data & Action Icons
Download, ArrowRight, Sparkles, Check, Loader2

// Analytics & Content Icons
BarChart3, MessageSquare, Clock, Zap, Bookmark, Trending
```

---

## Authentication & Database

### NextAuth
```typescript
import { auth } from "@/lib/auth/auth";
import { signOut } from "next-auth/react";

// Get current session
const session = await auth();

// Sign out user
await signOut({ redirect: true, callbackUrl: "/" });
```

### Database Client
```typescript
import { db } from "@/lib/db";

// Prisma queries
db.strategy.findFirst({...});
db.discovery.findFirst({...});
db.user.findUnique({...});
```

---

## Server Actions

### Actions to Implement

**1. Discovery Action**
```typescript
// File: actions/discovery.ts
export async function saveDiscoverySession(formData: {
  goal: string;
  field: string;
  audience: string;
  platform: string;
  strengths: string;
  careerStory: string;
  knownFor: string;
}): Promise<{ success: boolean; strategyId?: string }>;
```

**2. Profile Action**
```typescript
// File: actions/profile.ts
export async function updateUserProfile(formData: {
  name: string;
  email: string;
  headline: string;
  field: string;
  language: string;
}): Promise<{ success: boolean }>;
```

**3. Billing Action**
```typescript
// File: actions/billing.ts
export async function createBillingPortalSession(): Promise<{ url: string }>;
```

---

## Required Environment Variables

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kun_db

# Stripe Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Optional: Email Service
SENDGRID_API_KEY=SG.xxx
RESEND_API_KEY=re_xxx
```

---

## Package Dependencies

### Required packages (should already be in project):

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next-auth": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "lucide-react": "^latest",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "prisma": "^5.0.0"
  }
}
```

---

## Component Hierarchy

```
DashboardLayout
├── Sidebar
│   └── NavItems with Icons
│   └── User Profile Section
├── Header
│   └── DropdownMenu
│       ├── Profile Link
│       ├── Settings Link
│       └── Sign Out Button
└── Main Content
    ├── Dashboard Page
    │   ├── PageHeader
    │   ├── Stats Cards
    │   ├── Strategy Summary Card
    │   └── CTA Card (if no strategy)
    ├── Discovery Page
    │   ├── Progress Bar
    │   ├── Step Form (7 variants)
    │   └── Navigation Buttons
    ├── Strategy Page
    │   ├── PageHeader
    │   ├── Positioning Statement Card
    │   ├── Content Pillars Grid
    │   ├── Platform Strategy Section
    │   ├── Content Mix Chart
    │   ├── Voice Guide Section
    │   ├── Posting Cadence Grid
    │   ├── Tabbed 90-Day Plan
    │   └── First 5 Posts Section
    ├── Settings Page
    │   ├── PageHeader
    │   ├── SettingsForm
    │   │   └── Form Inputs & Dropdowns
    │   └── Preferences Section
    └── Billing Page
        ├── PageHeader
        ├── Current Plan Card
        ├── Pricing Comparison (if free)
        │   └── Plan Cards Grid
        ├── Subscription Info (if paid)
        └── FAQ Section
```

---

## File Size Reference

| File | Approx. Size | Type |
|------|--------------|------|
| sidebar.tsx | ~3.5 KB | Server component |
| header.tsx | ~2.8 KB | Client component |
| settings-form.tsx | ~2.2 KB | Client component |
| dashboard/page.tsx | ~3.8 KB | Server component |
| discovery/page.tsx | ~7.2 KB | Client component |
| strategy/page.tsx | ~8.5 KB | Server component |
| settings/page.tsx | ~1.8 KB | Server component |
| billing/page.tsx | ~6.4 KB | Server component |
| layout.tsx | ~1.2 KB | Server component |

**Total: ~37.4 KB of component code**

---

## Import Order Convention

Files should follow this import order:

```typescript
// 1. External dependencies
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

// 2. Icons
import { Icon1, Icon2 } from "lucide-react";

// 3. Local components
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/dashboard/sidebar";

// 4. Auth & Database
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";

// 5. Server Actions
import { actionName } from "@/actions/file";

// 6. Type Definitions (at end if not in separate file)
interface ComponentProps { ... }
```

---

## Common Import Patterns

```typescript
// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

// Navigation & Auth
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { auth } from "@/lib/auth/auth";

// Icons
import {
  LayoutDashboard,
  Compass,
  Target,
  CreditCard,
  Settings,
  Shield,
  LogOut,
  User,
  Download,
  ArrowRight,
  Sparkles,
  Loader2,
  Check
} from "lucide-react";

// Database & Actions
import { db } from "@/lib/db";
import { saveDiscoverySession } from "@/actions/discovery";
import { updateUserProfile } from "@/actions/profile";
import { createBillingPortalSession } from "@/actions/billing";

// Shared Components
import { PageHeader } from "@/components/shared/page-header";
import { Logo } from "@/components/shared/logo";
```

This covers all imports, dependencies, and file relationships needed for the complete Kun dashboard implementation.
