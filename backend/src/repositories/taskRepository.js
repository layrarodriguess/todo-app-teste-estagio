import { pool } from "../db/pool.js";

async function findAll() {
  const { rows } = await pool.query(
    'SELECT id, title, completed, created_at AS "createdAt" FROM tasks ORDER BY id'
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    'SELECT id, title, completed, created_at AS "createdAt" FROM tasks WHERE id = $1',
    [id]
  );
  return rows[0] ?? null;
}

async function insert(title) {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING id, title, completed, created_at AS "createdAt"',
    [title]
  );
  return rows[0];
}

async function update(id, title, completed) {
  const { rows } = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($2, title),
         completed = COALESCE($3, completed)
     WHERE id = $1
     RETURNING id, title, completed, created_at AS "createdAt"`,
    [id, title ?? null, completed ?? null]
  );
  return rows[0] ?? null;
}

async function remove(id) {
  const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return rowCount > 0;
}

export const taskRepository = { findAll, findById, insert, update, remove };