export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface SwipePrompt {
  text: string;
  isGood: boolean;
  explanation: string;
}

export interface PracticePromptConfig {
  prompt: string;
  instructions: string;
  placeholder?: string;
}

export interface LessonStep {
  type: 'text' | 'image' | 'code' | 'quiz' | 'video' | 'swipe' | 'practice';
  title?: string;
  content?: string;
  codeBlock?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoSource?: string;
  swipePrompts?: SwipePrompt[];
  practicePrompt?: PracticePromptConfig;
  quiz?: QuizQuestion;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  xpReward: number;
  steps: LessonStep[];
  interactive?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessonsCount: number;
  totalXp: number;
  color: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: 'ai-office',
    title: 'AI for Office Workers',
    description: 'Master AI tools to supercharge your daily workflow',
    icon: '🤖',
    lessonsCount: 4,
    totalXp: 250,
    color: '#000',
    lessons: [
      {
        id: 'intro-ai',
        title: 'What is AI?',
        subtitle: 'The basics in 2 minutes',
        xpReward: 50,
        steps: [
          {
            type: 'text',
            title: 'AI is Everywhere',
            content:
              'AI can feel like something huge and mysterious, but for this lesson keep one simple idea in mind: language AI is mainly predicting what word should come next.',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'Fill in the blank: "Please send me the meeting ____."',
              options: ['banana', 'notes', 'window', 'cloud'],
              correctIndex: 1,
              explanation:
                'Why "notes"? Because after the words "Please send me the meeting", the word "notes" is much more likely than "banana", "window", or "cloud".\n\nThat is the core idea: in a chat, AI looks at the words that came before and predicts the next word with the highest probability.',
            },
          },
          {
            type: 'text',
            title: 'What LLM AI Actually Does',
            content:
              'An LLM is trained on a huge amount of text. It does not think like a person. It looks at the words already written and predicts the next likely word, then the next one, and keeps going very quickly.',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'Which input gives AI better information?',
              options: [
                'summry sale q2 boss',
                'Summarize our Q2 sales update for my manager in 3 bullet points.',
                'sales maybe later',
                'thing about report',
              ],
              correctIndex: 1,
              explanation:
                'Most people notice the first option looks wrong or unclear, and that is exactly the point. If the input is messy, missing context, or too vague, AI has less to work with.\n\nBetter input gives better output. The initial prompt matters because AI can only predict from the information you provide.',
            },
          },
          {
            type: 'code',
            title: 'Simple Mental Model',
            content: 'A practical way to explain LLM AI at work:',
            codeBlock:
              'Data in -> pattern matching -> probable next words -> useful output\n\nYour prompt shapes the task.\nYour context shapes the quality.\nYour review keeps it safe and accurate.',
          },
          {
            type: 'video',
            title: 'Watch: Generative AI Basics',
            content:
              'A short official explainer that introduces generative AI before you move deeper into prompting.',
            videoTitle: 'Introduction to Generative AI',
            videoSource: 'Google Cloud Tech',
            videoUrl: 'https://www.youtube.com/embed/G2fqAlgmoPo',
          },
          {
            type: 'video',
            title: 'Watch: LLM Basics',
            content:
              'A second short explainer focused more directly on large language models.',
            videoTitle: 'Introduction to Large Language Models',
            videoSource: 'Google Cloud Tech',
            videoUrl: 'https://www.youtube.com/embed/zizonToFXDs',
          },
          {
            type: 'text',
            title: 'How This Shows Up At Work',
            content:
              'If you paste rough meeting notes into an LLM and ask for a summary with action items, the model is not thinking through the meeting. It is recognizing patterns from similar examples and generating a useful structured response.',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'What is the best way to think about LLM AI at work?',
              options: [
                'A fully reliable replacement for human judgment',
                'A fast language assistant that predicts useful text from patterns',
                'A tool that only works for coding teams',
                'A database that stores every company fact automatically',
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: 'prompt-basics-interactive',
        title: 'Prompt Engineering 101',
        subtitle: 'Interactive: write prompts that work',
        xpReward: 100,
        interactive: true,
        steps: [
          {
            type: 'text',
            title: 'The Art of Asking',
            content: 'A prompt is your instruction to an AI. The better your prompt, the better the output. Think of it as briefing a new colleague.',
          },
          {
            type: 'code',
            title: 'Good vs Bad Prompts',
            content: 'Compare these two approaches:',
            codeBlock: '❌ "Write me an email"\n\n✅ "Write a professional follow-up email to a client named Sarah about the Q3 report. Keep it under 100 words. Tone: friendly but professional."',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'Which makes a prompt more effective?',
              options: [
                'Keeping it as short as possible',
                'Using all caps for emphasis',
                'Adding specific context and constraints',
                'Asking multiple questions at once',
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: 'ai-email',
        title: 'AI for Email',
        subtitle: 'Tame your inbox',
        xpReward: 50,
        steps: [
          {
            type: 'text',
            title: 'Email Overload is Real',
            content:
              'Email takes a large part of the workday because every message needs reading, sorting, and a response. AI helps most when the job is language-heavy and repetitive.',
          },
          {
            type: 'text',
            title: 'Where AI Helps Most',
            content:
              'For email, AI is useful in three high-value moments:\n- drafting a first reply\n- summarizing a long thread\n- rewriting for tone, clarity, or brevity',
          },
          {
            type: 'text',
            title: 'Think Draft First, Send Later',
            content:
              'The safest way to use AI for email is to let it create a first draft. You still review the facts, adjust the tone, and make sure the message matches the context.',
          },
          {
            type: 'code',
            title: 'Weak Prompt vs Better Prompt',
            content: 'The quality of the email depends on the prompt you give.',
            codeBlock:
              'Weak:\n"Reply to this email"\n\nBetter:\n"Write a concise reply to a client asking for a one-week extension on the Q3 report. Keep the tone professional, positive, and under 120 words. Mention that we will send the updated version by Friday."',
          },
          {
            type: 'practice',
            practicePrompt: {
              prompt: 'Reply to this email',
              instructions:
                'Rewrite this into a stronger AI prompt. Add the audience, goal, tone, and a clear output constraint.',
              placeholder:
                'Example: Draft a reply to a client asking for...',
            },
          },
          {
            type: 'text',
            title: 'Use AI for Thread Summaries',
            content:
              'When a thread becomes too long, ask AI to summarize key decisions, unresolved questions, deadlines, and owners. This turns messy email chains into something you can act on quickly.',
          },
          {
            type: 'code',
            title: 'Useful Email Prompt Template',
            content: 'A simple format that works well for workplace email tasks:',
            codeBlock:
              'Task: Draft a reply\nAudience: Client\nTone: Professional and friendly\nGoal: Confirm next steps\nConstraints: Under 100 words\nContext: They asked for a delivery update and want a revised date',
          },
          {
            type: 'text',
            title: 'What To Check Before Sending',
            content:
              'Always verify names, dates, pricing, commitments, and policy details. AI can produce polished wording, but polished wording is not the same as accurate wording.',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'What is the smartest way to use AI for email?',
              options: [
                'Let it send important emails without review',
                'Use it to create and refine drafts, then review before sending',
                'Only use it for internal jokes and casual chat',
                'Avoid giving it any context so it stays neutral',
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: 'ai-meetings',
        title: 'AI for Meetings',
        subtitle: 'Never miss an action item',
        xpReward: 50,
        steps: [
          {
            type: 'text',
            title: "Meetings Don't Have to Be Painful",
            content:
              'Meetings create a lot of useful information, but the value is often lost in messy notes and forgotten follow-ups. AI helps turn conversation into something structured and actionable.',
          },
          {
            type: 'text',
            title: 'Where AI Helps In Meetings',
            content:
              'AI is useful before, during, and after a meeting:\n- before: prepare agendas and questions\n- during: capture notes or transcript highlights\n- after: summarize decisions, actions, and owners',
          },
          {
            type: 'text',
            title: 'The Real Goal',
            content:
              'The goal is not just a summary. The goal is a clear record of what was decided, what still needs discussion, who owns each action, and what happens next.',
          },
          {
            type: 'code',
            title: 'Weak Prompt vs Better Prompt',
            content: 'Prompt quality matters here too.',
            codeBlock:
              'Weak:\n"Summarize this meeting"\n\nBetter:\n"Summarize this meeting in 5 bullet points. Separate decisions, risks, and action items. For each action item, include owner and due date if mentioned."',
          },
          {
            type: 'swipe',
            title: 'Meeting AI Check',
            swipePrompts: [
              {
                text: 'Turn these meeting notes into decisions, risks, and action items.',
                isGood: true,
                explanation: 'Good use. This is a structured summarization task.',
              },
              {
                text: 'Decide which budget option the team should approve.',
                isGood: false,
                explanation: 'Bad use. AI can compare options, but the approval decision is still human.',
              },
              {
                text: 'Create a recap email for attendees and non-attendees using these notes.',
                isGood: true,
                explanation: 'Good use. AI is strong at converting notes into clear communication.',
              },
              {
                text: 'Assign owners even if no names were mentioned in the meeting.',
                isGood: false,
                explanation: 'Bad use. AI should not invent owners or commitments that were never agreed.',
              },
            ],
          },
          {
            type: 'code',
            title: 'Sample AI Meeting Summary',
            codeBlock:
              'Meeting: Q3 Planning\nDuration: 45 min\n\nKey Decisions:\n- Launch date moved to Oct 15\n- Budget approved: $50k\n\nRisks:\n- Design sign-off may slip by two days\n\nAction Items:\n- Sarah: Finalize designs by Friday\n- Mike: Set up vendor calls',
          },
          {
            type: 'text',
            title: 'What To Check After The Summary',
            content:
              'Always confirm that decisions are real, owners are correct, and dates were actually mentioned. AI can structure notes well, but it can also infer details that were never explicitly agreed.',
          },
          {
            type: 'code',
            title: 'Useful Meeting Prompt Template',
            content: 'A practical structure for meeting recaps:',
            codeBlock:
              'Task: Summarize the meeting\nOutput format: Decisions, open questions, action items\nAudience: Team members who missed the call\nConstraints: Keep it concise and specific\nContext: Include owners and deadlines only if clearly stated in the notes',
          },
          {
            type: 'text',
            title: 'Best Use At Work',
            content:
              'AI is strongest when it helps you move from raw notes to a clean recap quickly. It should reduce admin work, not replace judgment about what the team actually agreed to.',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'What is the best use of AI after a meeting?',
              options: [
                'Make final business decisions on behalf of the team',
                'Turn rough notes into structured summaries with actions and owners',
                'Automatically approve all deadlines mentioned in discussion',
                'Replace attendance for all future meetings',
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
];
