import React, { useState, useEffect, useRef } from 'react';
import { getProducts } from '../../../services/ProductService';
import toRupiah from '@develoka/angka-rupiah-js';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const limit = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts.slice(0, limit));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="flex flex-col bg-gray-900 text-white lg:flex-row justify-between items-center">
        <div className="w-full lg:w-1/2 p-10">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Produk Terbaru</h2>
            <div>
              <button onClick={scrollLeft} className="text-black bg-white mr-5 p-2 h-10 w-10 rounded-full">&lt;</button>
              <button onClick={scrollRight} className="text-black bg-white p-2 h-10 w-10 rounded-full">&gt;</button>
            </div>
          </div>
          <div className="flex items-center">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto space-x-4 p-4"
            >
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className="flex-shrink-0 max-w-sm bg-white p-4 rounded overflow-hidden shadow-md">
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200'>
                    <img src={product.image_url} alt={product.name} className="w-auto max-w-48 min-w-[146px] h-auto max-h-48 object-cover object-center"/>
                    </div>
                    <div className="pl-2 py-4">
                      <h3 className="text-black text-lg font-bold">{product.name}</h3>
                      <p className="text-gray-600 text-xs">{product.description}</p>
                      <p className="text-gray-700 text-sm">{toRupiah(product.price).replace(',00', '')}</p>
                    </div>
                    <div className="py-2">
                      <a href={product.external_link} target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Beli Sekarang</a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">No products available</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-4">Ayo Belanja !!</h2>
          <p className="mb-4">
            Dapatkan batik terbaik milik kami agar membuat penampilanmu lebih
            terlihat menawan!
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-full">
            <Link to="/katalog" className="bg-white text-black px-4 py-2 rounded-full">
              Lihat Semua Produk...
            </Link>
          </button>
        </div>
      </div>
      <div className="bg-orange-500 text-white py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">CUSTOM BATIK</h2>
          <h3 className="text-2xl font-bold mb-4">
            Batik-Batik Eksklusif Hanya Untukmu
          </h3>
          <p className="max-w-2xl mx-auto mb-4">
            "Batik-Batik Eksklusif Hanya Untukmu: Ungkapkan pesona dan gaya
            unikmu dengan desain elegan dan berkelas, hasil perpaduan tradisi
            dan modernitas. Setiap helai batik mencerminkan keanggunan yang
            istimewa."
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full">
            <ScrollLink to="layanan" smooth={true} duration={500}>Pesan Batik Costum</ScrollLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Katalog;
