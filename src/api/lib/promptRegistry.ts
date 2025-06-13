import { z } from 'zod';
import { lessonPlanSchema, technicalReportSchema } from '../schemas';

export interface PromptDetail {
  schema: z.ZodObject<any, any, any>;
  templateName: string;
}

export const promptRegistry: Record<string, PromptDetail> = {
  lesson_plan: {
    schema: lessonPlanSchema,
    templateName: 'lessonPlanPrompt.txt',
  },
  technical_report: {
    schema: technicalReportSchema,
    templateName: 'technicalReportPrompt.txt',
  },
};

export function getPromptDetail(promptType: string): PromptDetail | undefined {
  return promptRegistry[promptType];
}
