import { motion } from 'framer-motion';

interface XpCelebrationProps {
  xp: number;
  onContinue: () => void;
}

const XpCelebration = ({ xp, onContinue }: XpCelebrationProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.3, 1] }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-7xl"
    >
      🏆
    </motion.div>
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-foreground">Lesson Complete!</h2>
      <p className="text-muted-foreground">You earned</p>
    </div>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, type: 'spring' }}
      className="bg-accent text-accent-foreground px-6 py-3 rounded-full text-xl font-black"
    >
      +{xp} XP
    </motion.div>
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      whileTap={{ scale: 0.96 }}
      onClick={onContinue}
      className="w-full max-w-xs bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg mt-4"
    >
      Continue
    </motion.button>
  </motion.div>
);

export default XpCelebration;
