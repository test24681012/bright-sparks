import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { PracticePromptConfig } from '@/data/courses';

interface PromptPracticeCardProps {
  config: PracticePromptConfig;
  onComplete: () => void;
}

function scorePrompt(text: string): number {
  let score = 0;
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 8) score += 25;
  if (words.length >= 14) score += 15;
  if (/\d+/.test(text)) score += 15;
  if (/for|to/i.test(text)) score += 15;
  if (/bullet|points|table|summary|under|tone|subject/i.test(text)) score += 15;
  if (/context|client|manager|team|meeting|email|deadline|follow-up/i.test(text)) score += 15;

  return Math.min(score, 100);
}

function getMessage(score: number): string {
  if (score >= 70) return 'Strong prompt. It gives the model a clear task, context, and output shape.';
  if (score >= 50) return 'Decent start. Add more context, audience, or output constraints.';
  return 'Too vague. Add the task, who it is for, and the format you want back.';
}

const PromptPracticeCard = ({ config, onComplete }: PromptPracticeCardProps) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => scorePrompt(input), [input]);
  const message = useMemo(() => getMessage(score), [score]);

  const handleSubmit = () => {
    if (input.trim().length < 3) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex-1 flex flex-col justify-center gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Try It Yourself</h2>
        <div className="bg-card shadow-card rounded-lg p-4">
          <p className="font-mono text-sm text-muted-foreground">"{config.prompt}"</p>
        </div>
        <p className="text-xs text-muted-foreground">{config.instructions}</p>
      </div>

      <textarea
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setSubmitted(false);
        }}
        placeholder={config.placeholder || 'Write your improved version here...'}
        rows={5}
        className="w-full bg-card border border-input rounded-lg p-4 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
      />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card shadow-card rounded-lg p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Prompt score</span>
            <div className="text-right">
              <span className="text-3xl font-black text-foreground">{score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>

          <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className={`h-full rounded-full ${
                score >= 70 ? 'bg-success' : score >= 50 ? 'bg-accent' : 'bg-error'
              }`}
            />
          </div>

          <p className="text-sm text-muted-foreground">{message}</p>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onComplete}
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

export default PromptPracticeCard;
