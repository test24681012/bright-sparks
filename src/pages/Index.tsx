import { useNavigate } from 'react-router-dom';
import StatsHeader from '@/components/learning/StatsHeader';
import CourseCard from '@/components/learning/CourseCard';
import { courses } from '@/data/courses';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  const navigate = useNavigate();
  const { xp, streak, isLessonCompleted } = useGameState();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      <StatsHeader streak={streak} xp={xp} />

      <div className="px-6 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Learn</h1>
        <p className="text-sm text-muted-foreground mt-1">AI skills for the modern workplace</p>
      </div>

      <div className="flex-1 px-6 pb-10 space-y-6">
        {courses.map((course) => {
          const completedCount = course.lessons.filter(l => isLessonCompleted(l.id)).length;
          return (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              lessonsCount={course.lessonsCount}
              totalXp={course.totalXp}
              icon={course.icon}
              completedCount={completedCount}
              onClick={() => navigate(`/course/${course.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Index;
