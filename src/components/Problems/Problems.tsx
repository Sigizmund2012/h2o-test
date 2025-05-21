import "./Problems.scss";

export default function Problems() {
  return (
    <div className="problems">
      <h2 className="problems__heading">Проблемные зоны</h2>
      <div className="problems__list">
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-danger.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Линейный персонал</div>
            <div className="problems__item-description">₽ 300 3670</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-danger.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">
              Подразделение разовых работ ФОТ
            </div>
            <div className="problems__item-description">₽ 901 470</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-danger.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Бензин (наличные)</div>
            <div className="problems__item-description">₽ 278 325</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-warning.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Закупка инвентаря</div>
            <div className="problems__item-description">₽ 44 742</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-warning.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Закупка спецодежды/СИЗ</div>
            <div className="problems__item-description">₽ 16810</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-warning.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Ремонт оборудования</div>
            <div className="problems__item-description">₽ 28 570</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-warning.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Обслуживание автомобиля</div>
            <div className="problems__item-description">₽ 47 868</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-warning.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">Форс-мажоры</div>
            <div className="problems__item-description">₽ 13750</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-danger.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">
              Рекламные бюджеты (Блогеры)
            </div>
            <div className="problems__item-description">₽ 101 500</div>
          </div>
        </div>
        <div className="problems__item">
          <img className="problems__item-icon" src="/icon-danger.svg" alt="" />
          <div className="problems__item-content">
            <div className="problems__item-title">
              Рекламные бюджеты (Контекст)
            </div>
            <div className="problems__item-description">₽ 200 000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
