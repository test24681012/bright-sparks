import { motion, AnimatePresence } from 'framer-motion';
import type { LessonStep } from '@/data/courses';

interface ContentCardProps {
  step: LessonStep;
  direction: number;
}

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

const ContentCard = ({ step, direction }: ContentCardProps) => (
  <AnimatePresence mode="wait" custom={direction}>
    <motion.div
      key={step.title || step.quiz?.question}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex-1 flex flex-col justify-center px-6"
    >
      {step.type === 'text' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground leading-tight">{step.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{step.content}</p>
        </div>
      )}

      {step.type === 'code' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground leading-tight">{step.title}</h2>
          {step.content && <p className="text-base text-muted-foreground">{step.content}</p>}
          <pre className="bg-primary text-primary-foreground p-5 rounded-lg text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {step.codeBlock}
          </pre>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
);

export default ContentCard;
