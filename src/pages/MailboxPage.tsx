import { useState } from "react";
import User from "../components/User/User";
import "./MailboxPage.scss";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
}

export default function MailboxPage() {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      from: "Иван Петров",
      subject: "Обновление проекта",
      preview:
        "Здравствуйте! Хочу поделиться последними обновлениями по проекту...",
      date: "10:30",
      read: false,
    },
    {
      id: 2,
      from: "Анна Сидорова",
      subject: "Завтрашняя встреча",
      preview: "Напоминаю о нашей командной встрече завтра в 14:00...",
      date: "Вчера",
      read: true,
    },
    {
      id: 3,
      from: "ООО ТехноСофт",
      subject: "Ваш заказ #12345",
      preview: "Спасибо за ваш заказ! Мы начали его обработку...",
      date: "Вчера",
      read: false,
    },
    {
      id: 4,
      from: "HR Департамент",
      subject: "Обновление политики компании",
      preview: "Уважаемые коллеги, сообщаем об обновлении внутренних правил...",
      date: "Пн",
      read: true,
    },
    {
      id: 5,
      from: "Алексей Козлов",
      subject: "Отчет по продажам",
      preview: "Привет! Прикрепляю еженедельный отчет по продажам...",
      date: "Пн",
      read: false,
    },
    {
      id: 6,
      from: "Маркетинг",
      subject: "Новая кампания",
      preview:
        "Команда маркетинга подготовила план новой рекламной кампании...",
      date: "Сб",
      read: true,
    },
    {
      id: 7,
      from: "IT Поддержка",
      subject: "Обновление системы",
      preview: "Уведомляем о плановом обновлении системы в выходные...",
      date: "Пт",
      read: false,
    },
    {
      id: 8,
      from: "Елена Морозова",
      subject: "Презентация проекта",
      preview:
        "Добрый день! Готова презентация нового проекта, давайте обсудим...",
      date: "Чт",
      read: true,
    },
    {
      id: 9,
      from: "Бухгалтерия",
      subject: "Декларация за 1 квартал",
      preview: "Напоминаем о необходимости сдать отчетность до конца месяца...",
      date: "Ср",
      read: false,
    },
    {
      id: 10,
      from: "Конференция DevConf",
      subject: "Подтверждение регистрации",
      preview: "Спасибо за регистрацию на конференцию DevConf 2024...",
      date: "Вт",
      read: true,
    },
    {
      id: 11,
      from: "Сергей Иванов",
      subject: "Вопрос по API",
      preview: "Здравствуйте! У меня возник вопрос по интеграции API...",
      date: "Пн",
      read: false,
    },
    {
      id: 12,
      from: "Клиентский отдел",
      subject: "Новый клиент",
      preview: "Поступила заявка от нового клиента, требуется обработка...",
      date: "Пн",
      read: true,
    },
    {
      id: 13,
      from: "Юридический отдел",
      subject: "Обновление договора",
      preview: "Требуется ваше подтверждение изменений в договоре...",
      date: "Вс",
      read: false,
    },
    {
      id: 14,
      from: "Отдел разработки",
      subject: "Релиз v2.1",
      preview: "Планируем выпуск новой версии продукта на следующей неделе...",
      date: "Сб",
      read: true,
    },
    {
      id: 15,
      from: "Тренинг-центр",
      subject: "Новые курсы",
      preview: "Представляем новые обучающие курсы для сотрудников...",
      date: "Пт",
      read: false,
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      setEmails(
        emails.map((e) => (e.id === email.id ? { ...e, read: true } : e))
      );
    }
  };

  return (
    <div className="mailbox-page">
      <header className="mailbox-header">
        <div className="mailbox-header__search">
          <input type="text" placeholder="Поиск писем" />
        </div>
        <User />
      </header>

      <div className="mailbox-content">
        <aside className="mailbox-sidebar">
          <button className="compose-button">Написать</button>
          <nav className="mailbox-nav">
            <a href="#" className="active">
              Входящие
            </a>
            <a href="#">Отправленные</a>
            <a href="#">Черновики</a>
            <a href="#">Корзина</a>
          </nav>
        </aside>

        <main className="mailbox-main">
          <div className="email-list">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`email-item ${!email.read ? "unread" : ""} ${
                  selectedEmail?.id === email.id ? "selected" : ""
                }`}
                onClick={() => handleEmailClick(email)}
              >
                <div className="email-item__from">{email.from}</div>
                <div className="email-item__content">
                  <div className="email-item__subject">{email.subject}</div>
                  <div className="email-item__preview">{email.preview}</div>
                </div>
                <div className="email-item__date">{email.date}</div>
              </div>
            ))}
          </div>

          {selectedEmail && (
            <div className="email-detail">
              <div className="email-detail__header">
                <h2>{selectedEmail.subject}</h2>
                <div className="email-detail__meta">
                  <span className="from">От: {selectedEmail.from}</span>
                  <span className="date">{selectedEmail.date}</span>
                </div>
              </div>
              <div className="email-detail__content">
                {selectedEmail.preview}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
