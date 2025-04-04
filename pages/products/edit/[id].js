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
    status: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`https://json-server-backends.onrender.com/posts/${id}`)
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
      await axios.patch(`https://json-server-backends.onrender.com/posts/${id}`, formData);

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

  if (loading) return <p className="text-center mt-10 text-lg font-medium text-gray-700">Loading product data...</p>;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg font-semibold">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 text-center sm:text-left">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-900">
          <div>
            <label className="block mb-1 text-base font-semibold">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-base font-semibold">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-base font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-base font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-base font-semibold">Base Price</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-base font-semibold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">Select Status</option>
              <option value="Published">Published</option>
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
