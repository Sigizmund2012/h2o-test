import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import CalendarPage from "./pages/CalendarPage";
import TaskListPage from "./pages/TaskListPage";
import MailboxPage from "./pages/MailboxPage";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/list" element={<TaskListPage />} />
          <Route path="/mailbox" element={<MailboxPage />} />
          <Route path="/team" element={<Main />} />
          <Route path="/database" element={<Main />} />
          <Route path="/chart" element={<Main />} />
          <Route path="/settings" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
