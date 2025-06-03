import User from "../../components/User/User";
import "./SettingsPage.scss";

export default function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="settings-page__header">
        <User />
      </div>
      <div className="settings-page__content">
        <h1 className="settings-page__title">Настройки</h1>
        <div className="settings-page__sections">
          <section className="settings-page__section">
            <h2 className="settings-page__section-title">Общие настройки</h2>
            <div className="settings-page__form">
              <div className="settings-page__form-group">
                <label htmlFor="choose-lang" className="settings-page__label">
                  Язык интерфейса
                </label>
                <select id="choose-lang" className="settings-page__select">
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="settings-page__form-group">
                <label htmlFor="choose-theme" className="settings-page__label">
                  Тема оформления
                </label>
                <select id="choose-theme" className="settings-page__select">
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                </select>
              </div>
            </div>
          </section>
          <section className="settings-page__section">
            <h2 className="settings-page__section-title">Уведомления</h2>
            <div className="settings-page__form">
              <div className="settings-page__form-group">
                <label className="settings-page__label">
                  Email уведомления
                </label>
                <div className="settings-page__checkbox-group">
                  <input
                    type="checkbox"
                    id="email-tasks"
                    className="settings-page__checkbox"
                  />
                  <label htmlFor="email-tasks">Новые задачи</label>
                </div>
                <div className="settings-page__checkbox-group">
                  <input
                    type="checkbox"
                    id="email-messages"
                    className="settings-page__checkbox"
                  />
                  <label htmlFor="email-messages">Новые сообщения</label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
