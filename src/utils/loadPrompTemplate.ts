import { promises as fs } from 'fs';

export async function loadPromptTemplate(): Promise<string> {
  return fs.readFile('src/utils/prompt.txt', 'utf8');
}