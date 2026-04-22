import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const CATEGORY_PROMPTS: Record<string, string> = {
  web: "web development (HTML, CSS, JavaScript, TypeScript, React, Node.js, REST APIs, browser APIs, web security, performance optimization, build tools, CSS frameworks, accessibility)",
  math: "mathematics (arithmetic, algebra, geometry, trigonometry, calculus, statistics, probability, number theory, linear algebra, combinatorics, logic, discrete mathematics)",
  general: "general knowledge (world history, geography, science, biology, chemistry, physics, astronomy, literature, art, music, notable people, inventions, world records, current events, culture)",
};

const DIFFICULTY_DESCRIPTIONS: Record<string, string> = {
  easy: "introductory level — suitable for beginners or casual learners. Questions should have clear, unambiguous answers.",
  medium: "intermediate level — requires solid understanding of the topic. Some reasoning required.",
  hard: "advanced/expert level — deep knowledge required. Questions may involve nuanced concepts, edge cases, or lesser-known facts.",
};

interface GeneratedQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  category: string;
  difficulty: string;
}

router.post("/quiz/questions", async (req, res) => {
  const { category, difficulty, count = 10 } = req.body as {
    category: string;
    difficulty: string;
    count?: number;
  };

  if (!category || !difficulty) {
    res.status(400).json({ error: "category and difficulty are required" });
    return;
  }

  const topicDesc = CATEGORY_PROMPTS[category] ?? category;
  const diffDesc = DIFFICULTY_DESCRIPTIONS[difficulty] ?? difficulty;

  const prompt = `You are a quiz question generator. Generate exactly ${count} unique trivia/knowledge quiz questions about ${topicDesc}.

Difficulty: ${diffDesc}

Requirements:
- Each question must be factually accurate
- Each question must have exactly 1 correct answer and exactly 3 plausible but incorrect answers
- Incorrect answers should be believable (not obviously wrong) to make the quiz challenging
- Questions must be different from each other — no repetition or near-duplicates
- Keep questions concise (ideally under 20 words)
- Keep all answers concise (ideally under 10 words each)
- Do NOT number the questions in the question text itself
- Do NOT include hints or explanations

Respond with ONLY a valid JSON array (no markdown, no code blocks, no extra text) in this exact format:
[
  {
    "question": "Question text here?",
    "correctAnswer": "The correct answer",
    "incorrectAnswers": ["Wrong answer 1", "Wrong answer 2", "Wrong answer 3"]
  }
]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 4096,
      messages: [
        {
          role: "system",
          content: "You are a quiz question generator. Always respond with valid JSON only — no markdown, no code blocks, no extra text.",
        },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";

    // Strip any accidental markdown code fences
    const cleaned = raw.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim();

    let parsed: { question: string; correctAnswer: string; incorrectAnswers: string[] }[];
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      req.log.error({ raw }, "Failed to parse AI response as JSON");
      res.status(500).json({ error: "AI response was not valid JSON" });
      return;
    }

    if (!Array.isArray(parsed)) {
      res.status(500).json({ error: "AI response was not an array" });
      return;
    }

    const questions: GeneratedQuestion[] = parsed
      .filter(
        (q) =>
          q.question &&
          q.correctAnswer &&
          Array.isArray(q.incorrectAnswers) &&
          q.incorrectAnswers.length >= 3
      )
      .map((q, idx) => ({
        id: `ai-${category}-${difficulty}-${Date.now()}-${idx}`,
        question: q.question,
        correctAnswer: q.correctAnswer,
        incorrectAnswers: q.incorrectAnswers.slice(0, 3),
        category,
        difficulty,
      }));

    if (questions.length === 0) {
      res.status(500).json({ error: "No valid questions generated" });
      return;
    }

    res.json({ questions, source: "ai" });
  } catch (err) {
    req.log.error({ err }, "Failed to generate questions via AI");
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
