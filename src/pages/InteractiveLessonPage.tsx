import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import StoryProgress from '@/components/learning/StoryProgress';
import IntroStep from '@/components/interactive/IntroStep';
import BeforeAfterStep from '@/components/interactive/BeforeAfterStep';
import ConceptStep from '@/components/interactive/ConceptStep';
import SwipeStep, { type SwipeAnswer, type SwipePrompt } from '@/components/interactive/SwipeStep';
import ReviewStep from '@/components/interactive/ReviewStep';
import ImprovePromptStep from '@/components/interactive/ImprovePromptStep';
import FinalGameStep from '@/components/interactive/FinalGameStep';
import XpCelebration from '@/components/learning/XpCelebration';
import { useGameState } from '@/hooks/useGameState';

const SWIPE_PROMPTS: SwipePrompt[] = [
  { text: 'Write an email', isGood: false, explanation: 'Too vague, no context or format' },
  { text: 'Write a professional email to a client confirming a meeting tomorrow', isGood: true, explanation: 'Clear task and context' },
  { text: 'Summarize this document', isGood: false, explanation: 'No details about length or audience' },
  { text: 'Summarize this report in 5 bullet points for a manager', isGood: true, explanation: 'Includes format and audience' },
];

const STEP_NAMES = ['intro', 'before-after', 'concept', 'swipe', 'review', 'improve', 'game', 'celebration'] as const;
type StepName = typeof STEP_NAMES[number];

const XP_REWARD = 100;

const InteractiveLessonPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useGameState();

  const [currentStep, setCurrentStep] = useState<StepName>('intro');
  const [swipeAnswers, setSwipeAnswers] = useState<SwipeAnswer[]>([]);
  const [swipeScore, setSwipeScore] = useState(0);

  const stepIndex = STEP_NAMES.indexOf(currentStep);
  // Story progress covers steps 0-6 (7 interactive steps, not counting celebration)
  const progressSteps = 7;

  const goTo = useCallback((step: StepName) => setCurrentStep(step), []);

  const handleSwipeComplete = useCallback((answers: SwipeAnswer[], score: number) => {
    setSwipeAnswers(answers);
    setSwipeScore(score);
    goTo('review');
  }, [goTo]);

  const handleRetrySwipe = useCallback(() => {
    setSwipeAnswers([]);
    setSwipeScore(0);
    goTo('swipe');
  }, [goTo]);

  const handleFinish = useCallback(() => {
    completeLesson('prompt-basics-interactive', XP_REWARD);
    goTo('celebration');
  }, [completeLesson, goTo]);

  const handleRetryGame = useCallback(() => {
    goTo('game');
  }, [goTo]);

  const goBack = useCallback(() => {
    navigate(`/course/${courseId}`);
  }, [navigate, courseId]);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      {/* Header */}
      {currentStep !== 'celebration' && (
        <>
          <div className="flex items-center justify-between px-4 pt-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={goBack}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground"
            >
              <X className="w-4 h-4" />
            </motion.button>
            <span className="text-xs font-medium text-muted-foreground">Prompt Engineering</span>
            <div className="w-8" />
          </div>
          <StoryProgress steps={progressSteps} current={stepIndex} />
        </>
      )}

      {/* Steps */}
      {currentStep === 'intro' && <IntroStep onStart={() => goTo('before-after')} />}
      {currentStep === 'before-after' && <BeforeAfterStep onNext={() => goTo('concept')} />}
      {currentStep === 'concept' && <ConceptStep onStart={() => goTo('swipe')} />}
      {currentStep === 'swipe' && <SwipeStep prompts={SWIPE_PROMPTS} onComplete={handleSwipeComplete} />}
      {currentStep === 'review' && (
        <ReviewStep
          answers={swipeAnswers}
          score={swipeScore}
          total={SWIPE_PROMPTS.length}
          onRetry={handleRetrySwipe}
          onContinue={() => goTo('improve')}
        />
      )}
      {currentStep === 'improve' && <ImprovePromptStep onContinue={() => goTo('game')} />}
      {currentStep === 'game' && <FinalGameStep onRetry={handleRetryGame} onFinish={handleFinish} />}
      {currentStep === 'celebration' && (
        <XpCelebration xp={XP_REWARD} onContinue={goBack} />
      )}
    </div>
  );
};

export default InteractiveLessonPage;
