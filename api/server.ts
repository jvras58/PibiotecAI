import Fastify from 'fastify';
import { loadPromptTemplate } from './utils/loadPrompTemplate';
import { generateLessonPlan } from './services/lessonService';

const fastify = Fastify({ logger: true });

let promptTemplate: string;

async function bootstrap() {
  try {
    promptTemplate = await loadPromptTemplate();

    fastify.post('/generate-lesson', async (request, reply) => {
      const { subject, grade_level, topic } = request.body as { subject: string; grade_level: string; topic: string };

      if (!subject || !grade_level || !topic) {
        return reply.status(400).send({ error: 'Parâmetros obrigatórios ausentes' });
      }

      try {
        const lesson_plan = await generateLessonPlan(promptTemplate, { subject, grade_level, topic });
        return { lesson_plan };
      } catch (err) {
        fastify.log.error('Erro ao gerar plano de aula:', err);
        return reply.status(500).send({ error: 'Erro ao gerar plano de aula' });
      }
    });

    await fastify.listen({ port: 3000 });
    console.log('Servidor rodando na porta 3000');
  } catch (err) {
    fastify.log.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

bootstrap();