import Tabs from "../Tabs/Tabs";
import User from "../User/User";
import SummaryReport from "../SummaryReport/SummaryReport";
import "./Main.scss";
export default function Main() {
  return (
    <main className="main-content">
      <Tabs />
      <User />
      <SummaryReport />
    </main>
  );
}
