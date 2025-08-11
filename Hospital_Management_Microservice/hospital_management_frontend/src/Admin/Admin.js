import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUserTie, FaHospitalSymbol, FaStethoscope, FaClipboardList } from "react-icons/fa";

import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
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
      <AdminNavbar />
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
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">

            <NavLink
              to="/admin/addSpeciality"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaHospitalSymbol className="icon" /> Add Speciality
            </NavLink>
            <NavLink
              to="/admin/updateSpecialization"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaHospitalSymbol className="icon" /> Update Specialization
            </NavLink>
            <NavLink
              to="/admin/addDoctor"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserMd className="icon" /> Add Doctor
            </NavLink>
            <NavLink
              to="/admin/addReceptionist"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserTie className="icon" /> Add Receptionist
            </NavLink>
            <NavLink
              to="/admin/viewDoctors"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaStethoscope className="icon" /> View Doctors
            </NavLink>
            <NavLink
              to="/admin/viewReceptionist"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaClipboardList className="icon" /> View Receptionist
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Admin;
