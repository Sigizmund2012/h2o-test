import { useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  type View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ru } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.scss";

// Настройка локализатора с русской локалью
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }), // Начало недели с понедельника
  getDay,
  locales: { ru },
});

const events = [
  {
    title: "Встреча с клиентом",
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 27, 10, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 27, 11, 30),
  },
  {
    title: "Презентация проекта",
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 14, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 15, 30),
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month"); // 'month', 'week', 'day', 'agenda'

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <BigCalendar
          localizer={localizer}
          culture="ru"
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          view={currentView}
          onNavigate={setCurrentDate}
          onView={setCurrentView}
          messages={{
            next: "Следующий",
            previous: "Предыдущий",
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День",
            agenda: "Расписание",
            date: "Дата",
            time: "Время",
            event: "Событие",
            noEventsInRange: "Нет событий в этом диапазоне",
          }}
        />
      </div>
    </div>
  );
}
