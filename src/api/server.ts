import Fastify, { FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import GeminiRoutes from './routes/gemini.routes';
import { configServerOption } from '../config/serverconfig';
import LlamaRoutes from './routes/llama.routes';


const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const host = '0.0.0.0';

const startServer = async () => {
    const serverOptions = await configServerOption();
    const app: FastifyInstance = Fastify(serverOptions);

    app.register(fastifyCors, {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Registro das rotas
    app.register(GeminiRoutes, { prefix: '/api/gemini' });
    app.register(LlamaRoutes, { prefix: '/api/llama' });

    app.get('/', async (_request, _reply) => {
        return { message: 'welcome to API' };
    });

    try {
        await app.listen({ port, host });
        app.log.info(`Server running at http://${host}:${port}/`);
    } catch (err) {
        app.log.error('Error starting server:', err);
        process.exit(1);
    }
};

startServer();