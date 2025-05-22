import Total from "../Total/Total";
import B2b from "../B2b/B2b";
import Problems from "../Problems/Problems";
import "./SummaryReport.scss";
export default function SummaryReport() {
  return (
    <div className="summary-report">
      <h1 className="heading">Сводный отчет</h1>
      <Total />
      <B2b />
      <div className="b2c">b2c</div>
      <Problems />
      <div className="graph">График</div>
    </div>
  );
}
