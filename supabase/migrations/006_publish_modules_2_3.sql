-- Publish module 2
update public.modules set is_published = true where slug = 'module-2';
update public.modules set is_published = true where slug = 'module-3';

-- Add Module 2 lessons
insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 1, 'what-is-code', 'What is code, really?', 6, true from public.modules where slug = 'module-2'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 2, 'variables', 'Variables — labeled boxes', 5, true from public.modules where slug = 'module-2'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 3, 'functions', 'Functions — reusable recipes', 6, true from public.modules where slug = 'module-2'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 4, 'logic', 'Logic — if this, then that', 5, true from public.modules where slug = 'module-2'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 5, 'reading-a-real-file', 'Reading a real file', 8, true from public.modules where slug = 'module-2'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 6, 'languages-map', 'HTML, CSS, JavaScript, Python — a quick map', 7, true from public.modules where slug = 'module-2'
on conflict (module_id, slug) do nothing;

-- Add Module 3 lessons
insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 1, 'why-version-control', 'Why version control exists', 5, true from public.modules where slug = 'module-3'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 2, 'commits', 'Commits — saving snapshots', 6, true from public.modules where slug = 'module-3'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 3, 'branches', 'Branches — parallel versions', 6, true from public.modules where slug = 'module-3'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 4, 'github', 'GitHub — where code lives online', 7, true from public.modules where slug = 'module-3'
on conflict (module_id, slug) do nothing;

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 5, 'ai-tools-and-git', 'What AI coding tools do with Git', 6, true from public.modules where slug = 'module-3'
on conflict (module_id, slug) do nothing;
