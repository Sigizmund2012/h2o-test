import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import MailboxPage from "./pages/MailboxPage/MailboxPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import DataPage from "./pages/DataPage/DataPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
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
          <Route path="/team" element={<TeamPage />} />
          <Route path="/database" element={<DataPage />} />
          <Route path="/chart" element={<Main />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
