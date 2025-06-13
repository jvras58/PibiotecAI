import { FastifyRequest, FastifyReply } from 'fastify';
import { loadPromptTemplateByName } from '../../utils/loadPrompTemplate';
import { askGemini } from '../../config/gemini';
import { PromptDetail } from '../lib/promptRegistry';

interface AugmentedFastifyRequest extends FastifyRequest {
  validatedPromptData?: Record<string, any>;
  promptDetail?: PromptDetail;
}

export async function generateContent(request: AugmentedFastifyRequest, reply: FastifyReply) {
  const { validatedPromptData, promptDetail } = request;

  if (!validatedPromptData || !promptDetail) {
    request.log.error('Dados de validação ou detalhes do prompt ausentes na solicitação (Gemini)');
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

    const response = await askGemini(prompt);
    return reply.send({
      ai_response: response.text ?? '', 
      usageMetadata: response.usageMetadata ?? null,
      modelVersion: response.modelVersion ?? null,
      promptFeedback: response.promptFeedback ?? null,
    });
  } catch (err: any) {
    if (err.message && err.message.startsWith('Falha ao carregar o modelo de prompt')) {
        request.log.error(`Erro em generateContent (Gemini): ${err.message}`);
        return reply.status(404).send({ error: err.message });
    }
    request.log.error('Erro ao gerar conteúdo com Gemini:', err);
    return reply.status(500).send({ error: 'Erro ao gerar conteúdo com Gemini' });
  }
}

export async function geminiPing(request: FastifyRequest, reply: FastifyReply) {
  try {
    await askGemini('ping');
    return reply.send({ gemini: 'pong' });
  } catch (err) {
    request.log.error('Error testing Gemini:', err);
    return reply.status(500).send({ error: 'Error testing Gemini' });
  }
}