import { z } from "zod";
export const QuizOptionSchema = z.object({
  optionText: z.string().min(1, "Option text is string"),
  isCorrect: z.boolean(),
});
export const QuizQuestionsSchema = z.object({
  questionText: z.string().min(1, "Questions text is required"),
  questionType: z.enum(["Multiple Choice", "True/False", "Short Answer"]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  points: z.number().positive("Points must be positive"),
  options: z.array(QuizOptionSchema),
});
export const QuizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  instructions: z.string().min(1, "Instructions are required"),
  questions: z.array(QuizQuestionsSchema),
});
