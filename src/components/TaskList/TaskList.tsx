import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { TaskItem, type Task } from "./TaskItem";
import "./TaskList.scss";

interface DragData {
  type: "task";
  id: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks.json");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.tasks);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

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

  if (isLoading) {
    return <div className="task-list__loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="task-list__error">Error: {error}</div>;
  }

  return (
    <div className="task-list">
      <div className="task-list__add-form">
        <input
          type="text"
          className="task-list__input"
          placeholder="Название задачи"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          className="task-list__textarea"
          placeholder="Описание задачи"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <div className="task-list__form-row">
          <select
            className="task-list__select"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value as Task["priority"],
              })
            }
          >
            <option value="high">Высокий приоритет</option>
            <option value="medium">Средний приоритет</option>
            <option value="low">Низкий приоритет</option>
          </select>
          <select
            className="task-list__select"
            value={newTask.status}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                status: e.target.value as Task["status"],
              })
            }
          >
            <option value="todo">К выполнению</option>
            <option value="in-progress">В процессе</option>
            <option value="done">Выполнено</option>
          </select>
        </div>
        <button
          className="task-list__button task-list__button--add"
          onClick={handleAddTask}
        >
          Добавить задачу
        </button>
      </div>

      {editingTask && (
        <div className="task-list__modal">
          <div className="task-list__modal-content">
            <h3 className="task-list__modal-title">Редактировать задачу</h3>
            <input
              className="task-list__input"
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
            />
            <textarea
              className="task-list__textarea"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
            />
            <div className="task-list__form-row">
              <select
                className="task-list__select"
                value={editingTask.priority}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    priority: e.target.value as Task["priority"],
                  })
                }
              >
                <option value="high">Высокий приоритет</option>
                <option value="medium">Средний приоритет</option>
                <option value="low">Низкий приоритет</option>
              </select>
              <select
                className="task-list__select"
                value={editingTask.status}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    status: e.target.value as Task["status"],
                  })
                }
              >
                <option value="todo">К выполнению</option>
                <option value="in-progress">В процессе</option>
                <option value="done">Выполнено</option>
              </select>
            </div>
            <div className="task-list__modal-actions">
              <button
                className="task-list__button task-list__button--save"
                onClick={handleSaveEdit}
              >
                Сохранить
              </button>
              <button
                className="task-list__button task-list__button--cancel"
                onClick={() => setEditingTask(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} className="task-list__container">
        <div className="task-list__items">
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              {placeholderIndex === index && (
                <div className="task-list__insertion-zone" />
              )}
              <TaskItem
                task={task}
                index={index}
                activeId={activeId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </React.Fragment>
          ))}
          {placeholderIndex === tasks.length && (
            <div className="task-list__insertion-zone" />
          )}
        </div>
      </div>
    </div>
  );
}
