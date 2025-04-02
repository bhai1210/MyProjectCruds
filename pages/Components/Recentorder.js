'use client';
import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaGlobeAmericas } from 'react-icons/fa';
import axios from 'axios';

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing':
      return 'bg-orange-100 text-orange-500';
    case 'Shipped':
      return 'bg-blue-100 text-blue-500';
    case 'Delivered':
      return 'bg-green-100 text-green-500';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

export default function RecentOrder() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes] = await Promise.all([
          axios.get('http://localhost:5000/orders'),
          axios.get('http://localhost:5000/customers'),
        ]);

        setOrders(ordersRes.data);
        setCustomers(customersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-4 md:p-6">
      {/* Left: Recent Orders Table */}
      <div className="col-span-2 bg-white shadow rounded-xl p-4 md:p-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            Recent Orders
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
              +2 Orders
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <button className="px-3 py-1 rounded border hover:bg-gray-100 transition">Select Date</button>
            <button className="px-3 py-1 rounded border hover:bg-gray-100 transition">Filters</button>
            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-200 transition">See All</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-500 text-left border-b">
                <th className="py-2">Product</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div>
                        <p className="font-medium">{order.product}</p>
                        {order.sub && (
                          <p className="text-xs text-gray-400">{order.sub}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="flex gap-3 items-center mt-2">
                    <FaEye className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                    <FaTrash className="text-gray-400 hover:text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-500 mt-6 gap-3">
          <span>Showing 1–5 from 100</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">1</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
            <span>...</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">5</button>
          </div>
        </div>
      </div>

      {/* Right: Customer Growth */}
      <div className="bg-white shadow rounded-xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">Customer Growth</h2>
        <p className="text-sm text-gray-400 mb-4">Based on Country</p>

        <div className="w-full h-40 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400">
          <FaGlobeAmericas size={64} />
        </div>

        <ul className="space-y-4">
          {customers.map((item, index) => (
            <li key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.customers} Customers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-full sm:w-24 h-2 bg-gray-100 rounded-full">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.growth}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-700">{item.growth}%</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
