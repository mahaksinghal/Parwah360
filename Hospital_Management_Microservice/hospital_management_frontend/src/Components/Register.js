import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      weight: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .typeError("Age must be a number")
        .positive("Age must be positive")
        .integer("Age must be a whole number")
        .required("Age is required"),
      gender: Yup.string()
        .oneOf(["Male", "Female", "Other"], "Invalid gender")
        .required("Gender is required"),
      weight: Yup.number()
        .typeError("Weight must be a number")
        .positive("Weight must be positive")
        .required("Weight is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      // Remove confirmPassword from the data sent to backend
      const { confirmPassword, ...registrationData } = values;
      
      axios
        .post("http://localhost:8080/patient/registerPatient", registrationData)
        .then(() => {
          toast.success("Registration successful!");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Error registering user. Please try again.");
        });
    },
  });

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 120px)", paddingTop: "2rem" }}>
        <div
          className="shadow-lg p-5"
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "white",
            border: "2px solid #076cea",
            borderRadius: "10px",
            color: "black",
            margin: "20px",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#076cea", fontWeight: "bold" }}>Register</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
                style={{ 
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  fontSize: "16px"
                }}
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.name}</div>
              )}
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Age:</label>
              <input
                type="number"
                {...formik.getFieldProps("age")}
                className="form-control"
                style={{ 
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  fontSize: "16px"
                }}
                placeholder="Enter your age"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.age}</div>
              )}
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Gender:</label>
              <select
                {...formik.getFieldProps("gender")}
                className="form-control"
                style={{ 
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  fontSize: "16px"
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.gender}</div>
              )}
            </div>

            {/* Weight */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Weight (kg):</label>
              <input
                type="number"
                {...formik.getFieldProps("weight")}
                className="form-control"
                style={{ 
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  fontSize: "16px"
                }}
                placeholder="Enter your weight"
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.weight}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
                style={{ 
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  fontSize: "16px"
                }}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="form-control"
                  style={{ 
                    borderRadius: "8px 0 0 8px",
                    border: "1px solid #ddd",
                    padding: "12px",
                    fontSize: "16px"
                  }}
                  placeholder="Enter your password"
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ 
                    cursor: "pointer",
                    borderRadius: "0 8px 8px 0",
                    border: "1px solid #ddd",
                    borderLeft: "none",
                    backgroundColor: "#f8f9fa"
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#333" }}>Confirm Password:</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...formik.getFieldProps("confirmPassword")}
                  className="form-control"
                  style={{ 
                    borderRadius: "8px 0 0 8px",
                    border: "1px solid #ddd",
                    padding: "12px",
                    fontSize: "16px"
                  }}
                  placeholder="Confirm your password"
                />
                <span
                  className="input-group-text"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ 
                    cursor: "pointer",
                    borderRadius: "0 8px 8px 0",
                    border: "1px solid #ddd",
                    borderLeft: "none",
                    backgroundColor: "#f8f9fa"
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.confirmPassword}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn w-100"
                style={{ 
                  backgroundColor: "#076cea",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#065bb5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#076cea"}
              >
                Register
              </button>
            </div>
          </form>

          {/* Link to Login Page */}
          <div className="mt-4 text-center">
            <p style={{ color: "#666", marginBottom: "8px" }}>Already have an account?</p>
            <Link 
              to="/login" 
              style={{ 
                textDecoration: "none", 
                color: "#076cea",
                fontWeight: "600",
                fontSize: "16px",
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = "#065bb5"}
              onMouseLeave={(e) => e.target.style.color = "#076cea"}
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
