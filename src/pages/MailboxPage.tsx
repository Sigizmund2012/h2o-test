import { useState, useEffect } from "react";
import User from "../components/User/User";
import "./MailboxPage.scss";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  body: string;
}

export default function MailboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("/api/emails.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить письма");
        }
        const data = await response.json();
        setEmails(data.emails);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Произошла ошибка при загрузке писем"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      setEmails(
        emails.map((e) => (e.id === email.id ? { ...e, read: true } : e))
      );
    }
  };

  const formatEmailBody = (body: string) => {
    return body.split("\n").map((line, index) => <p key={index}>{line}</p>);
  };

  if (isLoading) {
    return <div className="mailbox-page__loading">Загрузка писем...</div>;
  }

  if (error) {
    return <div className="mailbox-page__error">{error}</div>;
  }

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
                {formatEmailBody(selectedEmail.body)}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
