// 📁 pages/products/edit/[id].js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    category: '',
    quantity: '',
    basePrice: '',
    status: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product data
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/posts/${id}`)
        .then((res) => {
          setFormData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch product data');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/posts/${id}`, formData);

      toast.success('Product updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push('/products/table');
      }, 2500);
    } catch (error) {
      toast.error('Failed to update product.');
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product data...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Base Price</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
             
              <option value="published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Page;
