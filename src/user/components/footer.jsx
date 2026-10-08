import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="custom-footer pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row gy-4">

          {/* Brand + short intro */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              My<span className="custom-brand-accent">Store</span>
            </h5>
            <p className="mb-0 small">
              Quality products, seamless shopping experience. Yahan har cheez
              aapki zaroorat ke hisaab se banai gayi hai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none">
                  <i className="bi bi-house-door me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-decoration-none">
                  <i className="bi bi-box-seam me-2"></i>Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-decoration-none">
                  <i className="bi bi-cart3 me-2"></i>Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-decoration-none">
                  <i className="bi bi-person-plus me-2"></i>Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3">Get in Touch</h6>
            <p className="small mb-1">
              <i className="bi bi-envelope me-2"></i>support@mystore.com
            </p>
            <p className="small mb-3">
              <i className="bi bi-telephone me-2"></i>+92 300 1234567
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="my-4 opacity-25" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} MyStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;