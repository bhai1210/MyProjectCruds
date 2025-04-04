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
    fetch("https://json-server-backends.onrender.com/statstics")
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(console.error);
   
  }, []);

  console.log(chartData,"this is my chartdata")

  return (
 

   
      <>
      <div className="min-h-full flex flex-col justify-between">

        <Profile />
      
      
      
        <div className="mb-6 mt-2 ml-[15px]">
  <h2 className="text-xl md:text-2xl  text-gray-800 font-semibold md:ml-[15px]">Welcome Back, Jenil!</h2>
  <p className="text-base md:text-lg text-gray-800 mt-1 md:ml-[15px]">
    Lorem ipsum dolor sit amet, welcome back jenil
  </p>
</div>

      


<div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4">
      {/* Box 1 - Total Projects */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
        <div>
          <h3 className="text-gray-500 text-base sm:text-sm">Total Projects</h3>
          <h2 className="text-xl sm:text-2xl font-bold pt-1 text-gray-800">6784</h2>
          <p className="text-sm sm:text-xs mt-1 font-semibold">
            10% ▲ <label className="ml-1"> +$150 today</label>
          </p>
        </div>
        <div className="bg-red-100 relative bottom-[20px] text-red-500 p-3 rounded-[10px]">
          <FaProjectDiagram size={24} />
        </div>
      </div>

      {/* Box 2 - In Progress */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
        <div>
          <h3 className="text-gray-500 text-base sm:text-sm">In Progress</h3>
          <h2 className="text-xl sm:text-2xl font-bold pt-1 text-gray-800">1920</h2>
          <p className="text-sm sm:text-xs mt-1 font-semibold">
            10% ▲ <label className="ml-1"> +$150 today</label>
          </p>
        </div>
        <div className="bg-red-100 relative bottom-[20px] text-red-500 p-3 rounded-[10px]">
          <FaUsers size={24} />
        </div>
      </div>

      {/* Box 3 - Finished */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
        <div>
          <h3 className="text-gray-500 text-base sm:text-sm">Finished</h3>
          <h2 className="text-xl sm:text-2xl font-bold pt-1 text-gray-800">4412</h2>
          <p className="text-sm sm:text-xs mt-1 font-semibold">
            10% ▲ <label className="ml-1"> +$150 today</label>
          </p>
        </div>
        <div className="bg-red-100 relative bottom-[20px] text-red-500 p-3 rounded-[10px]">
          <FaFileAlt size={24} />
        </div>
      </div>

      {/* Box 4 - Unfinished */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
        <div>
          <h3 className="text-gray-500 text-base sm:text-sm">Unfinished</h3>
          <h2 className="text-xl sm:text-2xl font-bold pt-1 text-gray-800">329</h2>
          <p className="text-sm sm:text-xs mt-1 font-semibold">
            10% ▲ <label className="ml-1"> +$150 today</label>
          </p>
        </div>
        <div className="bg-red-100 relative bottom-[20px] text-red-500 p-3 rounded-[10px]">
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
