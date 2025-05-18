import "./Sidebar.scss";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo"></div>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <a className="navigation_calendar" href="#"></a>
          </li>
          <li className="navigation__list-item">
            <a className="navigation_list" href="#"></a>
          </li>
          <li className="navigation__list-item">
            <a className="navigation_mailbox" href="#"></a>
          </li>
          <li className="navigation__list-item">
            <a className="navigation_team" href="#"></a>
          </li>
          <li className="navigation__list-item">
            <a className="navigation_database" href="#"></a>
          </li>
          <li className="navigation__list-item navigation_active">
            <a className="navigation_graph" href="#"></a>
          </li>
          <li className="navigation__list-item">
            <a className="navigation_settings" href="#"></a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
