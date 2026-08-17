import { taskService } from "../services/taskService.js";
import {
  createTaskSchema,
  updateTaskSchema,
  idParamSchema,
} from "../schemas/taskSchemas.js";

export async function listTasks(req, res, next) {
  try {
    const tasks = await taskService.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function getTask(req, res, next) {
  try {
    const { id } = idParamSchema.parse(req.params);
    const task = await taskService.getById(id);

    if (!task) {
      return res.status(404).json({ error: `Tarefa com id ${id} não encontrada.` });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title } = createTaskSchema.parse(req.body);
    const newTask = await taskService.create({ title });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = idParamSchema.parse(req.params);
    const updates = updateTaskSchema.parse(req.body);
    const updated = await taskService.update(id, updates);

    if (!updated) {
      return res.status(404).json({ error: `Tarefa com id ${id} não encontrada.` });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = idParamSchema.parse(req.params);
    const deleted = await taskService.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: `Tarefa com id ${id} não encontrada.` });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
