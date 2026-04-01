# Revision mode + badge toast fix

## Overview
1. Let users revisit completed lessons in revision mode
2. Award a revision badge after 3 lesson revisits
3. Fix badge toast using polling fallback (Realtime unreliable on Vercel)

## Changes
- supabase/migrations/005_revision_badges.sql
- components/lesson/LessonView.tsx
- components/lesson/LessonQuiz.tsx
- components/lesson/LessonRevisionComplete.tsx (new)
- components/ui/BadgeToast.tsx
- app/dashboard/page.tsx
