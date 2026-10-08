import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">

          <h1 className="display-1 fw-bold text-dark">
            404
          </h1>

          <h2 className="fw-bold mb-3">
            Page Not Found
          </h2>

          <p className="text-secondary mb-4">
            Sorry, the page you are looking for does not exist.
          </p>

          <Link
            to="/"
            className="btn btn-dark px-4 py-2 fw-semibold"
          >
            Back to Home
          </Link>

        </div>
      </div>
    </div>
  );
}

export default NotFound;