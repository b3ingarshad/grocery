import React, { useState, useEffect } from 'react';
import './CategoryManagement.css';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    imageUrl: '',
    discount: '',
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState({
    id: '',
    name: '',
    imageUrl: '',
    discount: '',
  });
  const [error, setError] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://stirring-biscotti-e3781d.netlify.app/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input changes for new category
  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  // Handle adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (
      newCategory.name.trim() &&
      newCategory.imageUrl.trim() &&
      newCategory.discount.trim()
    ) {
      try {
        const response = await fetch('https://stirring-biscotti-e3781d.netlify.app/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCategory),
        });
        if (!response.ok) throw new Error('Failed to add category');
        await fetchCategories();
        setNewCategory({ name: '', imageUrl: '', discount: '' });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle editing a category
  const handleEdit = (category) => {
    setEditingCategory(category._id);
    setEditValue({
      id: category._id,
      name: category.name,
      imageUrl: category.imageUrl,
      discount: category.discount,
    });
  };

  // Handle input changes for editing category
  const handleEditChange = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  // Handle updating a category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (
      editValue.name.trim() &&
      editValue.imageUrl.trim() &&
      editValue.discount.trim()
    ) {
      try {
        const response = await fetch(
          `https://stirring-biscotti-e3781d.netlify.app/api/categories/${editValue.id}`, // Sending ID
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: editValue.name,
              imageUrl: editValue.imageUrl,
              discount: editValue.discount,
            }),
          }
        );
        if (!response.ok) throw new Error('Failed to update category');
        await fetchCategories();
        setEditingCategory(null);
        setEditValue({ id: '', name: '', imageUrl: '', discount: '' });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle deleting a category
  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(
        `https://stirring-biscotti-e3781d.netlify.app/api/categories/${categoryId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to delete category');
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="category-management">
      <h1 className="heading">Manage Product Categories</h1>

      {error && <p className="error">{error}</p>}

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="category-form">
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleInputChange}
          placeholder="Category Name"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newCategory.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          name="discount"
          value={newCategory.discount}
          onChange={handleInputChange}
          placeholder="Discount (e.g. 10% off)"
          required
        />
        <button type="submit" className="btn">
          Add Category
        </button>
      </form>

      {/* Edit Category Form */}
      {editingCategory && (
        <form onSubmit={handleUpdateCategory} className="edit-form">
          <input
            type="hidden"
            name="id"
            value={editValue.id} // Hidden input to store ID
          />
          <input
            type="text"
            name="name"
            value={editValue.name}
            onChange={handleEditChange}
            placeholder="Edit Category Name"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={editValue.imageUrl}
            onChange={handleEditChange}
            placeholder="Edit Image URL"
            required
          />
          <input
            type="text"
            name="discount"
            value={editValue.discount}
            onChange={handleEditChange}
            placeholder="Edit Discount"
            required
          />
          <button type="submit" className="btn">
            Update Category
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditingCategory(null)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Category List Table */}
      <div className="category-list">
        <h2>Existing Categories</h2>
        <table className="category-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category Name</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="category-img"
                  />
                </td>
                <td>{category.name}</td>
                <td>{category.discount}</td>
                <td>
                  <button
                    onClick={() => handleEdit(category)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
