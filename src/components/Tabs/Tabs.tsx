import "./Tabs.scss";
export default function Tabs() {
  return (
    <div className="tabs">
      <div className="tabs__arrows">
        <a className="tabs__arrow-left" href="#"></a>
        <a className="tabs__arrow-right tabs_arrow-right-active" href="#"></a>
      </div>
      <div className="tabs__tab">
        <a href="">Свод данных по сотрудникам</a>
      </div>
      <div className="tabs__tab tabs_tab-active">
        <a href="">Сводный отчёт внутри компании</a>
      </div>
      <div className="tabs__tab">
        <a href="">Сводный отчет по сдел</a>
      </div>
    </div>
  );
}
