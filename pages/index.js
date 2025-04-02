'use client';
import React,{useState,useEffect} from "react";
import {
  FaProjectDiagram,
  FaUsers,
  FaFileAlt,
  FaChartPie,
} from "react-icons/fa";

import Dashboard from "./Components/Dashboard";
import SalesSource from "./Components/SalesSource";
import Recentorder from "./Components/Recentorder";
import Profile from "./Components/Profile";
import SidebarDrawer from "./Components/Sidebar";

export default function Home() {

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch monthly chart data
    fetch("http://localhost:5000/statstics")
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(console.error);
   
  }, []);

  console.log(chartData,"this is my chartdata")

  return (
 

   
      <>
      <div className="min-h-full flex flex-col justify-between">

        <Profile />
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Welcome Back, Jenil!</h2>
          <p className="text-gray-600 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enjoy your
            admin panel!
          </p>
        </div>

        {/* Boxes Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Box 1 */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
            <div>
              <h3 className="text-gray-500 text-sm">Total Projects</h3>
              <h2 className="text-2xl font-bold text-gray-800">{chartData?.totalproject}</h2>
              <p className="text-xs text-gray-400 mt-1">3 New this month</p>
            </div>
            <div className="bg-red-100 text-red-500 p-3 rounded-full">
              <FaProjectDiagram size={24} />
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
            <div>
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <h2 className="text-2xl font-bold text-gray-800">{chartData?.totalusers}</h2>
              <p className="text-xs text-gray-400 mt-1">5 New this week</p>
            </div>
            <div className="bg-blue-100 text-blue-500 p-3 rounded-full">
              <FaUsers size={24} />
            </div>
          </div>

          {/* Box 3 */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
            <div>
              <h3 className="text-gray-500 text-sm">Reports</h3>
              <h2 className="text-2xl font-bold text-gray-800">{chartData?.reports}</h2>
              <p className="text-xs text-gray-400 mt-1">Updated 2 days ago</p>
            </div>
            <div className="bg-green-100 text-green-500 p-3 rounded-full">
              <FaFileAlt size={24} />
            </div>
          </div>

          {/* Box 4 */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
            <div>
              <h3 className="text-gray-500 text-sm">Analytics</h3>
              <h2 className="text-2xl font-bold text-gray-800">{chartData?.analytics}</h2>
              <p className="text-xs text-gray-400 mt-1">Performance this month</p>
            </div>
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full">
              <FaChartPie size={24} />
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        <section className="mb-6">
          <Dashboard />
        </section>

        {/* Sales Source Section */}
        <section className="mb-6">
          <SalesSource />
        </section>

        {/* Recent Order Section */}
        <section>
          <Recentorder />
        </section>

        </div>

        </>
    
  
  );
}
