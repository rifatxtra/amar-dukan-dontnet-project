import React, { useEffect, useState } from "react";
import api from "../../../api";

export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch paginated orders
  const fetchOrders = async (pageNumber = page) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/order?page=${pageNumber}&pageSize=${pageSize}`
      );
      setOrders(res.data.data);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Open order modal
  const openOrder = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setShowModal(true);
  };

  // Update order status
  const updateStatus = async () => {
    try {
      await api.put(`/order/${selectedOrder.id}/status`, { status });
      setShowModal(false);
      fetchOrders(); // refresh table
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination controls
  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchOrders(newPage);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="p-2 border">{o.id}</td>
                  <td className="p-2 border">{o.userId || "Guest"}</td>
                  <td className="p-2 border">${o.total}</td>
                  <td className="p-2 border">{o.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => openOrder(o)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">
              Order #{selectedOrder.id}
            </h2>

            <label className="block mb-3">
              Status:
              <select
                className="border p-2 ml-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Completed</option>
                <option>Cancelled</option>
        
              </select>
            </label>

            <h3 className="font-semibold mb-2">Items</h3>
            <ul className="space-y-2">
              {selectedOrder.items.map((item) => (
                <li key={item.id} className="border p-2 rounded">
                  <div>
                    {item.productName} ({item.categoryName})
                  </div>
                  <div>
                    Qty: {item.quantity} × ${item.price}
                  </div>
                  <div>Subtotal: ${item.subTotal}</div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
              <button
                onClick={updateStatus}
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
