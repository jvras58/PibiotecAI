import { promises as fs } from 'fs';
import * as path from 'path';

const templateCache: Record<string, string> = {};

export async function loadPromptTemplateByName(templateName: string): Promise<string> {
  if (templateCache[templateName]) {
    return templateCache[templateName];
  }

  // Templates are in 'src/prompts/' relative to the project root.
  // __dirname for loadPrompTemplate.ts is 'src/utils/'
  // So, path.join(__dirname, '..', 'prompts', templateName) is correct.
  const templatePath = path.join(__dirname, '..', 'prompts', templateName);
  
  try {
    const templateContent = await fs.readFile(templatePath, 'utf8');
    templateCache[templateName] = templateContent;
    return templateContent;
  } catch (error) {
    console.error(`Erro ao carregar modelo de prompt '${templateName}' de '${templatePath}':`, error);
    throw new Error(`Falha ao carregar o modelo de prompt: ${templateName}. Garantir que ele exista no 'src/prompts' diretório.`);
  }
}