# Phase 3 — Module 2 and Module 3 full content

## Overview
Add all lesson content for Module 2 (Reading code) and Module 3 (Git and version control).
Content lives in `lib/lessonContent.ts` — a single exported object that LessonRead.tsx and LessonTryIt.tsx import.
Quiz questions live in `lib/quizContent.ts` — imported by LessonQuiz.tsx.

No new pages needed. Just update the content files and publish the modules in the DB.

---

## Step 1 — Update supabase to publish modules 2 and 3

Create file: `supabase/migrations/006_publish_modules_2_3.sql`

```sql
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
```

---

## Step 2 — Create lib/lessonContent.ts

Create this file at `lib/lessonContent.ts`. It exports a single object `lessonContent` keyed by lesson slug.

```typescript
export interface LessonContent {
  body: string        // HTML string, supports <strong> and <code> tags
  analogy: string     // Plain text, shown in the analogy card
  keyConcept: string  // Plain text, shown in the key concept callout
  vibeBridge: string  // Plain text, shown in the vibe coding bridge
}

export const lessonContent: Record<string, LessonContent> = {

  // ─── MODULE 0 ───────────────────────────────────────────

  'big-picture': {
    body: `Every piece of software you use was built by people writing instructions for computers. Those instructions are called <strong>code</strong>. But software isn't just code — it's code organised into projects, stored somewhere, and run on computers (or servers) somewhere else.

When you open an app on your phone, a chain of events happens: your device sends a request to a server, the server runs some code, that code talks to a database, and a response comes back to your screen. All of this happens in milliseconds.

Understanding this chain — even at a high level — makes the whole world of software suddenly legible. You start to see why things are structured the way they are, why developers make certain decisions, and where AI tools fit in.`,
    analogy: 'Software is like a restaurant. The dining room is what customers see and interact with. The kitchen is where the actual work happens. The pantry is where everything is stored. The chef coordinates all three — and today, AI tools are increasingly helping in the kitchen.',
    keyConcept: 'Every digital product has three layers: something users interact with (frontend), something that processes logic (backend), and somewhere data is stored (database). AI coding tools help you build all three — but you need to know which layer you\'re working on.',
    vibeBridge: 'When you describe a feature to an AI coding tool like Cursor or Claude Code, it needs to decide which layer to work on. Understanding the big picture helps you give better instructions — and understand the code it produces.',
  },

  'frontend-backend': {
    body: `The <strong>frontend</strong> is everything a user sees and touches — buttons, text, images, forms. It runs in the browser on the user\'s device. When a designer hands over a Figma file, a developer turns it into frontend code.

The <strong>backend</strong> is everything the user doesn\'t see — the logic, the rules, the processing. When you submit a form, the backend decides what to do with it. It checks if the email is valid, saves it to a database, and sends a confirmation email.

The <strong>database</strong> is where information lives permanently. Users, posts, orders, settings — anything that needs to survive after the page closes lives in a database.

These three layers talk to each other through <strong>APIs</strong> — a set of agreed signals. "Give me the user with ID 123." "Here they are." APIs are the language the frontend uses to ask the backend for things.`,
    analogy: 'Think of a restaurant order. You (the user) interact with the menu and waiter (frontend). The kitchen processes your order (backend). The pantry has all the ingredients (database). The order ticket between waiter and kitchen is the API.',
    keyConcept: 'Frontend = what users see. Backend = the logic behind it. Database = where data is stored. API = how they talk to each other. You don\'t need to build all three yourself — but knowing which is which helps you describe what you want.',
    vibeBridge: 'When you ask an AI tool to "add a login page," it\'s touching all three layers — creating frontend UI, writing backend logic to check credentials, and reading from a database of users. Knowing this helps you spot when something\'s missing.',
  },

  'how-ai-fits': {
    body: `AI coding tools like <strong>Cursor</strong>, <strong>Claude Code</strong>, <strong>Windsurf</strong>, and <strong>GitHub Copilot</strong> don\'t replace the three-layer structure of software — they help you build it faster.

They write code based on your descriptions. They run commands in your terminal. They push code to GitHub. They can even deploy your app to the web. But they\'re working within the same structure that\'s always existed — frontend, backend, database.

The important thing to understand is that these tools make <strong>decisions</strong> based on your instructions. The quality of what they build depends heavily on how clearly you describe what you want. A vague instruction produces vague code. A specific instruction — "add a button that saves the current form data and shows a success message" — produces something much more useful.

Your job as a non-coder using AI tools is to be the <strong>product brain</strong>. You decide what to build, why it matters, and whether what was built is right. The AI writes the code. You direct the work.`,
    analogy: 'An AI coding tool is like a very fast, very literal contractor. You\'re the architect. If you say "build me a room," you\'ll get a room. If you say "build me a 3x4 metre room with a south-facing window and a door on the east wall," you\'ll get exactly what you need.',
    keyConcept: 'AI coding tools write code — you direct them. Your value isn\'t in knowing syntax, it\'s in knowing what you want to build, how it should behave, and whether the result is right. That\'s a product skill, not a coding skill.',
    vibeBridge: 'Every lesson in this course makes you a better director of AI tools. Understanding the terminal, files, code structure, Git — these aren\'t things you need to do yourself. They\'re things you need to recognise and understand when the AI does them for you.',
  },

  // ─── MODULE 1 ───────────────────────────────────────────

  'your-computers-brain': {
    body: `Your computer has two kinds of memory and they work very differently.

<strong>RAM</strong> (Random Access Memory) is your computer\'s working memory — the stuff it\'s actively thinking about right now. When you open an app, it loads into RAM. When you close it, it disappears. RAM is fast but temporary.

<strong>Storage</strong> (your hard drive or SSD) is where things live permanently. Your files, photos, apps, code — all stored here even when the computer is off. Storage is slower but permanent.

When you run a program, your computer copies it from storage into RAM, runs it there, and discards it when you\'re done. This is why restarting your computer fixes many problems — it clears RAM and starts fresh.

Processors (CPUs and GPUs) are what actually execute the instructions. When code runs, the processor reads each instruction and carries it out — millions of times per second.`,
    analogy: 'RAM is your desk — it\'s where the work you\'re actively doing sits. Storage is your filing cabinet — everything is stored there, but you have to pull things out to work on them. The processor is you — actually doing the work.',
    keyConcept: 'RAM = temporary working memory (fast, disappears on restart). Storage = permanent files (slower, survives restart). Processor = the engine that runs instructions. Code moves from storage into RAM to be executed by the processor.',
    vibeBridge: 'When an AI tool says "installing dependencies" or "building the project," it\'s loading things into memory and running them through the processor. When it says "saved to disk," it\'s writing to storage. These aren\'t magic — they\'re the same cycle every computer does.',
  },

  'files-and-folders': {
    body: `A software project is just a folder — a collection of files organised in a specific way. Some files contain code. Some contain images or fonts. Some contain configuration — settings that tell the project how to behave.

The folder structure matters because code files reference each other. A file called <code>dashboard.tsx</code> might import functions from a file called <code>utils.ts</code>. If you move one without updating the reference, the whole thing breaks.

Common files you\'ll see in a project:
- <code>package.json</code> — lists all the external tools the project depends on
- <code>.env</code> or <code>.env.local</code> — secret keys and settings (never shared publicly)
- <code>README.md</code> — documentation explaining what the project is and how to run it
- <code>node_modules/</code> — a folder of installed dependencies (usually thousands of files, never edit manually)

Understanding the folder structure helps you navigate a codebase without getting lost — and helps you describe to an AI tool exactly where you want something to go.`,
    analogy: 'A project folder is like a well-organised office. Different departments have their own folders. Some documents reference others. Moving a document without updating the references causes confusion — the same happens in code.',
    keyConcept: 'A project is a folder of files. Files reference each other by path. Moving or renaming files breaks those references. The folder structure tells you how a project is organised — learn to read it before diving into any individual file.',
    vibeBridge: 'When an AI coding tool creates a new component or page, it places it in a specific folder and updates the references in other files. Understanding the folder structure helps you verify it put things in the right place.',
  },

  'the-terminal': {
    body: `You\'ve seen developers type into a dark window and things happen. That window is the <strong>terminal</strong> — and it\'s simpler than it looks. It\'s just another way to talk to your computer. Instead of clicking, you type.

Every click you make in a normal interface is secretly a command running underneath. When you drag a file to trash, the computer runs something like <code>rm filename</code>. The terminal just skips the middleman.

When an AI coding tool tells you to "run this in your terminal" it means: open that window, type this exact text, press enter. That\'s it. The mystery is usually just unfamiliarity, not complexity.

The terminal shows you exactly what\'s happening. No hidden steps, no waiting for a spinner. If something fails, the error message tells you exactly why — which makes debugging faster than any GUI.`,
    analogy: 'Your desktop is a restaurant menu — visual, friendly, designed for browsing. The terminal is talking directly to the chef. More precise, more powerful, but you need to know what to say.',
    keyConcept: 'The terminal is just a text interface to the same computer you already use. Nothing it can do is fundamentally different from clicking — it\'s just faster and more direct for certain things, especially running code and managing files.',
    vibeBridge: 'AI coding tools like Cursor and Claude Code do most of their work through the terminal — installing packages, running the development server, pushing to GitHub. You don\'t type these commands yourself, but recognising what\'s happening means you won\'t be confused when you see it.',
  },

  'file-paths': {
    body: `A <strong>file path</strong> is the address of a file on your computer. It describes exactly where something lives, starting from the root of your drive.

An <strong>absolute path</strong> starts from the very beginning: <code>/Users/priya/Documents/codelit/app/dashboard.tsx</code>. This works from anywhere, but it\'s specific to your machine.

A <strong>relative path</strong> starts from wherever you currently are: <code>./components/Button.tsx</code>. The <code>./</code> means "starting from here." This is what code files use to reference each other — so the project works on any machine.

Common path symbols:
- <code>./</code> — current folder
- <code>../</code> — one folder up
- <code>../../</code> — two folders up

When you see an error like "Cannot find module \'../utils/helpers\'" it means a file is trying to reference something that doesn\'t exist at that path. The file moved, was renamed, or the path was typed wrong.`,
    analogy: 'A file path is like a postal address. An absolute path is the full address including country — works from anywhere. A relative path is like saying "three doors down from here" — only makes sense if you know where "here" is.',
    keyConcept: 'Paths are addresses for files. Absolute paths start from the root, relative paths start from the current location. Most code uses relative paths so projects are portable. When you see path errors, the file either moved or the path was written incorrectly.',
    vibeBridge: 'When an AI tool creates a new file and imports it somewhere, it\'s writing a path. If it gets the path wrong, you\'ll see a "module not found" error. Knowing what a path is helps you read that error and tell the tool exactly what\'s wrong.',
  },

  'first-command': {
    body: `Running a command in your terminal is the same action every time: type it, press Enter, read the output.

The most common commands you\'ll encounter when working with code projects:

<code>npm install</code> — downloads all the packages a project needs. Run this once when you first open a project. It creates the <code>node_modules</code> folder.

<code>npm run dev</code> — starts the development server so you can see your project in a browser at <code>localhost:3000</code>. This is the "turn on the engine" command.

<code>git status</code> — shows what files have changed since the last save point. Green means new files, red means modified or deleted.

<code>git push</code> — sends your latest changes up to GitHub. This is what triggers a deployment on Vercel.

You don\'t need to memorise these. AI tools type them for you. But when you see them in a terminal window, you\'ll know exactly what\'s happening and why.`,
    analogy: 'Running a command is like pressing a button on a machine — you don\'t need to know how the machine works internally. You just need to know what each button does and when to press it.',
    keyConcept: 'Commands are just typed instructions. The most common ones for web projects are: npm install (get packages), npm run dev (start local server), git status (what changed), git push (send to GitHub). AI tools run these for you — your job is to recognise them.',
    vibeBridge: 'Every time an AI coding tool does something in the terminal, it\'s running one of these commands or a variation. npm install after adding a new feature. npm run dev to test it. git push to deploy. The loop repeats constantly — now you know what each step means.',
  },

  // ─── MODULE 2 ───────────────────────────────────────────

  'what-is-code': {
    body: `Code is instructions written in a language a computer can understand. Not English, not maths — a specific, precise language with strict rules about how sentences are formed.

But the concepts behind code are not foreign at all. You already think in variables (a client\'s name, a price, a status). You already think in functions (the steps to onboard a new user, the process of placing an order). You already think in logic (if the form is empty, show an error; otherwise, submit it).

Code is just those concepts written in a very strict notation.

There are three building blocks everything is made of:

<strong>Variables</strong> store values. <code>userName = "Priya"</code>

<strong>Functions</strong> are reusable sets of instructions. <code>sendWelcomeEmail(user)</code>

<strong>Logic</strong> makes decisions. <code>if user.isLoggedIn then showDashboard else showLogin</code>

Every piece of software — from Instagram to Figma to your banking app — is built from combinations of these three things. When you understand them, you can read any codebase and get the gist of what it\'s doing.`,
    analogy: 'Code is like a very strict recipe. A recipe has ingredients (variables), steps (functions), and conditions — "if the dough is sticky, add more flour" (logic). The strictness is what makes it work — a computer can\'t interpret "add a pinch of salt," but it can follow "add 2g of salt."',
    keyConcept: 'All code is built from three things: variables (stored values), functions (reusable instructions), and logic (decisions). Understanding these three unlocks the ability to read any codebase and understand what it\'s trying to do, even without knowing the specific language.',
    vibeBridge: 'When you ask an AI coding tool to "add a feature," it writes variables to store data, functions to do things with that data, and logic to decide when and how. Knowing these three building blocks helps you review what it built and spot when something is missing or wrong.',
  },

  'variables': {
    body: `A variable is a named container that holds a value. That\'s it.

<code>userName = "Priya"</code> creates a container called <code>userName</code> and puts the text "Priya" in it. Anywhere in the code that needs the user\'s name can now just say <code>userName</code> instead of hardcoding "Priya" everywhere.

Variables can hold different types of values:
- <strong>Text</strong> (called a string): <code>title = "Getting started"</code>
- <strong>Numbers</strong>: <code>price = 49</code>
- <strong>True or false</strong> (called a boolean): <code>isLoggedIn = true</code>
- <strong>Lists</strong> (called arrays): <code>modules = ["Terminal", "Git", "Reading code"]</code>
- <strong>Objects</strong> (grouped values): <code>user = { name: "Priya", email: "priya@co.com" }</code>

Variables change. A user logs in — <code>isLoggedIn</code> switches from <code>false</code> to <code>true</code>. A price updates — <code>price</code> gets a new number. The name stays the same, the value inside changes.

When you read code and see an unfamiliar word that gets assigned a value, it\'s a variable. Ask yourself: what is this storing? What type of value is it? That\'s usually enough to understand what the code is doing.`,
    analogy: 'Variables are like labelled sticky notes on boxes in a warehouse. The label is the variable name. Whatever\'s in the box is the value. You can relabel a box (rename the variable) or swap out the contents (change the value). Other workers (other parts of the code) can grab the right box by reading the label.',
    keyConcept: 'A variable is a named container for a value. Names stay fixed; values can change. The five common types are: text (string), number, true/false (boolean), list (array), and grouped values (object). When reading code, identifying variables tells you what data the code is working with.',
    vibeBridge: 'When an AI tool adds a feature, it creates variables to store the data that feature needs. A new user profile page might create variables for name, email, avatar, and joinDate. Reading those variable names tells you exactly what data the feature is working with — and helps you spot if something\'s missing.',
  },

  'functions': {
    body: `A function is a named block of instructions you can run whenever you need it.

<code>function sendWelcomeEmail(user) { ... }</code>

This says: "I\'m defining a set of instructions called <code>sendWelcomeEmail</code>. When you call it, pass in a <code>user</code>, and it\'ll do everything inside the curly braces."

The things you pass in are called <strong>arguments</strong> or <strong>parameters</strong>. The result the function gives back is called a <strong>return value</strong>.

Functions exist for two reasons: reuse and organisation. Instead of writing the same 20 lines every time you need to send an email, you write them once in a function and call it anywhere. And instead of reading 500 lines of code in a row, you see function names like <code>validateForm()</code>, <code>saveToDatabase()</code>, <code>showSuccessMessage()</code> — and you immediately know the structure of what\'s happening.

When you read code, function names are your signposts. They tell you the intent of each step even before you read the details inside.`,
    analogy: 'A function is like a saved automation in Zapier or Make. You define the steps once — trigger this, do that, send this — and give it a name. Then you run it whenever you need it by calling its name. The steps are hidden inside; you just trigger the whole sequence.',
    keyConcept: 'A function is a named, reusable block of instructions. You define it once and call it anywhere. Functions take inputs (parameters) and return outputs (return values). Reading function names tells you the story of what code is doing, even before reading the details inside.',
    vibeBridge: 'When an AI tool writes a new feature, it almost always creates new functions. A checkout feature might include functions like calculateTotal(), applyDiscount(), processPayment(), and sendReceipt(). Reading those function names gives you a high-level map of the feature before reading a single line of implementation.',
  },

  'logic': {
    body: `Logic in code is just decision-making written precisely.

The most common form is an <strong>if/else statement</strong>:

<code>if (user.isLoggedIn) {</code>
<code>  showDashboard()</code>
<code>} else {</code>
<code>  redirectToLogin()</code>
<code>}</code>

Read it exactly like English: "If the user is logged in, show the dashboard. Otherwise, redirect to login." That\'s it.

Conditions can be combined:
- <code>&&</code> means AND — both things must be true
- <code>||</code> means OR — at least one must be true
- <code>!</code> means NOT — flip true to false, false to true

There\'s also a <strong>loop</strong> — for repeating something for each item in a list:

<code>for (each lesson in modules) {</code>
<code>  displayLesson(lesson)</code>
<code>}</code>

"For each lesson in the modules list, display it." Loops are how code handles lists of things without writing the same instruction dozens of times.

When you see logic in code, ask: what decision is being made here? What are the two possible paths? That question unlocks most code you\'ll encounter.`,
    analogy: 'If/else logic is a flowchart — the kind designers draw all the time. "Does the user have an account? Yes → show login. No → show signup." Code logic is that same flowchart, written in a strict notation. You\'ve been thinking in logic for years; you just haven\'t written it in code before.',
    keyConcept: 'If/else statements make decisions based on conditions. && means AND, || means OR, ! means NOT. Loops repeat instructions for each item in a list. When reading code, identify the condition being checked and the two paths it creates — that\'s usually all you need to understand what a block of logic does.',
    vibeBridge: 'Almost every feature involves logic. Show this button only if the user is an admin. Display a badge only if the lesson is complete. Charge the discount price only if the promo code is valid. When you review code an AI tool wrote, checking the logic conditions tells you whether the feature will behave exactly as you intended.',
  },

  'reading-a-real-file': {
    body: `Here\'s a real piece of code from a simple e-commerce product page. Don\'t try to understand every character — just read it like a document and look for the three building blocks.

<code>const product = {</code>
<code>  name: "Wireless Headphones",</code>
<code>  price: 79,</code>
<code>  inStock: true,</code>
<code>  reviews: ["Great sound", "Fast delivery"]</code>
<code>}</code>

<code>function getDisplayPrice(product) {</code>
<code>  if (product.inStock) {</code>
<code>    return "$" + product.price</code>
<code>  } else {</code>
<code>    return "Out of stock"</code>
<code>  }</code>
<code>}</code>

What can you read here without knowing anything about the language?

<strong>Variables:</strong> <code>product</code> is an object storing the product data — name, price, stock status, and reviews.

<strong>Function:</strong> <code>getDisplayPrice</code> takes a product and returns something to display. Its name tells you exactly what it does.

<strong>Logic:</strong> If the product is in stock, return the price formatted with a dollar sign. Otherwise, return "Out of stock."

You just read real code. You didn\'t need to know the language. You needed to know the three building blocks.`,
    analogy: 'Reading code is like reading a legal contract. You don\'t need to be a lawyer to understand the main clauses. You look for the key terms, the conditions, and the outcomes. The dense legal language fills in the details — but the structure tells the story.',
    keyConcept: 'You can read any code by looking for three things: what variables are storing the data, what functions are doing the work, and what logic is making the decisions. The specific language syntax is secondary — the structure is what tells the story.',
    vibeBridge: 'When an AI tool writes code for your feature, you can review it using this exact approach. Find the variables — is it storing the right data? Find the functions — do the names match what you asked for? Find the logic — are the conditions checking what they should? You don\'t need to understand every line to do a meaningful review.',
  },

  'languages-map': {
    body: `You\'ll encounter four languages most often when building for the web. Here\'s a plain-English map of each.

<strong>HTML</strong> — Structure
HTML defines what\'s on the page. A heading, a paragraph, a button, an image. It\'s the skeleton. It doesn\'t do anything by itself — it just says what exists.
Looks like: <code>&lt;button&gt;Sign up&lt;/button&gt;</code>

<strong>CSS</strong> — Appearance
CSS makes things look right. Colours, fonts, sizes, spacing, layout. It targets HTML elements and styles them.
Looks like: <code>button { background: black; color: white; }</code>

<strong>JavaScript</strong> — Behaviour
JavaScript makes things do things. When you click a button, JavaScript handles what happens next — shows a menu, submits a form, fetches data from a server.
Looks like: <code>button.onClick(() =&gt; { openMenu() })</code>

<strong>Python</strong> — Backend logic
Python is commonly used on the server side — processing data, running scripts, handling AI/ML tasks. You\'ll see it in tools like Replit projects, data scripts, and AI-powered backends.
Looks like: <code>def send_email(user): ...</code>

In a modern web project you\'ll usually see all four. HTML and CSS in every page. JavaScript for interactions. Python (or JavaScript again, via Node.js) on the backend.`,
    analogy: 'Building a web page is like building a shop. HTML is the walls and shelves — the structure. CSS is the paint, lighting, and signage — the appearance. JavaScript is the staff — they make things happen when customers interact. Python is the back-office system — handling orders and inventory behind the scenes.',
    keyConcept: 'HTML = structure (what\'s on the page). CSS = appearance (how it looks). JavaScript = behaviour (what happens when you interact). Python = backend logic (server-side processing). Most web projects use all four. Recognising which language you\'re looking at tells you what layer of the product it affects.',
    vibeBridge: 'When an AI tool writes a new button, it might touch all four layers — HTML to create the element, CSS to style it, JavaScript to handle the click, and Python or Node.js to process the result on the server. Knowing which language does what helps you describe exactly which layer needs changing when something isn\'t right.',
  },

  // ─── MODULE 3 ───────────────────────────────────────────

  'why-version-control': {
    body: `Imagine two people editing the same Google Doc at the same time — without Google\'s version history. One person\'s changes overwrite the other\'s. Nobody knows what changed or who changed it. Rolling back to yesterday\'s version is impossible.

Now imagine that\'s a 50,000-line codebase with ten developers.

<strong>Version control</strong> solves this. It\'s a system that tracks every change to every file, who made it, when, and why. It lets multiple people work on the same project simultaneously without destroying each other\'s work. And it lets you go back to any point in time if something breaks.

<strong>Git</strong> is the version control system almost everyone uses. It\'s not a website — it\'s a tool that runs on your computer and tracks changes locally. <strong>GitHub</strong> is a website where you store your Git history online so it\'s backed up and shareable.

Git tracks your project like a timeline of snapshots. Every time you decide to save a snapshot, that\'s a <strong>commit</strong>. Every commit has a message describing what changed. The full history of commits is your project\'s complete changelog.`,
    analogy: 'Git is like Google Docs version history — but for your entire project, not just one file. Every change is tracked. You can see what changed, who changed it, and when. You can restore any previous version in seconds. And multiple people can edit simultaneously without conflicts.',
    keyConcept: 'Version control tracks every change to a codebase over time. Git is the tool; GitHub is where the history is stored online. The history is made of commits — named snapshots of the project at a point in time. This makes collaboration safe and mistakes recoverable.',
    vibeBridge: 'Every time an AI coding tool makes changes to your project, it\'s working within this version control system. When it says "committed and pushed," it saved a snapshot and sent it to GitHub. When something breaks, you can ask it to "revert to the last commit" — going back to the moment before the problem. That\'s version control working for you.',
  },

  'commits': {
    body: `A <strong>commit</strong> is a saved snapshot of your entire project at a specific moment in time.

When you commit, you\'re saying: "Everything is in a good state right now. Save this version with a label so I can come back to it."

Each commit has three parts:
- A <strong>message</strong> describing what changed: "Added login page" or "Fixed broken button on mobile"
- A <strong>timestamp</strong>: exactly when it was committed
- A <strong>unique ID</strong>: a long string like <code>a3f8c21</code> that identifies this exact snapshot

Commits are intentional checkpoints — not automatic saves. You decide when to commit. Good practice is to commit after each meaningful unit of work: after adding a feature, fixing a bug, or making a change that works correctly on its own.

A commit history looks like a changelog:

<code>a3f8c21 — Add badge animation to lesson complete screen</code>
<code>7d2e904 — Fix login redirect for new users</code>
<code>c91ab33 — Update onboarding quiz copy</code>
<code>f402dd1 — Initial project setup</code>

Reading commit history tells you the story of how a project was built.`,
    analogy: 'A commit is like saving a named version of a Figma file. "Version 3 — After client feedback." "Version 4 — Final approved." You can go back to any version and see exactly what it looked like. Commits are the same thing for code — named, timestamped versions of the entire project.',
    keyConcept: 'A commit is a named, timestamped snapshot of the entire project. Each commit has a message, a timestamp, and a unique ID. Commits are intentional checkpoints you create after meaningful units of work. Reading commit history tells the story of how a project evolved.',
    vibeBridge: 'AI coding tools like Cursor and Claude Code create commits automatically as they work. The commit message tells you what they changed. If a change caused a problem, you can point to the specific commit ID and ask the tool to undo it. Understanding commits means you can navigate your project\'s history instead of starting from scratch when something goes wrong.',
  },

  'branches': {
    body: `A <strong>branch</strong> is a parallel version of your project where you can make changes without affecting the main version.

Every project has a <strong>main branch</strong> — the current, working, live version. When you want to add a new feature or try something risky, you create a new branch. You can make as many changes as you want on that branch, and the main version stays completely untouched.

When the feature is ready and tested, you <strong>merge</strong> the branch back into main. Git combines the changes intelligently — keeping everything from both.

Why this matters:
- A developer can work on a payment feature while another works on a settings page — on separate branches, simultaneously, without conflicts
- If an experiment fails, you just delete the branch. Main is unaffected
- AI tools often create a branch for each new feature, work on it, and merge when done

A typical project\'s branch list might look like:
<code>main</code> — live, stable version
<code>feature/user-profiles</code> — new feature in progress
<code>fix/login-bug</code> — a specific bug being fixed
<code>experiment/new-onboarding</code> — testing a new flow`,
    analogy: 'Branching is like duplicating a Figma page to explore a new design direction. You work on the copy freely — try things, break things, redesign things. If you like what you built, you copy the best elements back to the main file. If not, you delete the copy and the original is untouched. Git branches work exactly the same way.',
    keyConcept: 'A branch is a parallel version of the project for working on a feature or fix without touching main. When the work is ready, it\'s merged back. Main always stays stable. Branches let multiple people work simultaneously without interfering with each other.',
    vibeBridge: 'When you ask an AI tool to "try adding a new onboarding flow," a good workflow is to have it create a branch first — so if the experiment doesn\'t work, main is safe. Many AI tools do this automatically. When they say "created branch feature/new-onboarding," this is exactly what they\'re doing.',
  },

  'github': {
    body: `<strong>GitHub</strong> is a website where you store your Git history online. Think of Git as the version control system running on your computer, and GitHub as the cloud backup and collaboration layer on top of it.

Key things you\'ll see on GitHub:

<strong>The Code tab</strong> — Browse all the files in your project. Click any file to read it. This is your project, readable in any browser, without needing to set anything up locally.

<strong>Commits</strong> — The full history of every change ever made. Click any commit to see exactly what changed — green lines were added, red lines were removed.

<strong>Issues</strong> — A bug tracker and to-do list. Teams log bugs, feature requests, and tasks here. Each issue can be assigned, labelled, and linked to specific commits.

<strong>Pull Requests</strong> — The formal way to merge a branch into main. Before merging, teammates can review the changes, leave comments, and approve or request modifications. This is how professional teams ensure code quality.

<strong>Actions</strong> — Automated workflows that run when you push code. Automatic testing, deployment to Vercel, or notifications to Slack — all triggered by a commit.

You don\'t need to use all of these. But knowing they exist means you can use GitHub as a window into your project\'s health and history.`,
    analogy: 'GitHub is Google Drive for code — but with a built-in review system, bug tracker, and automation platform. You can browse files, see history, manage tasks, and review changes before they go live, all from a browser.',
    keyConcept: 'GitHub stores your Git history online and adds collaboration tools on top: browsable code, commit history, issue tracking, pull request reviews, and automated workflows. You don\'t need to use all of these — but knowing what each one is helps you navigate a real project confidently.',
    vibeBridge: 'When an AI tool pushes code to GitHub, that commit appears instantly in the Commits tab. You can click it and see every line that was added or changed. This is your audit trail. If something broke after a specific push, you can find the exact commit that caused it and either understand what changed or ask the tool to revert it.',
  },

  'ai-tools-and-git': {
    body: `When you use an AI coding tool — Cursor, Claude Code, Windsurf, Replit, or any other — it\'s working within the same Git system described in this module. It\'s not magic. It\'s the same commit, branch, and push cycle that developers have used for years.

Here\'s what\'s happening behind the scenes during a typical AI-assisted coding session:

<strong>You describe a feature</strong> → The tool writes code files and modifies existing ones.

<strong>It commits the changes</strong> → It creates a commit with a message like "Add user profile page." This snapshots the current state.

<strong>It pushes to GitHub</strong> → The commit goes from your computer to GitHub. Now it\'s backed up and Vercel can see it.

<strong>Vercel deploys automatically</strong> → Because Vercel watches your GitHub repo, it sees the new commit and rebuilds your live site. Within a minute or two, your changes are live.

<strong>If something breaks</strong> → You can ask the tool to "revert the last commit" or "go back to how it was before the profile page." It uses Git to undo exactly that snapshot.

This cycle repeats for every feature. Understanding it means you\'re not just watching things happen — you\'re directing a process you understand.`,
    analogy: 'Using an AI coding tool with Git is like having a contractor who photographs each stage of building work. Every time they make progress, they take a photo (commit) and file it in a shared folder (push to GitHub). If something looks wrong in the final result, you can look back through the photos and find exactly which stage the problem appeared.',
    keyConcept: 'AI coding tools operate within the standard Git workflow: write code → commit → push to GitHub → deploy. Understanding this cycle means you can direct the process confidently, audit what was changed, and recover from mistakes by pointing to specific commits.',
    vibeBridge: 'The next time an AI tool says "pushed to GitHub, deploying now" — you know the full picture. It committed a snapshot, sent it to GitHub, and Vercel is rebuilding your site from that snapshot. You can open GitHub right now and see exactly what changed. That\'s not magic — that\'s Git.',
  },

}
```

---

## Step 3 — Create lib/quizContent.ts

Create file `lib/quizContent.ts`:

```typescript
export interface QuizQuestion {
  id: string
  text: string
  options: Array<{ value: string; label: string }>
  correct: string
  hintOnWrong: string
  feedbackOnCorrect: string
}

export const quizContent: Record<string, QuizQuestion[]> = {

  'what-is-code': [
    {
      id: 'q1',
      text: 'Which three things is ALL code built from?',
      options: [
        { value: 'a', label: 'Servers, databases, and browsers' },
        { value: 'b', label: 'Variables, functions, and logic' },
        { value: 'c', label: 'HTML, CSS, and JavaScript' },
        { value: 'd', label: 'Input, output, and storage' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about the three building blocks described in the lesson — the named containers, the reusable instructions, and the decisions.',
      feedbackOnCorrect: 'Variables store values, functions contain reusable instructions, and logic makes decisions. Everything in software is built from combinations of these three.',
    },
    {
      id: 'q2',
      text: 'A product manager can understand what code does by:',
      options: [
        { value: 'a', label: 'Memorising the syntax of each programming language' },
        { value: 'b', label: 'Looking for variables, functions, and logic — not reading every character' },
        { value: 'c', label: 'Only reading code that has been translated into plain English' },
        { value: 'd', label: 'Asking a developer to explain every line' },
      ],
      correct: 'b',
      hintOnWrong: 'The lesson emphasised that the structure tells the story — not the specific syntax.',
      feedbackOnCorrect: 'Exactly. You read code by looking for the three building blocks, not by understanding every character. The structure is what matters.',
    },
  ],

  'variables': [
    {
      id: 'q1',
      text: 'What is a variable?',
      options: [
        { value: 'a', label: 'A type of function that returns different results each time' },
        { value: 'b', label: 'A named container that holds a value' },
        { value: 'c', label: 'A decision point in the code' },
        { value: 'd', label: 'A file that stores configuration settings' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about the warehouse analogy — what was the sticky note on the box?',
      feedbackOnCorrect: 'A variable is a named container. The name stays fixed; the value inside can change. userName = "Priya" — userName is the label, "Priya" is what\'s in the box.',
    },
    {
      id: 'q2',
      text: 'You see this in code: isLoggedIn = true. What type of variable is this?',
      options: [
        { value: 'a', label: 'A string — it holds text' },
        { value: 'b', label: 'A number — it holds a numeric value' },
        { value: 'c', label: 'A boolean — it holds true or false' },
        { value: 'd', label: 'An array — it holds a list' },
      ],
      correct: 'c',
      hintOnWrong: 'The value is "true" — not text, not a number, not a list. Which type holds only true or false?',
      feedbackOnCorrect: 'Booleans hold exactly two possible values: true or false. isLoggedIn is perfect for this — a user either is or isn\'t logged in.',
    },
  ],

  'functions': [
    {
      id: 'q1',
      text: 'Why do developers use functions instead of writing the same instructions multiple times?',
      options: [
        { value: 'a', label: 'Because functions run faster than repeated code' },
        { value: 'b', label: 'For reuse and organisation — write once, call anywhere, and name the intent' },
        { value: 'c', label: 'Because functions are required by all programming languages' },
        { value: 'd', label: 'To hide code from other developers on the team' },
      ],
      correct: 'b',
      hintOnWrong: 'The lesson mentioned two reasons functions exist. Think about what happens when you name a block of instructions.',
      feedbackOnCorrect: 'Reuse means you write the logic once and call it anywhere. Organisation means you give a name to a set of steps — so reading function names tells you the story of the code without reading every line.',
    },
    {
      id: 'q2',
      text: 'You see these function names in a checkout feature: calculateTotal(), applyDiscount(), processPayment(), sendReceipt(). What can you tell about this feature?',
      options: [
        { value: 'a', label: 'Nothing useful — you need to read all the code inside each function' },
        { value: 'b', label: 'The high-level flow: calculate, discount, pay, receipt — in that order' },
        { value: 'c', label: 'That the feature was written in JavaScript' },
        { value: 'd', label: 'That the feature has exactly four steps and no more' },
      ],
      correct: 'b',
      hintOnWrong: 'Function names are signposts. What story do these four names tell you?',
      feedbackOnCorrect: 'Function names are the most readable part of code. calculateTotal → applyDiscount → processPayment → sendReceipt tells you the entire checkout flow at a glance, before reading a single line inside any function.',
    },
  ],

  'logic': [
    {
      id: 'q1',
      text: 'What does this code do? if (cart.items.length > 0) { showCheckoutButton() } else { showEmptyCartMessage() }',
      options: [
        { value: 'a', label: 'Always shows the checkout button' },
        { value: 'b', label: 'Shows the checkout button if the cart has items, otherwise shows an empty cart message' },
        { value: 'c', label: 'Counts how many items are in the cart' },
        { value: 'd', label: 'Removes items from the cart one by one' },
      ],
      correct: 'b',
      hintOnWrong: 'Read it like English. "If the cart items length is more than 0, show checkout. Otherwise, show empty message."',
      feedbackOnCorrect: 'Exactly right. cart.items.length > 0 checks if there\'s at least one item. If yes, show checkout. If not, show the empty message. Logic in code reads very close to plain English once you know the pattern.',
    },
    {
      id: 'q2',
      text: 'In code, what does && mean?',
      options: [
        { value: 'a', label: 'OR — at least one condition must be true' },
        { value: 'b', label: 'NOT — flip true to false' },
        { value: 'c', label: 'AND — both conditions must be true' },
        { value: 'd', label: 'EQUALS — check if two values are the same' },
      ],
      correct: 'c',
      hintOnWrong: 'The lesson covered three logic symbols: && for AND, || for OR, ! for NOT.',
      feedbackOnCorrect: '&& means AND — both sides must be true for the whole condition to be true. user.isLoggedIn && user.hasCompletedOnboarding means both things must be true before showing the dashboard.',
    },
  ],

  'reading-a-real-file': [
    {
      id: 'q1',
      text: 'In the product code example, what does getDisplayPrice() return when inStock is false?',
      options: [
        { value: 'a', label: 'The price with a dollar sign' },
        { value: 'b', label: 'The number 0' },
        { value: 'c', label: '"Out of stock"' },
        { value: 'd', label: 'Nothing — the function stops running' },
      ],
      correct: 'c',
      hintOnWrong: 'Re-read the else branch of the function. What does it return when inStock is not true?',
      feedbackOnCorrect: 'The else branch returns "Out of stock" as a text string. The if/else means: if in stock, show the price; otherwise show the out of stock message.',
    },
    {
      id: 'q2',
      text: 'What is the best strategy for reading an unfamiliar piece of code?',
      options: [
        { value: 'a', label: 'Start at the bottom and work upward' },
        { value: 'b', label: 'Look up every unfamiliar keyword before continuing' },
        { value: 'c', label: 'Look for variable names, function names, and logic conditions — ignore unfamiliar syntax' },
        { value: 'd', label: 'Only read code in languages you already know' },
      ],
      correct: 'c',
      hintOnWrong: 'The lesson showed that you can understand code without knowing the language. What were the three things you looked for?',
      feedbackOnCorrect: 'Variables, functions, and logic are your three entry points into any codebase. Unfamiliar syntax is just noise — the structure is what carries the meaning.',
    },
  ],

  'languages-map': [
    {
      id: 'q1',
      text: 'A button on a page is clickable and opens a dropdown menu. Which language is most likely handling what happens when you click it?',
      options: [
        { value: 'a', label: 'HTML — it defines the button' },
        { value: 'b', label: 'CSS — it styles the button' },
        { value: 'c', label: 'JavaScript — it handles the click behaviour' },
        { value: 'd', label: 'Python — it processes the action on the server' },
      ],
      correct: 'c',
      hintOnWrong: 'Think about the restaurant analogy. HTML is the shelves, CSS is the lighting — which layer handles what happens when a customer interacts?',
      feedbackOnCorrect: 'JavaScript handles behaviour — what happens when users interact with the page. HTML defines the button exists. CSS makes it look right. JavaScript decides what clicking it does.',
    },
    {
      id: 'q2',
      text: 'You\'re looking at code that starts with "def process_order(cart):". Which language is this most likely written in?',
      options: [
        { value: 'a', label: 'HTML' },
        { value: 'b', label: 'CSS' },
        { value: 'c', label: 'JavaScript' },
        { value: 'd', label: 'Python' },
      ],
      correct: 'd',
      hintOnWrong: 'The lesson showed Python code using "def" to define a function. Which language uses "def"?',
      feedbackOnCorrect: 'Python uses "def" to define functions. JavaScript uses "function" or arrow syntax. Recognising these small signals helps you identify which layer of the product you\'re looking at.',
    },
  ],

  'why-version-control': [
    {
      id: 'q1',
      text: 'What problem does version control solve?',
      options: [
        { value: 'a', label: 'It makes code run faster' },
        { value: 'b', label: 'It tracks every change, enables collaboration, and makes mistakes recoverable' },
        { value: 'c', label: 'It automatically fixes bugs in your code' },
        { value: 'd', label: 'It prevents people from making bad changes' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about the two problems described in the lesson — multiple people editing the same file, and needing to go back when something breaks.',
      feedbackOnCorrect: 'Version control tracks changes over time, allows multiple people to work simultaneously without destroying each other\'s work, and lets you restore any previous state. All three together.',
    },
    {
      id: 'q2',
      text: 'What is the difference between Git and GitHub?',
      options: [
        { value: 'a', label: 'They are the same thing — different names for the same product' },
        { value: 'b', label: 'Git is a website, GitHub is a command-line tool' },
        { value: 'c', label: 'Git is the version control tool on your computer, GitHub is the website where history is stored online' },
        { value: 'd', label: 'GitHub is only for large teams, Git works for solo developers' },
      ],
      correct: 'c',
      hintOnWrong: 'The lesson made a clear distinction between the tool and the website. Which one runs locally on your computer?',
      feedbackOnCorrect: 'Git is the tool that tracks changes on your computer. GitHub is the website where that history is stored online for backup, sharing, and collaboration. Git without GitHub works — but your history only lives on your machine.',
    },
  ],

  'commits': [
    {
      id: 'q1',
      text: 'What are the three parts of a commit?',
      options: [
        { value: 'a', label: 'A filename, a line number, and a change' },
        { value: 'b', label: 'A message, a timestamp, and a unique ID' },
        { value: 'c', label: 'A branch name, a developer name, and a description' },
        { value: 'd', label: 'A version number, a release note, and a tag' },
      ],
      correct: 'b',
      hintOnWrong: 'The lesson listed three things every commit contains. Think about what makes each snapshot uniquely identifiable.',
      feedbackOnCorrect: 'Every commit has a message (what changed), a timestamp (when), and a unique ID like a3f8c21 (which specific snapshot this is). Together they let you find and restore any point in the project\'s history.',
    },
    {
      id: 'q2',
      text: 'Reading a commit history that says "Add checkout page → Fix payment bug → Update pricing → Add homepage" tells you:',
      options: [
        { value: 'a', label: 'Nothing useful about the project' },
        { value: 'b', label: 'The story of how the project was built, in reverse chronological order' },
        { value: 'c', label: 'Only what the most recent developer worked on' },
        { value: 'd', label: 'Which files were changed but not why' },
      ],
      correct: 'b',
      hintOnWrong: 'The lesson said commit history tells a story. What story do those four messages tell?',
      feedbackOnCorrect: 'Commit history is a changelog written in the developer\'s own words. Reading it tells you what features were built, what bugs were fixed, and in what order — the complete story of the project\'s development.',
    },
  ],

  'branches': [
    {
      id: 'q1',
      text: 'Why would you create a branch before starting a new feature?',
      options: [
        { value: 'a', label: 'To make the code run faster on that feature' },
        { value: 'b', label: 'To work on the feature without risking the main working version' },
        { value: 'c', label: 'Because Git requires a branch for every file you create' },
        { value: 'd', label: 'To share your work with teammates automatically' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about the Figma page duplication analogy. Why do you duplicate a page before experimenting?',
      feedbackOnCorrect: 'A branch isolates your work. The main branch stays stable and working while you experiment on the feature branch. If the experiment fails, delete the branch — main is untouched.',
    },
    {
      id: 'q2',
      text: 'What does "merging" a branch mean?',
      options: [
        { value: 'a', label: 'Deleting the branch after it\'s no longer needed' },
        { value: 'b', label: 'Combining the changes from the branch back into the main version' },
        { value: 'c', label: 'Creating a copy of the branch for another developer' },
        { value: 'd', label: 'Pushing the branch to GitHub for the first time' },
      ],
      correct: 'b',
      hintOnWrong: 'After working on a feature branch, the goal is to get those changes back into main. What\'s that process called?',
      feedbackOnCorrect: 'Merging brings the changes from a feature branch back into main. Git combines the changes from both — keeping everything from the branch while leaving the rest of main intact.',
    },
  ],

  'github': [
    {
      id: 'q1',
      text: 'What is a Pull Request on GitHub?',
      options: [
        { value: 'a', label: 'A way to download code from GitHub to your computer' },
        { value: 'b', label: 'A request to pull more funding for the project' },
        { value: 'c', label: 'The formal process for merging a branch into main, with a review step' },
        { value: 'd', label: 'An automated test that runs when you push code' },
      ],
      correct: 'c',
      hintOnWrong: 'The lesson described Pull Requests as the professional way to merge branches. What makes it different from a direct merge?',
      feedbackOnCorrect: 'A Pull Request is a merge request with a review layer. Before the branch goes into main, teammates can look at every change, leave comments, and approve or request modifications. It\'s how teams ensure quality before code goes live.',
    },
    {
      id: 'q2',
      text: 'You want to see exactly what changed in a specific update to a project on GitHub. Where do you look?',
      options: [
        { value: 'a', label: 'The Issues tab — it lists all the bugs' },
        { value: 'b', label: 'The Actions tab — it shows automated workflows' },
        { value: 'c', label: 'The Commits tab — click a specific commit to see every line that was added or removed' },
        { value: 'd', label: 'The Code tab — browse the current files' },
      ],
      correct: 'c',
      hintOnWrong: 'The lesson listed what each GitHub tab shows. Which one shows the history of changes over time?',
      feedbackOnCorrect: 'The Commits tab is your audit trail. Click any commit and GitHub shows you exactly what changed — green lines added, red lines removed. This is how you trace when a specific change was made and by whom.',
    },
  ],

  'ai-tools-and-git': [
    {
      id: 'q1',
      text: 'When an AI coding tool says "pushed to GitHub, deploying now" — what just happened in sequence?',
      options: [
        { value: 'a', label: 'The tool saved a file locally and refreshed your browser' },
        { value: 'b', label: 'The tool committed a snapshot, sent it to GitHub, and Vercel is rebuilding the live site from that snapshot' },
        { value: 'c', label: 'The tool uploaded your files directly to the internet' },
        { value: 'd', label: 'The tool created a new branch and sent it to a teammate for review' },
      ],
      correct: 'b',
      hintOnWrong: 'The lesson walked through the full cycle step by step. Commit → push → deploy. What does each step mean?',
      feedbackOnCorrect: 'Commit = snapshot saved. Push = sent to GitHub. Deploy = Vercel sees the new commit and rebuilds the live site. That three-step cycle is the backbone of modern web development — AI tools or not.',
    },
    {
      id: 'q2',
      text: 'Something broke after the AI tool\'s last update. How does knowing Git help you fix it?',
      options: [
        { value: 'a', label: 'It doesn\'t — you\'d have to rebuild the feature from scratch' },
        { value: 'b', label: 'You can ask the tool to revert to the specific commit before the problem was introduced' },
        { value: 'c', label: 'You would need to contact GitHub support to restore the previous version' },
        { value: 'd', label: 'You can only fix it by reading and manually correcting every changed file' },
      ],
      correct: 'b',
      hintOnWrong: 'The lesson mentioned what to do when something breaks. What does Git let you do with any previous snapshot?',
      feedbackOnCorrect: 'Git makes mistakes recoverable. Every commit is a restore point. When something breaks, you can ask the AI tool to "revert to the last working commit" and it uses Git to undo exactly that change — no manual fixing needed.',
    },
  ],

}
```

---

## Step 4 — Update LessonRead.tsx to use the content files

In `components/lesson/LessonRead.tsx`:

Replace the inline `lessonContent` object and `fallbackContent` with imports:

```typescript
import { lessonContent, fallbackContent } from '@/lib/lessonContent'
```

Remove the hardcoded content object at the top of the file. The rest of the component stays identical — it already uses `content.body`, `content.analogy`, `content.keyConcept`, `content.vibeBridge`.

---

## Step 5 — Update LessonQuiz.tsx to use the content files

In `components/lesson/LessonQuiz.tsx`:

Replace the inline `lessonQuizzes` object with an import:

```typescript
import { quizContent } from '@/lib/quizContent'
```

Replace `lessonQuizzes[lesson.slug]` with `quizContent[lesson.slug]`.
Replace `fallbackQuiz` with `quizContent['fallback']` — add a fallback entry to quizContent.ts:

```typescript
'fallback': [
  {
    id: 'q1',
    text: 'What is the main benefit of understanding code even without writing it?',
    options: [
      { value: 'a', label: 'You can fix bugs yourself without help' },
      { value: 'b', label: 'You can communicate better with developers and AI tools' },
      { value: 'c', label: 'You can build apps without any tools' },
      { value: 'd', label: 'You learn faster by reading than by doing' },
    ],
    correct: 'b',
    hintOnWrong: 'Think about the goal of this course — it\'s not about writing code.',
    feedbackOnCorrect: 'Code literacy makes you a much better collaborator — with human developers and AI tools alike. You know what to ask for, how to review what was built, and how to spot when something is missing.',
  },
],
```

---

## Step 6 — Update LessonTryIt.tsx for Module 2 lessons

Module 2 lessons use a different interactive format — not a terminal sandbox, but a value-editing demo. Update `components/lesson/LessonTryIt.tsx` to handle this.

Add a `tryItContent` export to `lib/lessonContent.ts`:

```typescript
export interface TryItContent {
  type: 'terminal' | 'variable_editor' | 'logic_flow' | 'commit_timeline' | 'branch_visual'
  description: string
  // terminal type
  commands?: Array<{ cmd: string; label: string; output: string; explain: string }>
  // variable_editor type
  variables?: Array<{ name: string; value: string; type: string; description: string }>
  // logic_flow type
  scenario?: string
  condition?: string
  trueResult?: string
  falseResult?: string
  // commit_timeline type
  commits?: Array<{ id: string; message: string; time: string }>
  // branch_visual type
  branches?: Array<{ name: string; commits: string[]; isCurrent: boolean }>
}

export const tryItContent: Record<string, TryItContent> = {
  'the-terminal': {
    type: 'terminal',
    description: 'Click any command to run it in the sandbox. Nothing can break — this is a safe simulation.',
    commands: [
      { cmd: 'ls', label: 'list files', output: 'Desktop   Documents   Downloads   Projects   notes.txt', explain: '<strong>ls</strong> = "list". Shows every file and folder in your current location. Same as opening Finder and looking at what\'s there — just text form.' },
      { cmd: 'pwd', label: 'where am I?', output: '/Users/you', explain: '<strong>pwd</strong> = "print working directory". Tells you which folder you\'re currently inside. Think of it as asking the terminal "where am I right now?"' },
      { cmd: 'cd Documents', label: 'move into a folder', output: '', explain: '<strong>cd</strong> = "change directory". Moves you into the Documents folder. No output means it worked silently — that\'s normal and expected.' },
      { cmd: 'mkdir my-project', label: 'create a folder', output: '', explain: '<strong>mkdir</strong> = "make directory". Creates a new empty folder. No output = success. Run ls now and you\'ll see it appear.' },
    ],
  },
  'variables': {
    type: 'variable_editor',
    description: 'Edit the value of each variable and see how it would appear in the app. This is exactly how variables work in real code.',
    variables: [
      { name: 'userName', value: 'Priya', type: 'string', description: 'The logged-in user\'s name, shown in the greeting' },
      { name: 'lessonCount', value: '4', type: 'number', description: 'How many lessons the user has completed' },
      { name: 'isLoggedIn', value: 'true', type: 'boolean', description: 'Whether the user is currently authenticated' },
      { name: 'currentModule', value: 'Reading code', type: 'string', description: 'The module the user is currently in' },
    ],
  },
  'functions': {
    type: 'terminal',
    description: 'Read each function name and predict what it does before revealing the answer.',
    commands: [
      { cmd: 'sendWelcomeEmail(user)', label: 'what does this do?', output: 'Sends an email to the user welcoming them to the platform', explain: '<strong>sendWelcomeEmail</strong> — the name tells you everything. It sends a welcome email. The input is a user object. This is why function names matter so much.' },
      { cmd: 'calculateTotal(items)', label: 'what does this do?', output: 'Adds up the prices of all items and returns the total', explain: '<strong>calculateTotal</strong> — takes a list of items, adds up their prices, returns the sum. You knew that from the name alone.' },
      { cmd: 'isValidEmail(email)', label: 'what does this do?', output: 'Returns true if the email format is valid, false if not', explain: '<strong>isValidEmail</strong> — checks if an email address is formatted correctly. The "is" prefix is a convention for functions that return true or false.' },
      { cmd: 'getUserById(id)', label: 'what does this do?', output: 'Looks up and returns the user with that specific ID from the database', explain: '<strong>getUserById</strong> — fetches a specific user from the database using their ID. Get + what you\'re getting + how you\'re getting it. A very common naming pattern.' },
    ],
  },
  'logic': {
    type: 'logic_flow',
    description: 'Change the condition and see which path the code takes. This is exactly how if/else works.',
    scenario: 'A shopping cart page deciding what to show',
    condition: 'cart.items.length > 0',
    trueResult: 'Show the checkout button and order summary',
    falseResult: 'Show "Your cart is empty" and a Continue Shopping link',
  },
  'commits': {
    type: 'commit_timeline',
    description: 'This is a real commit history from a small project. Read the messages — they tell the story of how it was built.',
    commits: [
      { id: 'f8a2c91', message: 'Add email notifications for order status', time: '2 hours ago' },
      { id: 'c74e302', message: 'Fix checkout button not showing on mobile', time: '1 day ago' },
      { id: 'a19d553', message: 'Add discount code field to cart', time: '3 days ago' },
      { id: '77bc140', message: 'Build shopping cart page', time: '5 days ago' },
      { id: '3e8f012', message: 'Initial project setup', time: '1 week ago' },
    ],
  },
  'branches': {
    type: 'branch_visual',
    description: 'This shows a real project\'s branches. Main is the stable version. Each other branch is work in progress.',
    branches: [
      { name: 'main', commits: ['Initial setup', 'Add homepage', 'Launch v1'], isCurrent: false },
      { name: 'feature/user-profiles', commits: ['Add profile page', 'Upload avatar'], isCurrent: true },
      { name: 'fix/checkout-bug', commits: ['Debug payment flow'], isCurrent: false },
    ],
  },
}
```

In `LessonTryIt.tsx`, add rendering for the `variable_editor` type:

```typescript
if (demo.type === 'variable_editor') {
  // Render editable variable cards
  // Each card shows: variable name, current value (editable input), type badge, description
  // Below the cards: a "preview" showing how the values appear in the app UI
  // e.g. "Good morning, [userName]! You've completed [lessonCount] lessons."
}

if (demo.type === 'logic_flow') {
  // Show the scenario, the condition, and two result cards (true path, false path)
  // Add a toggle: "The condition is TRUE / FALSE" — clicking it highlights the active path
}

if (demo.type === 'commit_timeline') {
  // Render a vertical timeline of commits
  // Each commit shows: short ID, message, time ago
  // Click a commit to "inspect" it — show a note explaining what this type of commit means
}

if (demo.type === 'branch_visual') {
  // Show a simple visual: main branch as a horizontal line
  // Feature and fix branches as lines branching off
  // Each branch labeled with its name and commits
  // Current branch highlighted
}
```

---

## Step 7 — Run and push

```bash
npx supabase db push
git add .
git commit -m "feat: Module 2 and Module 3 full lesson content + interactive demos"
git push
```

## Done when
- Modules 2 and 3 appear on the dashboard as unlocked
- All 11 lessons open with correct read content, analogy card, key concept, and vibe bridge
- All 11 lessons have correct quiz questions
- Interactive demos render correctly for each lesson type
- No npm run dev — verify on Vercel
```
