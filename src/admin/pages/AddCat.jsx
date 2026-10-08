import { useFormik } from "formik";
import schema from "../validations/CategoryValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddCategory() {
  const Navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => addcat(values),
  });
  async function addcat(values) {
    const post = await axios.post(`http://localhost:4000/Categoryroutes`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    Navigate("/showcat");
  }
  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div
              className="p-4 p-md-5"
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-medium)",
              }}
            >
              {/* Header */}
              <div className="mb-4">
                <h2
                  className="fw-bold mb-2"
                  style={{ color: "var(--color-black)" }}
                >
                  Add New Category
                </h2>

                <p className="mb-0" style={{ color: "var(--color-charcoal)" }}>
                  Add category details to your store.
                </p>
              </div>

              <form onSubmit={form.handleSubmit}>
                {/* Category Name */}
                <div className="mb-3">
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
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    value={form.values.name}
                    placeholder="Enter category name"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
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
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    value={form.values.description}
                    rows="4"
                    placeholder="Enter category description"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn custom-btn-primary px-4 py-2 fw-semibold"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
