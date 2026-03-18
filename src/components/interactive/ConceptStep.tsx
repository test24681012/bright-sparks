import { motion } from 'framer-motion';

interface ConceptStepProps {
  onStart: () => void;
}

const parts = [
  { label: 'Task', emoji: '📋', color: 'bg-accent/20' },
  { label: 'Context', emoji: '💡', color: 'bg-blue-100' },
  { label: 'Format', emoji: '📐', color: 'bg-purple-100' },
];

const ConceptStep = ({ onStart }: ConceptStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    className="flex-1 flex flex-col items-center justify-center px-6 gap-8 text-center"
  >
    <h2 className="text-2xl font-bold text-foreground">The Formula</h2>

    <div className="flex items-center gap-3 flex-wrap justify-center">
      {parts.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 300 }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-20 h-20 rounded-2xl ${p.color} flex items-center justify-center text-3xl`}>
            {p.emoji}
          </div>
          <span className="text-xs font-bold text-foreground">{p.label}</span>
          {i < parts.length - 1 && (
            <span className="absolute text-xl font-bold text-muted-foreground" style={{ display: 'none' }}>+</span>
          )}
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-card shadow-card rounded-lg p-5 w-full"
    >
      <p className="font-mono text-sm text-foreground">
        Good Prompt = <span className="font-bold">Task</span> + <span className="font-bold">Context</span> + <span className="font-bold">Format</span>
      </p>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      whileTap={{ scale: 0.96 }}
      onClick={onStart}
      className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
    >
      Start Practice
    </motion.button>
  </motion.div>
);

export default ConceptStep;
