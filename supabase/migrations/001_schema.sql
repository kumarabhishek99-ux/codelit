-- ============================================
-- Migration 001: Core schema
-- ============================================

-- Enable UUID extension (gen_random_uuid() is built-in since PG 13)
create extension if not exists "pgcrypto";

-- ============================================
-- PROFILES
-- Extends Supabase auth.users
-- ============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  persona text check (persona in ('designer', 'pm_founder', 'general')) default 'general',
  avatar_url text,
  streak_days integer default 0,
  last_active_date date,
  total_xp integer default 0,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- MODULES
-- Course modules (M0–M7)
-- ============================================
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  order_num integer not null unique,
  slug text not null unique,
  title text not null,
  description text,
  persona_variants text[] default array['designer','pm_founder','general'],
  is_published boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- LESSONS
-- Individual lessons within modules
-- ============================================
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  order_num integer not null,
  slug text not null,
  title text not null,
  content_type text check (content_type in ('read', 'interactive', 'quiz_gate')) default 'read',
  est_minutes integer default 5,
  persona_variant text check (persona_variant in ('designer', 'pm_founder', 'general')),
  is_published boolean default false,
  created_at timestamptz default now(),
  unique(module_id, order_num),
  unique(module_id, slug)
);

-- ============================================
-- USER PROGRESS
-- Tracks lesson completion per user
-- ============================================
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  status text check (status in ('not_started', 'in_progress', 'completed')) default 'not_started',
  score_pct integer check (score_pct >= 0 and score_pct <= 100),
  time_spent_s integer default 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- ============================================
-- QUIZ ATTEMPTS
-- Each quiz attempt stored separately
-- ============================================
create table public.quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  answers jsonb,
  score_pct integer check (score_pct >= 0 and score_pct <= 100),
  passed boolean default false,
  taken_at timestamptz default now()
);

-- ============================================
-- BADGE DEFINITIONS
-- All possible badges in the system
-- ============================================
create table public.badge_definitions (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  description text,
  shape text check (shape in ('star', 'circle', 'stamp', 'hex')) default 'star',
  color_ramp text default 'purple',
  trigger_type text check (trigger_type in ('lesson_complete', 'module_complete', 'quiz_perfect', 'streak', 'course_complete')) not null,
  trigger_ref text,
  trigger_value integer,
  created_at timestamptz default now()
);

-- ============================================
-- USER BADGES
-- Badges earned by users
-- ============================================
create table public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id uuid references public.badge_definitions(id) on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- UPDATE updated_at ON PROFILES
-- ============================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();
