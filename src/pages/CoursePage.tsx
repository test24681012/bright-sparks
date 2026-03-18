import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import LessonCard from '@/components/learning/LessonCard';
import StatsHeader from '@/components/learning/StatsHeader';
import { courses } from '@/data/courses';
import { useGameState } from '@/hooks/useGameState';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import LessonCard from '@/components/learning/LessonCard';
import StatsHeader from '@/components/learning/StatsHeader';
import { courses } from '@/data/courses';
import { useGameState } from '@/hooks/useGameState';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { xp, streak, isLessonCompleted } = useGameState();

  const course = courses.find(c => c.id === courseId);
  if (!course) return <div className="p-6 text-foreground">Course not found</div>;

  const completedCount = course.lessons.filter(l => isLessonCompleted(l.id)).length;

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      <StatsHeader streak={streak} xp={xp} />

      <div className="px-6 pb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{course.icon}</span>
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground">{completedCount}/{course.lessonsCount} completed</p>
      </div>

      <div className="flex-1 px-6 pb-10 space-y-3">
        {course.lessons.map((lesson, i) => {
          const completed = isLessonCompleted(lesson.id);
          // Unlock if previous is completed or it's the first lesson
          const isLocked = i > 0 && !isLessonCompleted(course.lessons[i - 1].id);

          return (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              subtitle={lesson.subtitle}
              xpReward={lesson.xpReward}
              isCompleted={completed}
              isLocked={isLocked}
              index={i}
              onClick={() => lesson.interactive 
                ? navigate(`/course/${courseId}/interactive/${lesson.id}`)
                : navigate(`/course/${courseId}/lesson/${lesson.id}`)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default CoursePage;
