import { motion, AnimatePresence } from 'framer-motion';
import type { LessonStep } from '@/data/courses';
import SwipeStep from '@/components/interactive/SwipeStep';
import PromptPracticeCard from '@/components/learning/PromptPracticeCard';

interface ContentCardProps {
  step: LessonStep;
  direction: number;
  onInteractiveComplete?: () => void;
}

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

const ContentCard = ({ step, direction, onInteractiveComplete }: ContentCardProps) => (
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

      {step.type === 'video' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground leading-tight">{step.title}</h2>
          {step.content && <p className="text-base text-muted-foreground leading-relaxed">{step.content}</p>}
          <div className="overflow-hidden rounded-lg bg-card shadow-card">
            <div className="aspect-video">
              <iframe
                src={step.videoUrl}
                title={step.videoTitle || step.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          {(step.videoTitle || step.videoSource) && (
            <p className="text-sm text-muted-foreground">
              {step.videoTitle}
              {step.videoTitle && step.videoSource ? ' - ' : ''}
              {step.videoSource}
            </p>
          )}
        </div>
      )}

      {step.type === 'swipe' && step.swipePrompts && onInteractiveComplete && (
        <SwipeStep prompts={step.swipePrompts} onComplete={() => onInteractiveComplete()} />
      )}

      {step.type === 'practice' && step.practicePrompt && onInteractiveComplete && (
        <PromptPracticeCard config={step.practicePrompt} onComplete={onInteractiveComplete} />
      )}
    </motion.div>
  </AnimatePresence>
);

export default ContentCard;
