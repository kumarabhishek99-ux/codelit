insert into public.badge_definitions
  (slug, name, description, shape, color_ramp, trigger_type, trigger_ref, trigger_value)
values
  ('reviser', 'Reviser', 'Revisited 3 lessons for extra practice', 'circle', 'teal', 'lesson_complete', 'revision', 3),
  ('deep-learner', 'Deep learner', 'Revisited 5 lessons', 'hex', 'purple', 'lesson_complete', 'revision', 5)
on conflict (slug) do nothing;

-- Add revision_count column to profiles
alter table public.profiles
add column if not exists revision_count integer default 0;

-- Add revision_count column to user_progress
alter table public.user_progress
add column if not exists revision_count integer default 0;
