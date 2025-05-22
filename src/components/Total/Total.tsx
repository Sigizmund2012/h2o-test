import "./Total.scss";

export default function Total() {
  return (
    <div className="total">
      <div className="total__financial-direction">
        <div className="total__arrow"></div>
        <div className="total__percent">21.5 %</div>
      </div>
      <div className="total__amount">₽ 10 157 764</div>
      <div className="total__total">Итоги</div>
    </div>
  );
}
