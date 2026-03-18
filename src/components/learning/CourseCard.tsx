import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  lessonsCount: number;
  totalXp: number;
  icon: string;
  completedCount: number;
  featured?: boolean;
  onClick: () => void;
}

const CourseCard = ({
  title,
  description,
  lessonsCount,
  totalXp,
  icon,
  completedCount,
  featured = false,
  onClick,
}: CourseCardProps) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`relative mx-auto flex aspect-[4/5] w-full max-w-[340px] flex-col justify-between overflow-hidden rounded-lg p-6 text-left ${
      featured
        ? 'bg-[linear-gradient(160deg,rgba(0,0,0,0.96)_0%,rgba(28,28,28,0.92)_62%,rgba(108,91,31,0.88)_100%)] text-white shadow-[0_20px_44px_-22px_rgba(0,0,0,0.45)]'
        : 'bg-card shadow-card'
    }`}
  >
    {featured && (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,221,120,0.22),transparent_34%)]" />
        <div className="absolute -right-10 top-20 h-36 w-36 rounded-full border border-white/10" />
        <div className="absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-white/5" />
      </>
    )}

    <div className="relative space-y-3">
      {featured && (
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
          Recommended Path
        </span>
      )}

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl ${
          featured ? 'bg-white text-black' : 'bg-primary'
        }`}
      >
        {icon}
      </div>

      <h3 className={`text-2xl font-bold leading-tight tracking-tight ${featured ? 'text-white' : 'text-card-foreground'}`}>
        {title}
      </h3>

      <p className={`text-sm ${featured ? 'text-white/75' : 'text-muted-foreground'}`}>{description}</p>
    </div>

    <div className="relative mt-4 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className={`text-xs ${featured ? 'text-white/75' : 'text-muted-foreground'}`}>
          {completedCount}/{lessonsCount} Lessons • {totalXp} XP
        </span>
        <div className={`h-1.5 w-32 overflow-hidden rounded-full ${featured ? 'bg-white/15' : 'bg-secondary'}`}>
          <div
            className={`h-full rounded-full transition-all ${featured ? 'bg-accent' : 'bg-primary'}`}
            style={{ width: `${(completedCount / lessonsCount) * 100}%` }}
          />
        </div>
      </div>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          featured ? 'bg-white text-black' : 'bg-primary text-primary-foreground'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  </motion.button>
);

export default CourseCard;
