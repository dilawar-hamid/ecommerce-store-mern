import { API_BASE_URL } from "../../config.js";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext.jsx";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      {/* Page Heading */}
      <div className="mb-4">
        <span className="custom-section-label">
          YOUR SHOPPING BAG
        </span>

        <h1 className="fw-bold mt-2 mb-1">
          Shopping Cart
        </h1>

        <p className="text-secondary mb-0">
          Review your items before checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-secondary"></i>

          <h4 className="fw-bold mt-3">Your cart is empty</h4>

          <p className="text-secondary">
            Looks like you haven't added any products yet.
          </p>

          <Link
            to="/products"
            className="btn custom-btn-primary px-4 py-2"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                className="custom-cart-item p-4 mb-3"
                key={item.product._id}
              >
                <div className="row align-items-center g-3">
                  {/* Product Image */}
                  <div className="col-4 col-md-3">
                    <div className="custom-cart-image">
                      <img
                        src={`${API_BASE_URL}/uploads/${item.product.image}`}
                        alt={item.product.name}
                        className="w-100 rounded"
                        style={{
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="col-8 col-md-5">
                    <h5 className="fw-bold mb-1">
                      {item.product.name}
                    </h5>

                    <p className="text-secondary small mb-2">
                      Category: {item.product.category}
                    </p>

                    <span className="fw-semibold">
                      Rs. {Number(item.product.price).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-6 col-md-2">
                    <label className="small text-secondary d-block mb-2">
                      Quantity
                    </label>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span className="fw-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="col-6 col-md-2 text-md-end">
                    <button
                      type="button"
                      className="btn btn-sm custom-remove-btn"
                      onClick={() =>
                        removeFromCart(item.product._id)
                      }
                    >
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="col-12 text-end">
                    <span className="text-secondary small">
                      Item total:{" "}
                    </span>

                    <span className="fw-bold">
                      Rs.{" "}
                      {(
                        Number(item.product.price) * item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="btn custom-btn-outline px-4 py-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="custom-cart-summary p-4">
              <h4 className="fw-bold mb-4">
                Order Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">
                  Subtotal
                </span>

                <span className="fw-semibold">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">
                  Shipping
                </span>

                <span className="fw-semibold">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>

                <span className="fw-bold fs-5">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <Link
                to="/checkout"
                className="btn custom-btn-primary w-100 py-3 fw-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
