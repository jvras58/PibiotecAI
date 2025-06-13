# IA-Ladies

Projeto para testes e integração com APIs de IA generativa.

## ✅ APIs Suportadas

- [x] Gemini
- [x] Llama
- [ ] Deepseek

## 🛠️ Requisitos

| **Tecnologia** | **Versão**   |
| -------------- | ------------ |
| **Runtime**    |              |
| Node.js        | v18.x.x^     |
| **Framework**  |              |
| Fastify.js     | v5.x.x       |
| **Devtime**    |              |
| npm            | v4.x.x^      |

## 📁 Organização do Projeto

```
/
├─ 📁 docs                   -> Artefatos de documentação do repositório
├─ 📁 Api                    -> Entrypoint da aplicação
│  ├─ 📁 services            -> Services para aplicação
│  │  └─ lessonService.ts     -> Serviço para gerar o plano de aula
│  ├─ 📁 config              -> Configurações usadas na API
│  │  └─ gemini.ts           -> Configurações de conexão com a Gemini API
│  ├─ 📁 Utils               -> Módulo de utilitários para toda a aplicação
│  │  └─ loadPromptTemplate.ts -> Carrega o prompt definido
│  │  └─ prompt.txt            -> Arquivo de Prompt
│  └─ server.ts              -> Entrypoint do servidor
├─ 📁 tests                  -> Testes da aplicação
│  └─ routes.http            -> Envia solicitações HTTP e visualiza respostas no VSCode
├─ .gitignore
├─ package.json              -> Definições do projeto
├─ README.md
```

## 🚀 Como Iniciar

1. Instale as dependências:
   ```
   pnpm install
   ```

2. Inicie o servidor em modo desenvolvimento:
   ```
   pnpm run dev
   ```

3. Acesse a API:
   ```
   http://localhost:3000/
   ```

> Atualmente, apenas o endpoint `/generate-lesson` (POST) está disponível, utilizando a API do Gemini.

- Utilize o Postman ou outro cliente HTTP para enviar o body (parâmetros do prompt) na requisição.
- Também é possível utilizar o Rest Client configurado no arquivo [`tests/routes.http`](./tests/routes.http) para testar as rotas diretamente pelo VSCode.

---

Sinta-se à vontade para contribuir ou sugerir melhorias!