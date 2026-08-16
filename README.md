# Minhas Tarefas — To-Do App

Aplicação Full Stack de lista de tarefas, desenvolvida como teste prático de
estágio. Backend em **Node.js + Express** (API REST, dados em memória) e
frontend em **React + Vite**.

## Funcionalidades

- Criar, listar, editar e excluir tarefas (CRUD completo)
- Marcar tarefas como concluídas / pendentes
- Filtrar por: todas / pendentes / concluídas
- Atualizações otimistas na interface (a tela responde antes da API confirmar)
- Layout responsivo (mobile e desktop)
- Tratamento de erros de rede e de validação

## Stack técnica

| Camada    | Tecnologia                          |
|-----------|--------------------------------------|
| Backend   | Node.js, Express, CORS               |
| Frontend  | React, Vite                          |
| Estado    | Array em memória (sem banco de dados)|

## Estrutura do projeto

```
todo-app/
├── backend/
│   └── src/
│       ├── controllers/    # lógica de cada endpoint
│       ├── routes/         # definição das rotas REST
│       ├── data/           # "banco" em memória
│       └── server.js       # ponto de entrada do Express
└── frontend/
    └── src/
        ├── components/     # TaskForm, TaskItem, TaskList
        ├── services/       # camada de comunicação com a API
        ├── App.jsx         # orquestração de estado
        └── main.jsx        # ponto de entrada do React
```

## Como rodar o projeto

Requer Node.js 18+ instalado.

### 1. Backend

```bash
cd backend
npm install
npm run dev      # inicia com nodemon em http://localhost:3001
# ou: npm start   # inicia sem reload automático
```

### 2. Frontend

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
| POST   | `/api/tasks`       | Cria uma nova tarefa                | `{ "title": "string" }`            |
| PUT    | `/api/tasks/:id`   | Atualiza título e/ou status         | `{ "title"?: string, "completed"?: boolean }` |
| DELETE | `/api/tasks/:id`   | Remove uma tarefa                   | —                                   |
| GET    | `/api/health`      | Verifica se o servidor está no ar   | —                                   |

Todas as respostas de erro seguem o formato `{ "error": "mensagem" }`.

## Decisões técnicas

- **Sem banco de dados, por design:** os dados vivem num array em memória
  isolado em `data/tasksStore.js`. Essa camada foi separada do controller
  de propósito — se no futuro fosse necessário trocar por um banco real
  (SQLite, MongoDB etc.), apenas esse arquivo mudaria.
- **Validação no backend:** título vazio é rejeitado com `400`, e IDs
  inexistentes retornam `404` — a API não confia apenas na validação do
  frontend.
- **Atualização otimista no frontend:** ao marcar/editar/excluir uma
  tarefa, a interface atualiza imediatamente e só reverte se a API
  retornar erro. Isso deixa a experiência mais fluida sem esconder falhas.
- **CSS puro (sem biblioteca de UI):** para um projeto desse tamanho, uma
  lib de componentes seria peso desnecessário; CSS puro com variáveis dá
  controle total do design responsivo.

## O que faria diferente com mais tempo

- Persistência real com um banco de dados leve (SQLite) e/ou `localStorage`
  como fallback offline
- Testes automatizados (Jest/Supertest no backend, React Testing Library no frontend)
- Drag-and-drop para reordenar tarefas
- Autenticação, caso a aplicação precisasse ser multiusuário

## Commits

O histórico de commits segue o padrão [Conventional Commits](https://www.conventionalcommits.org/),
com cada etapa do desenvolvimento isolada em um commit semântico
(`feat`, `fix`, `docs`, `chore` etc.), em vez de um único commit final.
