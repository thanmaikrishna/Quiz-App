import { Category, Difficulty, Question } from '../data/questions';

export interface GeneratedQuestion extends Question {
  options?: string[];
}

interface ApiResponse {
  questions: Question[];
  source: 'ai' | 'fallback';
}

export async function fetchAiQuestions(
  category: Category,
  difficulty: Difficulty,
  count = 10
): Promise<{ questions: Question[]; source: 'ai' | 'fallback' }> {
  const response = await fetch('/api/quiz/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, difficulty, count }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  return data;
}
