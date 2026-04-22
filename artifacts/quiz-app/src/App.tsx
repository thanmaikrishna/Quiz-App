import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, WifiOff } from 'lucide-react';
import WelcomeScreen from './components/quiz/WelcomeScreen';
import SetupScreen from './components/quiz/SetupScreen';
import QuizScreen from './components/quiz/QuizScreen';
import ResultsScreen from './components/quiz/ResultsScreen';
import LoadingScreen from './components/quiz/LoadingScreen';
import { Category, Difficulty, Question, questions as localQuestions } from './data/questions';
import { useHighScores } from './hooks/useHighScores';
import { useDarkMode } from './hooks/useDarkMode';
import { fetchAiQuestions } from './lib/questionsApi';

export type AppState = 'welcome' | 'setup' | 'loading' | 'quiz' | 'results';

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

function prepareQuestions(raw: Question[]): (Question & { options: string[] })[] {
  return raw.map(q => ({
    ...q,
    options: shuffleArray([q.correctAnswer, ...q.incorrectAnswers]),
  }));
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<(Question & { options: string[] })[]>([]);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);
  const [isNewBest, setIsNewBest] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const { getHighScore, saveHighScore } = useHighScores();
  const { isDark, toggle: toggleDark } = useDarkMode();

  const handleStartSetup = () => setAppState('setup');

  const handleBeginQuiz = async (category: Category, difficulty: Difficulty) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setScore(0);
    setAnswerHistory([]);
    setIsNewBest(false);
    setUsedFallback(false);
    setAppState('loading');

    let prepared: (Question & { options: string[] })[] = [];
    let fell = false;

    try {
      const { questions: aiQuestions } = await fetchAiQuestions(category, difficulty, 10);
      prepared = prepareQuestions(aiQuestions);
    } catch {
      // Fallback to local questions
      fell = true;
      const filtered = localQuestions.filter(
        q => q.category === category && q.difficulty === difficulty
      );
      const shuffled = shuffleArray(filtered).slice(0, 10);
      prepared = prepareQuestions(shuffled);
    }

    setUsedFallback(fell);
    setActiveQuestions(prepared);
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

      {/* Fallback notice */}
      <AnimatePresence>
        {usedFallback && appState === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-4 left-4 right-16 flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs px-3 py-2 rounded-lg z-40"
          >
            <WifiOff className="w-3.5 h-3.5 shrink-0" />
            <span>Using local questions — AI unavailable</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStartSetup} />
        )}
        {appState === 'setup' && (
          <SetupScreen key="setup" onBegin={handleBeginQuiz} getHighScore={getHighScore} />
        )}
        {appState === 'loading' && selectedCategory && selectedDifficulty && (
          <LoadingScreen
            key="loading"
            category={selectedCategory}
            difficulty={selectedDifficulty}
          />
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
