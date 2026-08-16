import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import * as tasksApi from "./services/tasksApi";
import "./App.css";

const FILTERS = {
  all: (task) => true,
  active: (task) => !task.completed,
  done: (task) => task.completed,
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tasksApi.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(
        "Não foi possível carregar as tarefas. Verifique se o backend está rodando em localhost:3001."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(title) {
    setIsSubmitting(true);
    setError(null);
    try {
      const newTask = await tasksApi.createTask(title);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggle(id, completed) {
    // Atualização otimista: refletimos a mudança na tela antes da resposta
    // do servidor, e revertemos se der erro. Deixa a UI mais responsiva.
    const previousTasks = tasks;
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed } : task))
    );
    try {
      await tasksApi.updateTask(id, { completed });
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
    }
  }

  async function handleEdit(id, title) {
    const previousTasks = tasks;
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
    try {
      await tasksApi.updateTask(id, { title });
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const previousTasks = tasks;
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await tasksApi.deleteTask(id);
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
    }
  }

  const visibleTasks = tasks.filter(FILTERS[filter]);
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <div className="app__card">
        <header className="app__header">
          <h1>Minhas tarefas</h1>
          <p className="app__subtitle">
            {tasks.length === 0
              ? "Comece adicionando uma tarefa"
              : `${pendingCount} de ${tasks.length} pendente${
                  pendingCount === 1 ? "" : "s"
                }`}
          </p>
        </header>

        <TaskForm onCreate={handleCreate} isSubmitting={isSubmitting} />

        {error && <p className="app__error">{error}</p>}

        <nav className="app__filters">
          {Object.keys(FILTERS).map((key) => (
            <button
              key={key}
              className={`app__filter-btn ${
                filter === key ? "app__filter-btn--active" : ""
              }`}
              onClick={() => setFilter(key)}
            >
              {{ all: "Todas", active: "Pendentes", done: "Concluídas" }[key]}
            </button>
          ))}
        </nav>

        {isLoading ? (
          <p className="app__loading">Carregando tarefas...</p>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}
