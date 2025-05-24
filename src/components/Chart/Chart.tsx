import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart.scss";

interface DataItem {
  division: string;
  date: string;
  amount: string;
  type: "income" | "expenses";
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

// Форматирование чисел в рубли
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Форматирование даты
const formatDate = (dateStr: string) => {
  const month = new Date(dateStr).toLocaleDateString("ru-RU", {
    month: "short",
  });
  return `${month[0].toUpperCase()}${month.slice(1, 3)}`;
};

// Кастомный тултип
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart__tooltip">
        <p className="chart__tooltip-label">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type Interval = "week" | "month" | "year";

export default function Chart() {
  const [activeInterval, setActiveInterval] = useState<Interval>("year");
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные");
        }
        const json = await response.json();
        setData(json.transactions);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Произошла ошибка при загрузке данных"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Подготовка данных для графика
  const preparedData = useMemo(() => {
    const groupedData: Record<
      string,
      {
        revenue: number;
        costs: number;
        profit: number;
        indebtedness: number;
        total: number;
      }
    > = {};

    // Группируем данные по датам
    data.forEach((item) => {
      const date = item.date.split("T")[0];
      if (!groupedData[date]) {
        groupedData[date] = {
          revenue: 0,
          costs: 0,
          profit: 0,
          indebtedness: 0,
          total: 0,
        };
      }

      const amount = parseFloat(item.amount);

      if (item.type === "income") {
        groupedData[date].revenue += amount;
        groupedData[date].total += amount;
      } else {
        groupedData[date].costs += amount;
        groupedData[date].total -= amount;
      }
    });

    // Вычисляем прибыль и задолженность
    Object.keys(groupedData).forEach((date) => {
      const data = groupedData[date];
      data.profit = data.revenue - data.costs;
      data.indebtedness = Math.max(0, -data.total);
    });

    return Object.entries(groupedData)
      .map(([date, values]) => ({
        date: formatDate(date),
        ...values,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  // Вычисляем итоговые значения для нижней панели
  const totals = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const amount = parseFloat(item.amount);
        if (item.type === "income") {
          acc.revenue += amount;
          acc.total += amount;
        } else {
          acc.costs += amount;
          acc.total -= amount;
        }
        acc.profit = acc.revenue - acc.costs;
        acc.indebtedness = Math.max(0, -acc.total);
        return acc;
      },
      { revenue: 0, costs: 0, profit: 0, indebtedness: 0, total: 0 }
    );
  }, [data]);

  if (isLoading) {
    return <div className="chart">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="chart">Ошибка: {error}</div>;
  }

  return (
    <div className="chart">
      <div className="chart__head-wrapper">
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
      </div>
      <div className="chart__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={preparedData}>
            <CartesianGrid
              width={2}
              strokeDasharray="2 1"
              horizontal={false}
              stroke="#f8f8f8"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#d2d1d1" }}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Выручка"
              stroke="#73CF7A"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#73CF7A" }}
            />
            <Line
              type="monotone"
              dataKey="costs"
              name="Затраты"
              stroke="#30C7DC"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#30C7DC" }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              name="Прибыль"
              stroke="#45AAF2"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#45AAF2" }}
            />
            <Line
              type="monotone"
              dataKey="indebtedness"
              name="Задолженность"
              stroke="#F5E230"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#F5E230" }}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Итог"
              stroke="#AC74FC"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#AC74FC" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart__bottom">
        <div className="chart__labels">
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_revenue"></div>
            <div className="chart__label-wrapper">
              <div className="chart__label-title">Выручка</div>
              <div className="chart__label-amount">
                {formatCurrency(totals.revenue)}
              </div>
            </div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_costs"></div>
            <div className="chart__label-wrapper">
              <div className="chart__label-title">Затраты</div>
              <div className="chart__label-amount">
                {formatCurrency(totals.costs)}
              </div>
            </div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_profit"></div>
            <div className="chart__label-wrapper">
              <div className="chart__label-title">Прибыль</div>
              <div className="chart__label-amount">
                {formatCurrency(totals.profit)}
              </div>
            </div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_indebtedness"></div>
            <div className="chart__label-wrapper">
              <div className="chart__label-title">Задолженность</div>
              <div className="chart__label-amount">
                {formatCurrency(totals.indebtedness)}
              </div>
            </div>
          </div>
          <div className="chart__label">
            <div className="chart__label-icon chart__label-icon_total"></div>
            <div className="chart__label-wrapper">
              <div className="chart__label-title">Итог</div>
              <div className="chart__label-amount">
                {formatCurrency(totals.total)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
