import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="logo"></div>
      <nav className="navigation">
        <ul className="navigation__list">
          <li
            className={`navigation__list-item ${
              location.pathname === "/calendar" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_calendar" to="/calendar"></Link>
          </li>
          <li
            className={`navigation__list-item ${
              location.pathname === "/list" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_list" to="/list"></Link>
          </li>
          <li
            className={`navigation__list-item ${
              location.pathname === "/mailbox" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_mailbox" to="/mailbox"></Link>
          </li>
          <li
            className={`navigation__list-item ${
              location.pathname === "/team" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_team" to="/team"></Link>
          </li>
          <li
            className={`navigation__list-item ${
              location.pathname === "/database" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_database" to="/database"></Link>
          </li>
          <li
            className={`navigation__list-item ${
              location.pathname === "/chart" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_chart" to="/chart"></Link>
          </li>
          <li
            className={`navigation__list-item ${
              location.pathname === "/settings" ? "navigation_active" : ""
            }`}
          >
            <Link className="navigation_settings" to="/settings"></Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
