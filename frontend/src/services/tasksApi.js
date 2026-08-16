const API_URL = "http://localhost:3001/api/tasks";

/**
 * Camada de acesso à API. Mantém todo o conhecimento sobre URLs, fetch
 * e formato de resposta isolado aqui — os componentes React só chamam
 * essas funções e recebem dados prontos ou um erro já tratado.
 */

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Erro na requisição (status ${response.status})`);
  }
  // DELETE retorna 204 sem corpo
  if (response.status === 204) return null;
  return response.json();
}

export async function fetchTasks() {
  const response = await fetch(API_URL);
  return handleResponse(response);
}

export async function createTask(title) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return handleResponse(response);
}

export async function updateTask(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}
