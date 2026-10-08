import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import schema from "../../admin/validations/UserValidation";
import { useEffect, useState } from "react";

function Register() {
  const Navigate = useNavigate();
  const [toast, setToast] = useState();
  const formdata = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => AddUser(values),
  });

  async function AddUser(values) {
    try {
      const add = await axios.post(
        `http://localhost:4000/userroutes/register`,
        values,
      );
      Navigate("/");
    } catch (err) {
      setToast({ type: "error", message: err.response.data.error });
    }
  }


  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div
            className="custom-card shadow p-4 p-md-5"
            style={{ borderTop: "3px solid var(--color-olive)" }}
          >
            <div className="text-center mb-4">
              {toast && <div>{toast.message}</div>}
              <h3 className="fw-semibold mb-2">Create an Account</h3>
              <p className="text-secondary">Join us and start shopping today</p>
            </div>

            <form onSubmit={formdata.handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="John"
                    name="name"
                    onChange={formdata.handleChange}
                    onBlur={formdata.handleBlur}
                    value={formdata.values.name}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Doe"
                    name="lastname"
                    onChange={formdata.handleChange}
                    onBlur={formdata.handleBlur}
                    value={formdata.values.lastname}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control py-2"
                  placeholder="you@example.com"
                  name="email"
                  onChange={formdata.handleChange}
                  onBlur={formdata.handleBlur}
                  value={formdata.values.email}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Create a password"
                  name="password"
                  onChange={formdata.handleChange}
                  onBlur={formdata.handleBlur}
                  value={formdata.values.password}
                  required
                />
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreeTerms"
                  required
                />
                <label
                  className="form-check-label text-secondary"
                  htmlFor="agreeTerms"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="custom-brand-accent text-decoration-none"
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="btn custom-btn-primary w-100 py-2 fw-semibold"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-secondary mt-4 mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="custom-brand-accent text-decoration-none fw-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
