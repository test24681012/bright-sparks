export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonStep {
  type: 'text' | 'image' | 'code' | 'quiz';
  title?: string;
  content?: string;
  codeBlock?: string;
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
            content: 'From your email spam filter to voice assistants, AI is already part of your daily workflow. Let\'s understand what it actually is.',
          },
          {
            type: 'text',
            title: 'Think of AI as a Smart Assistant',
            content: 'AI processes patterns in data to make predictions or generate content. It doesn\'t "think" — it calculates probabilities at incredible speed.',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'What does AI primarily do with data?',
              options: [
                'Stores it permanently',
                'Processes patterns to make predictions',
                'Deletes unnecessary files',
                'Converts it to images',
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
            content: 'The average office worker spends 28% of their day on email. AI can cut that in half by drafting, summarizing, and prioritizing.',
          },
          {
            type: 'text',
            title: 'Three AI Email Superpowers',
            content: '1. Draft replies in seconds\n2. Summarize long threads\n3. Prioritize what needs your attention first',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'How much time does the average worker spend on email?',
              options: [
                '10% of their day',
                '28% of their day',
                '50% of their day',
                '5% of their day',
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
            title: 'Meetings Don\'t Have to Be Painful',
            content: 'AI can transcribe, summarize, and extract action items from your meetings automatically. Focus on the conversation, not the notes.',
          },
          {
            type: 'code',
            title: 'Sample AI Meeting Summary',
            codeBlock: '📋 Meeting: Q3 Planning\n⏱ Duration: 45 min\n\n🎯 Key Decisions:\n- Launch date moved to Oct 15\n- Budget approved: $50k\n\n✅ Action Items:\n- @Sarah: Finalize designs by Friday\n- @Mike: Set up vendor calls',
          },
          {
            type: 'quiz',
            quiz: {
              question: 'What can AI NOT do in meetings (yet)?',
              options: [
                'Transcribe conversations',
                'Make decisions for you',
                'Summarize key points',
                'Extract action items',
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
];
