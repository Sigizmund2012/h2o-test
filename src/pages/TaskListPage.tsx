import TaskList from "../components/TaskList/TaskList";
import User from "../components/User/User";
import "./TaskListPage.scss";

export default function TaskListPage() {
  return (
    <div className="task-list-page">
      <div className="task-list-page__header">
        <User />
      </div>
      <div className="task-list-page__content">
        <TaskList />
      </div>
    </div>
  );
}
