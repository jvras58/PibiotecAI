import fetch from 'node-fetch';

export async function askLlama(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false //TODO: Defina como true se você quiser streaming (NDJSON)
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta do Ollama: ${response.statusText}`);
    }

    const data: any = await response.json();
    console.log('Resposta do Llama:', data);
    return data.message.content; // A resposta está em data.message.content
  } catch (error) {
    console.error('Erro ao consultar Llama:', error);
    throw new Error('Falha ao obter resposta do Llama');
  }
}