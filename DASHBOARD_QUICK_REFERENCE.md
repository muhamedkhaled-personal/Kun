# Kun Dashboard - Quick Reference Guide

## File Locations

```
Dashboard Components:
- src/components/dashboard/sidebar.tsx        (Left navigation)
- src/components/dashboard/header.tsx         (Top header)
- src/components/dashboard/settings-form.tsx  (Profile form)

Dashboard Pages:
- src/app/(dashboard)/layout.tsx              (Layout wrapper)
- src/app/(dashboard)/dashboard/page.tsx      (Home)
- src/app/(dashboard)/discovery/page.tsx      (7-step form)
- src/app/(dashboard)/strategy/page.tsx       (Strategy display)
- src/app/(dashboard)/settings/page.tsx       (Profile settings)
- src/app/(dashboard)/billing/page.tsx        (Subscription)
```

## Component Props at a Glance

### Sidebar
```typescript
<Sidebar user={{
  name: "John Doe",
  email: "john@example.com",
  image?: "https://...",
  role?: "admin"
}} />
```

### Header
```typescript
<Header user={{
  name: "John Doe",
  email: "john@example.com",
  image?: "https://..."
}} />
```

### SettingsForm
```typescript
<SettingsForm user={{
  id: "user-123",
  name: "John Doe",
  email: "john@example.com"
}} />
```

## Navigation Routes

| Route | Component | Type | Purpose |
|-------|-----------|------|---------|
| `/dashboard` | dashboard/page.tsx | Server | Home dashboard |
| `/discovery` | discovery/page.tsx | Client | 7-step form |
| `/strategy` | strategy/page.tsx | Server | View strategy |
| `/settings` | settings/page.tsx | Server | Edit profile |
| `/billing` | billing/page.tsx | Server | Manage plan |

## Quick Code Snippets

### Fetching Strategy in Server Component
```typescript
const strategy = await db.strategy.findFirst({
  where: { userId },
  orderBy: { updatedAt: "desc" },
});

if (!strategy) {
  redirect("/discovery");
}
```

### Getting Session in Pages
```typescript
const session = await auth();
if (!session?.user) {
  redirect("/auth/signin");
}
```

### Form Submission in Client Component
```typescript
const handleSubmit = async (formData: FormData) => {
  setIsLoading(true);
  try {
    const result = await saveDiscoverySession(formData);
    if (result.success) {
      router.push("/strategy");
    }
  } finally {
    setIsLoading(false);
  }
};
```

### Conditional Navigation Item (Admin)
```typescript
{isAdmin && (
  <Link href="/admin">
    <Button>Admin Panel</Button>
  </Link>
)}
```

## Styling Conventions

### Colors
- Primary Actions: `bg-amber-600 hover:bg-amber-700`
- Secondary Actions: `variant="outline"`
- Danger: `text-red-600`
- Success: `text-green-600`
- Sidebar: `bg-slate-900`

### Layout Classes
- Page Wrapper: `px-6 max-w-7xl mx-auto`
- Sidebar Offset: `ml-64`
- Full Page: `flex-1 overflow-auto pt-6`
- Card Padding: `p-8`

### Typography
- Page Title: `text-2xl font-bold text-slate-900`
- Section Header: `text-lg font-semibold text-slate-900`
- Label: `text-sm font-medium text-slate-900`
- Helper Text: `text-xs text-slate-500`

## Common UI Patterns

### Call-to-Action Card
```tsx
<Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
  <h2 className="text-2xl font-bold text-slate-900 mb-2">Heading</h2>
  <p className="text-slate-600 max-w-md mx-auto mb-6">Description</p>
  <Button asChild className="bg-amber-600 hover:bg-amber-700">
    <Link href="/next-page">Action Button</Link>
  </Button>
</Card>
```

### Stats Card
```tsx
<Card className="p-4">
  <p className="text-sm text-slate-600 font-medium">Label</p>
  <p className="text-3xl font-bold text-slate-900 mt-2">42</p>
  <p className="text-xs text-slate-500 mt-1">Context</p>
</Card>
```

### Section Header with Icon
```tsx
<h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
  <Icon className="w-5 h-5 text-amber-600" />
  Section Title
</h2>
```

### Form Input
```tsx
<div>
  <label className="text-sm font-medium text-slate-900 block mb-2">
    Label
  </label>
  <input
    type="text"
    className="w-full px-3 py-2 border border-slate-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-amber-600
               focus:border-transparent"
  />
</div>
```

### Button Group
```tsx
<div className="flex gap-3">
  <Button onClick={handleBack} variant="outline" disabled={currentStep === 1}>
    Back
  </Button>
  <Button onClick={handleNext} disabled={!isValid || isLoading}>
    {isLoading ? "Loading..." : "Next"}
  </Button>
</div>
```

## Database Queries

### Get User Strategy
```typescript
const strategy = await db.strategy.findFirst({
  where: { userId: session.user.id },
  orderBy: { updatedAt: "desc" },
});
```

### Get User Discovery
```typescript
const discovery = await db.discovery.findFirst({
  where: { userId: session.user.id },
  orderBy: { createdAt: "desc" },
});
```

### Get User Subscription
```typescript
const user = await db.user.findUnique({
  where: { id: userId },
  select: {
    plan: true,
    stripeSubscriptionId: true,
  },
});
```

## Key Imports

```typescript
// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Icons
import { LayoutDashboard, Compass, Target, CreditCard, Settings, Shield, LogOut } from "lucide-react";

// Auth & Navigation
import { auth } from "@/lib/auth/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

// Database
import { db } from "@/lib/db";

// Actions
import { saveDiscoverySession } from "@/actions/discovery";
import { updateUserProfile } from "@/actions/profile";
import { createBillingPortalSession } from "@/actions/billing";
```

## Form State Pattern

```typescript
const [currentStep, setCurrentStep] = useState<Step>(1);
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState<FormData>({
  goal: "",
  field: "",
  // ... other fields
});

const isStepValid = (): boolean => {
  switch (currentStep) {
    case 1:
      return !!formData.goal;
    // ... other cases
    default:
      return false;
  }
};

const handleNext = () => {
  if (currentStep < 7) {
    setCurrentStep((currentStep + 1) as Step);
  }
};
```

## Active Route Detection

```typescript
const pathname = usePathname();

const isActive = (href: string) => {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname.startsWith(href);
};

// Usage
className={isActive(href) ? "active" : ""}
```

## Loading States

```typescript
// Button with loading
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Loading..." : "Action"}
</Button>

// Progress during multi-step
const progress = ((currentStep - 1) / 7) * 100;
<Progress value={progress} />
```

## Error Handling

```typescript
try {
  const result = await serverAction(data);
  if (result.success) {
    router.push("/success-page");
  }
} catch (error) {
  console.error("Action failed:", error);
  // Show error toast/message
}
```

## Redirect Pattern

```typescript
import { redirect } from "next/navigation";

// Protected routes
if (!session?.user) {
  redirect("/auth/signin");
}

// Missing data
if (!strategy) {
  redirect("/discovery");
}
```

## Avatar Initials Helper

```typescript
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Usage
<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
```

## Responsive Grid Patterns

```typescript
// 1 col mobile, 2-4 cols on larger
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// 2 col mobile, 3 col on larger
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

// Full width on mobile, 2-col on larger
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

## Environment Variables Needed

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL=postgresql://...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

## Testing Checklist

- [ ] Sidebar navigation works on all routes
- [ ] Header user menu displays correctly
- [ ] Discovery form validates each step
- [ ] Strategy displays all 8 components
- [ ] Settings form saves changes
- [ ] Billing shows pricing/subscription
- [ ] Auth redirects for logged out users
- [ ] Admin link only shows for admin role
- [ ] Responsive on mobile/tablet/desktop
- [ ] Links navigate correctly
- [ ] Forms submit without errors

## Performance Tips

1. Use server components where possible
2. Lazy load heavy components
3. Memoize expensive calculations
4. Use React Query for data fetching
5. Optimize images with Next.js Image
6. Add proper indexes to database queries
7. Implement pagination for large lists
8. Cache strategy data when appropriate

## Debugging Tips

1. Check browser console for errors
2. Use `console.log(session)` to debug auth
3. Verify database queries with DB client
4. Check form data in browser DevTools
5. Use Network tab to inspect API calls
6. Check Next.js server logs for errors
7. Verify environment variables are set
8. Test auth tokens with JWT.io

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "No session" error | Check auth.ts config, verify NEXTAUTH_SECRET |
| Strategy not loading | Verify userId, check DB record exists |
| Sidebar admin link missing | Check user.role value, must be "admin" |
| Form not submitting | Check server action exists, verify error in console |
| Images not showing | Use next/image component, verify URLs |
| Route not protected | Add redirect at top of page component |
| Styles not applying | Check Tailwind config, rebuild CSS |
| Buttons disabled always | Check isStepValid() logic, form state |

## Useful Commands

```bash
# Development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Database migrations
npx prisma migrate dev

# Database studio
npx prisma studio

# Build
npm run build

# Start production
npm start
```
