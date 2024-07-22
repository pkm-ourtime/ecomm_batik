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
    <div className="container">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between items-center my-2">
        <button className="rounded full bg-red-500 p-1">
            <Link to="/dashboard">Back</Link>
        </button>
        <h2 className="text-center">My Wishlist</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="group relative  max-w-sm bg-orange-500 p-4 rounded overflow-hidden shadow-md"
            >
              <div className="absolute top-4  left-4 z-10">
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="text-red-500 hover:text-white text-xl"
                >
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
                <h2 className="text-black text-lg font-bold uppercase">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
