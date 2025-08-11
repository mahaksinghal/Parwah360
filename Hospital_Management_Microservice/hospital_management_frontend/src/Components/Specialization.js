import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Specialization.css";

function Specialization() {
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`, // Add token if required
        "Content-Type": "application/json", // Adjust content type if needed
      },
    };

    axios
      .get("http://localhost:8080/admin/getAllSpecialization", config)
      .then((response) => {
        setSpecialities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("No Specialities");
        setLoading(false);
      });
  }, []);

  const handleSpecialitiesClick = (id) => {
    console.log("Navigating to speciality:", id);
    navigate(`/doctors/${id}`);
  };

  if (loading) {
    return (
      <div className="category-container">
        <div style={{ 
          gridColumn: "1 / -1", 
          textAlign: "center", 
          padding: "40px 20px",
          color: "#666",
          fontSize: "18px"
        }}>
          <div style={{ 
            display: "inline-block", 
            width: "40px", 
            height: "40px", 
            border: "4px solid #f3f3f3", 
            borderTop: "4px solid #076cea", 
            borderRadius: "50%", 
            animation: "spin 1s linear infinite",
            marginBottom: "15px"
          }}></div>
          <p>Loading specialities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-container">
        <div style={{ 
          gridColumn: "1 / -1", 
          textAlign: "center", 
          padding: "40px 20px",
          color: "#dc3545",
          fontSize: "18px"
        }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-container">
      {specialities.length > 0 ? (
        specialities.map((speciality) => (
          <div
            className="category-card"
            key={speciality.id}
            onClick={() => handleSpecialitiesClick(speciality.id)}
          >
            {/* Display the Base64 image */}
            <img
              src={`data:image/png;base64,${speciality.specializationImage}`}
              alt={speciality.name}
              className="category-img"
            />

            <p className="category-name">{speciality.name}</p>
          </div>
        ))
      ) : (
        <p>No specialities found</p>
      )}
    </div>
  );
}

export default Specialization;
