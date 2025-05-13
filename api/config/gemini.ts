import { GoogleGenAI } from '@google/genai';
import { config } from 'dotenv';
config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY não definida nas variáveis de ambiente.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function askGemini(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });
    return response.text ?? '';
  } catch (error) {
    console.error('Erro ao consultar Gemini:', error);
    throw new Error('Falha ao obter resposta do Gemini');
  }
}