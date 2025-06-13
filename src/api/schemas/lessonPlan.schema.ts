import { z } from 'zod';

export const lessonPlanSchema = z.object({
  subject: z.string().min(1, { message: "O assunto é obrigatório" }),
  grade_level: z.string().min(1, { message: "O nível de escolaridade é obrigatório" }),
  topic: z.string().min(1, { message: "O tópico é obrigatório" }),
});

export type LessonPlanData = z.infer<typeof lessonPlanSchema>;
