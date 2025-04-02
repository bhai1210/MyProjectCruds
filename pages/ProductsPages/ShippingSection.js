import React, { useState } from "react";

export default function ShippingSection() {
  const [isPhysical, setIsPhysical] = useState(true);
  const [shipping, setShipping] = useState({
    weight: "0.25 kg",
    height: "10 cm",
    length: "10 cm",
    width: "7 cm",
  });

  const handleChange = (field, value) => {
    setShipping({ ...shipping, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., log the data
    console.log("Shipping Information Submitted:", shipping);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-md font-semibold text-gray-700 mb-4">Shipping</h3>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Physical product checkbox */}
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="checkbox"
            checked={isPhysical}
            onChange={(e) => setIsPhysical(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label className="text-blue-600 text-sm font-medium">
            This is a physical product
          </label>
        </div>

        {/* Dimensions */}
        {isPhysical && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Weight</label>
              <input
                type="text"
                value={shipping.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Height</label>
              <input
                type="text"
                value={shipping.height}
                onChange={(e) => handleChange("height", e.target.value)}
                className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Length</label>
              <input
                type="text"
                value={shipping.length}
                onChange={(e) => handleChange("length", e.target.value)}
                className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Width</label>
              <input
                type="text"
                value={shipping.width}
                onChange={(e) => handleChange("width", e.target.value)}
                className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Shipping Details
          </button>
        </div>
      </form>
    </div>
  );
}
