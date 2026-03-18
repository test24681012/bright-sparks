import { motion } from 'framer-motion';

interface BeforeAfterStepProps {
  onNext: () => void;
}

const Tag = ({ children, color }: { children: string; color: string }) => (
  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>
    {children}
  </span>
);

const BeforeAfterStep = ({ onNext }: BeforeAfterStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    className="flex-1 flex flex-col justify-center px-6 gap-6"
  >
    <h2 className="text-2xl font-bold text-foreground">Before vs After</h2>

    {/* Bad prompt */}
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-lg border-2 border-error/30 bg-error/5 p-5 space-y-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">❌</span>
        <span className="text-xs font-bold uppercase tracking-wider text-error">Bad Prompt</span>
      </div>
      <p className="font-mono text-sm text-foreground leading-relaxed">
        "Write a report"
      </p>
    </motion.div>

    {/* Good prompt */}
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-lg border-2 border-success/30 bg-success/5 p-5 space-y-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">✅</span>
        <span className="text-xs font-bold uppercase tracking-wider text-success">Good Prompt</span>
      </div>
      <p className="font-mono text-sm text-foreground leading-relaxed">
        "Write a <span className="bg-accent/20 px-1 rounded">200-word report</span> on{' '}
        <span className="bg-blue-100 px-1 rounded">Q2 sales performance</span> for a manager in{' '}
        <span className="bg-purple-100 px-1 rounded">bullet points</span>"
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <Tag color="bg-accent/20 text-accent-foreground">📋 Task</Tag>
        <Tag color="bg-blue-100 text-blue-800">💡 Context</Tag>
        <Tag color="bg-purple-100 text-purple-800">📐 Format</Tag>
      </div>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileTap={{ scale: 0.96 }}
      onClick={onNext}
      className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
    >
      Next
    </motion.button>
  </motion.div>
);

export default BeforeAfterStep;
