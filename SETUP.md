# Kun (كُن) — Setup Guide

AI-powered personal brand strategy builder for MENA professionals.

## Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in the values (see sections below)

# 3. Set up your database
npm run db:push

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## Service Setup

### Database (Neon PostgreSQL)

1. Create an account at [neon.tech](https://console.neon.tech)
2. Create a new project (name it "kun")
3. Copy the connection string from the dashboard
4. Paste it into `.env.local` as `DATABASE_URL`
5. Push the schema to your database:

```bash
npm run db:push
```

To open the Drizzle Studio GUI for browsing your data:

```bash
npm run db:studio
```

### Authentication (NextAuth / Auth.js)

1. Generate a secret:

```bash
openssl rand -base64 32
```

2. Paste it into `.env.local` as `NEXTAUTH_SECRET`
3. Set `NEXTAUTH_URL=http://localhost:3000`

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or use existing)
3. Go to "OAuth consent screen" → Configure
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Application type: Web application
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

### Payments (Stripe)

1. Create a [Stripe account](https://dashboard.stripe.com)
2. Go to "Developers" → "API keys"
3. Copy the publishable and secret keys to `.env.local`

#### Create Products

In the Stripe Dashboard, create 2 products:

**Kun Pro** ($29/month):
- Create product → Add monthly price ($29)
- Optionally add yearly price ($278.40 = 20% off)
- Copy the price IDs to `.env.local`

**Kun Business** ($79/month):
- Create product → Add monthly price ($79)
- Optionally add yearly price ($758.40 = 20% off)
- Copy the price IDs to `.env.local`

#### Set Up Webhooks (Development)

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
npm run stripe:webhook
```

Copy the webhook signing secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

#### Set Up Webhooks (Production)

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
4. Copy the webhook signing secret

### Email (Resend)

1. Create an account at [resend.com](https://resend.com)
2. Go to "API Keys" → Create a new key
3. Copy to `.env.local` as `RESEND_API_KEY`
4. Go to "Domains" → Add and verify your domain
5. Set `RESEND_FROM_EMAIL=Kun <noreply@yourdomain.com>`

To preview email templates locally:

```bash
npm run email:dev
```

---

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your repository
4. Add all environment variables from `.env.local` (change URLs to production domain)
5. Deploy!

**Important:** Update these for production:
- `NEXT_PUBLIC_APP_URL` → your production domain
- `NEXTAUTH_URL` → your production domain
- Stripe webhook endpoint → production URL
- Google OAuth redirect URI → production URL

---

## Project Structure

```
kun/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/        # Public pages (landing, pricing)
│   │   ├── (auth)/             # Login, signup, forgot-password
│   │   ├── (dashboard)/        # Main app (protected)
│   │   ├── (admin)/            # Admin panel (admin role only)
│   │   └── api/                # API routes (auth, webhooks)
│   ├── actions/                # Server actions (mutations)
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── shared/             # Logo, loading, empty state
│   │   ├── marketing/          # Nav, footer, pricing
│   │   ├── dashboard/          # Sidebar, header
│   │   ├── admin/              # Admin sidebar
│   │   ├── auth/               # Auth provider
│   │   └── settings/           # Settings forms
│   ├── config/                 # Site config, constants
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Core libraries
│   │   ├── auth/               # NextAuth configuration
│   │   ├── db/                 # Drizzle ORM + schema
│   │   ├── email/              # Resend email client
│   │   └── stripe/             # Stripe client + config
│   └── types/                  # TypeScript type definitions
├── emails/                     # React Email templates
├── public/                     # Static assets
├── drizzle/                    # Generated migrations
└── SETUP.md                    # This file
```

## Key Files to Start With

| File | What It Does |
|------|-------------|
| `src/app/(marketing)/page.tsx` | Your landing page |
| `src/lib/db/schema.ts` | Your database schema |
| `src/app/(dashboard)/dashboard/page.tsx` | Main dashboard |
| `src/app/(dashboard)/discovery/page.tsx` | Brand discovery flow |
| `src/app/(dashboard)/strategy/page.tsx` | Strategy results display |
| `src/lib/stripe/config.ts` | Pricing plans configuration |
| `.env.example` | All environment variables needed |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio (DB browser) |
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Run pending migrations |
| `npm run email:dev` | Preview email templates |
| `npm run stripe:webhook` | Forward Stripe webhooks locally |

## Next Steps

1. Set up your Neon database and copy the connection string
2. Create a Google OAuth app and add your API keys
3. Run `npm run dev` to see your landing page
4. Create a Stripe account and set up your products
5. Deploy to Vercel when ready!
