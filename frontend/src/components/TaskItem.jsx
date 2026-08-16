import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  function handleSaveEdit() {
    const trimmed = draftTitle.trim();
    if (!trimmed) {
      setDraftTitle(task.title);
      setIsEditing(false);
      return;
    }
    if (trimmed !== task.title) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") handleSaveEdit();
    if (event.key === "Escape") {
      setDraftTitle(task.title);
      setIsEditing(false);
    }
  }

  return (
    <li className={`task-item ${task.completed ? "task-item--done" : ""}`}>
      <label className="task-item__checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          aria-label={`Marcar "${task.title}" como ${
            task.completed ? "não concluída" : "concluída"
          }`}
        />
        <span className="task-item__checkmark" aria-hidden="true"></span>
      </label>

      {isEditing ? (
        <input
          className="task-item__edit-input"
          type="text"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className="task-item__title"
          onDoubleClick={() => setIsEditing(true)}
          title="Clique duas vezes para editar"
        >
          {task.title}
        </span>
      )}

      <div className="task-item__actions">
        <button
          className="task-item__icon-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Editar tarefa"
        >
          ✎
        </button>
        <button
          className="task-item__icon-btn task-item__icon-btn--danger"
          onClick={() => onDelete(task.id)}
          aria-label="Excluir tarefa"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
