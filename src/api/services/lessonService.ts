
interface LessonParams {
  subject: string;
  grade_level: string;
  topic: string;
}

export type ContentGenerator = (prompt: string) => Promise<string>;

export async function generateLessonPlan(
  template: string,
  params: LessonParams,
  generator: ContentGenerator
): Promise<string> {
  let prompt = template;
  for (const [key, value] of Object.entries(params)) {
    prompt = prompt.replace(`{${key}}`, value);
  }
  return generator(prompt);
}