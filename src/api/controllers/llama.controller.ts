import { FastifyRequest, FastifyReply } from 'fastify';
import { askLlama } from '../../config/llhama';
import { loadPromptTemplate } from '../../utils/loadPrompTemplate';

let promptTemplate: string | undefined;

async function getPromptTemplate() {
  if (!promptTemplate) {
    promptTemplate = await loadPromptTemplate();
  }
  return promptTemplate;
}

export async function generateLessonLlama(request: FastifyRequest, reply: FastifyReply) {
  const { subject, grade_level, topic } = request.body as { subject: string; grade_level: string; topic: string };

  if (!subject || !grade_level || !topic) {
    return reply.status(400).send({ error: 'Parâmetros obrigatórios ausentes' });
  }

  try {
    const template = await getPromptTemplate();
    const prompt = template
      .replace('{subject}', subject)
      .replace('{grade_level}', grade_level)
      .replace('{topic}', topic);

    const response = await askLlama(prompt);
    return reply.send({
      lesson_plan: response
    });
  } catch (err) {
    request.log.error('Erro ao gerar plano de aula com Llama:', err);
    return reply.status(500).send({ error: 'Erro ao gerar plano de aula com Llama' });
  }
}

export async function llamaPing(request: FastifyRequest, reply: FastifyReply) {
  try {
    await askLlama('ping');
    return reply.send({ llama: 'pong' });
  } catch (err) {
    request.log.error('Erro ao testar Llama:', err);
    return reply.status(500).send({ error: 'Erro ao testar Llama' });
  }
}