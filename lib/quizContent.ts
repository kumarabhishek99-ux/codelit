export interface QuizQuestion {
  id: string
  text: string
  options: Array<{ value: string; label: string }>
  correct: string
  hintOnWrong: string
  feedbackOnCorrect: string
}

export const quizContent: Record<string, QuizQuestion[]> = {

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

  'the-terminal': [
    {
      id: 'q1',
      text: 'You open the terminal and see a $ symbol. What does it mean?',
      options: [
        { value: 'a', label: 'The terminal has an error' },
        { value: 'b', label: 'The terminal is ready for you to type a command' },
        { value: 'c', label: 'You need to install something first' },
        { value: 'd', label: 'You are logged in as an administrator' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about what you do right after you open the terminal.',
      feedbackOnCorrect: 'The $ is the prompt — it means the terminal is waiting for your input.',
    },
    {
      id: 'q2',
      text: 'What does the command ls do?',
      options: [
        { value: 'a', label: 'Logs you out of the terminal' },
        { value: 'b', label: 'Creates a new folder' },
        { value: 'c', label: 'Lists the files and folders in the current directory' },
        { value: 'd', label: 'Opens a file in a text editor' },
      ],
      correct: 'c',
      hintOnWrong: 'Think about what you\'d want to do first when landing in a new folder.',
      feedbackOnCorrect: 'ls = "list". It shows you what\'s in your current folder, like opening Finder.',
    },
  ],

  'big-picture': [
    {
      id: 'q1',
      text: 'What is the "frontend" of a web application?',
      options: [
        { value: 'a', label: 'The server that stores all the data' },
        { value: 'b', label: 'The part users see and interact with in their browser' },
        { value: 'c', label: 'The code that handles business logic' },
        { value: 'd', label: 'The database where information is saved' },
      ],
      correct: 'b',
      hintOnWrong: 'Think about the restaurant analogy — what does the customer see?',
      feedbackOnCorrect: 'The frontend is the dining room — what users see and interact with directly.',
    },
    {
      id: 'q2',
      text: 'When you open an app and your data appears, what happened?',
      options: [
        { value: 'a', label: 'Your phone generated the data from scratch' },
        { value: 'b', label: 'The data was hardcoded into the app' },
        { value: 'c', label: 'Your device sent a request to a server which fetched data from a database' },
        { value: 'd', label: 'Another user shared the data with you in real time' },
      ],
      correct: 'c',
      hintOnWrong: 'Think about the chain of events we described — device → server → database → back.',
      feedbackOnCorrect: 'Exactly. Your device asks, the server processes, the database responds, and your screen shows the result.',
    },
  ],

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
