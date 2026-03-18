import { motion } from 'framer-motion';

interface StoryProgressProps {
  steps: number;
  current: number;
}

const StoryProgress = ({ steps, current }: StoryProgressProps) => (
  <div className="flex gap-1.5 px-4 pt-4 w-full">
    {[...Array(steps)].map((_, i) => (
      <div key={i} className="h-1 flex-1 rounded-full bg-primary/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: i < current ? '100%' : i === current ? '50%' : '0%' }}
          className="h-full bg-primary rounded-full"
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
    ))}
  </div>
);

export default StoryProgress;
