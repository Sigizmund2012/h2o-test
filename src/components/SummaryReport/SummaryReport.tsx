import "./SummaryReport.scss";
export default function SummaryReport() {
  return (
    <div className="summary-report">
      <h1 className="heading">Сводный отчет</h1>
      <div className="total">Сумма</div>
      <div className="b2b">b2b</div>
      <div className="b2c">b2c</div>
      <div className="problems">Проблемы</div>
      <div className="graph">График</div>
    </div>
  );
}
