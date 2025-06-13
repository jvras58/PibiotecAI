import { FastifyInstance } from 'fastify';
import { generateLlamaContent, llamaPing } from '../controllers/llama.controller';
import { validatePrompt } from '../middleware/validatePrompt.middleware';

export default async function LlamaRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', llamaPing);
  
  fastify.post(
    '/generate', 
    { preHandler: [validatePrompt] }, 
    generateLlamaContent 
  );
}