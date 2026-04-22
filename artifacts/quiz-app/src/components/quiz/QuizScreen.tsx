import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ProgressBar from './ProgressBar';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizScreenProps {
  questions: any[];
  onComplete: (score: number) => void;
}

export default function QuizScreen({ questions, onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQ = questions[currentIndex];

  const handleSelect = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent double clicks
    
    setSelectedAnswer(answer);
    const correct = answer === currentQ.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        onComplete(score + (correct ? 1 : 0));
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl w-full flex flex-col h-[80vh]">
      <div className="mb-8">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col"
        >
          <div className="flex gap-2 mb-4">
            <Badge variant="outline" className="uppercase">{currentQ.category}</Badge>
            <Badge variant="secondary" className="uppercase">{currentQ.difficulty}</Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-8">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 gap-3 mt-auto mb-12">
            {currentQ.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isActualCorrect = option === currentQ.correctAnswer;
              
              let stateClass = "bg-card border-border hover:border-primary/50 hover-elevate";
              let Icon = null;
              
              if (selectedAnswer !== null) {
                if (isActualCorrect) {
                  stateClass = "bg-green-500 border-green-600 text-white z-10 shadow-lg scale-[1.02]";
                  Icon = <CheckCircle2 className="w-5 h-5 text-white" />;
                } else if (isSelected) {
                  stateClass = "bg-destructive border-red-700 text-white z-10";
                  Icon = <XCircle className="w-5 h-5 text-white" />;
                } else {
                  stateClass = "opacity-50 border-border bg-card";
                }
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "relative flex items-center justify-between p-5 rounded-xl border-2 text-left font-medium transition-all duration-300",
                    stateClass
                  )}
                >
                  <span className="text-lg">{option}</span>
                  {Icon}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
