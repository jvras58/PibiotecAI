import { FastifyRequest, FastifyReply } from 'fastify';
import { askLlama } from '../../config/llhama'; 
import { loadPromptTemplateByName } from '../../utils/loadPrompTemplate';
import { PromptDetail } from '../lib/promptRegistry';

interface AugmentedFastifyRequest extends FastifyRequest {
  validatedPromptData?: Record<string, any>;
  promptDetail?: PromptDetail;
}

export async function generateLlamaContent(request: AugmentedFastifyRequest, reply: FastifyReply) {
  const { validatedPromptData, promptDetail } = request;

  if (!validatedPromptData || !promptDetail) {
    request.log.error('Dados de validação ou detalhes do prompt ausentes na solicitação (Llama)');
    return reply.status(500).send({ error: 'Erro interno do servidor: Dados de validação ausentes' });
  }

  try {
    const template = await loadPromptTemplateByName(promptDetail.templateName);
    
    let prompt = template;
    for (const key in validatedPromptData) {
      if (Object.prototype.hasOwnProperty.call(validatedPromptData, key)) {
        const placeholder = new RegExp(`{${key}}`, 'g');
        prompt = prompt.replace(placeholder, String(validatedPromptData[key]));
      }
    }

    const response = await askLlama(prompt); 
    return reply.send({
      ai_response: response, 
      // TODO: Add other LLaMA specific metadata if available and needed
    });
  } catch (err: any) {
    if (err.message && err.message.startsWith('Falha ao carregar o modelo de prompt')) {
        request.log.error(`Erro em generateLlamaContent: ${err.message}`);
        return reply.status(404).send({ error: err.message });
    }
    request.log.error('Erro ao gerar conteúdo com Llama:', err);
    return reply.status(500).send({ error: 'Erro ao gerar conteúdo com Llama' });
  }
}

export async function llamaPing(request: FastifyRequest, reply: FastifyReply) {
  try {
    await askLlama('ping');
    return reply.send({ llama: 'pong' });
  } catch (err) {
    request.log.error('Error testing Llama:', err);
    return reply.status(500).send({ error: 'Error testing Llama' });
  }
}