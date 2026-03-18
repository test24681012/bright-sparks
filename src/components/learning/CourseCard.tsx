import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  lessonsCount: number;
  totalXp: number;
  icon: string;
  completedCount: number;
  onClick: () => void;
}

const CourseCard = ({ title, description, lessonsCount, totalXp, icon, completedCount, onClick }: CourseCardProps) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="relative w-full p-6 rounded-lg bg-card shadow-card text-left flex flex-col justify-between aspect-[4/5] max-w-[340px] mx-auto"
  >
    <div className="space-y-3">
      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-3xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold tracking-tight leading-tight text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>

    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">
          {completedCount}/{lessonsCount} Lessons • {totalXp} XP
        </span>
        <div className="h-1.5 w-32 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(completedCount / lessonsCount) * 100}%` }}
          />
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  </motion.button>
);

export default CourseCard;
