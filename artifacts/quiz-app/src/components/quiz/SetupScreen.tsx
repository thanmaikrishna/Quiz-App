import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Category, Difficulty } from '../../data/questions';
import { Code, Sigma, Globe2, Gauge, Flame, Skull } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupScreenProps {
  onBegin: (category: Category, difficulty: Difficulty) => void;
}

export default function SetupScreen({ onBegin }: SetupScreenProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const categories: { id: Category; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'web', label: 'Web Dev', icon: <Code className="w-6 h-6" />, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
    { id: 'math', label: 'Mathematics', icon: <Sigma className="w-6 h-6" />, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
    { id: 'general', label: 'General', icon: <Globe2 className="w-6 h-6" />, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  ];

  const difficulties: { id: Difficulty; label: string; icon: React.ReactNode }[] = [
    { id: 'easy', label: 'Easy', icon: <Gauge className="w-4 h-4 text-green-500" /> },
    { id: 'medium', label: 'Medium', icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { id: 'hard', label: 'Hard', icon: <Skull className="w-4 h-4 text-red-500" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl w-full flex flex-col space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configure Game</h2>
        <p className="text-muted-foreground">Select your topic and challenge level.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "relative flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-200 hover-elevate",
                category === cat.id 
                  ? "border-primary bg-primary/5 shadow-md scale-105 z-10" 
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className={cn("p-3 rounded-xl mb-3", cat.color)}>
                {cat.icon}
              </div>
              <span className="font-semibold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</h3>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map(diff => (
            <button
              key={diff.id}
              onClick={() => setDifficulty(diff.id)}
              className={cn(
                "flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all duration-200",
                difficulty === diff.id 
                  ? "border-primary bg-primary text-primary-foreground shadow-md" 
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              {difficulty !== diff.id && diff.icon}
              <span className="font-medium">{diff.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <Button 
          size="lg" 
          className="w-full text-lg h-14 rounded-xl shadow-lg"
          disabled={!category || !difficulty}
          onClick={() => category && difficulty && onBegin(category, difficulty)}
        >
          Let's Go
        </Button>
      </div>
    </motion.div>
  );
}
