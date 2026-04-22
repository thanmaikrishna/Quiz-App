import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Category, Difficulty } from '../../data/questions';
import { Code, Sigma, Globe2, Gauge, Flame, Skull, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupScreenProps {
  onBegin: (category: Category, difficulty: Difficulty) => void;
  getHighScore: (category: Category, difficulty: Difficulty) => number;
}

export default function SetupScreen({ onBegin, getHighScore }: SetupScreenProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const categories: { id: Category; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
    { id: 'web', label: 'Web Dev', icon: <Code className="w-6 h-6" />, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', desc: 'HTML, CSS, JS, React' },
    { id: 'math', label: 'Mathematics', icon: <Sigma className="w-6 h-6" />, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20', desc: 'Algebra, Calculus, Logic' },
    { id: 'general', label: 'General Knowledge', icon: <Globe2 className="w-6 h-6" />, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', desc: 'History, Science, World' },
  ];

  const difficulties: { id: Difficulty; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'easy', label: 'Easy', icon: <Gauge className="w-4 h-4 text-green-500" />, desc: 'Fundamentals' },
    { id: 'medium', label: 'Medium', icon: <Flame className="w-4 h-4 text-orange-500" />, desc: 'Intermediate' },
    { id: 'hard', label: 'Hard', icon: <Skull className="w-4 h-4 text-red-500" />, desc: 'Expert' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl w-full flex flex-col space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configure Your Quiz</h2>
        <p className="text-muted-foreground">Select a topic and challenge level to begin.</p>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Category
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map(cat => {
            const scores = (['easy', 'medium', 'hard'] as Difficulty[]).map(d => ({
              d,
              pct: getHighScore(cat.id, d),
            }));
            const bestPct = Math.max(...scores.map(s => s.pct));

            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                data-testid={`button-category-${cat.id}`}
                className={cn(
                  'relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-200 text-center hover-elevate group',
                  category === cat.id
                    ? 'border-primary bg-primary/5 shadow-md scale-[1.03] z-10'
                    : 'border-border bg-card hover:border-primary/40'
                )}
              >
                <div className={cn('p-3 rounded-xl mb-2', cat.color)}>{cat.icon}</div>
                <span className="font-semibold text-sm">{cat.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{cat.desc}</span>
                {bestPct > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 text-yellow-500 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    {bestPct}%
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Difficulty
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map(diff => {
            const pct = category ? getHighScore(category, diff.id) : 0;
            return (
              <button
                key={diff.id}
                onClick={() => setDifficulty(diff.id)}
                data-testid={`button-difficulty-${diff.id}`}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 transition-all duration-200',
                  difficulty === diff.id
                    ? 'border-primary bg-primary text-primary-foreground shadow-md'
                    : 'border-border bg-card hover:border-primary/40'
                )}
              >
                {difficulty !== diff.id && diff.icon}
                <span className="font-semibold text-sm">{diff.label}</span>
                <span className={cn('text-[10px]', difficulty === diff.id ? 'opacity-70' : 'text-muted-foreground')}>
                  {diff.desc}
                </span>
                {pct > 0 && difficulty !== diff.id && (
                  <span className="text-[10px] text-yellow-500 font-bold flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" /> {pct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Begin */}
      <div className="pt-4">
        <Button
          size="lg"
          className="w-full text-lg h-14 rounded-xl shadow-lg"
          disabled={!category || !difficulty}
          onClick={() => category && difficulty && onBegin(category, difficulty)}
          data-testid="button-begin-quiz"
        >
          Begin Quiz
        </Button>
        {!category || !difficulty ? (
          <p className="text-center text-xs text-muted-foreground mt-3">
            {!category ? 'Pick a category to continue' : 'Pick a difficulty to continue'}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
