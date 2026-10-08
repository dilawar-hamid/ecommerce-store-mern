import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowProduct() {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");

  const navigate = useNavigate();

  async function show() {
    try {
      const fetch = await axios.get(`http://localhost:4000/Productroutes`);

      setdata(fetch.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    show();
  }, []);

  async function deleteproduct(id) {
    try {
      const del = await axios.delete(
        `http://localhost:4000/Productroutes/${id}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setdata(data.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const filtered = data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}
    >
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <div className="small mb-2" style={{ color: "#8a9464" }}>
            ADMIN / PRODUCTS
          </div>

          <h2 className="fw-bold mb-1" style={{ color: "var(--color-black)" }}>
            Products
          </h2>

          <p className="mb-0" style={{ color: "var(--color-charcoal)" }}>
            Organize and manage your store products.
          </p>
        </div>

        <button
          type="button"
          className="btn custom-btn-primary px-4 py-2 fw-semibold"
          onClick={() => navigate("/admin/products/add")}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {/* Total Products */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div
            className="card border-0 h-100"
            style={{
              borderRadius: "12px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="small mb-2 text-muted">Total Products</p>

                <h3 className="fw-bold mb-0" style={{ color: "#1f1f1d" }}>
                  {data.length}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  backgroundColor: "#eae5d8",
                  color: "#5f6b3e",
                  fontSize: "23px",
                }}
              >
                <i className="bi bi-box-seam"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Products In Stock */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div
            className="card border-0 h-100"
            style={{
              borderRadius: "12px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="small mb-2 text-muted">Products in Stock</p>

                <h3 className="fw-bold mb-0" style={{ color: "#1f1f1d" }}>
                  {data.filter((product) => Number(product.stock) > 0).length}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  backgroundColor: "#edf0e5",
                  color: "#5f6b3e",
                  fontSize: "23px",
                }}
              >
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div
            className="card border-0 h-100"
            style={{
              borderRadius: "12px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="small mb-2 text-muted">Out of Stock</p>

                <h3 className="fw-bold mb-0" style={{ color: "#1f1f1d" }}>
                  {data.filter((product) => Number(product.stock) === 0).length}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  backgroundColor: "#f4e8e5",
                  color: "#9b4d45",
                  fontSize: "23px",
                }}
              >
                <i className="bi bi-exclamation-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div
        className="card border-0"
        style={{
          borderRadius: "12px",
          boxShadow: "var(--shadow-medium)",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div className="card-header bg-white border-0 px-4 pt-4 pb-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: "#1f1f1d" }}>
                Product List
              </h5>

              <p className="small text-muted mb-0">
                View and manage all products.
              </p>
            </div>

            {/* Search */}
            <div
              style={{
                minWidth: "220px",
                maxWidth: "320px",
                flex: "1",
              }}
            >
              <div className="input-group">
                <span
                  className="input-group-text bg-white"
                  style={{
                    borderColor: "#eae5d8",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  <i className="bi bi-search text-muted"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  aria-label="Search products"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  style={{
                    borderColor: "#eae5d8",
                    borderRadius: "0 8px 8px 0",
                    boxShadow: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr style={{ backgroundColor: "#f4f1ea" }}>
                  <th className="px-4 py-3 small text-uppercase text-muted">
                    #
                  </th>

                  <th className="py-3 small text-uppercase text-muted">
                    Product
                  </th>

                  <th className="py-3 small text-uppercase text-muted">
                    Category
                  </th>

                  <th className="py-3 small text-uppercase text-muted">
                    Price
                  </th>

                  <th className="py-3 small text-uppercase text-muted">
                    Stock
                  </th>

                  <th className="py-3 pe-4 text-end small text-uppercase text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((product, index) => (
                  <tr key={product._id}>
                    {/* Number */}
                    <td className="px-4 text-muted">{index + 1}</td>

                    {/* Product */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={`http://localhost:4000/uploads/${product.image}`}
                          alt={product.name}
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "10px",
                            objectFit: "cover",
                            backgroundColor: "#eae5d8",
                          }}
                        />

                        <span
                          className="fw-semibold"
                          style={{ color: "#1f1f1d" }}
                        >
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: "#edf0e5",
                          color: "#4a5330",
                          fontWeight: "600",
                        }}
                      >
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="fw-semibold" style={{ color: "#1f1f1d" }}>
                      Rs. {product.price}
                    </td>

                    {/* Stock */}
                    <td>
                      {Number(product.stock) === 0 ? (
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            backgroundColor: "#f4e8e5",
                            color: "#9b4d45",
                            fontWeight: "600",
                          }}
                        >
                          Out of stock
                        </span>
                      ) : (
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            backgroundColor: "#edf0e5",
                            color: "#4a5330",
                            fontWeight: "600",
                          }}
                        >
                          {product.stock} in stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-end pe-4">
                      <button
                        type="button"
                        className="btn btn-sm me-2"
                        aria-label={`Edit ${product.name}`}
                        style={{
                          backgroundColor: "#eae5d8",
                          color: "#4a5330",
                          borderRadius: "7px",
                        }}
                        onClick={() => navigate(`/updpro/${product._id}`)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        aria-label={`Delete ${product.name}`}
                        style={{ borderRadius: "7px" }}
                        onClick={() => deleteproduct(product._id)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <i
                        className="bi bi-box-seam d-block mb-3"
                        style={{
                          fontSize: "35px",
                          color: "#8a9464",
                        }}
                      ></i>

                      <h6 className="fw-bold">No products found</h6>

                      <p className="text-muted small mb-0">
                        Add a product to get started.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer bg-white border-0 px-4 py-3">
          <span className="small text-muted">
            Showing {filtered.length} products
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
