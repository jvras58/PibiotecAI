import { z } from 'zod';

export const technicalReportSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  author: z.string().min(1, { message: "O autor é obrigatório" }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Formato de data inválido",
  }),
});

export type TechnicalReportData = z.infer<typeof technicalReportSchema>;
