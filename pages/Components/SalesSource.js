import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import {
  FaMobileAlt, FaTabletAlt, FaHeadphones,
  FaLaptop, FaMouse, FaHdd, FaCamera
} from "react-icons/fa";

const COLORS = ["#60a5fa", "#38bdf8", "#0ea5e9", "#0369a1"];

const iconMap = {
  Smartphone: <FaMobileAlt />,
  Tablet: <FaTabletAlt />,
  Earphone: <FaHeadphones />,
  "Laptop & PC": <FaLaptop />,
  Mouse: <FaMouse />,
  "Hardisk & USB Drive": <FaHdd />,
  Camera: <FaCamera />,
};

export default function SalesSource() {
  const [pieData, setPieData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    fetch("https://json-server-backends.onrender.com/pieData")
      .then((res) => res.json())
      .then(setPieData)
      .catch(console.error);

    fetch("https://json-server-backends.onrender.com/topProducts")
      .then((res) => res.json())
      .then(setTopProducts)
      .catch(console.error);

    fetch("https://json-server-backends.onrender.com/topCategories")
      .then((res) => res.json())
      .then((data) => {
        const withIcons = data.map(item => ({
          ...item,
          icon: iconMap[item.name] || null
        }));
        setTopCategories(withIcons);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Card 1: Sales Source */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700">Sales Source</h2>
        <p className="text-sm text-gray-400 mb-4">Revenue Source</p>

        <div className="flex flex-col items-center">
          <div className="w-40 h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-semibold">$75.5k</p>
              <p className="text-green-500 text-xs bg-green-100 px-2 py-0.5 rounded-full mt-1">+10%</p>
            </div>
          </div>

          <div className="ml-6 mt-[20px] space-y-2 text-sm text-gray-600">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2`}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  {item.name}
                </div>
                <div>${item.value?.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: Top Product */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700">Top Product</h2>
        <p className="text-sm text-gray-400 mb-4">Top Product in This Month</p>
        <ul className="space-y-3">
          {topProducts.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.type}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-700">${item.amount}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Card 3: Top Category */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700">Top Category</h2>
        <p className="text-sm text-gray-400 mb-4">Top Category in This Month</p>
        <ul className="space-y-3">
          {topCategories.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-lg">{item.icon}</div>
                <p className="text-sm text-gray-700">{item.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-700">{item.count}</p>
                <p className={`text-xs font-medium ${item.color}`}>{item.change}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
