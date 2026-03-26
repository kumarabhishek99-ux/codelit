# Codelit — Claude Code Setup Instructions

You are setting up the Codelit app. Follow these steps in exact order.

## Step 1: Initialise Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --yes
```

## Step 2: Install all dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr resend clsx tailwind-merge lucide-react @next/mdx @mdx-js/loader @mdx-js/react
```

## Step 3: Create .env.local
Create a file called `.env.local` in the root. Fill in your actual values:
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL=https://codelit-bay.vercel.app
RESEND_API_KEY=YOUR_RESEND_API_KEY
```

## Step 4: Copy all provided files into the project
Copy every file from the provided package into the exact paths shown. Overwrite any files that already exist (like app/page.tsx, app/globals.css, next.config.mjs, tsconfig.json).

## Step 5: Create directory for auth callback
```bash
mkdir -p app/auth/callback
```

## Step 6: Link and push Supabase migrations
```bash
npx supabase login
npx supabase link --project-ref YOUR_SUPABASE_REFERENCE_ID
npx supabase db push
```

## Step 7: Run locally to verify
```bash
npm run dev
```
Visit http://localhost:3000. You should see the Codelit landing page.
Test signup — you should receive a magic link email.
After clicking the link you should land on /onboarding.
Complete onboarding and you should land on /dashboard.

## Step 8: Fix any TypeScript or import errors
If there are any errors, fix them. Common issues:
- Missing `app/auth/callback/route.ts` directory — create it
- Any `@/lib/supabase/client` import errors — check the file exists at `lib/supabase/client.ts`

## Step 9: Push to GitHub and deploy
```bash
git add .
git commit -m "Phase 1: auth, onboarding, dashboard, lesson view, badges"
git push origin main
```
Vercel will auto-deploy. Check https://codelit-bay.vercel.app after ~1 minute.

## Step 10: Confirm these all work on production
- [ ] Landing page loads at codelit-bay.vercel.app
- [ ] Signup sends a magic link email
- [ ] Magic link redirects to /onboarding
- [ ] Onboarding saves persona to Supabase and redirects to /dashboard
- [ ] Dashboard shows modules and progress
- [ ] Clicking a lesson opens the lesson view with Read → Try it → Quiz → Complete
- [ ] Badges page shows locked/earned badges
- [ ] Logged-out user hitting /dashboard redirects to /login

## If anything breaks
Read the error carefully. Most common issues:
- Environment variables not set — double check .env.local
- Supabase migrations not pushed — run `npx supabase db push` again
- Missing directories — create them with `mkdir -p`
