import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { SwipeAnswer } from './SwipeStep';

interface ReviewStepProps {
  answers: SwipeAnswer[];
  score: number;
  total: number;
  onRetry: () => void;
  onContinue: () => void;
}

const ReviewStep = ({ answers, score, total, onRetry, onContinue }: ReviewStepProps) => {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 75 ? '🎉' : pct >= 50 ? '👍' : '💪';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex-1 flex flex-col px-6 py-6 gap-5 overflow-y-auto"
    >
      {/* Score header */}
      <div className="text-center space-y-2">
        <span className="text-4xl">{emoji}</span>
        <h2 className="text-2xl font-bold text-foreground">
          {score}/{total} Correct
        </h2>
        <p className="text-sm text-muted-foreground">
          {pct >= 75 ? 'Great job!' : pct >= 50 ? 'Not bad, keep practicing!' : 'Let\'s try again!'}
        </p>
      </div>

      {/* Answer list */}
      <div className="space-y-3">
        {answers.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-lg p-4 border-l-4 ${
              a.isCorrect ? 'border-success bg-success/5' : 'border-error bg-error/5'
            }`}
          >
            <p className="font-mono text-sm text-foreground mb-2">"{a.prompt.text}"</p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                You: {a.userSaidGood ? (
                  <span className="text-success font-bold">Good</span>
                ) : (
                  <span className="text-error font-bold">Bad</span>
                )}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1">
                Answer: {a.prompt.isGood ? (
                  <span className="text-success font-bold">Good</span>
                ) : (
                  <span className="text-error font-bold">Bad</span>
                )}
              </span>
              {a.isCorrect ? (
                <Check className="w-4 h-4 text-success ml-auto" />
              ) : (
                <X className="w-4 h-4 text-error ml-auto" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{a.prompt.explanation}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onRetry}
          className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-lg font-bold text-base"
        >
          Retry
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          className="flex-1 bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
