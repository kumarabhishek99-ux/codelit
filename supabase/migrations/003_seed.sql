-- ============================================
-- Migration 003: Seed content + badges
-- ============================================

-- ============================================
-- MODULES
-- ============================================
insert into public.modules (order_num, slug, title, description, is_published) values
(0, 'module-0', 'The big picture', 'How software gets made, end to end', true),
(1, 'module-1', 'Files, terminal & paths', 'Command line, folders, file system basics', true),
(2, 'module-2', 'Reading code', 'Variables, functions, logic — read not write', false),
(3, 'module-3', 'Git & version control', 'GitHub, branches, commits, PRs', false),
(4, 'module-4', 'Frontend, backend & databases', 'What each layer does and why it exists', false),
(5, 'module-5', 'The IDE & dev environment', 'VS Code, extensions, running a project locally', false),
(6, 'module-6', 'Vibe coding with AI', 'Claude Code, Cursor, prompting, iteration', false),
(7, 'module-7', 'Shipping a product', 'Deploy, domains, env vars, debugging', false);

-- ============================================
-- LESSONS — Module 0
-- ============================================
insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 1, 'big-picture', 'How software actually gets made', 8, true from public.modules where slug = 'module-0';

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 2, 'frontend-backend', 'Frontend, backend — what do they mean?', 6, true from public.modules where slug = 'module-0';

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 3, 'how-ai-fits', 'Where AI tools fit in the picture', 5, true from public.modules where slug = 'module-0';

-- ============================================
-- LESSONS — Module 1
-- ============================================
insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 1, 'your-computers-brain', 'Your computer''s brain', 5, true from public.modules where slug = 'module-1';

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 2, 'files-and-folders', 'Files and folders', 6, true from public.modules where slug = 'module-1';

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 3, 'the-terminal', 'What is the terminal, really?', 8, true from public.modules where slug = 'module-1';

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 4, 'file-paths', 'File paths explained', 6, true from public.modules where slug = 'module-1';

insert into public.lessons (module_id, order_num, slug, title, est_minutes, is_published)
select id, 5, 'first-command', 'Run your first command', 7, true from public.modules where slug = 'module-1';

-- ============================================
-- BADGE DEFINITIONS
-- ============================================
insert into public.badge_definitions (slug, name, description, shape, color_ramp, trigger_type, trigger_ref, trigger_value) values

-- Lesson milestone badges
('first-boot', 'First boot', 'Completed your very first lesson', 'star', 'purple', 'lesson_complete', null, 1),
('path-finder', 'Path finder', 'Navigated your first directory', 'circle', 'teal', 'lesson_complete', 'the-terminal', null),
('terminal-tamer', 'Terminal tamer', 'Ran commands in the sandbox terminal', 'star', 'blue', 'lesson_complete', 'first-command', null),
('code-reader', 'Code reader', 'Read your first block of real code', 'circle', 'purple', 'lesson_complete', null, null),
('git-curious', 'Git curious', 'Learned what version control is', 'star', 'coral', 'lesson_complete', null, null),
('vibe-starter', 'Vibe starter', 'Completed the vibe coding intro', 'hex', 'green', 'lesson_complete', null, null),

-- Module complete stamps
('module-0-stamp', 'Module 0 stamp', 'Completed the big picture module', 'stamp', 'green', 'module_complete', 'module-0', null),
('module-1-stamp', 'Module 1 stamp', 'Completed files, terminal & paths', 'stamp', 'amber', 'module_complete', 'module-1', null),
('module-2-stamp', 'Module 2 stamp', 'Completed reading code', 'stamp', 'purple', 'module_complete', 'module-2', null),
('module-3-stamp', 'Module 3 stamp', 'Completed git & version control', 'stamp', 'coral', 'module_complete', 'module-3', null),
('module-4-stamp', 'Module 4 stamp', 'Completed frontend, backend & databases', 'stamp', 'blue', 'module_complete', 'module-4', null),
('module-5-stamp', 'Module 5 stamp', 'Completed the IDE module', 'stamp', 'teal', 'module_complete', 'module-5', null),
('module-6-stamp', 'Module 6 stamp', 'Completed vibe coding with AI', 'stamp', 'green', 'module_complete', 'module-6', null),
('module-7-stamp', 'Module 7 stamp', 'Shipped something real', 'stamp', 'purple', 'module_complete', 'module-7', null),

-- Quiz badges
('quiz-ace', 'Quiz ace', 'Got 100% on a quiz', 'hex', 'amber', 'quiz_perfect', null, null),

-- Streak badges
('streak-3', 'On a roll', '3 days in a row', 'circle', 'coral', 'streak', null, 3),
('streak-7', 'Streak x7', '7 days in a row', 'hex', 'amber', 'streak', null, 7),
('streak-14', 'Streak x14', '14 days in a row', 'hex', 'purple', 'streak', null, 14),

-- Course complete
('code-literate', 'Code literate', 'Completed the full Codelit course', 'hex', 'purple', 'course_complete', null, null);
