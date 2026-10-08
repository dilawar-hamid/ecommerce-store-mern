
function About() {
  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="container about-hero">
        <div className="about-breadcrumb">
          <a href="/">Home</a>
          <i className="bi bi-chevron-right"></i>
          <span>About</span>
        </div>

        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="about-tag">WHO WE ARE</span>

            <h1 className="about-title">About Our Store</h1>

            <p className="about-subtitle">
              We’re more than just a store — we're a community that believes
              in quality, value and a better shopping experience.
            </p>

            <h2 className="about-heading">Our Story</h2>

            <p className="about-text">
              Our journey started with a simple idea — to make online shopping
              easier, safer and more enjoyable for everyone. We wanted to
              create a store where customers could find quality products
              without a complicated shopping experience.
            </p>

            <p className="about-text">
              Today, we’re proud to offer a variety of products, helpful
              support and a smooth shopping experience for our customers.
            </p>

            <a href="#our-mission" className="btn custom-btn-primary about-btn">
              Our Mission <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>

          <div className="col-lg-6">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1000&q=80"
                alt="Our store and shopping experience"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about-features">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <i className="bi bi-award"></i>
                </div>
                <h5>Quality Products</h5>
                <p>
                  We carefully select products with quality and value in mind.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <i className="bi bi-truck"></i>
                </div>
                <h5>Fast Delivery</h5>
                <p>
                  We work to get your orders delivered safely and on time.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h5>Secure Shopping</h5>
                <p>
                  We value your trust and aim to provide a secure experience.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="about-feature-card">
                <div className="about-feature-icon">
                  <i className="bi bi-headset"></i>
                </div>
                <h5>Customer Support</h5>
                <p>
                  We’re here to help whenever you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container about-mission" id="our-mission">
        <span className="about-tag">WHAT DRIVES US</span>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make online shopping simple and enjoyable by
          bringing customers quality products, a smooth experience and
          helpful support — all in one place.
        </p>
      </section>
    </div>
  );
}

export default About;