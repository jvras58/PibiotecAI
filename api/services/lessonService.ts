import { askGemini } from '../config/gemini';

interface LessonParams {
  subject: string;
  grade_level: string;
  topic: string;
}

export async function generateLessonPlan(template: string, params: LessonParams): Promise<string> {
  let prompt = template;
  for (const [key, value] of Object.entries(params)) {
    prompt = prompt.replace(`{${key}}`, value);
  }
  return askGemini(prompt);
}