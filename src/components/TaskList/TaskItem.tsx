import { useRef, useEffect } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
}

const priorityColors = {
  high: "#FF4B4B",
  medium: "#FFB84B",
  low: "#4BFF4B",
};

interface TaskItemProps {
  task: Task;
  index: number;
  activeId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskItem({
  task,
  activeId,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
  onStatusChange,
}: Readonly<TaskItemProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: "task", id: task.id }),
        onDragStart: () => onDragStart(task.id),
        onDrop: onDragEnd,
      })
    );
  }, [task.id, onDragStart, onDragEnd]);

  return (
    <div
      ref={ref}
      className={`task-item${
        activeId === task.id ? " task-item--dragging" : ""
      }`}
    >
      <div
        className="task-item__priority"
        style={{ backgroundColor: priorityColors[task.priority] }}
      />
      <div className="task-item__content">
        <h3 className="task-item__title">{task.title}</h3>
        <p className="task-item__description">{task.description}</p>
      </div>
      <div className="task-item__status">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
        >
          <option value="todo">К выполнению</option>
          <option value="in-progress">В процессе</option>
          <option value="done">Выполнено</option>
        </select>
      </div>
      <div className="task-item__actions">
        <button onClick={() => onEdit(task)}>Редактировать</button>
        <button onClick={() => onDelete(task.id)}>Удалить</button>
      </div>
    </div>
  );
}
