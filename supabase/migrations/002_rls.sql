-- ============================================
-- Migration 002: Row Level Security
-- ============================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.badge_definitions enable row level security;
alter table public.user_badges enable row level security;

-- ============================================
-- PROFILES policies
-- ============================================
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ============================================
-- MODULES policies (public read)
-- ============================================
create policy "Anyone can view published modules"
  on public.modules for select
  using (is_published = true);

-- ============================================
-- LESSONS policies (public read)
-- ============================================
create policy "Anyone can view published lessons"
  on public.lessons for select
  using (is_published = true);

-- ============================================
-- USER PROGRESS policies
-- ============================================
create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- ============================================
-- QUIZ ATTEMPTS policies
-- ============================================
create policy "Users can view own quiz attempts"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz attempts"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- ============================================
-- BADGE DEFINITIONS policies (public read)
-- ============================================
create policy "Anyone can view badge definitions"
  on public.badge_definitions for select
  using (true);

-- ============================================
-- USER BADGES policies
-- ============================================
create policy "Users can view own badges"
  on public.user_badges for select
  using (auth.uid() = user_id);
