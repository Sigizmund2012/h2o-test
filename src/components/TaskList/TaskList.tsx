import { useState, useRef, useCallback } from "react";
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
];

const priorityColors = {
  high: "#FF4B4B",
  medium: "#FFB84B",
  low: "#4BFF4B",
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const taskRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setTaskRef = useCallback(
    (id: string, element: HTMLDivElement | null) => {
      if (element) {
        taskRefs.current.set(id, element);
      } else {
        taskRefs.current.delete(id);
      }
    },
    []
  );

  // Monitor for drag events
  monitorForElements({
    onDrop({ source, location }) {
      const sourceData = source.data as unknown as DragData;
      const locationData = location?.data as unknown as DragData;

      if (
        sourceData.type === "task" &&
        locationData?.type === "task-list" &&
        typeof locationData.index === "number"
      ) {
        const fromIndex = tasks.findIndex((t) => t.id === sourceData.id);
        if (fromIndex === -1) return;
        const toIndex = locationData.index;
        if (fromIndex === toIndex) return;
        const updated = [...tasks];
        const [removed] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, removed);
        setTasks(updated);
      }
    },
  });

  return (
    <div className="task-list">
      <h1 className="heading">Список задач</h1>
      <div
        ref={containerRef}
        className="task-list__container"
        {...(containerRef.current
          ? dropTargetForElements({
              element: containerRef.current,
              getData: () => ({ type: "task-list" }),
            })
          : {})}
      >
        <div className="task-list__items">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              ref={(el) => setTaskRef(task.id, el)}
              className={`task-item${
                activeId === task.id ? " task-item--dragging" : ""
              }`}
              {...(taskRefs.current.get(task.id)
                ? combine(
                    draggable({
                      element: taskRefs.current.get(task.id)!,
                      getInitialData: () => ({ type: "task", id: task.id }),
                      onDragStart: () => setActiveId(task.id),
                      onDrop: () => setActiveId(null),
                    }),
                    dropTargetForElements({
                      element: taskRefs.current.get(task.id)!,
                      getData: () => ({ type: "task-list", index }),
                    })
                  )
                : {})}
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
                {task.status === "todo" && "К выполнению"}
                {task.status === "in-progress" && "В процессе"}
                {task.status === "done" && "Выполнено"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
