import { API_BASE_URL } from "../../config.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/Orderroutes/all-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Orders API response:", response.data);

        setOrders(
          Array.isArray(response.data.orders) ? response.data.orders : [],
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  async function updateStatus(orderId, status) {
    try {
      setUpdatingId(orderId);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${API_BASE_URL}/Orderroutes/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? response.data.order : order,
        ),
      );

      setSuccess("Order status updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function cancelOrder(orderId) {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setUpdatingId(orderId);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${API_BASE_URL}/Orderroutes/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );

      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel order.");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Orders</h1>

        <button className="btn btn-primary btn-sm" type="button">
          <i className="fas fa-plus fa-sm mr-1" /> New Order
        </button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Recent Orders</h6>
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6)}</td>

                      <td>{order.customer?.name || "N/A"}</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <select
                            className={`form-control form-control-sm rounded-pill font-weight-bold ${
                              order.status === "Pending"
                                ? "border-warning text-warning"
                                : order.status === "Processing"
                                  ? "border-primary text-primary"
                                  : order.status === "Completed"
                                    ? "border-success text-success"
                                    : "border-danger text-danger"
                            }`}
                            style={{
                              width: "145px",
                              minHeight: "36px",
                              backgroundColor:
                                order.status === "Pending"
                                  ? "#fff8e1"
                                  : order.status === "Processing"
                                    ? "#eaf2ff"
                                    : order.status === "Completed"
                                      ? "#e8f5e9"
                                      : "#ffebee",
                              cursor:
                                updatingId === order._id ? "wait" : "pointer",
                              fontSize: "12px",
                            }}
                            value={order.status}
                            disabled={updatingId === order._id}
                            onChange={(e) =>
                              updateStatus(order._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                          </select>

                          {updatingId === order._id && (
                            <span className="spinner-border spinner-border-sm text-primary ml-2" />
                          )}
                        </div>
                      </td>

                      <td>Rs. {Number(order.totalAmount).toLocaleString()}</td>

                      <td>
                        {["Pending", "Processing"].includes(order.status) && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            disabled={updatingId === order._id}
                            onClick={() => cancelOrder(order._id)}
                          >
                            {updatingId === order._id
                              ? "Cancelling..."
                              : "Cancel"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
