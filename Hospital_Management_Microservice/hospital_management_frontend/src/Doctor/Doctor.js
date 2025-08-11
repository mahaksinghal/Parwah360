import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaFileMedical } from "react-icons/fa";  
import DoctorNavbar from "./DoctorNavbar";
import "./Styles.css";

function Doctor({ children }) {
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

  return (
    <div>
      <DoctorNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{
            border: "2px solid black",
            display: "flex",
            backgroundColor: "#076cea",
          }}
        >
          <div className="sidebar-header">
            <h3>Doctor</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/doctor/viewAppointments"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaCalendarAlt className="icon" /> View Appointments
            </NavLink>
            
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Doctor;
