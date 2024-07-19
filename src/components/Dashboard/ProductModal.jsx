import React, { useState, useEffect } from "react";
import toRupiah from "@develoka/angka-rupiah-js";
import { getProductCategory } from "../../services/ProductCategoryService";

const ProductModal = ({ isOpen, onClose, product }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getProductCategory();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:");
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  if (!product) {
    return null;
  }

  return (
    <div isOpen={isOpen} onClose ariaHideApp={false}>
      <div className="relative bg-dark p-8 rounded-lg shadow-lg">
        <button onClick={onClose} className="text-primary absolute top-4 right-4">
          <span class="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="overflow-hidden md:grid md:grid-cols-3">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-auto max-w-48 min-w-[146px] h-auto max-h-48 object-cover object-center"
          />
          <div className="p-4 text-left sm:p-6 md:col-span-2 lg:p-8">
            <h2 className="text-3xl text-primary font-semibold uppercase tracking-widest">
              {product.name}
            </h2>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-white">Category: {getCategoryName(product.category)}</p>
            <p className="text-white">Price: {toRupiah(product.price).replace(",00", "")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
