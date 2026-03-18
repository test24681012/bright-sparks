import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import StoryProgress from '@/components/learning/StoryProgress';
import ContentCard from '@/components/learning/ContentCard';
import QuizOption, { type QuizState } from '@/components/learning/QuizOption';
import XpCelebration from '@/components/learning/XpCelebration';
import { courses } from '@/data/courses';
import { useGameState } from '@/hooks/useGameState';

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useGameState();

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [quizStates, setQuizStates] = useState<QuizState[]>([]);
  const [answered, setAnswered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  if (!course || !lesson) return <div className="p-6 text-foreground">Lesson not found</div>;

  const step = lesson.steps[currentStep];
  const isLastStep = currentStep === lesson.steps.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      completeLesson(lesson.id, lesson.xpReward);
      setShowCelebration(true);
    } else {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
      setAnswered(false);
      setQuizStates([]);
    }
  }, [isLastStep, lesson, completeLesson]);

  const handleQuizAnswer = useCallback((index: number) => {
    if (answered) return;
    const quiz = step.quiz!;
    const states = quiz.options.map((_, i) =>
      i === index
        ? i === quiz.correctIndex ? 'correct' : 'wrong'
        : i === quiz.correctIndex && index !== quiz.correctIndex ? 'correct' : 'idle'
    ) as QuizState[];
    setQuizStates(states);
    setAnswered(true);
  }, [answered, step]);

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
        <XpCelebration xp={lesson.xpReward} onContinue={() => navigate(`/course/${courseId}`)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(`/course/${courseId}`)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <X className="w-4 h-4" />
        </motion.button>
        <span className="text-xs font-medium text-muted-foreground">{lesson.title}</span>
        <div className="w-8" />
      </div>

      <StoryProgress steps={lesson.steps.length} current={currentStep} />

      {/* Content */}
      {step.type === 'quiz' && step.quiz ? (
        <div className="flex-1 flex flex-col justify-center px-6 py-6 gap-4">
          <h2 className="text-xl font-bold text-foreground">{step.quiz.question}</h2>
          <div className="space-y-3">
            {step.quiz.options.map((opt, i) => (
              <QuizOption
                key={i}
                text={opt}
                state={quizStates[i] || 'idle'}
                index={i}
                onSelect={() => handleQuizAnswer(i)}
                disabled={answered}
              />
            ))}
          </div>
        </div>
      ) : (
        <ContentCard step={step} direction={direction} />
      )}

      {/* Bottom Action */}
      <div className="px-6 pb-8 pt-4">
        {(step.type !== 'quiz' || answered) && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleNext}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
          >
            {isLastStep ? 'Complete Lesson' : 'Continue'}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
