import { taskRepository } from "../repositories/taskRepository.js";

async function getAll() {
  return taskRepository.findAll();
}

async function getById(id) {
  return taskRepository.findById(id);
}

async function create({ title }) {
  return taskRepository.insert(title);
}

async function update(id, { title, completed }) {
  const existing = await taskRepository.findById(id);
  if (!existing) return null;

  return taskRepository.update(id, title, completed);
}

async function remove(id) {
  return taskRepository.remove(id);
}

export const taskService = { getAll, getById, create, update, remove };