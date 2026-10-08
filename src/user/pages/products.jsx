import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = ["All", "Men", "Women", "Kids", "Accessories"];

function Products() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  async function fetch() {
    const show = await axios.get(`http://localhost:4000/productroutes`);
    setProducts(show.data);
  }

  useEffect(() => {
    fetch();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="container py-5">
      {/* ===== Page Header ===== */}
      <div className="text-center mb-5">
        <h2 className="fw-semibold mb-2">Our Products</h2>
        <p className="text-secondary">
          Browse our full collection, filtered just the way you like
        </p>
      </div>

      {/* ===== Search + Filter Bar ===== */}
      <div className="row align-items-center gy-3 mb-5">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-secondary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-md-end gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn rounded-pill px-3 ${
                activeCategory === cat
                  ? "custom-btn-primary"
                  : "btn-outline-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Product Grid ===== */}
      {filteredProducts.length > 0 ? (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-6 col-md-4 col-lg-3" key={product._id}>
              <div className="custom-card overflow-hidden h-100">
                <img
                  src={`http://localhost:4000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="p-3">
                  <span
                    className="text-secondary"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {product.category}
                  </span>
                  <h6 className="fw-semibold mt-1 mb-2">{product.name}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold custom-brand-accent">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <button className="btn btn-sm custom-btn-primary rounded-pill px-3">
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-emoji-frown fs-1 text-secondary"></i>
          <p className="text-secondary mt-3 mb-0">
            No products found matching your search.
          </p>
        </div>
      )}

      {/* ===== Pagination (static, backend se replace karna) ===== */}
      <nav className="mt-5 d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item active">
            <span
              className="page-link"
              style={{
                backgroundColor: "var(--color-olive)",
                borderColor: "var(--color-olive)",
              }}
            >
              1
            </span>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Products;
