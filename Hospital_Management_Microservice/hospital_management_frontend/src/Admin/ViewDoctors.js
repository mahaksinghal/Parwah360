import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./ViewDoctors.css";
import Admin from "./Admin";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get("http://localhost:8080/admin/getAllDoctors", config);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editDoctor/${id}`);
    } else {
      console.error("Doctor ID is undefined");
    }
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm) ||
    doctor.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specializationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Admin>
      <div className="view-doctors-container">
        <div className="doctors-header">
          <h3>View Doctors</h3>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search doctors by name, email, phone, degree, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="doctors-count">
          <p>Showing {filteredDoctors.length} of {doctors.length} doctors</p>
        </div>

        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Degree</th>
              <th>Amount</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.email}>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.degree}</td>
                  <td>₹{doctor.amount}</td>
                  <td>{doctor.specializationName}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEdit(doctor.id)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  {searchTerm ? `No doctors found matching "${searchTerm}"` : "No doctors available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewDoctors;
