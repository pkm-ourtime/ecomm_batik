import React, {  useEffect, useState } from 'react'
import { getWishList, removeProductFromWishList } from '../../../services/WishService'

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishList();
        setWishlist(data.products);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async(productId) => {
    try {
      const response = await removeProductFromWishList(productId);
      setWishlist(response.products);
    } catch (error) {
      console.error('Failed to remove product from wishlist', error);
    }
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      <ul>
        {wishlist.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleRemoveFromWishlist(product.id)}>
              Romove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList