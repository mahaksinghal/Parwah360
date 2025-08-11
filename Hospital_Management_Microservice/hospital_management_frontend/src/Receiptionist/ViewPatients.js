import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewPatients.css"; // Ensure this file exists
import { useNavigate } from "react-router-dom";
import Receiptionist from "./Receiptionist"; 

function ViewPatients() {
  const [patients, setPatients] = useState([]);
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

  // Fetch patients from the API on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/receptionist/getAllPatients",
          config
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Receiptionist>
      <div className="view-patients-container">
        <div className="patients-content">
          <h2 className="patients-title">
            <i className="fas fa-users me-3"></i>
            Patient Directory
          </h2>
          
          {/* Statistics Cards */}
          <div className="patients-stats">
            <div className="stat-card">
              <div className="stat-number">{patients.length}</div>
              <div className="stat-label">Total Patients</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {patients.filter(p => p.gender === 'Male').length}
              </div>
              <div className="stat-label">Male</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {patients.filter(p => p.gender === 'Female').length}
              </div>
              <div className="stat-label">Female</div>
            </div>
          </div>

          <div className="patients-table-wrapper">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>
                    <i className="fas fa-user me-2"></i>
                    Patient Name
                  </th>
                  <th>
                    <i className="fas fa-birthday-cake me-2"></i>
                    Age
                  </th>
                  <th>
                    <i className="fas fa-venus-mars me-2"></i>
                    Gender
                  </th>
                  <th>
                    <i className="fas fa-weight me-2"></i>
                    Weight
                  </th>
                  <th>
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="patient-name">{patient.name}</td>
                      <td>
                        <span className="patient-age">{patient.age} yrs</span>
                      </td>
                      <td>
                        <span className={`patient-gender gender-${patient.gender.toLowerCase()}`}>
                          {patient.gender}
                        </span>
                      </td>
                      <td>
                        <span className="patient-weight">{patient.weight} kg</span>
                      </td>
                      <td className="patient-email">{patient.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-patients">
                      <i className="fas fa-user-friends"></i>
                      No patients registered yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Receiptionist>
  );
}

export default ViewPatients;
