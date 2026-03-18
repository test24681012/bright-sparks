import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImprovePromptStepProps {
  onContinue: () => void;
}

function scorePrompt(text: string): number {
  let score = 0;
  const words = text.trim().split(/\s+/);
  if (words.length >= 8) score += 30;
  if (text.toLowerCase().includes('for')) score += 20;
  if (text.toLowerCase().includes('bullet') || text.toLowerCase().includes('points')) score += 20;
  if (/\d+/.test(text)) score += 20;
  if (words.length >= 12) score += 10;
  return Math.min(score, 100);
}

function getMessage(score: number): { text: string; emoji: string } {
  if (score >= 70) return { text: 'Great prompt! Clear, specific, and structured.', emoji: '🎯' };
  if (score >= 50) return { text: 'Decent — try adding audience or format details.', emoji: '👍' };
  return { text: 'Too vague — add more context, audience, and format.', emoji: '🤔' };
}

const ImprovePromptStep = ({ onContinue }: ImprovePromptStepProps) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ score: number; message: string; emoji: string } | null>(null);

  const handleSubmit = () => {
    if (input.trim().length < 3) return;
    const score = scorePrompt(input);
    const msg = getMessage(score);
    setResult({ score, message: msg.text, emoji: msg.emoji });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex-1 flex flex-col justify-center px-6 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Improve This Prompt</h2>
        <div className="bg-card shadow-card rounded-lg p-4">
          <p className="font-mono text-sm text-muted-foreground">"Summarize this report"</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Rewrite it with task, context, and format. Try including audience, bullet points, or numbers.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setResult(null); }}
        placeholder="Write your improved prompt here..."
        rows={4}
        className="w-full bg-card border border-input rounded-lg p-4 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
      />

      {result ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card shadow-card rounded-lg p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">{result.emoji}</span>
            <div className="text-right">
              <span className="text-3xl font-black text-foreground">{result.score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>

          {/* Score bar */}
          <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className={`h-full rounded-full ${
                result.score >= 70 ? 'bg-success' : result.score >= 50 ? 'bg-accent' : 'bg-error'
              }`}
            />
          </div>

          <p className="text-sm text-muted-foreground">{result.message}</p>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
          >
            Continue
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          disabled={input.trim().length < 3}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base disabled:opacity-40"
        >
          Check Answer
        </motion.button>
      )}
    </motion.div>
  );
};

export default ImprovePromptStep;
