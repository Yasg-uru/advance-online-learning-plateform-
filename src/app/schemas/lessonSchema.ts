import { z } from "zod";
import { ResourceSchema } from "./ResourceSchema";

export const LessonSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  contentUrl: z.string().url("Invalid Url format"),
  contentType: z.enum(["Vedio", "Article", "Quiz", "Assignment"]),
  duration: z.number().positive("Duration must be positive"),
  resources: z.array(ResourceSchema),
});
