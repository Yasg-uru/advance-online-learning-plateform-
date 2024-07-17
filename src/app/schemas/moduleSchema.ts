import { z } from "zod";
import { LessonSchema } from "./lessonSchema";
export const moduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  lessons: z.array(LessonSchema),
  orderIndex: z.number().positive("Order index must be positive"),
});
