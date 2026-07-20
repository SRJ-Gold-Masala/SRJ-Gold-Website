# SRJ Gold Spices — Production Codebase

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Supabase) · NextAuth.js · Nodemailer

---

## Local Setup (Step by Step)

### 1. Prerequisites
Make sure you have these installed:
```bash
node --version   # needs 18+
npm --version    # needs 9+
git --version    # any recent version
```

### 2. Clone / open the project
```bash
cd srj-gold
npm install
```

### 3. Set up Supabase (free)
1. Go to https://supabase.com → New project
2. Name it `srj-gold`, choose a region, set a DB password
3. Go to **Project Settings → Database** and copy the **Connection string (URI)**
4. Go to **Project Settings → API** and copy the `anon` key and `service_role` key
5. Go to **Storage → New bucket** → name it `product-images` → set to **Public**

### 4. Set up Google OAuth (for Sign in with Google)
1. Go to https://console.cloud.google.com
2. Create a project → **APIs & Services → Credentials → Create OAuth 2.0 Client**
3. Application type: **Web application**
4. Authorised redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**

### 5. Set up Gmail App Password (for email notifications)
1. Go to https://myaccount.google.com/apppasswords
2. Generate an app password for "Mail"
3. Copy the 16-character password

### 6. Fill in environment variables
```bash
cp .env.local .env.local.bak   # backup the template
nano .env.local                # or open in your editor
```

Fill in every value in `.env.local` (see the file — all keys are documented).

Also add `ADMIN_PASSWORD=your-chosen-password` to `.env.local`.

### 7. Push the database schema
```bash
npm run db:generate   # generate Prisma client
npm run db:push       # push schema to Supabase
npm run db:seed       # seed 3 starter products + admin user
```

### 8. Add product images to public folder
Copy your product images into:
```
public/images/logo.jpeg
public/images/products/chilli.jpeg
public/images/products/turmeric.jpeg
public/images/products/coriander.jpeg
```

### 9. Run locally
```bash
npm run dev
```

Open http://localhost:3000

---

## Admin Panel
1. Go to http://localhost:3000/auth/signin
2. Email: `admin@srjgold.com` · Password: (what you set in `ADMIN_PASSWORD`)
3. After sign-in, **Admin ⚙** appears in the nav
4. Add / hide / delete products from the dashboard
5. View all enquiries in the Enquiries tab

---

## Project Structure
```
srj-gold/
├── prisma/
│   ├── schema.prisma          # DB models: User, Product, Enquiry
│   └── seed.ts                # starter data
├── public/
│   └── images/
│       ├── logo.jpeg
│       └── products/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # root layout, fonts, metadata
│   │   ├── page.tsx           # home (server component, ISR)
│   │   ├── providers.tsx      # NextAuth session provider
│   │   ├── not-found.tsx      # 404 page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── products/          # Products listing
│   │   │   └── [slug]/        # Product detail + enquiry form
│   │   ├── admin/             # Admin dashboard (protected)
│   │   ├── auth/signin/       # Sign in / create account
│   │   ├── privacy/           # Privacy policy
│   │   ├── terms/             # Terms of use
│   │   └── api/
│   │       ├── auth/[...nextauth]/   # NextAuth handler
│   │       ├── enquiry/              # POST enquiry + send email
│   │       ├── products/             # GET all products
│   │       └── admin/products/       # Admin CRUD (protected)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── HomeClient.tsx        # home page wrapper (phase control)
│   │       ├── Splash.tsx            # 4s branded splash screen
│   │       ├── HomeHero.tsx          # hero with entrance animations
│   │       ├── StatsSection.tsx      # animated counter stats
│   │       ├── FeaturesStrip.tsx     # 4 feature pills
│   │       ├── ProductGrid.tsx       # scroll-reveal product cards
│   │       ├── ProcessSection.tsx    # 4-step process
│   │       ├── FounderNote.tsx       # brand promise band
│   │       └── CtaBand.tsx           # bottom CTA
│   ├── hooks/
│   │   ├── useInView.ts       # intersection observer hook
│   │   └── useCountUp.ts      # animated number counter
│   ├── lib/
│   │   ├── db.ts              # Prisma singleton
│   │   ├── auth.ts            # NextAuth config + helpers
│   │   ├── mail.ts            # Nodemailer email helper
│   │   ├── supabase.ts        # Supabase storage helper
│   │   └── utils.ts           # cn, slugify, formatDate
│   ├── styles/
│   │   └── globals.css        # Tailwind + brand CSS variables
│   └── types/
│       └── index.ts           # shared TypeScript types
├── .env.local                 # environment variables (never commit)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Deployment to Vercel (when ready)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/srj-gold.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to https://vercel.com → Import project → select your GitHub repo
2. Framework: **Next.js** (auto-detected)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. For `NEXTAUTH_URL` use your production URL e.g. `https://srjgold.com`
5. For Google OAuth: add `https://yourdomain.com/api/auth/callback/google` as an authorised redirect URI in Google Cloud Console
6. Click **Deploy**

### 3. Connect your domain
In Vercel → Project Settings → Domains → add `srjgold.com`
Update your domain's DNS A record to point to Vercel's IP.

---

## Adding a new product (after launch)
1. Sign in as admin
2. Go to Admin → Add Product
3. Upload image to Supabase Storage (or paste a public URL)
4. Fill in name, category, weight, description
5. Click "Add product" — it appears live immediately (ISR revalidates in 60s)

---

## Email flow
- Customer submits enquiry on any product page or contact page
- **Immediate**: admin gets a formatted notification email
- **Immediate**: customer gets an auto-reply confirmation
- All enquiries are also stored in the database and visible in the Admin dashboard
