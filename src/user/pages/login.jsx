import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import UserSchema from "../../admin/validations/LoginValidation";
import axios from "axios";
import { useState } from "react";

function Login() {
  const Navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UserSchema,
    onSubmit: (values) => cheackUser(values),
  });

  async function cheackUser(values) {
    try {
      const verify = await axios.post(
        `http://localhost:4000/userroutes/login`,
        values,
      );
      localStorage.setItem("token", verify.data.token);
      Navigate("/");
    } catch (err) {
      const message = err.response.data.message;

      if (message === "User not found") {
        setEmailError(message);
      }

      if (message === "Invalid password") {
        setPasswordError(message);
      }
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className="custom-card shadow p-4 p-md-5"
            style={{ borderTop: "3px solid var(--color-olive)" }}
          >
            {" "}
            <div className="text-center mb-4">
              <h3 className="fw-semibold mb-2">Welcome Back</h3>
              <p className="text-secondary">Login to continue shopping</p>
            </div>
            <form onSubmit={form.handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control py-2"
                  placeholder="you@example.com"
                  required
                  name="email"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                />
                {emailError && (
                  <div className="text-danger small mt-1">{emailError}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Enter your password"
                  required
                  name="password"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.password}
                />
                {passwordError && (
                  <div className="text-danger small mt-1">{passwordError}</div>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label text-secondary"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="custom-brand-accent text-decoration-none fw-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn custom-btn-primary w-100 py-2 fw-semibold"
              >
                Login
              </button>
            </form>
            <p className="text-center text-secondary mt-4 mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="custom-brand-accent text-decoration-none fw-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
