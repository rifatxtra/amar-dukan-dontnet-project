import React, { useEffect, useState } from 'react';
import api from '../../../api'; // your Axios instance

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/Category');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await api.post('/Category', { id: 0, name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory('');
    } catch (err) {
      console.error(err);
      setError('Failed to add category');
    }
  };

  // Open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setShowModal(true);
  };

  // Update category
  const updateCategory = async () => {
    if (!editName.trim()) return;
    try {
      const res = await api.put(`/Category/${selectedCategory.id}`, { name: editName });
      setCategories(categories.map(cat => cat.id === selectedCategory.id ? res.data : cat));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update category');
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/Category/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete category');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Add category */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* Category list */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="border rounded p-2 space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center border-b p-2">
              <span>{cat.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {showModal && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-3">Edit Category</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4 rounded"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateCategory}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
