import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./ViewReceiptionist.css";
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";

function ViewReceiptionist() {
  const [receptionists, setReceptionists] = useState([]);
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

  // Fetch receptionists on component mount
  useEffect(() => {
    fetchReceptionists();
  }, []);

  // Function to fetch receptionists
  const fetchReceptionists = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
      };

      const response = await axios.get("http://localhost:8080/admin/getAllReceptionist", config);
      setReceptionists(response.data);
    } catch (error) {
      console.error("Error fetching receptionists:", error);
    }
  };

  // Function to handle edit
  const handleEdit = (id) => {
    navigate(`/admin/editreceptionist/${id}`); // Navigate to edit page with ID
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this receptionist?")) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
      };

      await axios.delete(`http://localhost:8080/admin/deleteReceptionist/${id}`, config);
      alert("Receptionist deleted successfully!");
      setReceptionists(receptionists.filter((rec) => rec.id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting receptionist:", error);
      alert("Failed to delete receptionist!");
    }
  };

  // Filter receptionists based on search term
  const filteredReceptionists = receptionists.filter(receptionist =>
    receptionist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receptionist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receptionist.phone.includes(searchTerm)
  );

  return (
    <Admin>
      <div className="view-receptionist-container">
        <div className="receptionist-header">
          <h2>View Receptionists</h2>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search receptionists by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="receptionist-count">
          <p>Showing {filteredReceptionists.length} of {receptionists.length} receptionists</p>
        </div>

        <table className="receptionist-table">
          <thead>
            <tr>
              <th>Receptionist Name</th>
              <th>Email</th>
              <th>Phone</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceptionists.length > 0 ? (
              filteredReceptionists.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.name}</td>
                  <td>{rec.email}</td>
                  <td>{rec.phone}</td>

                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(rec.id)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(rec.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">
                  {searchTerm ? `No receptionists found matching "${searchTerm}"` : "No receptionists available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewReceiptionist;
