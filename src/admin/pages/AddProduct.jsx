import { useFormik } from "formik";
import schema from "../validations/ProductValidation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Product() {
  const [data, setdata] = useState([]);
  const Navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    },
    validationSchema: schema,
    onSubmit: (values) => adddata(values),
  });

  async function adddata(values) {
    const formdata = new FormData();

    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("price", values.price);
    formdata.append("category", values.category);
    formdata.append("stock", values.stock);
    formdata.append("image", values.image);

    const response = await axios.post(
      `http://localhost:4000/Productroutes`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    Navigate("/showpro")
  }

  async function fetchcat() {
    try {
      const response = await axios.get("http://localhost:4000/Categoryroutes");

      setdata(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchcat();
  }, []);

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
                  Add New Product
                </h2>

                <p className="mb-0" style={{ color: "var(--color-charcoal)" }}>
                  Add product details to your store.
                </p>
              </div>

              <form onSubmit={form.handleSubmit}>
                {/* Product Name */}
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="form-label fw-semibold"
                    style={{ color: "var(--color-black)" }}
                  >
                    Product Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    value={form.values.name}
                    placeholder="Enter product name"
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
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                <div className="row">
                  {/* Price */}
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="price"
                      className="form-label fw-semibold"
                      style={{ color: "var(--color-black)" }}
                    >
                      Price
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onBlur={form.handleBlur}
                      onChange={form.handleChange}
                      value={form.values.price}
                      placeholder="Enter price"
                    />
                  </div>

                  {/* Stock */}
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="stock"
                      className="form-label fw-semibold"
                      style={{ color: "var(--color-black)" }}
                    >
                      Stock
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      onBlur={form.handleBlur}
                      onChange={form.handleChange}
                      value={form.values.stock}
                      placeholder="Enter stock quantity"
                    />
                  </div>
                </div>

                <div className="row">
                  {/* Category */}
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="category"
                      className="form-label fw-semibold"
                      style={{ color: "var(--color-black)" }}
                    >
                      Category
                    </label>

                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      onBlur={form.handleBlur}
                      onChange={form.handleChange}
                      value={form.values.category}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      {data.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image */}
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="image"
                      className="form-label fw-semibold"
                      style={{ color: "var(--color-black)" }}
                    >
                      Product Image
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onBlur={form.handleBlur}
                      onChange={(event) =>
                        form.setFieldValue(
                          "image",
                          event.currentTarget.files[0],
                        )
                      }
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn custom-btn-primary px-4 py-2 fw-semibold"
                  >
                    Add Product
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
export default Product;
