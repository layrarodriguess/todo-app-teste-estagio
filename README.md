## Como rodar

Precisa ter Node.js 18+ e PostgreSQL instalados.

### 1. Criar o banco

```bash
createdb todo_app
psql -d todo_app -f backend/src/db/migrations/001_create_tasks_table.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # depois edita o .env com o usuário/senha do seu banco
npm install
npm run dev             # roda em http://localhost:3001
```

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev             # roda em http://localhost:5173
```

Abre `http://localhost:5173` no navegador.

## Rotas da API

| Método | Rota             | O que faz                    |
|--------|------------------|-------------------------------|
| GET    | `/api/tasks`     | Lista todas as tarefas        |
| GET    | `/api/tasks/:id` | Busca uma tarefa específica   |
| POST   | `/api/tasks`     | Cria uma tarefa               |
| PUT    | `/api/tasks/:id` | Atualiza título e/ou status   |
| DELETE | `/api/tasks/:id` | Apaga uma tarefa              |
| GET    | `/api/health`    | Ver se o servidor está no ar  |

Erros voltam nesse formato: `{ "error": "mensagem" }`

## Algumas decisões que tomei

- Troquei o array em memória por PostgreSQL, pra não perder os dados toda
  vez que reinicia o servidor
- Separei a lógica das tarefas numa pasta `services/`, então o controller
  só valida e chama o service
- Usei Zod pra validar o que chega na API (título vazio, tipo errado etc.)
- Backend usa `import`/`export` (ES Modules) em vez de `require`
- PostgreSQL está integrado
- Criei taskRepository.js e agora o repository 

## O que eu faria com mais tempo

- Testes automatizados
- Drag-and-drop pra reordenar tarefas
- Autenticação, caso precisasse de mais de um usuário

## Commits

Segui o padrão [Conventional Commits](https://www.conventionalcommits.org/),
com cada etapa em um commit separado.
