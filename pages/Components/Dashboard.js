import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [targetData, setTargetData] = useState({
    percentage: 0,
    todayRevenue: 0,
    target: 0,
    revenue: 0,
    today: 0,
    growth: 0,
  });

  useEffect(() => {
    // Fetch chart data
    fetch("https://json-server-backends.onrender.com/monthlyData")
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch(console.error);

    // Fetch target data
    fetch("https://json-server-backends.onrender.com/target")
      .then((res) => res.json())
      .then((data) => setTargetData(data))
      .catch(console.error);
  }, []);

  const { percentage, todayRevenue, target, revenue, today, growth } =
    targetData;

  const angle = (percentage / 100) * 180; // convert % to semi-circle angle
  const strokeOffset = 125.6 - (125.6 * percentage) / 100; // adjust stroke-dashoffset

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Target Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800">Target</h2>
        <p className="text-sm text-gray-400">Revenue Target</p>

        <div className="relative w-40 h-20 mx-auto my-4">
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <path
              d="M10,50 A40,40 0 0,1 90,50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            <path
              d="M10,50 A40,40 0 0,1 90,50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="125.6"
              strokeDashoffset={strokeOffset}
            />
          </svg>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-xl font-semibold text-gray-800">
              {percentage.toFixed(2)}%
            </p>
            <p className="text-green-500 text-sm font-medium">
              {growth >= 0 ? `+${growth}%` : `${growth}%`}
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          You succeed earn{" "}
          <span className="text-gray-800 font-medium">
            ${todayRevenue.toLocaleString()}
          </span>{" "}
          today, it's higher than yesterday
        </p>

        <div className="flex justify-between mt-6 text-center">
          <div>
            <p className="text-sm text-gray-400">Target</p>
            <p className="text-lg font-semibold text-gray-800">
              ${target.toLocaleString()}{" "}
              <span className="text-red-500 text-sm">↓</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Revenue</p>
            <p className="text-lg font-semibold text-gray-800">
              ${revenue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Today</p>
            <p className="text-lg font-semibold text-gray-800">
              ${today.toLocaleString()}{" "}
              <span className="text-green-500 text-sm">↑</span>
            </p>
          </div>
        </div>
      </div>

      {/* Statistic Chart Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800">Statistic</h2>
        <p className="text-sm text-gray-400 mb-4">Revenue and Sales</p>
        <div className="h-64 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "none",
                  color: "#fff",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#fb923c"
                strokeWidth={2}
                dot={false}
                name="Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
