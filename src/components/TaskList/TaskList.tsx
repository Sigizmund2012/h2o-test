import { useState, useRef, useCallback, useEffect } from "react";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import "./TaskList.scss";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
}

interface DragData {
  type: "task" | "task-list";
  id?: string;
  index?: number;
}

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

const priorityColors = {
  high: "#FF4B4B",
  medium: "#FFB84B",
  low: "#4BFF4B",
};

function TaskItem({
  task,
  index,
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
    if (!el) return;

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

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Подготовить презентацию",
    description: "Создать презентацию для встречи с клиентом",
    priority: "high",
    status: "todo",
  },
  {
    id: "2",
    title: "Согласовать бюджет",
    description: "Согласовать бюджет проекта с финансовым отделом",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Обновить документацию",
    description: "Обновить техническую документацию проекта",
    priority: "low",
    status: "done",
  },
  {
    id: "4",
    title: "Провести код-ревью",
    description: "Проверить код новых фич и оставить комментарии",
    priority: "high",
    status: "todo",
  },
  {
    id: "5",
    title: "Оптимизировать производительность",
    description: "Проанализировать и улучшить время загрузки страниц",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "6",
    title: "Написать тесты",
    description: "Добавить unit-тесты для новых компонентов",
    priority: "high",
    status: "todo",
  },
  {
    id: "7",
    title: "Обновить зависимости",
    description: "Обновить версии пакетов и исправить конфликты",
    priority: "low",
    status: "done",
  },
  {
    id: "8",
    title: "Рефакторинг кода",
    description: "Улучшить структуру кода и удалить дублирование",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "9",
    title: "Добавить анимации",
    description: "Улучшить UX с помощью плавных переходов",
    priority: "low",
    status: "todo",
  },
  {
    id: "10",
    title: "Исправить баги",
    description: "Исправить критические ошибки в продакшене",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "11",
    title: "Улучшить SEO",
    description: "Оптимизировать мета-теги и структуру страниц",
    priority: "medium",
    status: "todo",
  },
  {
    id: "12",
    title: "Добавить аналитику",
    description: "Интегрировать Google Analytics и настроить события",
    priority: "low",
    status: "done",
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((id: string) => {
    setActiveId(id);
    document.body.style.userSelect = "none";
  }, []);

  const handleDragEnd = useCallback(() => {
    setActiveId(null);
    document.body.style.userSelect = "";
  }, []);

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || "",
      priority: newTask.priority || "medium",
      status: newTask.status || "todo",
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = () => {
    if (!editingTask) return;

    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setEditingTask(null);
  };

  const handleStatusChange = (id: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Monitor for drag events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = monitorForElements({
      onDrop({ source, location }) {
        const sourceData = source.data as unknown as DragData;
        const locationData = location?.data as unknown as DragData;

        if (sourceData.type === "task" && locationData?.type === "task-list") {
          const fromIndex = tasks.findIndex((t) => t.id === sourceData.id);
          if (fromIndex === -1) return;

          // Calculate the new index based on the drop position
          const rect = container.getBoundingClientRect();
          const dropY = location.clientY;
          const relativeY = dropY - rect.top;
          const itemHeight = 80; // Approximate height of a task item
          const toIndex = Math.floor(relativeY / itemHeight);

          if (fromIndex === toIndex) return;

          const updated = [...tasks];
          const [removed] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, removed);
          setTasks(updated);
        }
      },
    });

    return () => {
      cleanup();
    };
  }, [tasks]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    return combine(
      dropTargetForElements({
        element: container,
        getData: () => ({ type: "task-list" }),
      })
    );
  }, []);

  return (
    <div className="task-list">
      <h1 className="heading">Список задач</h1>

      {/* Add new task form */}
      <div className="task-list__add-form">
        <input
          type="text"
          placeholder="Название задачи"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Описание задачи"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          value={newTask.priority}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              priority: e.target.value as Task["priority"],
            })
          }
        >
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
        <button onClick={handleAddTask}>Добавить задачу</button>
      </div>

      {/* Edit task modal */}
      {editingTask && (
        <div className="task-list__edit-modal">
          <div className="modal-content">
            <h3>Редактировать задачу</h3>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
            />
            <textarea
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
            />
            <select
              value={editingTask.priority}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  priority: e.target.value as Task["priority"],
                })
              }
            >
              <option value="high">Высокий</option>
              <option value="medium">Средний</option>
              <option value="low">Низкий</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleSaveEdit}>Сохранить</button>
              <button onClick={() => setEditingTask(null)}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} className="task-list__container">
        <div className="task-list__items">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              activeId={activeId}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
