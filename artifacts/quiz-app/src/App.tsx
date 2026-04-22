import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/quiz/WelcomeScreen';
import SetupScreen from './components/quiz/SetupScreen';
import QuizScreen from './components/quiz/QuizScreen';
import ResultsScreen from './components/quiz/ResultsScreen';
import { Category, Difficulty, questions } from './data/questions';

export type AppState = 'welcome' | 'setup' | 'quiz' | 'results';

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
  
  // Setup selections
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  
  // Active quiz state
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  const handleStartSetup = () => {
    setAppState('setup');
  };

  const handleBeginQuiz = (category: Category, difficulty: Difficulty) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    
    // Filter and shuffle
    const filtered = questions.filter(q => q.category === category && q.difficulty === difficulty);
    const shuffled = shuffleArray(filtered).slice(0, 10); // pick 10
    
    const preparedQuestions = shuffled.map(q => {
      const options = shuffleArray([q.correctAnswer, ...q.incorrectAnswers]);
      return { ...q, options };
    });

    setActiveQuestions(preparedQuestions);
    setScore(0);
    setAppState('quiz');
  };

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setAppState('results');
  };

  const handlePlayAgain = () => {
    if (selectedCategory && selectedDifficulty) {
      handleBeginQuiz(selectedCategory, selectedDifficulty);
    } else {
      setAppState('setup');
    }
  };

  const handleTryDifferent = () => {
    setAppState('setup');
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col items-center justify-center overflow-hidden p-4 md:p-8">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStartSetup} />
        )}
        
        {appState === 'setup' && (
          <SetupScreen 
            key="setup" 
            onBegin={handleBeginQuiz} 
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
            onPlayAgain={handlePlayAgain}
            onTryDifferent={handleTryDifferent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
