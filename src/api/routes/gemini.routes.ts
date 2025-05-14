import { FastifyInstance } from 'fastify';
import { generateLesson } from '../controllers/gemini.controller';

export default async function GeminilessonRoutes(fastify: FastifyInstance) {
  fastify.post('/generate-lesson', generateLesson);
  fastify.get('/ping', async (_request, reply) => {
    return reply.send({ message: 'pong' });
  }
  );

}