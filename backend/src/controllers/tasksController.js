const tasksStore = require("../data/tasksStore");

/**
 * GET /api/tasks
 * Retorna todas as tarefas.
 */
function listTasks(req, res) {
  const tasks = tasksStore.getAll();
  res.status(200).json(tasks);
}

/**
 * POST /api/tasks
 * Cria uma nova tarefa. Espera { title: string } no corpo da requisição.
 */
function createTask(req, res) {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res
      .status(400)
      .json({ error: "O campo 'title' é obrigatório e não pode ser vazio." });
  }

  const newTask = tasksStore.create({ title: title.trim() });
  res.status(201).json(newTask);
}

/**
 * PUT /api/tasks/:id
 * Atualiza título e/ou status de conclusão de uma tarefa existente.
 */
function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return res
      .status(400)
      .json({ error: "O campo 'title', quando enviado, não pode ser vazio." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "O campo 'completed', quando enviado, deve ser booleano." });
  }

  const updated = tasksStore.update(id, { title, completed });

  if (!updated) {
    return res.status(404).json({ error: `Tarefa com id ${id} não encontrada.` });
  }

  res.status(200).json(updated);
}

/**
 * DELETE /api/tasks/:id
 * Remove uma tarefa existente.
 */
function deleteTask(req, res) {
  const id = Number(req.params.id);
  const deleted = tasksStore.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: `Tarefa com id ${id} não encontrada.` });
  }

  res.status(204).send();
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
