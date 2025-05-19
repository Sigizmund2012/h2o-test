import "./Main.scss";
export default function Main() {
  return (
    <>
      <div className="header-navigation">
        <div className="arrows">
          <div className="arrow-left">Левая стрелка</div>
          <div className="arrow-right">Правая стрелка</div>
        </div>
      </div>
      <div className="header-tabs">
        <div className="header-tabs__tab">
          <a href="">Сводный отчёт внутри компании</a>
        </div>
        <div className="header-tabs__tab">
          <a href="">Сводный отчёт внутри компании</a>
        </div>
        <div className="header-tabs__tab">
          <a href="">Сводный отчёт внутри компании</a>
        </div>
      </div>
      <div className="header-user">
        <div className="header-user__photo"></div>
        <div className="header-user__name">Имя пользователя</div>
        <div className="header-user__position">менеджер продаж</div>
      </div>
      <div className="main-content">Блоки</div>
    </>
  );
}
