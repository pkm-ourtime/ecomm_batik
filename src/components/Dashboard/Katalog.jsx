import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/ProductService";
import { getProductCategory } from "../../services/ProductCategoryService";
import toRupiah from "@develoka/angka-rupiah-js";
import ProductModal from "./ProductModal";

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getProductCategory();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <div>
          <a
            class="inline-block rounded-full border border-orange-600 bg-orange-600 p-3 text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-orange-500"
            href="/"
          >
            <span class="sr-only"> Back </span>

            <svg
              class="size-5 transform rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Product Batik
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="group relative  max-w-sm bg-white p-4 rounded overflow-hidden shadow-md"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="px-2 py-2">
                  <button onClick={() => openModal(product)}>
                    <h2 className="text-black text-lg font-bold uppercase underline decoration-stone-300 underline-offset-4">
                      {product.name}
                    </h2>
                  </button>
                  <p className="text-xs text-gray-600">{product.description}</p>
                  <p className="text-gray-500">
                    {`Category: `}
                    <br />
                    <p className="text-primary">
                      {getCategoryName(product.category_id)}
                    </p>
                  </p>
                  <p className="text-base text-primary mb-4">
                    {toRupiah(product.price).replace(",00", "")}
                  </p>
                </div>
                <div>
                  <a
                    href={product.external_link}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded text-center"
                  >
                    Beli Sekarang
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available
            </p>
          )}
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="border border-orange-500 rounded-lg shadow-lg max-w-2xl w-full">
            <ProductModal
              isOpen={modalIsOpen}
              onClose={closeModal}
              product={selectedProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Katalog;
