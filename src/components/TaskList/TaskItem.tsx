import { useRef, useEffect } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { colors } from "../../constants/colors";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
}

const priorityColors = {
  high: colors.priority.high,
  medium: colors.priority.medium,
  low: colors.priority.low,
};

const statusLabels = {
  todo: "К выполнению",
  "in-progress": "В процессе",
  done: "Выполнено",
};

const statusColors = {
  todo: colors.status.todo,
  "in-progress": colors.status["in-progress"],
  done: colors.status.done,
};

interface TaskItemProps {
  task: Task;
  index: number;
  activeId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({
  task,
  activeId,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
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
      <div className="task-item__content">
        <h3 className="task-item__title">{task.title}</h3>
      </div>
      <div className="task-item__badges">
        <div
          className="task-item__priority"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority === "high"
            ? "Высокий"
            : task.priority === "medium"
            ? "Средний"
            : "Низкий"}
        </div>
        <div
          className="task-item__status"
          style={{ backgroundColor: statusColors[task.status] }}
        >
          {statusLabels[task.status]}
        </div>
      </div>
      <div className="task-item__actions">
        <button onClick={() => onEdit(task)}>Редактировать</button>
        <button onClick={() => onDelete(task.id)}>Удалить</button>
      </div>
    </div>
  );
}
