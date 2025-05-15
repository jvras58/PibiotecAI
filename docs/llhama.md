# Guia de Configuração do Ollama

## Links do Repositório
- Repositório GitHub: [ollama/ollama](https://github.com/ollama/ollama)
- Imagem Docker: [ollama/ollama](https://hub.docker.com/r/ollama/ollama)

## Início Rápido com Docker

### Baixar a Imagem Docker
```bash
docker pull ollama/ollama
```

### Executar o Contêiner
Inicie o Ollama em modo destacado com encaminhamento de porta:
```bash
docker run -d -p 11434:11434 --name ollama ollama/ollama
```

### Verificar a Instalação
Verifique se a API do Ollama está respondendo:
```bash
curl http://localhost:11434
```

### Gerenciamento do Contêiner
Verifique o contêiner em execução:
```bash
docker ps
```

Visualize as portas mapeadas:
```bash
docker port ollama
```

## Baixando Modelos no Docker

Para que o Ollama funcione, é necessário baixar pelo menos um modelo. Como o Ollama está rodando em um contêiner Docker, utilize o comando abaixo para acessar o terminal do contêiner e baixar o modelo desejado:

```bash
docker exec -it ollama ollama pull llama3
```

Substitua `llama3` pelo modelo que preferir (ex: `llama2`, `mistral`, etc).

Após o download, verifique se o modelo está disponível:

```bash
docker exec -it ollama ollama list
```

Você também pode checar via API:

```bash
curl http://localhost:11434/api/tags
```

Se aparecer o modelo na lista, sua API já pode ser utilizada normalmente!
