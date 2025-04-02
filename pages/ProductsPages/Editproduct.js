import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from "next/router";
import { FaTimes, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';
export default function EditProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState(
    ""
  );
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([""]);
  const [status, setStatus] = useState("Published");

  const tagOptions = ["Watch", "Gadget", "Wearable", "Electronics"];


  const [variants, setVariants] = useState([
    { type: 'Color', value: 'Black' },
    { type: 'Color', value: 'Gray' },
  ]);
  const [basePrice, setBasePrice] = useState("");
 const [discountType, setDiscountType] = useState("No Discount");
 const [discountPercentage, setDiscountPercentage] = useState("");
 const [taxClass, setTaxClass] = useState("Tax Free");
 const [vatAmount, setVatAmount] = useState("");
 const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");


  const [isPhysical, setIsPhysical] = useState(true);
  const [shipping, setShipping] = useState({
    weight: "",
    height: "",
    length: "",
    width: "",
  });
  const handleChange = (field, value) => {
    setShipping({ ...shipping, [field]: value });
  };
 
 
 
 
 
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

 
  const router = useRouter(); // Use Next.js Router

  const [productNameError, setProductNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [basePriceError, setBasePriceError] = useState("");
const [skuError, setSkuError] = useState("");
const [quantityError, setQuantityError] = useState("");

  
let hasError = false
const handleSubmit = async (e) => {
  e.preventDefault();

 



// Product Name
if (!productName.trim()) {
  setProductNameError("Product name is required");
  hasError = true;
}

// Description
if (!description.trim()) {
  setDescriptionError("Product description is required");
  hasError = true;
}

// Category
if (!category.trim()) {
  setCategoryError("Product category is required");
  hasError = true;
}

// Base Price
if (!basePrice || isNaN(basePrice)) {
  setBasePriceError("Base price must be a valid number");
  hasError = true;
}

// SKU
if (!sku.trim()) {
  setSkuError("SKU is required");
  hasError = true;
}

// Quantity
if (!quantity || isNaN(quantity)) {
  setQuantityError("Quantity must be a valid number");
  hasError = true;
}



if (hasError) return;
















  const productData = {
    productName,
    description,
    category,
    tags,
    status,
    basePrice,
    discountType,
    discountPercentage,
    taxClass,
    vatAmount,
    sku,
    barcode,
    quantity,
    variants,
    shipping
  };

  console.log(productData,"this is my full object")

  try {
    const response = await axios.post("http://localhost:5000/posts", productData, {
      headers: { "Content-Type": "application/json" }
    });

   // Show success notification
   toast.success("Product added successfully!", {
    position: "top-right",
    autoClose: 500 // Closes after 3 seconds
  });

  // Navigate to dashboard after a short delay
  setTimeout(() => {
    router.push("/products/table");
  }, 700); // Waiproducts/table toast to be visible before navigating

    console.log("Product added successfully:", response.data);
  } catch (error) {
 
    console.error("Error adding product:", error.response?.data || error.message);

    // Show error notification
    toast.error("Failed to add product. Please try again.", {
      position: "top-right",
      autoClose: 50, 
    });
  }
 
};



const handlecancel = () => {
  router.push("/products/table");
}
 
  return (
    <>
    

    <div className='flex flex-col'>


    <ToastContainer /> {/* Required to display toasts */}
  

      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-400">
          Dashboard &gt; Product List &gt; <span className="text-gray-700 font-medium">Add Product</span>
        </p>

        <div className='flex justify-between'>

      
        <h1 className="text-xl font-semibold text-gray-700 mt-2">Add Product</h1>
   

  
   

        <div className="flex gap-4 mt-6">
      {/* Cancel Button */}
      <button
        type="button"
        onClick={handlecancel}
        className="flex items-center gap-2 border border-gray-300 text-gray-500 px-5 py-2 rounded-md hover:bg-gray-100 transition"
      >
        <FaTimes className="text-sm" />
        Cancel
      </button>

      {/* Save Product Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-500 transition"
      >
        <FaSave className="text-sm" />
        Save Product
      </button>
    </div>
   
   
   
   
   
   
   
   
   

   

    </div>
      </div>

 


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Left Side - General Info */}
  <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
    <h2 className="text-md font-semibold text-gray-700 mb-4">General Information</h2>

    {/* Product Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
      <input
        type="text"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
          setProductNameError(""); // clear error on change
        }}
        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
      />
      {productNameError && (
        <p className="text-red-500 text-sm mt-1">{productNameError}</p>
      )}
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>

      {/* Toolbar */}
      <div className="flex gap-3 border rounded-t px-3 py-2 bg-gray-50 text-gray-500 text-sm">
        <button>A</button>
        <button><b>B</b></button>
        <button><i>I</i></button>
        <button>U</button>
        <button className="ml-auto">H1</button>
        <button>📎</button>
        <button>📷</button>
      </div>

      {/* Textarea */}
      <textarea
        rows="6"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setDescriptionError("");
        }}
        className="w-full border-t-0 border rounded-b px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
      ></textarea>
      {descriptionError && (
        <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
      )}
    </div>
  </div>

  {/* Right Side - Options */}
  <div className="space-y-6">
    {/* Category */}
    <div className="bg-white shadow rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">Product Category</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCategoryError("");
        }}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">Select Category</option>
        <option>Watch</option>
        <option>Smartphone</option>
        <option>Tablet</option>
      </select>
      {categoryError && (
        <p className="text-red-500 text-sm mt-1">{categoryError}</p>
      )}

      <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">Product Tags</label>
      <div className="flex flex-wrap gap-2">
        {tagOptions.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`px-2 py-1 text-sm rounded ${
              tags.includes(tag)
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() =>
              setTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag)
                  : [...prev, tag]
              )
            }
          >
            {tag} {tags.includes(tag) && "×"}
          </button>
        ))}
      </div>
    </div>

    {/* Status (optional, no validation needed) */}
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">Status</p>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
          {status}
        </span>
      </div>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option>Published</option>
        <option>Draft</option>
        <option>Archived</option>
      </select>
    </div>
  </div>
</div>

 
 
 

 
 
 
 
 
 
 

 
 

 
 
 

 
 
 
 
 
 
 
 
 
 

 
 
 
 
 

 
 
 

 
 
 
 
 
 
 
 


 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 



  
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
      <div className="bg-white rounded-xl shadow p-6 ">
        <h3 className="text-md font-semibold text-gray-700">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Base Price</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={basePrice}
              onChange={(e) => {
                setBasePrice(e.target.value);
                setBasePriceError("");
              }}
            />
            {basePriceError && (
  <p className="text-red-500 text-sm mt-1">{basePriceError}</p>
)}
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

{skuError && (
  <p className="text-red-500 text-sm mt-1">{skuError}</p>
)}
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
               onChange={(e) => {
                 setQuantity(e.target.value);
                 setQuantityError("");
               }}
            />
            {quantityError && (
  <p className="text-red-500 text-sm mt-1">{quantityError}</p>
)}
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

   

    </div>

    </>
  );
}
