import { FastifyInstance } from 'fastify';
import { generateLesson, geminiPing } from '../controllers/gemini.controller';

export default async function GeminilessonRoutes(fastify: FastifyInstance) {
    fastify.get('/ping', geminiPing);
    fastify.post('/generate-lesson', generateLesson);
}