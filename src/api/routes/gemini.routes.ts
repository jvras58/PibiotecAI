import { FastifyInstance } from 'fastify';
import { generateContent, geminiPing } from '../controllers/gemini.controller';
import { validatePrompt } from '../middleware/validatePrompt.middleware';

export default async function GeminiRoutes(fastify: FastifyInstance) {
    fastify.get('/ping', geminiPing);
    
    fastify.post(
        '/generate', 
        { preHandler: [validatePrompt] }, 
        generateContent 
    );
}