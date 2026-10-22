import { API_BASE_URL } from "../../config.js";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext.jsx";
import { useFormik } from "formik";
import schema from "../../admin/validations/CheckoutValidation.js";
import axios from "axios";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "Cash on Delivery",
    },

    validationSchema: schema,

    onSubmit: (values) => addorder(values),
  });

  async function addorder(values) {
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        customer: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
        },
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        paymentMethod: values.paymentMethod,
      };

      const add = await axios.post(
        `${API_BASE_URL}/Orderroutes`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      clearCart();
      toast.success(add.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <p className="text-secondary">Add some products before checkout.</p>

        <Link to="/products" className="btn btn-dark">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2">Checkout</h1>
      <p className="text-secondary mb-4">
        Enter your details to complete your order.
      </p>

      <form onSubmit={form.handleSubmit}>
        <div className="row g-4">
          {/* Customer Details */}
          <div className="col-lg-7">
            <div className="border rounded p-4">
              <h4 className="fw-bold mb-4">Delivery Information</h4>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.values.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={form.values.phone}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Complete Delivery Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="4"
                  value={form.values.address}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.values.paymentMethod}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5">
            <div className="border rounded p-4">
              <h4 className="fw-bold mb-4">Your Order</h4>

              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="d-flex justify-content-between gap-3 mb-3"
                >
                  <div>
                    <div className="fw-semibold">{item.product.name}</div>
                    <small className="text-secondary">
                      Quantity: {item.quantity}
                    </small>
                  </div>

                  <div className="fw-semibold text-nowrap">
                    Rs.{" "}
                    {(
                      Number(item.product.price) * item.quantity
                    ).toLocaleString()}
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <button type="submit" className="btn btn-dark w-100 py-3">
                Place Order
              </button>

              <Link to="/cart" className="btn btn-outline-dark w-100 mt-3">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
