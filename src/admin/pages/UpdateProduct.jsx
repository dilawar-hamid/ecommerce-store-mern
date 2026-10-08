import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);

  async function getdata() {
    const get = await axios.get(`http://localhost:4000/Productroutes/${id}`);

    setdata(get.data);
  }

  async function fetchcat() {
    try {
      const response = await axios.get("http://localhost:4000/Categoryroutes");

      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function Update(values) {
    const formdata = new FormData();

    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("price", values.price);
    formdata.append("category", values.category);
    formdata.append("stock", values.stock);
    formdata.append("image", values.image);

    const upd = await axios.put(
      `http://localhost:4000/Productroutes/${id}`,
      formdata,
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    navigate("/showpro");
  }

  useEffect(() => {
    getdata();
    fetchcat();
  }, []);

  return (
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
                Update Product
              </h2>

              <p className="mb-0" style={{ color: "var(--color-charcoal)" }}>
                Update product details in your store.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                Update(data);
              }}
            >
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
                  value={data.name}
                  onChange={(e) => setdata({ ...data, name: e.target.value })}
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
                  rows="4"
                  value={data.description}
                  onChange={(e) =>
                    setdata({
                      ...data,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter product description"
                />
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
                    value={data.price}
                    onChange={(e) =>
                      setdata({
                        ...data,
                        price: e.target.value,
                      })
                    }
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
                    value={data.stock}
                    onChange={(e) =>
                      setdata({
                        ...data,
                        stock: e.target.value,
                      })
                    }
                    placeholder="Enter stock"
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
                    value={data.category}
                    onChange={(e) =>
                      setdata({
                        ...data,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select category</option>

                    {categories.map((item) => (
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
                    accept="image/*"
                    onChange={(e) =>
                      setdata({ ...data, image: e.target.files[0] })
                    }
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="submit"
                  className="btn custom-btn-primary px-4 py-2 fw-semibold"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
