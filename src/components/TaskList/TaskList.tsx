import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { TaskItem } from "./TaskItem";
import "./TaskList.scss";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
}

interface DragData {
  type: "task";
  id: string;
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
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    return combine(
      dropTargetForElements({
        element: container,
        getData: () => ({ type: "task" }),
      }),
      monitorForElements({
        onDragStart: ({ source }) => {
          const sourceData = source.data as unknown as DragData;
          setActiveId(sourceData.id);
        },
        onDrag: ({ location }) => {
          if (!activeId) {
            return;
          }

          const pointerY = location.current.input.clientY;
          const items = Array.from(container.querySelectorAll(".task-item"));
          let index = items.length;
          for (let i = 0; i < items.length; i++) {
            const itemRect = items[i].getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            if (pointerY < itemCenter) {
              index = i;
              break;
            }
          }
          setPlaceholderIndex(index);
        },
        onDrop: ({ source, location }) => {
          const sourceData = source.data as unknown as DragData;
          const fromIndex = tasks.findIndex((t) => t.id === sourceData.id);
          if (fromIndex === -1) {
            return;
          }

          const toIndex =
            placeholderIndex ??
            (() => {
              const items = Array.from(
                container.querySelectorAll(".task-item")
              );
              const dropY = location.current.input.clientY;
              let index = items.length;
              for (let i = 0; i < items.length; i++) {
                const itemRect = items[i].getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                if (dropY < itemCenter) {
                  index = i;
                  break;
                }
              }
              return index;
            })();

          if (fromIndex === toIndex) {
            return;
          }

          setTasks((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(fromIndex, 1);
            const adjustedToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
            updated.splice(adjustedToIndex, 0, moved);
            return updated;
          });
          setPlaceholderIndex(null);
          setActiveId(null);
        },
      })
    );
  }, [tasks, placeholderIndex, activeId]);

  const handleDragStart = useCallback(() => {
    document.body.style.userSelect = "none";
  }, []);

  const handleDragEnd = useCallback(() => {
    document.body.style.userSelect = "";
    setActiveId(null);
    setPlaceholderIndex(null);
  }, []);

  const handleAddTask = () => {
    if (!newTask.title) {
      return;
    }
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
    if (!editingTask) {
      return;
    }
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

  return (
    <div className="task-list">
      <h1 className="heading">Список задач</h1>

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
            <React.Fragment key={task.id}>
              {placeholderIndex === index && <div className="insertion-zone" />}
              <TaskItem
                task={task}
                index={index}
                activeId={activeId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </React.Fragment>
          ))}
          {placeholderIndex === tasks.length && (
            <div className="insertion-zone" />
          )}
        </div>
      </div>
    </div>
  );
}
