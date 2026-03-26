# Codelit — Phase 1 Spec

## What you are building
A web-based code literacy course app called **Codelit** for non-coders (designers, PMs, founders) learning enough code to build with AI tools like Claude Code and Cursor.

## Your job in Phase 1
Set up the full working skeleton: auth, database, onboarding flow, and dashboard. No lesson content yet — just the structure that everything else plugs into.

## Tech stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Supabase (auth + database)
- Vercel (deployment — already connected)

## Steps to execute in order

### 1. Initialise the Next.js project
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```

### 2. Install dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install resend
npm install clsx tailwind-merge
npm install lucide-react
```

### 3. Create .env.local
Create a file called `.env.local` in the project root with this content — fill in the values from Supabase and Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=https://codelit-bay.vercel.app
RESEND_API_KEY=your_resend_api_key
```

### 4. Run Supabase migrations
```bash
npx supabase login
npx supabase link --project-ref YOUR_SUPABASE_REFERENCE_ID
npx supabase db push
```

### 5. Copy all files from this spec package into the project
All files are provided — copy them into the exact paths shown.

### 6. Run locally to verify
```bash
npm run dev
```
Visit http://localhost:3000 — you should see the landing page. Signing up should work and take you to onboarding.

### 7. Push to GitHub
```bash
git add .
git commit -m "Phase 1: auth, onboarding, dashboard skeleton"
git push origin main
```
Vercel will auto-deploy.

## Acceptance criteria
- [ ] User can sign up with email magic link
- [ ] After signup, user lands on /onboarding
- [ ] Onboarding quiz works with skip option
- [ ] Persona is saved to profiles table in Supabase
- [ ] After onboarding, user lands on /dashboard
- [ ] Dashboard shows module list (all locked except Module 0)
- [ ] Returning user who is logged in goes straight to /dashboard
- [ ] Logged-out user trying to access /dashboard is redirected to /login
