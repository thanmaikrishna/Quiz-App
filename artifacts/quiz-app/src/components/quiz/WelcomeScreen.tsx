import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Flame, Keyboard, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const features = [
  { icon: <Flame className="w-5 h-5 text-orange-500" />, label: 'Streak Tracking', desc: 'Chain correct answers' },
  { icon: <Zap className="w-5 h-5 text-yellow-500" />, label: '50/50 Lifeline', desc: 'Eliminate two wrong options' },
  { icon: <Keyboard className="w-5 h-5 text-blue-500" />, label: 'Keyboard Support', desc: 'Press 1–4 to answer fast' },
];

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md w-full flex flex-col items-center text-center space-y-8"
    >
      {/* Logo */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="w-24 h-24 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center shadow-2xl relative z-10 mx-auto"
        >
          <Brain className="w-12 h-12" />
        </motion.div>
      </div>

      {/* Title */}
      <div className="space-y-3 relative z-10">
        <h1 className="text-5xl font-black tracking-tight">
          Mind<span className="text-primary">Flip</span>
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          A fast-paced trivia challenge across Web Dev, Mathematics, and General Knowledge.
          Beat the clock. Build your streak. Set a personal best.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {features.map(feat => (
          <motion.div
            key={feat.label}
            whileHover={{ y: -3 }}
            className="flex flex-col items-center gap-2 p-3 bg-card rounded-2xl border shadow-sm text-center"
          >
            {feat.icon}
            <span className="text-xs font-semibold leading-tight">{feat.label}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">{feat.desc}</span>
          </motion.div>
        ))}
      </div>

      {/* Timer hint */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border">
        <Flame className="w-3.5 h-3.5 text-red-400" />
        <span>15 seconds per question — answer before time runs out</span>
      </div>

      <Button
        size="lg"
        className="w-full text-lg h-14 rounded-xl shadow-lg"
        onClick={onStart}
        data-testid="button-start-quiz"
      >
        Start Quiz
      </Button>
    </motion.div>
  );
}
