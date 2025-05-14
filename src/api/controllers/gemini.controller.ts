import { FastifyRequest, FastifyReply } from 'fastify';
import { loadPromptTemplate } from '../../utils/loadPrompTemplate';
import { generateLessonPlan } from '../services/lessonService';
import { askGemini } from '../../config/gemini';

let promptTemplate: string | undefined;

async function getPromptTemplate() {
  if (!promptTemplate) {
    promptTemplate = await loadPromptTemplate();
  }
  return promptTemplate;
}

export async function generateLesson(request: FastifyRequest, reply: FastifyReply) {
  const { subject, grade_level, topic } = request.body as { subject: string; grade_level: string; topic: string };

  if (!subject || !grade_level || !topic) {
    return reply.status(400).send({ error: 'Parâmetros obrigatórios ausentes' });
  }

  try {
    const template = await getPromptTemplate();
    const lesson_plan = await generateLessonPlan(template, { subject, grade_level, topic }, askGemini);
    return reply.send({ lesson_plan });
  } catch (err) {
    request.log.error('Erro ao gerar plano de aula:', err);
    return reply.status(500).send({ error: 'Erro ao gerar plano de aula' });
  }
}

export async function ping(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({ message: 'pong' });
}