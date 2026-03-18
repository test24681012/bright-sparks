import { motion } from 'framer-motion';

interface StatsHeaderProps {
  streak: number;
  xp: number;
}

const StatsHeader = ({ streak, xp }: StatsHeaderProps) => (
  <div className="flex justify-between items-center px-6 py-4">
    <div className="flex items-center gap-2">
      <span className="text-xl">🔥</span>
      <span className="font-bold tabular-nums text-foreground">{streak}</span>
    </div>
    <motion.div
      key={xp}
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full"
    >
      <span className="text-[10px] uppercase tracking-widest font-black">XP</span>
      <span className="font-bold tabular-nums">{xp}</span>
    </motion.div>
  </div>
);

export default StatsHeader;
