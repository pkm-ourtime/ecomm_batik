import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../services/ProductService";
import { getProductCategory } from "../../../services/ProductCategoryService";
import { uploadFile } from "../../../services/FileService";
import Loading from "../../Loading";

const AddProductForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [externalLink, setExternalLink] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getProductCategory();
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageURL = "";
      if (file) {
        const imageData = new FormData();
        imageData.append("file", file);
        const response = await uploadFile(imageData);
        imageURL = `${response.filePath}`;
      }

      const productData = {
        name,
        description,
        price,
        image_url: imageURL,
        category: categoryId || null,
        external_link: externalLink,
      };
      await addProduct(productData);
      navigate("/dashboard-admin");
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed adding product. Please try again later.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const shouldShowExternalLink =
    categoryId && categoryId !== "66836ceee54c73e2c6a64c3e";

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-dark p-8 rounded shadow-lg w-full max-w-2xl">
        <button
          onClick={onClose}
          className="text-primary absolute top-4 right-4 hover:text-gray-500 focus:outline-none"
        >
          X
        </button>
        <h2 className="font-bold text-center text-primary text-3xl mb-10">
          Add Product
        </h2>
        <form id="addProductForm" onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="w-full px-4 mb-8">
              <label htmlFor="productName" className="text-primary font-bold">
                Name:
              </label>
              <input
                type="text"
                id="productName"
                className="w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white"
                placeholder="Masukkan nama produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full px-4 mb-8">
              <label htmlFor="productDesc" className="text-primary font-bold">
                Description:
              </label>
              <input
                type="text"
                id="productDesc"
                className="w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white"
                placeholder="Masukkan deskripsi produk"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full px-4 mb-8">
              <label htmlFor="productPrice" className="text-primary font-bold">
                Price:
              </label>
              <input
                type="text"
                id="productPrice"
                className="w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white"
                placeholder="Masukkan harga produk"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-full px-4 mb-8">
              <label htmlFor="productImage" className="text-primary font-bold">
                Image:
              </label>
              <input
                type="file"
                id="productImage"
                className="w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white"
                onChange={handleFileChange}
              />
            </div>
            <div className="w-full px-4 mb-8">
              <label htmlFor="productCategory" className="text-primary font-bold">
                Category:
              </label>
              <select
                id="productCategory"
                className="w-full bg-gray-200 text-primary p-3 rounded-md focus:bg-white"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option disabled value="">
                  None
                </option>
                {categories.map((category) => (
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
            <div className="w-full px-4 mb-4 flex justify-between">
              <button
                onClick={onClose}
                className="font-semibold text-primary bg-red-500 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
              >
                Close
              </button>
              <button
                className="font-semibold text-primary bg-green-500 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;