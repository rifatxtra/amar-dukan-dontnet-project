import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    price: "",
    status: true,
    options: [],
  });

  const [file, setFile] = useState(null);

  const apiUrl = "http://localhost:5214/api";

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${apiUrl}/Category`);
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${apiUrl}/Menu`);
    setProducts(res.data);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setForm({
        name: item.name,
        categoryId: item.categoryId,
        price: item.price,
        status: item.status,
        options: item.options || [],
      });
      setFile(null);
    } else {
      setEditingItem(null);
      setForm({
        name: "",
        categoryId: "",
        price: "",
        status: true,
        options: [],
      });
      setFile(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Options + Meta
  const addOption = () => {
    setForm({
      ...form,
      options: [
        ...form.options,
        { optionName: "", optionType: "", optionMeta: [] },
      ],
    });
  };

  const updateOption = (index, field, value) => {
    const updated = [...form.options];
    updated[index][field] = value;
    setForm({ ...form, options: updated });
  };

  const addMeta = (optionIndex) => {
    const updated = [...form.options];
    updated[optionIndex].optionMeta.push({ metaKey: "", metaValue: "" });
    setForm({ ...form, options: updated });
  };

  const updateMeta = (optionIndex, metaIndex, field, value) => {
    const updated = [...form.options];
    updated[optionIndex].optionMeta[metaIndex][field] = value;
    setForm({ ...form, options: updated });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("categoryId", form.categoryId.toString());
    formData.append("price", form.price.toString());
    formData.append("status", form.status ? "true" : "false"); // send as string
    if (file) formData.append("image", file);
    formData.append("options", JSON.stringify(form.options));

    try {
      if (editingItem) {
        await axios.put(`${apiUrl}/Menu/${editingItem.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${apiUrl}/Menu`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving product.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await axios.delete(`${apiUrl}/Menu/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-6 overflow-hidden w-[100vw]">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Product
      </button>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto border rounded">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 border">
                  No products found
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2 border">
                  {p.image && (
                    <img
                      src={`http://localhost:5214/uploads/images/${p.image}`}
                      alt={p.name}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">
                  {categories.find((c) => c.id === p.categoryId)?.name}
                </td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.status ? "Active" : "Inactive"}</td>
                <td className="p-2 border">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleOpenModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4">
              {editingItem ? "Edit Product" : "Add Product"}
            </h3>

            <div className="mb-2">
              <label className="block font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Category</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-2 flex items-center space-x-2">
              <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleChange}
              />
              <label>Active</label>
            </div>
            <div className="mb-2">
              <label className="block font-medium">Image</label>
              <input type="file" onChange={handleFileChange} />
              {editingItem?.image && (
                <img
                  src={`http://localhost:5214/uploads/images/${editingItem.image}`}
                  alt="current"
                  className="w-20 h-20 mt-2 object-cover"
                />
              )}
            </div>

            {/* Options */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold">Options</label>
                <button
                  type="button"
                  onClick={addOption}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  + Add Option
                </button>
              </div>
              {form.options.map((opt, i) => (
                <div key={i} className="border p-2 my-2 rounded">
                  <input
                    placeholder="Option Name"
                    value={opt.optionName}
                    onChange={(e) =>
                      updateOption(i, "optionName", e.target.value)
                    }
                    className="border p-1 mr-2 rounded"
                  />
                  <input
                    placeholder="Option Type"
                    value={opt.optionType}
                    onChange={(e) =>
                      updateOption(i, "optionType", e.target.value)
                    }
                    className="border p-1 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => addMeta(i)}
                    className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
                  >
                    + Meta
                  </button>

                  {opt.optionMeta?.map((meta, mi) => (
                    <div key={mi} className="ml-4 mt-2 flex flex-col space-y-1">
                      <input
                        placeholder="Meta Key"
                        value={meta.metaKey}
                        onChange={(e) =>
                          updateMeta(i, mi, "metaKey", e.target.value)
                        }
                        className="border p-1 rounded"
                      />
                      <input
                        placeholder="Meta Value"
                        value={meta.metaValue}
                        onChange={(e) =>
                          updateMeta(i, mi, "metaValue", e.target.value)
                        }
                        className="border p-1 rounded"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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