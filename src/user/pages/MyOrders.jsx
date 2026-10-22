import { API_BASE_URL } from "../../config.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/Orderroutes/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  async function cancelOrder(orderId) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      setCancellingId(orderId);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${API_BASE_URL}/Orderroutes/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: "Cancelled" }
            : order
        )
      );

      toast.success(response.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to cancel order."
      );
    } finally {
      setCancellingId("");
    }
  }

  if (loading) {
    return <p className="text-center mt-5">Loading orders...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-danger mt-5">
        {error}
      </p>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card mb-4 p-3"
          >
            <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
              <strong>Order ID: {order._id}</strong>

              <span
                className={`badge ${
                  order.status === "Cancelled"
                    ? "bg-danger"
                    : order.status === "Completed"
                    ? "bg-success"
                    : "bg-secondary"
                } align-self-start`}
              >
                {order.status}
              </span>
            </div>

            <p className="mb-2">
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {order.items.map((item, index) => (
              <div
                key={`${order._id}-${item.product || index}`}
                className="d-flex justify-content-between border-bottom py-2 gap-3"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  Rs.{" "}
                  {(
                    Number(item.price) * item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}

            <h5 className="text-end mt-3">
              Total: Rs.{" "}
              {Number(order.totalAmount).toLocaleString()}
            </h5>

            {order.status === "Pending" && (
              <div className="text-end mt-2">
                <button
                  className="btn btn-danger"
                  onClick={() => cancelOrder(order._id)}
                  disabled={cancellingId === order._id}
                >
                  {cancellingId === order._id
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
