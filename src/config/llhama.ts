import fetch from 'node-fetch';

export async function askLlama(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta do Ollama: ${response.statusText}`);
    }

    // Lê a resposta como texto e processa linha a linha (NDJSON)
    const text = await response.text();
    const lines = text.trim().split('\n');
    let result = '';
    for (const line of lines) {
      const data = JSON.parse(line);
      if (data.response) {
        result += data.response;
      }
    }
    return result;
    // TODO: Procurar uma forma de retornar o resultado em JSON somente....
    //const data: any  = await response.json();
    // return data.text;
  } catch (error) {
    console.error('Erro ao consultar Llama:', error);
    throw new Error('Falha ao obter resposta do Llama');
  }
}