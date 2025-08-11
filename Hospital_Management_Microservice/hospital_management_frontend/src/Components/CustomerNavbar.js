import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsPersonCircle, BsCalendarCheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomerNavbar() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleLogin = () => navigate("/login");
  const handleHome = () => navigate("/");
  const handleRegister = () => navigate("/register");
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-white sticky-top">
      <div className="container-fluid px-3 px-md-4">
        {/* Brand with Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ color: "#076cea" }}>
          <img
            src="../assests/logo6.png"
            alt="Logo"
            style={{ width: "300px", height: "60px", marginRight: "-10px" }}
            className="img-fluid"
          />
          {/* <span className="d-none d-sm-inline" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Aarogya
          </span> */}
        </NavLink>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-2 gap-lg-3 mt-2 mt-lg-0">

            {/* Home and Appointments - Only show if user is logged in */}
            {userId && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="btn btn-outline-primary d-flex align-items-center gap-2 fw-semibold"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/viewappointments"
                    className="btn btn-outline-primary d-flex align-items-center gap-2 fw-semibold"
                  >
                    <BsCalendarCheckFill />
                    Appointments
                  </NavLink>
                </li>
              </>
            )}

            {/* Conditionally render Sign In / Sign Up or Logout */}
            {userId ? (
              <li className="nav-item">
                <button className="btn btn-outline-danger fw-semibold" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary fw-semibold" onClick={handleHome}>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary fw-semibold" onClick={handleLogin}>
                    Sign In
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary fw-semibold" onClick={handleRegister}>
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
