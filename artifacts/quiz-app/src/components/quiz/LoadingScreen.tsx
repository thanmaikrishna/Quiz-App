import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';
import { Category, Difficulty } from '../../data/questions';

interface LoadingScreenProps {
  category: Category;
  difficulty: Difficulty;
}

const categoryLabel: Record<string, string> = {
  web: 'Web Development',
  math: 'Mathematics',
  general: 'General Knowledge',
};

const loadingPhrases = [
  'Crafting unique questions just for you...',
  'Pulling from a vast knowledge base...',
  'Generating your personalized quiz...',
  'Mixing things up so nothing repeats...',
];

export default function LoadingScreen({ category, difficulty }: LoadingScreenProps) {
  const phrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="max-w-md w-full flex flex-col items-center text-center space-y-8"
    >
      {/* Animated icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <div className="relative w-24 h-24 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center shadow-xl mx-auto">
          <Brain className="w-12 h-12" />
          <motion.div
            className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1.5"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Generating Your Quiz</h2>
        <p className="text-muted-foreground text-sm">{phrase}</p>
      </div>

      {/* Bouncing dots */}
      <div className="flex gap-2 items-center justify-center">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Info card */}
      <div className="bg-card border rounded-2xl p-5 w-full space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Category</span>
          <span className="font-semibold text-foreground capitalize">
            {categoryLabel[category] ?? category}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Difficulty</span>
          <span className="font-semibold text-foreground capitalize">{difficulty}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Questions</span>
          <span className="font-semibold text-foreground">10 unique, AI-generated</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground/60">
        Powered by AI — questions are different every session
      </p>
    </motion.div>
  );
}
