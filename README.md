# Minhas Tarefas — To-Do App

Aplicação Full Stack de lista de tarefas, desenvolvida como teste prático de
estágio. Backend em **Node.js + Express** (API REST, persistência em
**PostgreSQL**, validação com **Zod**) e frontend em **React + Vite**.

## Funcionalidades

- Criar, listar, editar e excluir tarefas (CRUD completo)
- Marcar tarefas como concluídas / pendentes
- Filtrar por: todas / pendentes / concluídas
- Atualizações otimistas na interface (a tela responde antes da API confirmar)
- Layout responsivo (mobile e desktop)
- Tratamento de erros de rede e de validação

## Stack técnica

| Camada     | Tecnologia          | Versão   |
|------------|----------------------|----------|
| Backend    | Node.js              | 18+      |
| Backend    | Express               | ^4.21.2  |
| Backend    | pg (driver PostgreSQL)| ^8.13.1  |
| Backend    | Zod (validação)       | ^3.24.1  |
| Backend    | CORS                  | ^2.8.5   |
| Backend    | dotenv                | ^16.4.7  |
| Backend    | nodemon (dev)         | ^3.1.9   |
| Frontend   | React                 | ^18.3.1  |
| Frontend   | Vite                  | ^5.4.1   |
| Banco      | PostgreSQL            | 14+      |

As versões acima são as fixadas no `package.json` de cada pacote; rode
`npm install` para gerar o `package-lock.json` com as versões exatas
resolvidas no seu ambiente.

## Estrutura do projeto

```
todo-app/
├── backend/
│   └── src/
│       ├── controllers/    # controllers finos: validam com Zod e chamam o service
│       ├── services/       # regras de negócio (taskService)
│       ├── routes/         # definição das rotas REST
│       ├── schemas/        # schemas Zod de validação
│       ├── db/
│       │   ├── pool.js         # pool de conexão com o PostgreSQL
│       │   └── migrations/     # scripts SQL de criação das tabelas
│       └── server.js       # ponto de entrada do Express
└── frontend/
    └── src/
        ├── components/     # TaskForm, TaskItem, TaskList
        ├── services/       # camada de comunicação com a API
        ├── App.jsx         # orquestração de estado
        └── main.jsx        # ponto de entrada do React
```

## Como rodar o projeto

Requer Node.js 18+ e um PostgreSQL 14+ rodando localmente (ou acessível via rede).

### 1. Banco de dados

Crie o banco e rode a migration:

```bash
createdb todo_app
psql -d todo_app -f backend/src/db/migrations/001_create_tasks_table.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # ajuste DATABASE_URL com suas credenciais
npm install
npm run dev      # inicia com nodemon em http://localhost:3001
# ou: npm start   # inicia sem reload automático
```

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev      # inicia em http://localhost:5173
```

Abra `http://localhost:5173` no navegador. O frontend já está configurado
para consumir a API em `http://localhost:3001`.

## Endpoints da API

| Método | Rota              | Descrição                          | Corpo esperado                    |
|--------|-------------------|-------------------------------------|------------------------------------|
| GET    | `/api/tasks`       | Lista todas as tarefas              | —                                   |
| GET    | `/api/tasks/:id`   | Retorna uma tarefa específica       | —                                   |
| POST   | `/api/tasks`       | Cria uma nova tarefa                | `{ "title": "string" }`            |
| PUT    | `/api/tasks/:id`   | Atualiza título e/ou status         | `{ "title"?: string, "completed"?: boolean }` |
| DELETE | `/api/tasks/:id`   | Remove uma tarefa                   | —                                   |
| GET    | `/api/health`      | Verifica se o servidor está no ar   | —                                   |

Todas as respostas de erro seguem o formato `{ "error": "mensagem" }`.

## Decisões técnicas

- **Persistência em PostgreSQL:** os dados ficam numa tabela `tasks`
  (ver `db/migrations/`), acessada via `pg` através de um pool de conexão
  isolado em `db/pool.js`.
- **Camada de service:** toda a lógica de acesso a dados e regra de negócio
  fica em `services/taskService.js`. Os controllers ficam finos: validam a
  entrada e delegam ao service.
- **Validação com Zod:** os schemas em `schemas/taskSchemas.js` validam
  `body` e `params`; erros de validação são capturados por um middleware
  central em `server.js` e retornados como `400`. IDs inexistentes
  retornam `404` — a API não confia apenas na validação do frontend.
- **ES Modules:** o backend usa `import`/`export` (`"type": "module"` no
  `package.json`) em vez de `require`/`module.exports`.
- **Atualização otimista no frontend:** ao marcar/editar/excluir uma
  tarefa, a interface atualiza imediatamente e só reverte se a API
  retornar erro. Isso deixa a experiência mais fluida sem esconder falhas.
- **CSS puro (sem biblioteca de UI):** para um projeto desse tamanho, uma
  lib de componentes seria peso desnecessário; CSS puro com variáveis dá
  controle total do design responsivo.

## O que faria diferente com mais tempo

- Testes automatizados (Jest/Supertest no backend, React Testing Library no frontend)
- Migrations versionadas com uma ferramenta dedicada (ex: node-pg-migrate, Prisma)
- Drag-and-drop para reordenar tarefas
- Autenticação, caso a aplicação precisasse ser multiusuário

## Commits

O histórico de commits segue o padrão [Conventional Commits](https://www.conventionalcommits.org/),
com cada etapa do desenvolvimento isolada em um commit semântico
(`feat`, `fix`, `docs`, `chore` etc.), em vez de um único commit final.
