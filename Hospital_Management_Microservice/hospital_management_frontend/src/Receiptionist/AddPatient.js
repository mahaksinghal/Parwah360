import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Receiptionist from "./Receiptionist";
import "./AddPatient.css";

function AddPatient() {
  const navigate = useNavigate();

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
      age: "",
      gender: "",
      weight: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
      gender: Yup.string().required("Gender is required"),
      weight: Yup.number().required("Weight is required").positive("Weight must be positive"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const userData = {
        name: values.name,
        age: values.age,
        gender: values.gender,
        weight: values.weight,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };
      
      axios
        .post("http://localhost:8080/receptionist/registerPatient", userData, config) // Passing config
        .then(() => {
          toast.success("Patient added successfully!");
          resetForm();
          navigate("/receiptionist/viewPatients"); // Redirect after success
        })
        .catch(() => {
          toast.error("Error adding patient. Please try again.");
        });
      
    },
  });

  return (
    <Receiptionist>
      <ToastContainer />
      <div className="add-patient-container">
        <div className="add-patient-card">
          <div className="add-patient-card-body">
            <h3 className="add-patient-title">Add New Patient</h3>
            
            <form onSubmit={formik.handleSubmit}>
              <div className="form-grid">
                {/* Name Input */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-user me-2"></i>
                    Patient Name
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("name")}
                    className={`form-input ${
                      formik.touched.name && formik.errors.name ? 'error' : 
                      formik.touched.name && !formik.errors.name ? 'success' : ''
                    }`}
                    placeholder="Enter full name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="error-message">{formik.errors.name}</div>
                  )}
                </div>

                {/* Age Input */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-birthday-cake me-2"></i>
                    Age
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("age")}
                    className={`form-input ${
                      formik.touched.age && formik.errors.age ? 'error' : 
                      formik.touched.age && !formik.errors.age ? 'success' : ''
                    }`}
                    placeholder="Enter age"
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div className="error-message">{formik.errors.age}</div>
                  )}
                </div>

                {/* Gender Input */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-venus-mars me-2"></i>
                    Gender
                  </label>
                  <select
                    {...formik.getFieldProps("gender")}
                    className={`form-select ${
                      formik.touched.gender && formik.errors.gender ? 'error' : 
                      formik.touched.gender && !formik.errors.gender ? 'success' : ''
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="error-message">{formik.errors.gender}</div>
                  )}
                </div>

                {/* Weight Input */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-weight me-2"></i>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("weight")}
                    className={`form-input ${
                      formik.touched.weight && formik.errors.weight ? 'error' : 
                      formik.touched.weight && !formik.errors.weight ? 'success' : ''
                    }`}
                    placeholder="Enter weight"
                  />
                  {formik.touched.weight && formik.errors.weight && (
                    <div className="error-message">{formik.errors.weight}</div>
                  )}
                </div>

                {/* Email Input */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...formik.getFieldProps("email")}
                    className={`form-input ${
                      formik.touched.email && formik.errors.email ? 'error' : 
                      formik.touched.email && !formik.errors.email ? 'success' : ''
                    }`}
                    placeholder="Enter email address"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error-message">{formik.errors.email}</div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-phone me-2"></i>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("phone")}
                    className={`form-input ${
                      formik.touched.phone && formik.errors.phone ? 'error' : 
                      formik.touched.phone && !formik.errors.phone ? 'success' : ''
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="error-message">{formik.errors.phone}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    {...formik.getFieldProps("password")}
                    className={`form-input ${
                      formik.touched.password && formik.errors.password ? 'error' : 
                      formik.touched.password && !formik.errors.password ? 'success' : ''
                    }`}
                    placeholder="Enter secure password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="error-message">{formik.errors.password}</div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="form-group full-width">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={formik.isSubmitting}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    {formik.isSubmitting ? 'Adding Patient...' : 'Add Patient'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Receiptionist>
  );
}

export default AddPatient;
