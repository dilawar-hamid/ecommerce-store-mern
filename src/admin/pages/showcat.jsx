import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ShowCategory() {
  const [products, setProducts] = useState([]);
  const [data, setdata] = useState([]);
  const Navigate = useNavigate();
  async function show() {
    const fetch = await axios.get(`http://localhost:4000/Categoryroutes`);
    setdata(fetch.data);
  }

  useEffect(() => {
    show();
  }, []);

  async function procount() {
    try {
      const pro = await axios.get(`http://localhost:4000/Productroutes`);
      setProducts(pro.data);
    } catch {}
  }

  useEffect(() => {
    procount();
  }, []);

  function getProductCount(categoryName) {
    return products.filter((p) => p.category === categoryName).length;
  }

  async function deletecat(id) {
    try {
      const del = await axios.delete(
        `http://localhost:4000/Categoryroutes/${id}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setdata(data.filter((category) => category._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}
    >
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <div className="small mb-2" style={{ color: "#8a9464" }}>
            ADMIN / CATEGORIES
          </div>

          <h2 className="fw-bold mb-1" style={{ color: "var(--color-black)" }}>
            Categories
          </h2>

          <p className="mb-0" style={{ color: "var(--color-charcoal)" }}>
            Organize and manage your store categories.
          </p>
        </div>

        <button
          type="button"
          className="btn custom-btn-primary px-4 py-2 fw-semibold"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Category
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
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
                <p className="small mb-2 text-muted">Total Categories</p>
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
                <i className="bi bi-grid"></i>
              </div>
            </div>
          </div>
        </div>

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
                <p className="small mb-2 text-muted">Products in Categories</p>
                <h3 className="fw-bold mb-0" style={{ color: "#1f1f1d" }}>
                  {data.reduce(
                    (total, category) => total + getProductCount(category.name),
                    0,
                  )}
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
                <i className="bi bi-box-seam"></i>
              </div>
            </div>
          </div>
        </div>

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
                <p className="small mb-2 text-muted">Store Status</p>
                <h5 className="fw-bold mb-0" style={{ color: "#5f6b3e" }}>
                  Organized
                </h5>
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
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Table Card */}
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
                Category List
              </h5>
              <p className="small text-muted mb-0">
                View and manage all categories.
              </p>
            </div>

            <div style={{ minWidth: "220px", maxWidth: "320px", flex: "1" }}>
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
                  placeholder="Search categories..."
                  aria-label="Search categories"
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
                    Category
                  </th>
                  <th className="py-3 small text-uppercase text-muted">
                    Description
                  </th>
                  <th className="py-3 small text-uppercase text-muted">
                    Products
                  </th>
                  <th className="py-3 pe-4 text-end small text-uppercase text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((category, index) => (
                  <tr key={category._id}>
                    <td className="px-4 text-muted">{index + 1}</td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "10px",
                            backgroundColor: "#eae5d8",
                            color: "#5f6b3e",
                          }}
                        >
                          {category.name.charAt(0)}
                        </div>

                        <span
                          className="fw-semibold"
                          style={{ color: "#1f1f1d" }}
                        >
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td style={{ color: "#6b6a63", minWidth: "220px" }}>
                      {category.description}
                    </td>
                    <td>
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: "#edf0e5",
                          color: "#4a5330",
                          fontWeight: "600",
                        }}
                      >
                        {getProductCount(category.name)} products
                      </span>
                    </td>

                    <td className="text-end pe-4">
                      <button
                        type="button"
                        className="btn btn-sm me-2"
                        onClick={() => Navigate(`/updcat/${category._id}`)}
                        aria-label={`Edit ${category.name}`}
                        style={{
                          backgroundColor: "#eae5d8",
                          color: "#4a5330",
                          borderRadius: "7px",
                        }}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        aria-label={`Delete ${category.name}`}
                        style={{ borderRadius: "7px" }}
                        onClick={() => deletecat(category._id)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i
                        className="bi bi-folder2-open d-block mb-3"
                        style={{ fontSize: "35px", color: "#8a9464" }}
                      ></i>
                      <h6 className="fw-bold">No categories found</h6>
                      <p className="text-muted small mb-0">
                        Add a category to get started.
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
            Showing {data.length} categories
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShowCategory;
