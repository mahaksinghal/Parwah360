import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Admin from "./Admin";
import "./AddReceptionist.css";

function AddReceptionist() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "DOCTOR") {
        navigate("/doctor");
      } else if (sessionStorage.getItem("userRole") === "PATIENT") {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "ADMIN") {
        navigate("/admin");
      }
      else if (sessionStorage.getItem("userRole") === "RECEPTIONIST") {
        navigate("/receiptionist");
      }
    }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const userData = { ...values };
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      axios
        .post("http://localhost:8080/admin/addReceptionist", userData, config)
        .then(() => {
          toast.success("Receptionist added successfully!");
          resetForm();
        })
        .catch(() => {
          toast.error("Error registering receptionist. Please try again.");
        });
    },
  });

  return (
    <Admin>
      <div className="add-receptionist-container">
        <div className="add-receptionist-form">
          <h3>Add Receptionist</h3>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                {...formik.getFieldProps("phone")}
                className={`form-control ${
                  formik.touched.phone && formik.errors.phone
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-danger">{formik.errors.phone}</div>
              )}
            </div>

            {/* Password + Toggle */}
            <div className="form-group">
              <label>Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            {/* Submit */}
            <div className="form-group">
              <button type="submit" className="btn w-100">
                Add Receptionist
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default AddReceptionist;
