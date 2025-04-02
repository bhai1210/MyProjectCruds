import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function Editproduct2() {
  const [variants, setVariants] = useState([
    { type: 'Color', value: 'Black' },
    { type: 'Color', value: 'Gray' },
  ]);

  const [basePrice, setBasePrice] = useState("$400.00");
  const [discountType, setDiscountType] = useState("No Discount");
  const [discountPercentage, setDiscountPercentage] = useState("0%");
  const [taxClass, setTaxClass] = useState("Tax Free");
  const [vatAmount, setVatAmount] = useState("0%");
  const [sku, setSku] = useState("302002");
  const [barcode, setBarcode] = useState("0984939101123");
  const [quantity, setQuantity] = useState("124");

  const addVariant = () => {
    setVariants([...variants, { type: '', value: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      basePrice,
      discountType,
      discountPercentage,
      taxClass,
      vatAmount,
      sku,
      barcode,
      quantity,
      variants,
    };

    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="space-y-6 p-6">
      <form onSubmit={handleSubmit}>
        {/* MEDIA */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Media</h3>
          <p className="text-sm text-gray-500 mb-4">Photo</p>
          <div className="border border-dashed rounded-lg p-4 bg-gray-50 text-center">
            <div className="flex gap-3 justify-center mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 bg-gray-200 rounded" />
              ))}
            </div>
            <p className="text-sm text-gray-500">Drag and drop image here, or click add image</p>
            <button type="button" className="mt-3 px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              Add Image
            </button>
          </div>
        </div>

        {/* PRICING */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-md font-semibold text-gray-700">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Base Price</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Discount Type</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option>No Discount</option>
                <option>Fixed</option>
                <option>Percentage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Discount Percentage (%)</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Tax Class</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={taxClass}
                onChange={(e) => setTaxClass(e.target.value)}
              >
                <option>Tax Free</option>
                <option>GST</option>
                <option>VAT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">VAT Amount (%)</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={vatAmount}
                onChange={(e) => setVatAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* INVENTORY */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-md font-semibold text-gray-700">Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">SKU</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Barcode</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Quantity</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* VARIATIONS */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-md font-semibold text-gray-700">Variation</h3>

          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="text-sm text-gray-500">Variation Type</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={variant.type}
                  onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
                >
                  <option>Color</option>
                  <option>Size</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-500">Variation</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={variant.value}
                  onChange={(e) => handleVariantChange(index, 'value', e.target.value)}
                />
              </div>
              <div className="mt-5 md:mt-7">
                <button
                  onClick={() => removeVariant(index)}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="mt-3 px-4 py-2 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
          >
            + Add Variant
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
