import React, { useState, useEffect, useCallback } from 'react'
import Modal from 'react-modal'
import { getProductById, updateProduct } from '../../../services/ProductService'
import { getProductCategory } from '../../../services/ProductCategoryService'
import Loading from '../../Loading'

Modal.setAppElement('#root')

const EditProductForm = ({ productId, isOpen, onRequestClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [externalLink, setExternalLink] = useState("");

  const fetchProduct = useCallback(async () => {
    try {
      const product = await getProductById(productId);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setExternalLink(product.external_link);
      setCategoryId(product.category !== null ? product.category.toString() : ''); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product. Please try again later.');
      setLoading(false);
    }
  }, [productId]);

  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await getProductCategory();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [fetchProduct, fetchCategories]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateProduct(productId, {
        name,
        description,
        price,
        category_id: categoryId
      });
      onRequestClose();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to edit product. Please try again later.');
    }
  }

  const shouldShowExternalLink =
  categoryId && categoryId !== "66836ceee54c73e2c6a64c3e";

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Edit Product Modal'
      className='fixed inset-0 flex items-center justify-center z-50'
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 z-40'
    >
      <div className='relative bg-dark p-8 rounded shadow-lg max-w-2xl w-full'>
        <button
          onClick={onRequestClose}
          className='text-primary absolute top-4 right-4 hover:text-gray-500 focus:outline-none'
        >
          X
        </button>
        <h2 className='font-bold text-center text-primary text-3xl mb-10'>
          Edit Product
        </h2>
        <form id='editProductForm' onSubmit={handleSubmit}>
          <div className='w-full lg:w-2/3 lg:mx-auto'>
            <div className='w-full px-4 mb-8'>
              <label htmlFor='productName' className='text-primary font-bold'>
                Name:
              </label>
              <input
                type='text'
                id='productName'
                className='w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='w-full px-4 mb-8'>
              <label
                htmlFor='productDescription'
                className='text-primary font-bold'
              >
                Description:
              </label>
              <input
                type='text'
                id='productDescription'
                className='w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className='w-full px-4 mb-8'>
              <label htmlFor='productPrice' className='text-primary font-bold'>
                Price:
              </label>
              <input
                type='text'
                id='productPrice'
                className='w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className='w-full px-4 mb-8'>
              <label
                htmlFor='productCategory'
                className='text-primary font-bold'
              >
                Category:
              </label>
              <select
                id='productCategory'
                className='w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white'
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {shouldShowExternalLink && (
                <div className="w-full px-4 mb-8">
                    <label htmlFor="externalLink" className="text-primary font-bold">
                    External Link:
                    </label>
                    <input
                    type="text"
                    id="externalLink"
                    className="w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white"
                    placeholder="Masukkan link marketplace"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    />
                </div>
            )}
            <div className='w-full px-4 mb-4 flex justify-between'>
              <button
                onClick={onRequestClose}
                className='font-semibold text-primary bg-red-500 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out'
              >
                Close
              </button>
              <button
                className='font-semibold text-primary bg-green-500 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out'
                type='submit'
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export { EditProductForm }