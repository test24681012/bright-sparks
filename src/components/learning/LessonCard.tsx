import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';

interface LessonCardProps {
  title: string;
  subtitle: string;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  index: number;
  onClick: () => void;
}

const LessonCard = ({ title, subtitle, xpReward, isCompleted, isLocked, index, onClick }: LessonCardProps) => (
  <motion.button
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    whileTap={!isLocked ? { scale: 0.97 } : {}}
    onClick={!isLocked ? onClick : undefined}
    disabled={isLocked}
    className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-all ${
      isLocked
        ? 'opacity-40 cursor-not-allowed'
        : 'bg-card shadow-card active:shadow-none'
    }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
      isCompleted
        ? 'bg-success text-success-foreground'
        : isLocked
          ? 'bg-secondary text-muted-foreground'
          : 'bg-primary text-primary-foreground'
    }`}>
      {isCompleted ? <Check className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : index + 1}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-card-foreground truncate">{title}</h4>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
    <span className="text-xs font-bold text-accent shrink-0">+{xpReward} XP</span>
  </motion.button>
);

export default LessonCard;
