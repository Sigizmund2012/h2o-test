import Total from "../Total/Total";
import B2b from "../B2b/B2b";
import B2c from "../B2c/B2c";
import Problems from "../Problems/Problems";
import "./SummaryReport.scss";
export default function SummaryReport() {
  return (
    <div className="summary-report">
      <h1 className="heading">Сводный отчет</h1>
      <Total />
      <B2b />
      <B2c />
      <Problems />
      <div className="graph">График</div>
    </div>
  );
}
