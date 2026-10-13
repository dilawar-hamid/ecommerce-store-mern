import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 custom-brand" to="/">
          My<span className="custom-brand-accent">Store</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold custom-link ${isActive("/") ? "active" : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
                to="/"
              >
                <i className="bi bi-house-door me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold custom-link ${isActive("/products") ? "active" : ""}`}
                to="/products"
              >
                <i className="bi bi-box-seam me-1"></i>Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold custom-link ${isActive("/cart") ? "active" : ""}`}
                to="/cart"
              >
                <i className="bi bi-cart3 me-1"></i>Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold custom-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
              >
                <i className="bi bi-info-circle me-1"></i>About
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link fw-semibold custom-link ${isActive("/login") ? "active" : ""}`}
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link
                    className="btn custom-btn-register rounded-pill px-4 fw-semibold"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link fw-semibold custom-link ${isActive("/dashboard") ? "active" : ""}`}
                      to="/dashboard"
                    >
                      <i className="bi bi-speedometer2 me-1"></i>Dashboard
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button
                    className="nav-link fw-semibold custom-link"
                    onClick={() => {
                      logout();
                      window.location.href = "/login";
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
