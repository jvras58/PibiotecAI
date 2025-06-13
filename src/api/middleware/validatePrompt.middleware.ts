import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { ZodError } from 'zod';
import { getPromptDetail } from '../lib/promptRegistry';

interface PromptRequestBody {
  promptType: string;
  data: any;
}

export function validatePrompt(
  request: FastifyRequest<{ Body: PromptRequestBody }>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const { promptType, data } = request.body;

  if (!promptType) {
    reply.status(400).send({ error: 'promptType é obrigatório' });
    return;
  }

  const promptDetail = getPromptDetail(promptType);

  if (!promptDetail) {
    reply.status(400).send({ error: `Inválido promptType: ${promptType}` });
    return;
  }

  try {
    // Validate the 'data' object against the schema
    promptDetail.schema.parse(data); 
    
    // Attach validated data and prompt details to the request for the controller to use
    // This avoids re-fetching and ensures the controller uses the validated data.
    // It's good practice to type this if you have a common request augmentation pattern.
    (request as any).validatedPromptData = data; 
    (request as any).promptDetail = promptDetail;

    done();
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({
        error: 'Validation failed',
        // Providing detailed issues is good for debugging on the client-side
        issues: error.errors.map(e => ({ 
          path: e.path.join('.'), 
          message: e.message 
        })),
      });
    } else {
      // Log unexpected errors for server-side diagnostics
      request.log.error('Erro inesperado durante a validação:', error);
      reply.status(500).send({ error: 'Erro interno do servidor durante a validação' });
    }
  }
}
