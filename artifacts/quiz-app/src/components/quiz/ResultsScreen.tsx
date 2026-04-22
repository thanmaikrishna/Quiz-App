import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ListFilter, Award, TrendingUp, HelpCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Category, Difficulty } from '../../data/questions';
import { AnswerRecord } from '../../App';
import { cn } from '@/lib/utils';

interface ResultsScreenProps {
  score: number;
  total: number;
  category: Category;
  difficulty: Difficulty;
  answerHistory: AnswerRecord[];
  highScore: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onTryDifferent: () => void;
}

const categoryLabel: Record<string, string> = {
  web: 'Web Dev',
  math: 'Mathematics',
  general: 'General Knowledge',
};

export default function ResultsScreen({
  score,
  total,
  category,
  difficulty,
  answerHistory,
  highScore,
  isNewBest,
  onPlayAgain,
  onTryDifferent,
}: ResultsScreenProps) {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((score / total) * 100);

  let feedback = '';
  let colorClass = '';
  let bgClass = '';

  if (percentage >= 90) {
    feedback = 'Outstanding! You are a master of this topic!';
    colorClass = 'text-green-500';
    bgClass = 'bg-green-500/10';
  } else if (percentage >= 70) {
    feedback = 'Great job! You know your stuff.';
    colorClass = 'text-blue-500';
    bgClass = 'bg-blue-500/10';
  } else if (percentage >= 50) {
    feedback = 'Not bad! A bit more practice and you will ace it.';
    colorClass = 'text-yellow-500';
    bgClass = 'bg-yellow-500/10';
  } else {
    feedback = 'Keep studying! You will get there.';
    colorClass = 'text-destructive';
    bgClass = 'bg-destructive/10';
  }

  const correctCount = answerHistory.filter(r => r.wasCorrect).length;
  const wrongCount = answerHistory.filter(r => !r.wasCorrect).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg w-full flex flex-col items-center text-center space-y-6"
    >
      {/* Award icon */}
      <div className={cn('w-28 h-28 rounded-full flex items-center justify-center relative', bgClass)}>
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.55, delay: 0.15 }}
        >
          <Award className={cn('w-14 h-14', colorClass)} />
        </motion.div>
        {isNewBest && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-1"
          >
            <Star className="w-4 h-4 fill-current" />
          </motion.div>
        )}
      </div>

      {/* Score */}
      <div className="space-y-1">
        <motion.h2
          className="text-5xl font-black tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {score} <span className="text-muted-foreground font-light text-3xl">/ {total}</span>
        </motion.h2>
        <motion.p
          className={cn('text-2xl font-bold', colorClass)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          {percentage}%
        </motion.p>
        {isNewBest && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm font-semibold text-yellow-500"
          >
            New personal best!
          </motion.p>
        )}
        {!isNewBest && highScore > 0 && (
          <p className="text-xs text-muted-foreground">
            Personal best: {highScore}%
          </p>
        )}
      </div>

      {/* Feedback card */}
      <div className="bg-card p-5 rounded-2xl border shadow-sm w-full space-y-4">
        <p className="text-base font-medium">{feedback}</p>

        {/* Stat pills */}
        <div className="flex justify-center gap-4 text-sm text-muted-foreground pt-3 border-t flex-wrap">
          <div className="flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            <span className="capitalize">{categoryLabel[category] ?? category}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span className="capitalize">{difficulty}</span>
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>{correctCount} correct</span>
          </div>
          <div className="flex items-center gap-1 text-destructive">
            <XCircle className="w-4 h-4" />
            <span>{wrongCount} wrong</span>
          </div>
        </div>
      </div>

      {/* Answer review toggle */}
      {answerHistory.length > 0 && (
        <div className="w-full">
          <button
            onClick={() => setShowReview(v => !v)}
            className="flex items-center justify-between w-full px-4 py-3 bg-card border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
            data-testid="button-toggle-review"
          >
            <span>Review answers</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showReview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-2 text-left max-h-72 overflow-y-auto pr-1">
                  {answerHistory.map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={cn(
                        'p-3 rounded-lg border text-sm',
                        rec.wasCorrect
                          ? 'border-green-500/30 bg-green-500/5'
                          : 'border-destructive/30 bg-destructive/5'
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {rec.wasCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        )}
                        <div className="space-y-0.5 min-w-0">
                          <p className="font-medium leading-snug">{rec.question}</p>
                          {!rec.wasCorrect && (
                            <>
                              {rec.selected && (
                                <p className="text-xs text-destructive">
                                  Your answer: {rec.selected}
                                </p>
                              )}
                              {!rec.selected && (
                                <p className="text-xs text-muted-foreground">
                                  Time expired
                                </p>
                              )}
                              <p className="text-xs text-green-600 dark:text-green-400">
                                Correct: {rec.correct}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Action buttons */}
      <div className="w-full space-y-3 pt-2">
        <Button
          size="lg"
          className="w-full text-base h-13 rounded-xl shadow-md"
          onClick={onPlayAgain}
          data-testid="button-play-again"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full text-base h-13 rounded-xl"
          onClick={onTryDifferent}
          data-testid="button-try-different"
        >
          <ListFilter className="w-5 h-5 mr-2" />
          Different Category
        </Button>
      </div>
    </motion.div>
  );
}
