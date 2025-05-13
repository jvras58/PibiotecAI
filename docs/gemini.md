# Autenticação Google Cloud para Aplicações Node.js

Guia rápido para configurar a autenticação em desenvolvimento e produção ao utilizar serviços do Google Cloud, como Vertex AI (API Gemini).

## Desenvolvimento (Local)

### Passo 1: Instalar o Google Cloud CLI

Baixe e instale o Google Cloud CLI (gcloud) através do [site oficial](https://cloud.google.com/sdk/docs/install).

Após instalar, configure seu projeto usando:

```bash
gcloud init
```

### Passo 2: Autenticar localmente

Use o comando abaixo para autenticar com sua conta Google:

```bash
gcloud auth application-default login
```

Este comando cria credenciais locais úteis somente em desenvolvimento.

## Produção (Ambiente seguro)

Para produção, utilize contas de serviço com credenciais dedicadas e seguras.

### Passo 1: Criar uma Conta de Serviço

* Vá ao [Console do Google Cloud](https://console.cloud.google.com/).
* Navegue até **IAM & Admin** > **Contas de Serviço**.
* Clique em **Criar conta de serviço**:

  * Dê um nome claro (ex: `minha-aplicacao-prod`).
  * Clique em **Criar e continuar**.
* Conceda o papel necessário (ex: **Usuário da Vertex AI**).
* Clique em **Continuar** e depois em **Concluir**.

### Passo 2: Baixar o Arquivo de Credenciais JSON

* Na lista de contas de serviço, selecione a criada.
* Vá até a aba **Chaves** e clique em **Adicionar chave** > **Criar nova chave**.
* Selecione JSON e clique em **Criar**. Guarde esse arquivo de forma segura (não versionar no Git).

### Passo 3: Configurar em sua aplicação Node.js

Salve o arquivo JSON em um local seguro no seu servidor (ex: `/etc/secrets/gcp-credentials.json`).

Configure a variável de ambiente em sua aplicação:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/etc/secrets/gcp-credentials.json"
```

### Exemplo Node.js com Vertex AI

Exemplo básico configurado para Vertex AI:

```javascript
const { GoogleGenAI } = require("@google/genai");

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION;

const genAI = new GoogleGenAI({
    vertexai: true,
    project: PROJECT_ID,
    location: LOCATION,
});

async function gerarConteudo(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
    const resultado = await model.generateContent(prompt);
    console.log(resultado.response.text());
}

// Uso
gerarConteudo("Explique computação quântica de maneira simples.");
```