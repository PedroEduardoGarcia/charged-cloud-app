# Gerenciador de Empresas Fullstack - CRUD com Sincronização Offline/Online

![React](https://img.shields.io/badge/React-18.0.0-blue?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.0.0-green?style=flat&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat&logo=mysql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Dexie.js](https://img.shields.io/badge/Dexie.js-3.2-blue?style=flat)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?style=flat&logo=bootstrap)
![Docker](https://img.shields.io/badge/Docker-20.10-blue?style=flat&logo=docker)


## Descrição

Este é um sistema web para gerenciamento de empresas, desenvolvido com foco na funcionalidade de sincronização offline/online. Ele permite realizar operações de CRUD (Criar, Ler, Atualizar e Excluir) em empresas, mesmo sem conexão à internet. Quando a API se encontra offline, o usuário recebe um aviso visual e os dados são armazenados localmente no navegador utilizando IndexedDB, gerenciado com o auxílio do Dexie.js. Quando a conexão é restabelecida, os dados locais são sincronizados automaticamente com o servidor.

O projeto utiliza tecnologias modernas e boas práticas de desenvolvimento, oferecendo uma interface responsiva e amigável, com um backend robusto que garante a persistência e a integração dos dados.

## Tecnologias Utilizadas

- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express, Sequelize
- **Banco de Dados:** MySQL
- **Persistência Local:** IndexedDB via Dexie.js
- **Outras:** TypeScript, Docker para containerização

### Tecnologias Escolhidas

- **Bootstrap:** Framework CSS que facilita o desenvolvimento rápido de interfaces responsivas, garantindo consistência no design com componentes pré-desenhados. Escolhido por sua ampla documentação e fácil integração com React, acelerando a construção de uma UI amigável e funcional.
- **Express:** Ideal para criar uma API REST eficiente, com alta flexibilidade e suporte a bibliotecas populares.
- **Sequelize:** ORM para Node.js que facilita a interação com bancos de dados relacionais como MySQL. Ele abstrai consultas SQL, reduzindo a complexidade do código e aumentando a produtividade no desenvolvimento.
- **IndexedDB:** API nativa do navegador para armazenamento local de grandes volumes de dados estruturados
  - **Dexie.js:** Biblioteca que simplifica o uso do IndexedDB, oferecendo uma API mais intuitiva e poderosa para consultas e transações.

## Funcionalidades

- **CRUD de Empresas:**
  - Adicionar, visualizar, editar e excluir empresas.
  - Campos obrigatórios: Nome, CNPJ (com validação e máscara), endereço e telefone.

- **Persistência Local:**
  - Armazenamento de dados no navegador utilizando IndexedDB via Dexie.js.
  - Operações offline garantidas.

- **Sincronização Offline/Online:**
  - Detecção automática do estado da API.
  - Sincronização automática dos dados locais com o servidor ao restabelecer conexão.

- **API REST:**
  - Endpoints para gerenciar o CRUD de empresas, desenvolvido com Node.js, TypeScript e Dcoker para containerizar o Banco de Dados.

### Validação de CNPJ

O sistema implementa validação e geração de CNPJs seguindo o algoritmo oficial da Receita Federal:
- Validação completa do formato XX.XXX.XXX/XXXX-XX
- Verificação dos dígitos através de cálculo com pesos específicos
- Detecção automática de números repetidos e inválidos
- Máscara automática durante digitação
- Geração de CNPJs válidos para testes
- Implementação TypeScript com validação de tipos

> **Nota**: A validação garante apenas a integridade estrutural do CNPJ, não sua existência real na Receita Federal.

### Sincronização Offline/Online

O sistema implementa um robusto mecanismo de sincronização que permite operações mesmo sem conexão com o servidor:

#### Funcionamento

- Verificação automática do status da API a cada 5 segundos
- Indicador visual do estado da conexão na interface
- Armazenamento local automático durante modo offline
- Sincronização bidirecional quando a conexão é restaurada

#### Estados de Sincronização

- `added`: Registros criados localmente aguardando sincronização
- `updated`: Modificações locais pendentes
- `deleted`: Exclusões locais aguardando sincronização
- `synced`: Dados totalmente sincronizados com o servidor

#### Processo de Sincronização

1. **Modo Offline**
   - Todas as operações CRUD são realizadas localmente
   - Dados são marcados com status apropriado
   - Interface continua 100% funcional

2. **Reconexão**
   - Sincronização automática ao detectar conexão
   - Upload das mudanças locais para o servidor
   - Download das atualizações do servidor
   - Resolução automática de conflitos baseada em timestamps

3. **Persistência**
   - Utiliza IndexedDB através do Dexie.js
   - Garantia de durabilidade dos dados offline
   - Sincronização resiliente a falhas de rede

## Como Instalar e Rodar o Projeto

### Requisitos
- Node.js >= 20.0.0
- Docker e Docker Compose (opcional, para ambiente containerizado)

### Instruções

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/PedroEduardoGarcia/charged-cloud-app
   cd nome-do-repositorio
   ```
   ou via ssh.

2. **Instale as dependências:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env` na pasta `backend` e preencha as informações necessárias, como credenciais do banco de dados.

4. **Inicie o servidor do banco de dados com Docker:**
   ```bash
   cd docker
   docker compose up -d
   ```

5. **Configure o banco de dados e execute as migrations:**
   - Certifique-se de que o banco de dados MySQL está rodando.
   - Atualize as credenciais do banco de dados no arquivo de configuração do backend (`.env` ou outro arquivo correspondente).
   - Execute as migrations para criar as tabelas necessárias:
     ```bash
     cd backend/database
     npx sequelize-cli db:migrate
     ```

6. **Inicie o backend:**
   ```bash
   cd backend
   npm run dev
   ```

7. **Inicie o frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Acesse o sistema:**
   - O backend está disponível em `http://localhost:3001`
   - O frontend está disponível em `http://localhost:5173`


## API Endpoints

### Health Check

- `GET /v1/health` - Verifica o status da API

### Empresas

- `GET /v1/company` - Lista todas as empresas
- `GET /v1/company/:id` - Retorna uma empresa específica pelo ID
- `POST /v1/company` - Cria uma nova empresa
- `PUT /v1/company/:id` - Atualiza uma empresa existente pelo ID
- `DELETE /v1/company/:id` - Remove uma empresa pelo ID

### Dados de Teste

- `POST /v1/company/random` - Cria uma empresa com dados aleatórios
- `GET /v1/generator` - Gera dados aleatórios para teste

## Trabalhos Futuros

- Implementar tratamento de conflitos entre dados locais e remotos.
- Adicionar filtros e buscas na interface do CRUD.
- Melhorar a experiência de usuário com mensagens de feedback mais detalhadas.
- Criar testes automatizados para cobertura completa de funcionalidades.

---

**Autor:** [Pedro Eduardo Garcia](https://github.com/PedroEduardoGarcia)
