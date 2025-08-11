import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // eye icons
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";


function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // toggle state
  const [captchaValue, setCaptchaValue] = useState(null); // captcha state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleCaptchaError = () => {
    toast.error("CAPTCHA failed to load. Please refresh the page.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleCaptchaExpired = () => {
    setCaptchaValue(null);
    toast.warning("CAPTCHA expired. Please complete it again.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // Hide CAPTCHA alert messages
  useEffect(() => {
    const hideCaptchaAlerts = () => {
      // Target the specific red alert text
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        const text = div.textContent || div.innerText;
        if (text && text.includes('This reCAPTCHA is for testing purposes only')) {
          div.style.display = 'none';
          // Also hide parent if it only contains this message
          if (div.parentElement && div.parentElement.children.length === 1) {
            div.parentElement.style.display = 'none';
          }
        }
      });
    };

    // Run multiple times to catch dynamically loaded content
    hideCaptchaAlerts();
    const timers = [
      setTimeout(hideCaptchaAlerts, 500),
      setTimeout(hideCaptchaAlerts, 1000),
      setTimeout(hideCaptchaAlerts, 2000),
    ];
    
    // Also run when CAPTCHA changes
    const interval = setInterval(hideCaptchaAlerts, 1000);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearInterval(interval);
    };
  }, [captchaValue]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      // Check if CAPTCHA is completed
      if (!captchaValue) {
        toast.error("Please complete the CAPTCHA!", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/login", values);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
        });

        const user = response.data;
        sessionStorage.setItem("userName", user.authenticatedDetails.principal.name);
        sessionStorage.setItem("userId", user.authenticatedDetails.principal.id);
        sessionStorage.setItem("userRole", user.authenticatedDetails.principal.role);
        sessionStorage.setItem("jwtToken", user.jwt);

        if (user.authenticatedDetails.principal.role === "ROLE_PATIENT") navigate("/");
        else if (user.authenticatedDetails.principal.role === "ROLE_ADMIN") navigate("/admin");
        else if (user.authenticatedDetails.principal.role === "ROLE_DOCTOR") navigate("/doctor");
        else if (user.authenticatedDetails.principal.role === "ROLE_RECEPTIONIST") navigate("/receiptionist");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
        <div
          className="shadow-lg p-5"
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "white",
            border: "2px solid #076cea",
            borderRadius: "10px",
            color: "black",
            margin: "20px",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#076cea", fontWeight: "bold" }}>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
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

            {/* Password Input with toggle */}
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
                  style={{ 
                    cursor: "pointer",
                    borderRadius: "0 8px 8px 0",
                    border: "1px solid #ddd",
                    borderLeft: "none",
                    backgroundColor: "#f8f9fa"
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.password}</div>
              )}
            </div>

            {/* CAPTCHA */}
            <div className="mb-4 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google's official test site key
                onChange={handleCaptchaChange}
                onExpired={handleCaptchaExpired}
                onError={handleCaptchaError}
              />
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
                Login
              </button>
            </div>
          </form>

          {/* Link to Register Page */}
          <div className="mt-4 text-center">
            <p style={{ color: "#666", marginBottom: "8px" }}>Don't have an account?</p>
            <Link 
              to="/register" 
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
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
