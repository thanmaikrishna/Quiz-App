import { useState, useCallback } from 'react';
import { Category, Difficulty } from '../data/questions';

type ScoreKey = `${Category}-${Difficulty}`;

interface HighScores {
  [key: string]: number;
}

export function useHighScores() {
  const [scores, setScores] = useState<HighScores>(() => {
    try {
      const stored = localStorage.getItem('quiz-high-scores');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const getHighScore = useCallback(
    (category: Category, difficulty: Difficulty): number => {
      const key: ScoreKey = `${category}-${difficulty}`;
      return scores[key] ?? 0;
    },
    [scores]
  );

  const saveHighScore = useCallback(
    (category: Category, difficulty: Difficulty, score: number, total: number) => {
      const key: ScoreKey = `${category}-${difficulty}`;
      const pct = Math.round((score / total) * 100);
      const prevPct = scores[key] ?? 0;
      if (pct > prevPct) {
        const updated = { ...scores, [key]: pct };
        setScores(updated);
        try {
          localStorage.setItem('quiz-high-scores', JSON.stringify(updated));
        } catch {
          // ignore storage errors
        }
        return true;
      }
      return false;
    },
    [scores]
  );

  return { getHighScore, saveHighScore };
}
