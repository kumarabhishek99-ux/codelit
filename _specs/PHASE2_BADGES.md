# Badge award system — implementation spec

## Overview
Award badges automatically when users complete lessons/modules.
Show an animated toast when a badge is earned. Three files to create/update.

## File 1 — New SQL migration
Create file: `supabase/migrations/004_badge_triggers.sql`

Content:
```sql
create or replace function public.check_and_award_badges(p_user_id uuid, p_lesson_id uuid)
returns void as $$
declare
  v_badge record;
  v_module_id uuid;
  v_lesson_slug text;
  v_completed_count int;
  v_total_count int;
  v_module_slug text;
begin
  select l.module_id, l.slug, m.slug
  into v_module_id, v_lesson_slug, v_module_slug
  from lessons l join modules m on m.id = l.module_id
  where l.id = p_lesson_id;

  -- Award first-boot badge on very first lesson completion
  select count(*) into v_completed_count
  from user_progress
  where user_id = p_user_id and status = 'completed';

  if v_completed_count = 1 then
    insert into user_badges (user_id, badge_id)
    select p_user_id, id from badge_definitions
    where slug = 'first-boot'
    on conflict do nothing;
  end if;

  -- Award lesson-specific badge if trigger_ref matches lesson slug
  insert into user_badges (user_id, badge_id)
  select p_user_id, id from badge_definitions
  where trigger_type = 'lesson_complete'
    and trigger_ref = v_lesson_slug
  on conflict do nothing;

  -- Check if module is now complete
  select count(*) into v_completed_count
  from user_progress up
  join lessons l on l.id = up.lesson_id
  where up.user_id = p_user_id
    and l.module_id = v_module_id
    and up.status = 'completed';

  select count(*) into v_total_count
  from lessons
  where module_id = v_module_id and is_published = true;

  if v_completed_count >= v_total_count then
    insert into user_badges (user_id, badge_id)
    select p_user_id, id from badge_definitions
    where trigger_type = 'module_complete'
      and trigger_ref = v_module_slug
    on conflict do nothing;
  end if;
end;
$$ language plpgsql security definer;

-- Trigger on user_progress insert/update
create or replace function public.on_progress_complete()
returns trigger as $$
begin
  if NEW.status = 'completed' and (OLD is null or OLD.status != 'completed') then
    perform public.check_and_award_badges(NEW.user_id, NEW.lesson_id);
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists progress_complete_trigger on public.user_progress;
create trigger progress_complete_trigger
  after insert or update on public.user_progress
  for each row execute procedure public.on_progress_complete();
```

## File 2 — New component
Create file: `components/ui/BadgeToast.tsx`

## File 3 — Update LessonView
In `components/lesson/LessonView.tsx`:
- Import BadgeToast at the top: `import BadgeToast from '@/components/ui/BadgeToast'`
- Add `<BadgeToast userId={userId} />` just before the closing `</div>` of the return statement

## File 4 — Push migration
After creating the files, run:
```bash
npx supabase db push
git add .
git commit -m "feat: badge award system with realtime toast"
git push
```

## Done when:
- Completing a lesson awards the first-boot badge on first completion
- Module completion awards the module stamp badge
- Badge toast appears bottom-right with spring animation
- No npm run dev — push and test on Vercel
