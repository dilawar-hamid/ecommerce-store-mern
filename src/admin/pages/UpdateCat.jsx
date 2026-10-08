import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    description: "",
  });
  async function getcategory() {
    try {
      const res = await axios.get(`http://localhost:4000/Categoryroutes/${id}`);

      setdata(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getcategory();
  }, []);

  async function update(values) {
    const upd = await axios.put(
      `http://localhost:4000/Categoryroutes/${id}`,
      values,
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    navigate("/showcat");
  }

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}
    >
      {/* Page Header */}
      <div className="mb-4">
        <div className="small mb-2" style={{ color: "#8a9464" }}>
          ADMIN / CATEGORIES / UPDATE
        </div>

        <h2 className="fw-bold mb-1" style={{ color: "var(--color-black)" }}>
          Update Category
        </h2>

        <p className="mb-0" style={{ color: "var(--color-charcoal)" }}>
          Edit and update the details of your store category.
        </p>
      </div>

      {/* Update Category Form Card */}
      <div className="row">
        <div className="col-12 col-xl-8">
          <div
            className="card border-0"
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-medium)",
              overflow: "hidden",
            }}
          >
            {/* Card Header */}
            <div
              className="card-header px-4 py-3 border-0"
              style={{ backgroundColor: "#f4f1ea" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "10px",
                    backgroundColor: "#eae5d8",
                    color: "#5f6b3e",
                    fontSize: "20px",
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </div>

                <div>
                  <h5
                    className="fw-bold mb-1"
                    style={{ color: "var(--color-black)" }}
                  >
                    Category Details
                  </h5>
                  <p className="small text-muted mb-0">
                    Make changes to the category information below.
                  </p>
                </div>
              </div>
            </div>

            {/* Form UI */}
            <div className="card-body p-4 p-md-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  update(data);
                }}
              >
                {/* Category Name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="form-label fw-semibold"
                    style={{ color: "var(--color-black)" }}
                  >
                    Category Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter category name"
                    value={data.name}
                    onChange={(e) => setdata({ ...data, name: e.target.value })}
                  />

                  <div className="form-text">
                    Enter a clear name for this category.
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold"
                    style={{ color: "var(--color-black)" }}
                  >
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Enter category description"
                    value={data.description}
                    onChange={(e) =>
                      setdata({ ...data, description: e.target.value })
                    }
                  ></textarea>

                  <div className="form-text">
                    Provide a short description of this category.
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="d-flex flex-wrap justify-content-end gap-2 pt-3"
                  style={{ borderTop: "1px solid #eae5d8" }}
                >
                  <button
                    type="button"
                    className="btn px-4 py-2 fw-semibold"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#45443f",
                      border: "1px solid #d6d0c2",
                      borderRadius: "50px",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn custom-btn-primary px-4 py-2 fw-semibold"
                  >
                    <i className="bi bi-check2 me-2"></i>
                    Update Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="col-12 col-xl-4 mt-4 mt-xl-0">
          <div
            className="card border-0"
            style={{
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="card-body p-4">
              <div
                className="d-flex align-items-center gap-2 mb-3"
                style={{ color: "#5f6b3e" }}
              >
                <i className="bi bi-info-circle fs-5"></i>
                <h6
                  className="fw-bold mb-0"
                  style={{ color: "var(--color-black)" }}
                >
                  Update Information
                </h6>
              </div>

              <p
                className="small mb-3"
                style={{ color: "var(--color-charcoal)", lineHeight: "1.7" }}
              >
                Update the category name or description using the form. Make
                sure the information is accurate before saving.
              </p>

              <div
                className="p-3"
                style={{
                  backgroundColor: "#f4f1ea",
                  borderRadius: "10px",
                }}
              >
                <div className="d-flex align-items-start gap-2">
                  <i
                    className="bi bi-lightbulb mt-1"
                    style={{ color: "#5f6b3e" }}
                  ></i>
                  <p
                    className="small mb-0"
                    style={{ color: "#45443f", lineHeight: "1.6" }}
                  >
                    Keep category names simple and descriptions easy to
                    understand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
