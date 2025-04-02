'use client';
import React, { useEffect, useState } from 'react';
import {
  FaEdit,
  FaTrash,
  FaDownload,
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaSlidersH,
  FaColumns,
} from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Published':
      return 'bg-green-100 text-green-600';
    case 'Draft':
      return 'bg-gray-100 text-gray-500';
    case 'Low Stock':
      return 'bg-orange-100 text-orange-500';
    case 'Out of Stock':
      return 'bg-red-100 text-red-500';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

export default function ProductList() {
  const tabs = ['All Product', 'Published', 'Low Stock', 'Draft'];
  const [activeTab, setActiveTab] = useState('All Product');
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: 'selection' },
  ]);

  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setProductList(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortKey, sortOrder]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchData();
      toast.success('Product Deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  const handleExport = () => {
    if (!productList.length) {
      toast.warning('No data to export.');
      return;
    }
    const csvHeaders = ['Product Name', 'SKU', 'Category', 'Stock', 'Price', 'Status'];
    const csvRows = productList.map((item) => [
      item.productName,
      item.sku,
      item.category,
      item.quantity,
      item.basePrice,
      item.status,
    ]);
    const csvContent = [csvHeaders, ...csvRows]
      .map((row) => row.map((field) => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'product-list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredProducts = productList.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Product</h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
    
  
  
    
    
    
        <div className="w-full flex justify-end flex-wrap gap-2 mt-4">
  {/* Export Button */}
  <button
    onClick={handleExport}
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 text-sm font-medium"
  >
    <FaDownload className="text-sm" />
    Export
  </button>

  {/* Add Product Button */}
  <Link href="/products/edit">
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium">
      <FaPlus className="text-sm" />
      Add Product
    </button>
  </Link>
</div>

    
    
    
    
    
    
    
    
    
      </div>

   

  

      <div className="w-full">
  {/* Wrapper for large/small screen behavior */}
  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

    {/* Tabs */}
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

    {/* Filter Bar */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-auto">
      {/* Search Input */}
      <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white text-gray-500">
        <FaSearch />
        <input
          type="text"
          placeholder="Search product…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Date Picker */}
      <div className="relative">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="w-full flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50"
        >
          <FaCalendarAlt />
          {`${format(selectedDate[0].startDate, 'MMM dd')} - ${format(
            selectedDate[0].endDate,
            'MMM dd'
          )}`}
        </button>
        {showDatePicker && (
          <div className="absolute z-50 top-14 left-0">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setSelectedDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={selectedDate}
            />
          </div>
        )}
      </div>

      {/* Filters and Columns */}
      <div className="flex gap-2">
        <button className="flex-grow flex items-center justify-center gap-2 px-3 py-2 border rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50">
          <FaSlidersH />
          Filters
        </button>
        <button className="flex-grow flex items-center justify-center gap-2 px-3 py-2 border rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50">
          <FaColumns />
          Edit Column
        </button>
      </div>
    </div>
  </div>
</div>


   
   
   
   
   
   
   
   
   
   
   
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   

   
   
   
   
   
   
   
   
   
   
   

   

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <div className="w-full min-w-[640px]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort('productName')}>
                  Product {sortKey === 'productName' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort('sku')}>
                  SKU {sortKey === 'sku' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort('category')}>
                  Category {sortKey === 'category' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort('quantity')}>
                  Stock {sortKey === 'quantity' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort('basePrice')}>
                  Price {sortKey === 'basePrice' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded" />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-xs text-gray-400">{item.variants?.length || 0} Variants</p>
                    </div>
                  </td>
                  <td className="p-4 text-blue-600 cursor-pointer">{item.sku}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4">{item.basePrice}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3 text-gray-500">
                    <Link href={`/products/edit/${item.id}`}>
                      <FaEdit className="cursor-pointer hover:text-green-500" />
                    </Link>
                    <FaTrash onClick={() => handleDelete(item.id)} className="cursor-pointer hover:text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 text-sm text-gray-500">
          <span>
            Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length}
          </span>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''}`}
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
