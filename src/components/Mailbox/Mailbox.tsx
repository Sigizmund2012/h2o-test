import { useState, useEffect } from "react";
import "./Mailbox.scss";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  body: string;
}

export default function Mailbox() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("/api/emails.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить письма");
        }
        const data = await response.json();
        setEmails(data.emails);
        setFilteredEmails(data.emails);
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

  useEffect(() => {
    const searchEmails = () => {
      if (!searchQuery.trim()) {
        setFilteredEmails(emails);
        return;
      }

      const query = searchQuery.toLowerCase();
      const filtered = emails.filter(
        (email) =>
          email.from.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query) ||
          email.body.toLowerCase().includes(query)
      );
      setFilteredEmails(filtered);
    };

    searchEmails();
  }, [searchQuery, emails]);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      const updatedEmails = emails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      );
      setEmails(updatedEmails);
      setFilteredEmails(
        filteredEmails.map((e) =>
          e.id === email.id ? { ...e, read: true } : e
        )
      );
    }
  };

  const formatEmailBody = (body: string) => {
    return body.split("\n").map((line, index) => <p key={index}>{line}</p>);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <div className="mailbox mailbox--loading">Загрузка писем...</div>;
  }

  if (error) {
    return <div className="mailbox mailbox--error">{error}</div>;
  }

  return (
    <div className="mailbox">
      <div className="mailbox__search">
        <input
          type="text"
          className="mailbox__search-input"
          placeholder="Поиск писем"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mailbox__content">
        <aside className="mailbox__sidebar">
          <button className="mailbox__compose-button">Написать</button>
          <nav className="mailbox__nav">
            <a href="#" className="mailbox__nav-link mailbox__nav-link--active">
              Входящие
            </a>
            <a href="#" className="mailbox__nav-link">
              Отправленные
            </a>
            <a href="#" className="mailbox__nav-link">
              Черновики
            </a>
            <a href="#" className="mailbox__nav-link">
              Корзина
            </a>
          </nav>
        </aside>

        <main className="mailbox__main">
          <div className="mailbox__email-list">
            {filteredEmails.length === 0 ? (
              <div className="mailbox__no-results">Письма не найдены</div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className={`mailbox__email-item ${
                    !email.read ? "mailbox__email-item--unread" : ""
                  } ${
                    selectedEmail?.id === email.id
                      ? "mailbox__email-item--selected"
                      : ""
                  }`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="mailbox__email-from">{email.from}</div>
                  <div className="mailbox__email-content">
                    <div className="mailbox__email-subject">
                      {email.subject}
                    </div>
                    <div className="mailbox__email-preview">
                      {email.preview}
                    </div>
                  </div>
                  <div className="mailbox__email-date">{email.date}</div>
                </div>
              ))
            )}
          </div>

          {selectedEmail && (
            <div className="mailbox__email-detail">
              <div className="mailbox__email-header">
                <h2 className="mailbox__email-title">
                  {selectedEmail.subject}
                </h2>
                <div className="mailbox__email-meta">
                  <span className="from">От: {selectedEmail.from}</span>
                  <span className="date">{selectedEmail.date}</span>
                </div>
              </div>
              <div className="mailbox__email-body">
                {formatEmailBody(selectedEmail.body)}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
