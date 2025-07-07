import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';

export default function Products() {
  SwiperCore.use([Autoplay]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    ratings: 0,
    stock: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products and categories
  useEffect(() => {
    fetch('https://stirring-biscotti-e3781d.netlify.app/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    fetch('https://stirring-biscotti-e3781d.netlify.app/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle Add or Update Product
  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (editingProduct) {
        // Update Product API Request
        response = await fetch(
          `https://stirring-biscotti-e3781d.netlify.app/api/products/${editingProduct._id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
          }
        );
      } else {
        // Add New Product API Request
        response = await fetch('https://stirring-biscotti-e3781d.netlify.app/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });
      }

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        throw new Error(errorData.msg || 'Something went wrong');
      }

      const productData = await response.json();

      if (editingProduct) {
        // Update state for edited product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productData._id ? productData : product
          )
        );
        setEditingProduct(null);
      } else {
        // Add new product to the list
        setProducts([...products, productData]);
      }

      // Reset the form
      setNewProduct({
        name: '',
        price: '',
        imageUrl: '',
        category: '',
        ratings: 0,
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`); // Show alert for debugging
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://stirring-biscotti-e3781d.netlify.app/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      ratings: product.ratings,
      stock: product.stock,
    });
  };

  return (
    <section className="products" id="products">
      <h1 className="heading">
        Manage <span>Products</span>
      </h1>

      {/* Add/Edit Product Form */}
      <form onSubmit={handleAddOrUpdateProduct} className="add-product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />

        <input
          type="number"
          name="stock"
          value={newProduct.stock}
          onChange={handleInputChange}
          placeholder="Stock Quantity"
          min="0"
          required
        />

        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="ratings"
          value={newProduct.ratings}
          onChange={handleInputChange}
          placeholder="Ratings (0-5)"
          min="0"
          max="5"
          step="0.1"
        />

        <button type="submit" className="btn">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product Display */}
      <div className="products-slider slider">
        <div className="wrapper swiper-wrapper">
          <Swiper
            loop
            spaceBetween={20}
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            centeredSlides
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: '1rem' }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="box">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <div className="price">Rs {product.price}</div>
                  <p>
                    Category:{' '}
                    {categories.find((cat) => cat._id === product.category)
                      ?.name || 'Unknown'}
                  </p>
                  <p>{product.stock}</p>
                  <div className="product-actions">
                    <button
                      type="button"
                      onClick={() => handleEditProduct(product)}
                      className="edit-btn"
                      aria-label="Edit Product"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product._id)}
                      className="delete-btn"
                      aria-label="Delete Product"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
