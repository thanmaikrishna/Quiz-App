import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Trophy, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md w-full flex flex-col items-center text-center space-y-8"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        <div className="w-24 h-24 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center shadow-xl rotate-12 relative z-10 mx-auto">
          <Brain className="w-12 h-12 -rotate-12" />
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Mind<span className="text-primary">Flip</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          The fast-paced trivia challenge for curious minds. Pick a topic, test your knowledge, and beat the score.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        <div className="flex flex-col items-center p-3 bg-card rounded-2xl border shadow-sm">
          <Zap className="w-6 h-6 text-yellow-500 mb-2" />
          <span className="text-xs font-medium">Fast</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-card rounded-2xl border shadow-sm">
          <Brain className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-xs font-medium">Smart</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-card rounded-2xl border shadow-sm">
          <Trophy className="w-6 h-6 text-green-500 mb-2" />
          <span className="text-xs font-medium">Fun</span>
        </div>
      </div>

      <Button size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg" onClick={onStart}>
        Start Quiz
      </Button>
    </motion.div>
  );
}
