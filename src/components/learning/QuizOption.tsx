import { motion } from 'framer-motion';

export type QuizState = 'idle' | 'correct' | 'wrong';

interface QuizOptionProps {
  text: string;
  state: QuizState;
  index: number;
  onSelect: () => void;
  disabled: boolean;
}

const labels = ['A', 'B', 'C', 'D'];

const QuizOption = ({ text, state, index, onSelect, disabled }: QuizOptionProps) => {
  const base = 'w-full p-5 rounded-lg border-b-4 text-left font-semibold transition-colors flex items-center gap-4';
  const variants: Record<QuizState, string> = {
    idle: 'bg-card border-secondary shadow-card',
    correct: 'bg-success text-success-foreground border-success',
    wrong: 'bg-error text-error-foreground border-error',
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.96 } : {}}
      animate={state === 'wrong' ? { x: [-2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.3 }}
      onClick={!disabled ? onSelect : undefined}
      disabled={disabled}
      className={`${base} ${variants[state]}`}
    >
      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
        state === 'idle' ? 'bg-secondary text-foreground' : 'bg-primary-foreground/20'
      }`}>
        {labels[index]}
      </span>
      <span>{text}</span>
    </motion.button>
  );
};

export default QuizOption;
