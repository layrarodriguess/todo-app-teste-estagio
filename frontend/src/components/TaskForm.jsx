import { useState } from "react";

export default function TaskForm({ onCreate, isSubmitting }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onCreate(trimmed);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        placeholder="O que você precisa fazer?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="Título da nova tarefa"
        disabled={isSubmitting}
      />
      <button
        className="task-form__button"
        type="submit"
        disabled={isSubmitting || !title.trim()}
      >
        Adicionar
      </button>
    </form>
  );
}
