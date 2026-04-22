import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import WelcomeScreen from './components/quiz/WelcomeScreen';
import SetupScreen from './components/quiz/SetupScreen';
import QuizScreen from './components/quiz/QuizScreen';
import ResultsScreen from './components/quiz/ResultsScreen';
import { Category, Difficulty, Question, questions } from './data/questions';
import { useHighScores } from './hooks/useHighScores';
import { useDarkMode } from './hooks/useDarkMode';

export type AppState = 'welcome' | 'setup' | 'quiz' | 'results';

export interface AnswerRecord {
  question: string;
  selected: string | null;
  correct: string;
  wasCorrect: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<(Question & { options: string[] })[]>([]);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);
  const [isNewBest, setIsNewBest] = useState(false);

  const { getHighScore, saveHighScore } = useHighScores();
  const { isDark, toggle: toggleDark } = useDarkMode();

  const handleStartSetup = () => setAppState('setup');

  const handleBeginQuiz = (category: Category, difficulty: Difficulty) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);

    const filtered = questions.filter(q => q.category === category && q.difficulty === difficulty);
    const shuffled = shuffleArray(filtered).slice(0, 10);
    const prepared = shuffled.map(q => ({
      ...q,
      options: shuffleArray([q.correctAnswer, ...q.incorrectAnswers]),
    }));

    setActiveQuestions(prepared);
    setScore(0);
    setAnswerHistory([]);
    setIsNewBest(false);
    setAppState('quiz');
  };

  const handleQuizComplete = (finalScore: number, history: AnswerRecord[]) => {
    setScore(finalScore);
    setAnswerHistory(history);
    if (selectedCategory && selectedDifficulty) {
      const newBest = saveHighScore(selectedCategory, selectedDifficulty, finalScore, activeQuestions.length);
      setIsNewBest(newBest);
    }
    setAppState('results');
  };

  const handlePlayAgain = () => {
    if (selectedCategory && selectedDifficulty) {
      handleBeginQuiz(selectedCategory, selectedDifficulty);
    } else {
      setAppState('setup');
    }
  };

  const handleTryDifferent = () => setAppState('setup');

  const highScore = selectedCategory && selectedDifficulty
    ? getHighScore(selectedCategory, selectedDifficulty)
    : 0;

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col items-center justify-center overflow-hidden p-4 md:p-8 relative">
      <button
        onClick={toggleDark}
        className="absolute top-4 right-4 p-2 rounded-full border border-border bg-card hover:bg-muted transition-colors z-50"
        aria-label="Toggle dark mode"
        data-testid="button-dark-mode-toggle"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStartSetup} />
        )}
        {appState === 'setup' && (
          <SetupScreen key="setup" onBegin={handleBeginQuiz} getHighScore={getHighScore} />
        )}
        {appState === 'quiz' && (
          <QuizScreen
            key="quiz"
            questions={activeQuestions}
            onComplete={handleQuizComplete}
          />
        )}
        {appState === 'results' && (
          <ResultsScreen
            key="results"
            score={score}
            total={activeQuestions.length}
            category={selectedCategory!}
            difficulty={selectedDifficulty!}
            answerHistory={answerHistory}
            highScore={highScore}
            isNewBest={isNewBest}
            onPlayAgain={handlePlayAgain}
            onTryDifferent={handleTryDifferent}
          />
        )}
      </AnimatePresence>

      <motion.p
        className="absolute bottom-4 text-xs text-muted-foreground/50 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        MindFlip &mdash; Press 1&ndash;4 during quiz to answer
      </motion.p>
    </div>
  );
}
