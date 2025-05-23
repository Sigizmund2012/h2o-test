import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Chart.scss";

// Типизация данных
interface DataItem {
  division: string;
  date: string;
  amount: string;
  type: "income" | "expense";
}

// Тестовые данные
const sampleData: DataItem[] = [
  {
    division: "B2B",
    date: "2023-09-25T05:00:00.000+00:00",
    amount: "20000",
    type: "expense",
  },
  {
    division: "B2C",
    date: "2023-09-24T05:00:00.000+00:00",
    amount: "14000",
    type: "income",
  },
  {
    division: "B2B",
    date: "2023-10-01T05:00:00.000+00:00",
    amount: "25000",
    type: "expense",
  },
  {
    division: "B2C",
    date: "2023-10-02T05:00:00.000+00:00",
    amount: "16000",
    type: "income",
  },
];

type Interval = "week" | "month" | "year";

export default function Chart() {
  const [activeInterval, setActiveInterval] = useState<Interval>("week");

  // Группировка данных по периодам
  const groupByTimeUnit = (timestamp: number, unit: Interval) => {
    const date = new Date(timestamp);
    let result: number;

    switch (unit) {
      case "week": {
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay());
        firstDayOfWeek.setHours(0, 0, 0, 0);
        result = firstDayOfWeek.getTime();
        break;
      }
      case "month":
        result = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        break;
      case "year":
        result = new Date(date.getFullYear(), 0, 1).getTime();
        break;
      default:
        result = timestamp;
    }

    return result;
  };

  // Подготовка данных для графика
  const preparedData = useMemo(() => {
    const groupedData: Record<number, Record<string, number>> = {};

    sampleData.forEach((item) => {
      const timestamp = new Date(item.date).getTime();
      const roundedDate = groupByTimeUnit(timestamp, activeInterval);
      const key = `${item.division}_${item.type}`;
      const amount = parseFloat(item.amount);

      if (!groupedData[roundedDate]) {
        groupedData[roundedDate] = {};
      }

      groupedData[roundedDate][key] =
        (groupedData[roundedDate][key] || 0) + amount;
    });

    return Object.entries(groupedData)
      .map(([date, values]) => ({
        date: new Date(parseInt(date)).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        }),
        B2B_income: values.B2B_income || 0,
        B2B_expense: values.B2B_expense || 0,
        B2C_income: values.B2C_income || 0,
        B2C_expense: values.B2C_expense || 0,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [activeInterval, sampleData]);

  return (
    <div className="chart">
      <h2 className="chart__heading">Общая статистика</h2>
      <ul className="chart__intervals">
        <li className="chart__interval-item">
          <button
            className={`chart__interval ${
              activeInterval === "week" ? "chart__interval_active" : ""
            }`}
            onClick={() => setActiveInterval("week")}
          >
            Неделя
          </button>
        </li>
        <li className="chart__interval-item">
          <button
            className={`chart__interval ${
              activeInterval === "month" ? "chart__interval_active" : ""
            }`}
            onClick={() => setActiveInterval("month")}
          >
            Месяц
          </button>
        </li>
        <li className="chart__interval-item">
          <button
            className={`chart__interval ${
              activeInterval === "year" ? "chart__interval_active" : ""
            }`}
            onClick={() => setActiveInterval("year")}
          >
            Год
          </button>
        </li>
      </ul>
      <div className="chart__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={preparedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="B2B_income"
              name="B2B Доход"
              stroke="#1890FF"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="B2B_expense"
              name="B2B Расход"
              stroke="#FF4D4F"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="B2C_income"
              name="B2C Доход"
              stroke="#52C41A"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="B2C_expense"
              name="B2C Расход"
              stroke="#FAAD14"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart__bottom">
        <div className="chart__labels">
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_revenue"></div>
            <div className="chart__label-title">B2B Доход</div>
            <div className="chart__label-amount">80%</div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_expenses"></div>
            <div className="chart__label-title">B2B Расход</div>
            <div className="chart__label-amount">65%</div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_profit"></div>
            <div className="chart__label-title">B2C Доход</div>
            <div className="chart__label-amount">45%</div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_debt"></div>
            <div className="chart__label-title">B2C Расход</div>
            <div className="chart__label-amount">30%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
