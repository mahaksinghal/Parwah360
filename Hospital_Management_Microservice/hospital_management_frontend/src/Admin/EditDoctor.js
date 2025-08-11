import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditDoctor.css";
import Admin from "./Admin";

function EditDoctor() {
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
  const { id } = useParams(); // Get the doctor ID from the URL

  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [password, setPassword] = useState("");

  const API_BASE_URL = "http://localhost:8080/admin";
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  // Fetch doctor details
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getDoctorById/${id}`, config)
      .then((response) => {
        const { name, email, degree, phone, amount, specializationName, password } = response.data;
        setDoctorName(name);
        setEmail(email);
        setDegree(degree);
        setPhone(phone);
        setAmount(amount);
        setSelectedSpeciality(specializationName);
        setPassword(password);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
        toast.error("Failed to fetch doctor details");
      });
  }, [id]);

  // Fetch list of specialities
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getAllSpecialization`, config)
      .then((response) => {
        setSpecialities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specialities:", error);
        toast.error("Failed to fetch specialities");
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the selected speciality object to get its ID
    const selectedSpecialityObj = specialities.find(spec => spec.name === selectedSpeciality);
    
    const doctorUpdateDTO = {
      name: doctorName,  // Changed from doctorName to name
      email,
      degree,
      phone,
      amount,
      specializationId: selectedSpecialityObj ? selectedSpecialityObj.id : null,  // Send ID instead of name
      password,
    };
    console.log("Doctor Update DTO:", doctorUpdateDTO);
    console.log("id : ", id);
    axios
      .put(`${API_BASE_URL}/updateDoctor/${id}`, doctorUpdateDTO, config)
      .then(() => {
        toast.success("Doctor details updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewdoctors");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update doctor details:", error);
        toast.error("Failed to update doctor.");
      });
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="edit-doctor-container">
        <div className="edit-doctor-form">
          <h2>Edit Doctor</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Doctor Name */}
              <div className="form-group">
                <label>Doctor Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Degree */}
              <div className="form-group">
                <label>Degree:</label>
                <input
                  type="text"
                  className="form-control"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Amount Field */}
              <div className="form-group">
                <label>Amount (Fee):</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Speciality Selection */}
              <div className="form-group">
                <label>Speciality:</label>
                <select
                  className="form-control"
                  value={selectedSpeciality}
                  onChange={(e) => setSelectedSpeciality(e.target.value)}
                  required
                >
                  <option value="">Select Speciality</option>
                  {specialities.map((spec) => (
                    <option key={spec.id} value={spec.name}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="form-group full-width">
                <button type="submit" className="btn w-100">
                  Update Doctor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditDoctor;
