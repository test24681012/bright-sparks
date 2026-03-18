import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface FinalGameStepProps {
  onRetry: () => void;
  onFinish: () => void;
}

function calculateStrength(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words < 5) return 20;
  if (words < 10) return 40;
  if (words < 15) return 60;
  if (words < 20) return 80;
  return 100;
}

function getHint(strength: number): string {
  if (strength <= 20) return 'Start typing — add the core task';
  if (strength <= 40) return 'Add more detail — who is this for?';
  if (strength <= 60) return 'Include context — what\'s the situation?';
  if (strength <= 80) return 'Specify format — bullet points? length?';
  return 'Excellent — that\'s a strong prompt!';
}

function getBarColor(strength: number): string {
  if (strength <= 20) return 'bg-error';
  if (strength <= 40) return 'bg-error/70';
  if (strength <= 60) return 'bg-accent';
  if (strength <= 80) return 'bg-success/70';
  return 'bg-success';
}

const FinalGameStep = ({ onRetry, onFinish }: FinalGameStepProps) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const strength = useMemo(() => calculateStrength(input), [input]);
  const hint = useMemo(() => getHint(strength), [strength]);
  const barColor = useMemo(() => getBarColor(strength), [strength]);
  const isWin = strength >= 70;

  const handleSubmit = () => {
    if (input.trim().length < 3) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex-1 flex flex-col justify-center px-6 gap-5"
    >
      {!submitted ? (
        <>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">High Striker</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Write a prompt to generate a professional follow-up email after a meeting.
              Make it as detailed as possible!
            </p>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your best prompt..."
            rows={5}
            className="w-full bg-card border border-input rounded-lg p-4 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />

          {/* Strength Meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Strength</span>
              <span className="text-sm font-bold text-foreground">{strength}%</span>
            </div>
            <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${strength}%` }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className={`h-full rounded-full ${barColor}`}
              />
            </div>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSubmit}
            disabled={input.trim().length < 3}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base disabled:opacity-40"
          >
            Submit
          </motion.button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-6xl"
          >
            {isWin ? '🏆' : '💪'}
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {isWin ? 'You nailed it!' : 'Almost there!'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isWin
                ? 'Nice! This is a strong, well-structured prompt.'
                : 'Try adding more specifics — audience, format, and context.'}
            </p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Final Score</span>
              <span className="font-bold text-foreground">{strength}%</span>
            </div>
            <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strength}%` }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className={`h-full rounded-full ${barColor}`}
              />
            </div>
          </div>

          <div className="bg-card shadow-card rounded-lg p-4 w-full">
            <p className="text-xs text-muted-foreground mb-1">Your prompt:</p>
            <p className="font-mono text-sm text-foreground">"{input}"</p>
          </div>

          <div className="flex gap-3 w-full">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onRetry}
              className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-lg font-bold text-base"
            >
              Retry
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onFinish}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
            >
              Finish
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FinalGameStep;
