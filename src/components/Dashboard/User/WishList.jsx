import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWishList,
  removeProductFromWishList,
} from "../../../services/WishService";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishList();
        setWishlist(data.products);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeProductFromWishList(productId);
      setWishlist(wishlist.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Failed to remove product from wishlist", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition">
            <Link to="/dashboard">Back</Link>
          </button>
          <h2 className="text-center text-3xl font-bold">My Wishlist</h2>
          <div></div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="relative bg-dark text-white p-4 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105"
            >
              <div className="absolute top-4 left-4 z-10">
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="text-red-500 hover:text-white text-xl"
                >
                  <i className="fas fa-heart"></i>
                </button>
              </div>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-800 group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="px-2 py-2">
                <h2 className="text-primary text-lg font-bold uppercase">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-400">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
