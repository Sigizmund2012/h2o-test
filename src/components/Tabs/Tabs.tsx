import "./Tabs.scss";
export default function Tabs() {
  return (
    <div className="tabs">
      <div className="tabs__arrows">
        <div className="tabs__arrow-left">Левая стрелка</div>
        <div className="tabs__arrow-right">Правая стрелка</div>
      </div>
      <div className="tabs__tab">
        <a href="">Сводный отчёт внутри компании</a>
      </div>
      <div className="tabs__tab">
        <a href="">Сводный отчёт внутри компании</a>
      </div>
      <div className="tabs__tab">
        <a href="">Сводный отчёт внутри компании</a>
      </div>
    </div>
  );
}
