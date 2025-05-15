import { FastifyInstance } from 'fastify';
import { generateLessonLlama, llamaPing } from '../controllers/llama.controller';

export default async function LlamaLessonRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', llamaPing);
  fastify.post('/generate-lesson', generateLessonLlama);
}