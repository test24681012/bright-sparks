import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export interface SwipePrompt {
  text: string;
  isGood: boolean;
  explanation: string;
}

export interface SwipeAnswer {
  prompt: SwipePrompt;
  userSaidGood: boolean;
  isCorrect: boolean;
}

interface SwipeStepProps {
  prompts: SwipePrompt[];
  onComplete: (answers: SwipeAnswer[], score: number) => void;
}

const SwipeStep = ({ prompts, onComplete }: SwipeStepProps) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<SwipeAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [direction, setDirection] = useState(0);

  const prompt = prompts[current];

  const handleAnswer = useCallback((userSaidGood: boolean) => {
    if (feedback) return;
    const isCorrect = userSaidGood === prompt.isGood;
    const answer: SwipeAnswer = { prompt, userSaidGood, isCorrect };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setFeedback({ correct: isCorrect, explanation: prompt.explanation });
    setDirection(userSaidGood ? 1 : -1);
  }, [feedback, prompt, answers]);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => {
      if (current < prompts.length - 1) {
        setCurrent(prev => prev + 1);
        setFeedback(null);
      } else {
        const score = answers.filter(a => a.isCorrect).length;
        onComplete(answers, score);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [feedback, current, prompts.length, answers, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col justify-center px-6 gap-6"
    >
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {prompts.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i < current ? 'bg-primary' :
              i === current ? 'bg-primary scale-125' : 'bg-secondary'
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center font-medium">
        Is this a good prompt?
      </p>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: direction * 80 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className={`bg-card shadow-card rounded-lg p-6 min-h-[160px] flex flex-col justify-center transition-colors ${
            feedback
              ? feedback.correct
                ? 'ring-2 ring-success'
                : 'ring-2 ring-error'
              : ''
          }`}
        >
          <p className="font-mono text-base text-card-foreground leading-relaxed text-center">
            "{prompt.text}"
          </p>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <p className={`text-sm font-bold ${feedback.correct ? 'text-success' : 'text-error'}`}>
                {feedback.correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{feedback.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileTap={!feedback ? { scale: 0.93 } : {}}
          onClick={() => handleAnswer(false)}
          disabled={!!feedback}
          className="flex-1 flex items-center justify-center gap-2 bg-error/10 text-error py-4 rounded-lg font-bold text-base border-b-4 border-error/20 disabled:opacity-50"
        >
          <ThumbsDown className="w-5 h-5" /> Bad
        </motion.button>
        <motion.button
          whileTap={!feedback ? { scale: 0.93 } : {}}
          onClick={() => handleAnswer(true)}
          disabled={!!feedback}
          className="flex-1 flex items-center justify-center gap-2 bg-success/10 text-success py-4 rounded-lg font-bold text-base border-b-4 border-success/20 disabled:opacity-50"
        >
          <ThumbsUp className="w-5 h-5" /> Good
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SwipeStep;
