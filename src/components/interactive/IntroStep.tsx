import { motion } from 'framer-motion';
import { Lightbulb, MessageSquare, Layout } from 'lucide-react';

interface IntroStepProps {
  onStart: () => void;
}

const bullets = [
  { icon: <Lightbulb className="w-5 h-5" />, text: 'Be clear about the task' },
  { icon: <MessageSquare className="w-5 h-5" />, text: 'Add context' },
  { icon: <Layout className="w-5 h-5" />, text: 'Specify output format' },
];

const IntroStep = ({ onStart }: IntroStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    className="flex-1 flex flex-col justify-center px-6 gap-8"
  >
    <div className="space-y-3">
      <span className="text-4xl">✍️</span>
      <h1 className="text-3xl font-bold text-foreground leading-tight">
        How to Write a Good Prompt
      </h1>
      <p className="text-muted-foreground text-sm">Master the 3 pillars of effective prompting</p>
    </div>

    <div className="space-y-4">
      {bullets.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 bg-card shadow-card p-4 rounded-lg"
        >
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground shrink-0">
            {b.icon}
          </div>
          <span className="font-semibold text-card-foreground">{b.text}</span>
        </motion.div>
      ))}
    </div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileTap={{ scale: 0.96 }}
      onClick={onStart}
      className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base"
    >
      Start
    </motion.button>
  </motion.div>
);

export default IntroStep;
