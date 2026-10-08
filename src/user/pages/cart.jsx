import { Link } from "react-router-dom";

function Cart() {
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


      <div className="row g-4">

        {/* Cart Items */}
        <div className="col-lg-8">

          {/* Item */}
          <div className="custom-cart-item p-4 mb-3">

            <div className="row align-items-center g-3">

              {/* Product Image */}
              <div className="col-4 col-md-3">
                <div className="custom-cart-image">
                  Product
                </div>
              </div>

              {/* Product Details */}
              <div className="col-8 col-md-5">
                <h5 className="fw-bold mb-1">
                  Premium Product
                </h5>

                <p className="text-secondary small mb-2">
                  Category: Fashion
                </p>

                <span className="fw-semibold">
                  $49.99
                </span>
              </div>

              {/* Quantity */}
              <div className="col-6 col-md-2">
                <label className="small text-secondary d-block mb-1">
                  Quantity
                </label>

                <select className="form-select shadow-none">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              {/* Remove */}
              <div className="col-6 col-md-2 text-md-end">
                <button
                  type="button"
                  className="btn btn-sm custom-remove-btn"
                >
                  Remove
                </button>
              </div>

            </div>
          </div>


          {/* Second Item */}
          <div className="custom-cart-item p-4 mb-3">

            <div className="row align-items-center g-3">

              <div className="col-4 col-md-3">
                <div className="custom-cart-image">
                  Product
                </div>
              </div>

              <div className="col-8 col-md-5">
                <h5 className="fw-bold mb-1">
                  Everyday Essential
                </h5>

                <p className="text-secondary small mb-2">
                  Category: Essentials
                </p>

                <span className="fw-semibold">
                  $29.99
                </span>
              </div>

              <div className="col-6 col-md-2">
                <label className="small text-secondary d-block mb-1">
                  Quantity
                </label>

                <select className="form-select shadow-none">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              <div className="col-6 col-md-2 text-md-end">
                <button
                  type="button"
                  className="btn btn-sm custom-remove-btn"
                >
                  Remove
                </button>
              </div>

            </div>
          </div>


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
                $79.98
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">
                Shipping
              </span>

              <span className="fw-semibold">
                Free
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">
                Total
              </span>

              <span className="fw-bold fs-5">
                $79.98
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

    </div>
  );
}

export default Cart;