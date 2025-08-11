import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer py-5" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
      <div className="container-fluid" style={{ padding: "2rem 3rem" }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 style={{ color: "#076cea" }}>About Parwah360</h4>
            <p style={{ lineHeight: "1.6", textAlign: "justify" }}>
              Welcome to Parwah360, your trusted companion in modern hospital and healthcare management! 
              Our platform is designed to simplify and streamline every aspect of hospital operations from 
              patient registration and appointment scheduling to doctor coordination and medical record management. 
              With user-friendly interfaces, real-time data access, and secure digital workflows, Parwah360 empowers hospitals,
              clinics, and medical professionals to deliver efficient, patient-centric care.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4" style={{ paddingLeft: "10rem" }}>
            <h4 style={{ color: "#076cea" }}>Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink
                  to="/"
                  className="text-dark text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#076cea"}
                  onMouseLeave={(e) => e.target.style.color = ""}
                >
                  <i className="fas fa-home me-2"></i>Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/specialization"
                  className="text-dark text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#076cea"}
                  onMouseLeave={(e) => e.target.style.color = ""}
                >
                  <i className="fas fa-stethoscope me-2"></i>Specializations
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/login"
                  className="text-dark text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#076cea"}
                  onMouseLeave={(e) => e.target.style.color = ""}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/register"
                  className="text-dark text-decoration-none"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#076cea"}
                  onMouseLeave={(e) => e.target.style.color = ""}
                >
                  <i className="fas fa-user-plus me-2"></i>Register
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4 style={{ color: "#076cea" }}>Contact Us</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2" style={{ color: "#076cea" }}></i>
                123 Healthcare Avenue, Medical District
              </li>
              <li className="mb-2">
                <i className="fas fa-city me-2" style={{ color: "#076cea" }}></i>
                Mumbai, Maharashtra, 400001
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2" style={{ color: "#076cea" }}></i>
                info@parwah360.com
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2" style={{ color: "#076cea" }}></i>
                +91-9876543210
              </li>
              <li className="mb-2">
                <i className="fas fa-clock me-2" style={{ color: "#076cea" }}></i>
                24/7 Emergency Services
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="d-flex justify-content-center mt-4 mb-3">
          <a
            href="https://facebook.com"
            className="btn btn-floating mx-2 rounded-circle"
            style={{ 
              backgroundColor: "#3b5998", 
              color: "white", 
              width: "40px", 
              height: "40px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            className="btn btn-floating mx-2 rounded-circle"
            style={{ 
              backgroundColor: "#1da1f2", 
              color: "white", 
              width: "40px", 
              height: "40px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="btn btn-floating mx-2 rounded-circle"
            style={{ 
              backgroundColor: "#e4405f", 
              color: "white", 
              width: "40px", 
              height: "40px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            className="btn btn-floating mx-2 rounded-circle"
            style={{ 
              backgroundColor: "#0077b5", 
              color: "white", 
              width: "40px", 
              height: "40px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div
          className="text-center mt-3 py-3 text-white"
          style={{ 
            backgroundColor: "#076cea", 
            fontWeight: "500",
            margin: "20px -3rem 0 -3rem"
          }}
        >
          © 2025 Parwah360 Healthcare Management System. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
