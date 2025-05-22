import Total from "../Total/Total";
import Problems from "../Problems/Problems";
import "./SummaryReport.scss";
export default function SummaryReport() {
  return (
    <div className="summary-report">
      <h1 className="heading">Сводный отчет</h1>
      <Total />
      <div className="b2b">b2b</div>
      <div className="b2c">b2c</div>
      <Problems />
      <div className="graph">График</div>
    </div>
  );
}
