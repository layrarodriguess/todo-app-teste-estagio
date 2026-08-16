/**
 * "Banco de dados" em memória.
 *
 * Como o desafio pede para gerenciar estado sem banco de dados,
 * usamos um array em memória + um contador de IDs. Isso é isolado
 * num módulo próprio para que, se um dia quisermos trocar por um
 * banco real (ex: SQLite, MongoDB), só este arquivo precisaria mudar
 * — o restante da aplicação não sabe (nem precisa saber) como os
 * dados são armazenados.
 *
 * Observação: como é um array em memória, os dados são reiniciados
 * toda vez que o servidor reinicia. Isso é esperado e aceitável
 * para este desafio.
 */

let tasks = [
  {
    id: 1,
    title: "Estudar para o teste de estágio",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Configurar o ambiente do projeto",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find((task) => task.id === id);
}

function create({ title }) {
  const newTask = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

function update(id, updates) {
  const task = getById(id);
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
