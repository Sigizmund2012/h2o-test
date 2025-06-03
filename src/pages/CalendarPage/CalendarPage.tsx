import Calendar from "../../components/Calendar/Calendar";
import User from "../../components/User/User";
import "./CalendarPage.scss";

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <div className="calendar-page__header">
        <User />
      </div>
      <div className="calendar-page__content">
        <h1 className="calendar-page__title">Календарь</h1>
        <Calendar />
      </div>
    </div>
  );
}
