import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ProgressBar from './ProgressBar';
import { CheckCircle2, XCircle, Zap, Flame, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from '../../data/questions';
import { AnswerRecord } from '../../App';

const TIMER_SECONDS = 15;

interface QuizScreenProps {
  questions: (Question & { options: string[] })[];
  onComplete: (score: number, history: AnswerRecord[]) => void;
}

export default function QuizScreen({ questions, onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [showStreakBurst, setShowStreakBurst] = useState(false);
  const historyRef = useRef<AnswerRecord[]>([]);
  const scoreRef = useRef(0);

  const currentQ = questions[currentIndex];

  const advanceQuestion = useCallback(
    (selectedAns: string | null, correct: boolean) => {
      const record: AnswerRecord = {
        question: currentQ.question,
        selected: selectedAns,
        correct: currentQ.correctAnswer,
        wasCorrect: correct,
      };
      historyRef.current = [...historyRef.current, record];

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(i => i + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setTimeLeft(TIMER_SECONDS);
          setTimedOut(false);
          setEliminatedOptions([]);
        } else {
          onComplete(scoreRef.current, historyRef.current);
        }
      }, 1500);
    },
    [currentIndex, questions.length, currentQ, onComplete]
  );

  const handleSelect = useCallback(
    (answer: string, fromTimeout = false) => {
      if (selectedAnswer !== null || timedOut) return;

      setSelectedAnswer(answer);
      const correct = !fromTimeout && answer === currentQ.correctAnswer;
      setIsCorrect(correct);

      if (correct) {
        scoreRef.current += 1;
        setScore(s => s + 1);
        setStreak(s => {
          const next = s + 1;
          setMaxStreak(m => Math.max(m, next));
          if (next > 0 && next % 3 === 0) setShowStreakBurst(true);
          return next;
        });
      } else {
        setStreak(0);
      }

      advanceQuestion(fromTimeout ? null : answer, correct);
    },
    [selectedAnswer, timedOut, currentQ, advanceQuestion]
  );

  // Countdown timer
  useEffect(() => {
    if (selectedAnswer !== null || timedOut) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      setSelectedAnswer('__timeout__');
      setIsCorrect(false);
      setStreak(0);
      advanceQuestion(null, false);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, selectedAnswer, timedOut, advanceQuestion]);

  // Keyboard shortcuts: 1–4 keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = ['1', '2', '3', '4'].indexOf(e.key);
      if (idx !== -1 && currentQ.options[idx] && selectedAnswer === null) {
        handleSelect(currentQ.options[idx]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentQ, selectedAnswer, handleSelect]);

  // Streak burst reset
  useEffect(() => {
    if (showStreakBurst) {
      const t = setTimeout(() => setShowStreakBurst(false), 1200);
      return () => clearTimeout(t);
    }
  }, [showStreakBurst]);

  const handleLifeline = () => {
    if (lifelineUsed || selectedAnswer !== null) return;
    setLifelineUsed(true);
    const wrongOptions = currentQ.options.filter(o => o !== currentQ.correctAnswer);
    const toEliminate = wrongOptions.slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft > 8 ? 'bg-primary' : timeLeft > 4 ? 'bg-yellow-500' : 'bg-red-500';

  const categoryLabel: Record<string, string> = {
    web: 'Web Dev',
    math: 'Mathematics',
    general: 'General Knowledge',
  };

  return (
    <div className="max-w-2xl w-full flex flex-col" style={{ minHeight: '80vh' }}>
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      {/* Timer bar */}
      <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden mb-6">
        <motion.div
          className={cn('h-full rounded-full transition-colors duration-500', timerColor)}
          animate={{ width: `${timerPct}%` }}
          transition={{ duration: 0.9, ease: 'linear' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="flex-1 flex flex-col"
        >
          {/* Meta row */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="uppercase text-xs">
                {categoryLabel[currentQ.category] ?? currentQ.category}
              </Badge>
              <Badge variant="secondary" className="uppercase text-xs">
                {currentQ.difficulty}
              </Badge>
            </div>

            {/* Streak + Timer + Lifeline */}
            <div className="flex items-center gap-3">
              {/* Streak */}
              <div className="flex items-center gap-1 text-sm font-semibold text-orange-500">
                <Flame className="w-4 h-4" />
                <span>{streak}</span>
              </div>

              {/* Timer display */}
              <div
                className={cn(
                  'flex items-center gap-1 text-sm font-bold tabular-nums',
                  timeLeft <= 4 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
                )}
              >
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>

              {/* 50/50 lifeline */}
              <button
                onClick={handleLifeline}
                disabled={lifelineUsed || selectedAnswer !== null}
                className={cn(
                  'flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold transition-all',
                  lifelineUsed
                    ? 'opacity-30 cursor-not-allowed border-border text-muted-foreground'
                    : 'border-yellow-500/60 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10 cursor-pointer'
                )}
                data-testid="button-lifeline"
              >
                <Zap className="w-3 h-3" />
                50/50
              </button>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-8">
            {currentQ.question}
          </h2>

          {/* Streak burst overlay */}
          <AnimatePresence>
            {showStreakBurst && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -30 }}
                className="absolute left-1/2 -translate-x-1/2 top-1/4 bg-orange-500 text-white px-4 py-2 rounded-full font-black text-lg shadow-xl z-50 pointer-events-none"
              >
                {streak} in a row!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer options */}
          <div className="grid grid-cols-1 gap-3 mt-auto mb-10">
            {currentQ.options.map((option, idx) => {
              const isEliminated = eliminatedOptions.includes(option);
              const isSelected = selectedAnswer === option;
              const isActualCorrect = option === currentQ.correctAnswer;
              const answered = selectedAnswer !== null;

              let stateClass =
                'bg-card border-border hover:border-primary/60 hover-elevate cursor-pointer';
              let IconEl: React.ReactNode = null;

              if (answered) {
                if (isActualCorrect) {
                  stateClass =
                    'bg-green-500 border-green-600 text-white shadow-lg scale-[1.02]';
                  IconEl = <CheckCircle2 className="w-5 h-5 text-white shrink-0" />;
                } else if (isSelected) {
                  stateClass = 'bg-destructive border-red-700 text-white';
                  IconEl = <XCircle className="w-5 h-5 text-white shrink-0" />;
                } else {
                  stateClass = 'opacity-40 border-border bg-card cursor-default';
                }
              }

              if (isEliminated && !answered) {
                stateClass = 'opacity-25 border-border bg-card cursor-not-allowed line-through';
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isEliminated && !answered ? 0.25 : 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  disabled={answered || isEliminated}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'relative flex items-center justify-between p-5 rounded-xl border-2 text-left font-medium transition-all duration-300',
                    stateClass
                  )}
                  data-testid={`button-answer-${idx}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-base break-words">{option}</span>
                  </div>
                  {IconEl}
                </motion.button>
              );
            })}
          </div>

          {/* Timeout message */}
          <AnimatePresence>
            {timedOut && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-muted-foreground mb-2"
              >
                Time's up — moving on...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
