'use client';
import React, { useEffect, useState } from 'react';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaSlidersH,
  FaColumns,
} from 'react-icons/fa';
import Link from "next/link";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

const getStatusBadge = (status) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-600";
    case "Draft":
      return "bg-gray-100 text-gray-500";
    case "Low Stock":
      return "bg-orange-100 text-orange-500";
    case "Out of Stock":
      return "bg-red-100 text-red-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export default function ProductList() {
  const tabs = ['All Product', 'Published', 'Low Stock', 'Draft'];
  const [activeTab, setActiveTab] = useState('All Product');
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productList.length / productsPerPage);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setProductList(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchData();
      toast.success("Product Deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Product</h1>

      {/* Breadcrumb + Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <p className="text-sm text-gray-500">Dashboard &gt; Product List</p>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 text-sm font-medium transition">
            <FaDownload className="text-sm" />
            Export
          </button>
          <Link href="/products/edit">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium transition">
              <FaPlus className="text-sm" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Tabs + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
        <div className="inline-flex flex-wrap items-center rounded-xl border border-gray-200 bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === tab
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 relative w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 border rounded bg-white text-gray-500 text-sm w-full sm:w-auto">
            <FaSearch />
            <input
              type="text"
              placeholder="Search product…"
              className="outline-none bg-transparent w-full sm:w-40"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm text-gray-500 bg-white hover:bg-gray-50 w-full sm:w-auto"
            >
              <FaCalendarAlt />
              {`${format(selectedDate[0].startDate, 'MMM dd')} - ${format(
                selectedDate[0].endDate,
                'MMM dd'
              )}`}
            </button>
            {showDatePicker && (
              <div className="absolute z-50 top-12 right-0">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setSelectedDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={selectedDate}
                />
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm text-gray-500 bg-white hover:bg-gray-50">
            <FaSlidersH />
            Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm text-gray-500 bg-white hover:bg-gray-50">
            <FaColumns />
            Edit Column
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="p-4"><input type="checkbox" /></th>
              <th className="p-4">Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentProducts.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" /></td>
                <td className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-xs text-gray-400">{item.variants?.length || 0} Variants</p>
                  </div>
                </td>
                <td className="text-blue-600 cursor-pointer">{item.sku}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.basePrice}</td>
                <td>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="flex items-center gap-3 px-4 py-2 text-gray-500">
                  <Link href={`/products/edit/${item.id}`}>
                    <FaEdit className="cursor-pointer hover:text-green-500" />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer hover:text-red-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 text-sm text-gray-500">
          <span>
            Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, productList.length)} of {productList.length}
          </span>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
