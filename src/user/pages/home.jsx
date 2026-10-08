import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <span
                className="badge rounded-pill mb-3 px-3 py-2 fw-normal border"
                style={{ color: "var(--color-olive)", borderColor: "var(--color-olive)" }}
              >
                New Season Collection
              </span>
              <h1 className="fw-semibold mb-3" style={{ fontSize: "2.5rem", lineHeight: "1.3" }}>
                Quality You Can Trust,
                <br />
                Style You'll <span className="custom-brand-accent">Love</span>
              </h1>
              <p className="mb-4 text-secondary" style={{ maxWidth: "480px" }}>
                Discover handpicked products designed to fit your everyday life —
                simple, elegant, and made to last. From wardrobe essentials to
                statement pieces, we bring quality straight to your door.
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn custom-btn-primary px-4 py-2">
                  Shop Now
                </Link>
                <Link to="/register" className="btn btn-outline-dark rounded-pill px-4 py-2">
                  Join Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://placehold.co/500x400/f4f1ea/1f1f1d?text=Featured+Product"
                alt="Featured product"
                className="img-fluid rounded-3 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <section className="py-5 border-top border-bottom" style={{ borderColor: "#e5e1d6" }}>
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-6 col-md-3">
              <h4 className="fw-semibold mb-1">15K+</h4>
              <p className="text-secondary mb-0">Happy Customers</p>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="fw-semibold mb-1">500+</h4>
              <p className="text-secondary mb-0">Products</p>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="fw-semibold mb-1">50+</h4>
              <p className="text-secondary mb-0">Cities Served</p>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="fw-semibold mb-1">4.8★</h4>
              <p className="text-secondary mb-0">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured Categories ===== */}
      <section className="container py-5 my-3">
        <div className="text-center mb-5">
          <h2 className="fw-semibold mb-2">Shop by Category</h2>
          <p className="text-secondary">Explore our most loved collections, curated just for you</p>
        </div>

        <div className="row g-4">
          {[
            { name: "Men's Fashion", desc: "Sharp, comfortable everyday wear", img: "700x400/f4f1ea/1f1f1d?text=Men" },
            { name: "Women's Fashion", desc: "Elegant pieces for every occasion", img: "700x400/eae5d8/1f1f1d?text=Women" },
            { name: "Accessories", desc: "The finishing touch to any outfit", img: "700x400/f4f1ea/1f1f1d?text=Accessories" },
          ].map((cat, i) => (
            <div className="col-md-4" key={i}>
              <div className="custom-card overflow-hidden h-100">
                <img
                  src={`https://placehold.co/${cat.img}`}
                  alt={cat.name}
                  className="w-100"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h5 className="fw-semibold mb-2">{cat.name}</h5>
                  <p className="text-secondary mb-3">{cat.desc}</p>
                  <Link to="/products" className="text-decoration-none custom-brand-accent fw-semibold">
                    Explore <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Feature Highlights ===== */}
      <section className="py-5 my-3">
        <div className="container">
          <div className="row g-5 text-center">
            <div className="col-md-4">
              <i className="bi bi-truck fs-2 custom-brand-accent"></i>
              <h6 className="fw-semibold mt-3 mb-2">Fast Delivery</h6>
              <p className="text-secondary mb-0">
                Get your orders delivered quickly, right to your doorstep.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-check fs-2 custom-brand-accent"></i>
              <h6 className="fw-semibold mt-3 mb-2">Secure Payment</h6>
              <p className="text-secondary mb-0">
                Shop with confidence using our secure checkout process.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-arrow-repeat fs-2 custom-brand-accent"></i>
              <h6 className="fw-semibold mt-3 mb-2">Easy Returns</h6>
              <p className="text-secondary mb-0">
                Not satisfied? Return within 7 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="container py-5 my-3">
        <div className="text-center mb-5">
          <h2 className="fw-semibold mb-2">What Our Customers Say</h2>
          <p className="text-secondary">Real feedback from real shoppers</p>
        </div>

        <div className="row g-4">
          {[
            { name: "Ayesha Khan", text: "The quality exceeded my expectations, and delivery was faster than I thought." },
            { name: "Bilal Ahmed", text: "Great customer service and the return process was genuinely hassle-free." },
            { name: "Sara Malik", text: "My go-to store now. Everything feels premium without being overpriced." },
          ].map((r, i) => (
            <div className="col-md-4" key={i}>
              <div className="custom-card p-4 h-100">
                <div className="mb-3" style={{ color: "var(--color-olive)" }}>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p className="text-secondary mb-4">"{r.text}"</p>
                <h6 className="fw-semibold mb-0">{r.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="py-5 my-3 border-top" style={{ borderColor: "#e5e1d6" }}>
        <div className="container text-center" style={{ maxWidth: "520px" }}>
          <h4 className="fw-semibold mb-2">Stay in the Loop</h4>
          <p className="text-secondary mb-4">
            Subscribe for early access to new arrivals and member-only discounts.
          </p>
          <form className="d-flex gap-2">
            <input type="email" className="form-control" placeholder="Enter your email" />
            <button type="submit" className="btn custom-btn-primary px-4">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ===== CTA Banner (footer jaisa hi color) ===== */}
      <section className="custom-footer text-center py-5">
        <div className="container">
          <h3 className="fw-semibold mb-3">Ready to start shopping?</h3>
          <p className="mb-4">Create your free account and get access to exclusive deals.</p>
          <Link to="/register" className="btn custom-btn-primary px-5 py-2">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;