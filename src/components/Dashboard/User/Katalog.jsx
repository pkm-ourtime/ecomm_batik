import React, { useState, useEffect } from "react";
import { getProducts } from "../../../services/ProductService";
import { getProductCategory } from "../../../services/ProductCategoryService";
import toRupiah from "@develoka/angka-rupiah-js";
import ProductModal from "../ProductModal";
import { logout } from '../../../services/AuthService';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addToCart } from "../../../services/CartService";
import { addProductToWishlist } from "../../../services/WishService"
import { buyNow } from "../../../services/OrderService";

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
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

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart');
    } catch (error) {
       console.error('Error adding to cart:', error.message);
      alert('Failed to add product to cart');
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await addProductToWishlist(productId);
      alert('Product added to wishlist');
    } catch (error) {
      console.error("Error adding product to wishlist", error.message);
      alert('Failed to add product to wishlist');
    }
  };

  const handleBuyNow = async (productId) => {
    try {
      await buyNow(productId, 1);
      alert('Purchase successful!');
    } catch (error) {
      console.error("Error purchasing product", error.message);
      alert('Failed to purchase product');
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="w-full flex justify-between items-center mb-4" >
          {username ? 
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Welcome to Batik Store, {username}
          </h2> : <p>Loading...</p> }
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
        <div>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 mr-2"><Link to='cart-list'>Keranjang Saya</Link></button>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 mr-2"><Link to='wish-list'>Wishlist Saya</Link></button>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600"><Link to='order-list'>Pesanan Saya</Link></button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="group relative  max-w-sm bg-white p-4 rounded overflow-hidden shadow-md"
              >
                <div className="absolute top-4  left-4 z-10">
                  <button onClick={() => handleAddToWishlist(product._id)} className="text-red-500 hover:text-red-700 text-xl">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
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
                      {getCategoryName(product.category)}
                    </p>
                  </p>
                  <p className="text-base text-primary mb-4">
                    {toRupiah(product.price).replace(",00", "")}
                  </p>
                </div>
                <div className="mb-2">
                  <button
                    onClick={() => handleBuyNow(product._id)}
                    className="block w-full border border-orange-500 bg-white hover:border text-primary font-bold py-2 rounded text-center"
                  >
                    Beli Sekarang
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="block w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded text-center"
                  >
                    + Keranjang
                  </button>
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
