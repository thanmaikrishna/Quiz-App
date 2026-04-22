import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ListFilter, Award, TrendingUp, HelpCircle } from 'lucide-react';
import { Category, Difficulty } from '../../data/questions';

interface ResultsScreenProps {
  score: number;
  total: number;
  category: Category;
  difficulty: Difficulty;
  onPlayAgain: () => void;
  onTryDifferent: () => void;
}

export default function ResultsScreen({ score, total, category, difficulty, onPlayAgain, onTryDifferent }: ResultsScreenProps) {
  const percentage = Math.round((score / total) * 100);
  
  let feedback = "";
  let colorClass = "";
  let bgClass = "";
  
  if (percentage >= 90) {
    feedback = "Outstanding! You're a master of this topic!";
    colorClass = "text-green-500";
    bgClass = "bg-green-500/10";
  } else if (percentage >= 70) {
    feedback = "Great job! You know your stuff.";
    colorClass = "text-blue-500";
    bgClass = "bg-blue-500/10";
  } else if (percentage >= 50) {
    feedback = "Not bad! A bit more practice and you'll ace it.";
    colorClass = "text-yellow-500";
    bgClass = "bg-yellow-500/10";
  } else {
    feedback = "Keep studying! You'll get there.";
    colorClass = "text-destructive";
    bgClass = "bg-destructive/10";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full flex flex-col items-center text-center space-y-8"
    >
      <div className={`w-32 h-32 rounded-full flex items-center justify-center ${bgClass} mb-4 relative`}>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
        >
          <Award className={`w-16 h-16 ${colorClass}`} />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
          >
            {score} / {total}
          </motion.span>
        </h2>
        <p className={`text-xl font-bold ${colorClass}`}>{percentage}%</p>
      </div>

      <div className="bg-card p-6 rounded-2xl border shadow-sm w-full space-y-4">
        <p className="text-lg font-medium">{feedback}</p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            <span className="capitalize">{category}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span className="capitalize">{difficulty}</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3 pt-4">
        <Button size="lg" className="w-full text-lg h-14 rounded-xl shadow-md" onClick={onPlayAgain}>
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
        <Button size="lg" variant="outline" className="w-full text-lg h-14 rounded-xl" onClick={onTryDifferent}>
          <ListFilter className="w-5 h-5 mr-2" />
          Different Category
        </Button>
      </div>
    </motion.div>
  );
}
