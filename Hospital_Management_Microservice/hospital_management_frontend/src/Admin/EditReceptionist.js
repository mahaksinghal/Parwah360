import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditReceptionist.css";
import Admin from "./Admin";

function EditReceptionist() {
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
  const { id } = useParams(); // Get the receptionist ID from the URL
  const [name, setReceptionistName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("");

  const editUrl = `http://localhost:8080/admin/getReceptionistById/${id}`;
  const updateUrl = `http://localhost:8080/admin/updateReceptionist/${id}`;

  // Configuration for headers with JWT token
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  // Fetch receptionist details
  useEffect(() => {
    axios
      .get(editUrl, config)
      .then((response) => {
        const { name, email, password,phone } = response.data;
        setReceptionistName(name);
        setEmail(email);
        setPassword(password);
        setPhone(phone);
      })
      .catch((error) => {
        console.error("Error fetching receptionist details:", error);
        toast.error("Failed to fetch receptionist details");
      });
  }, [editUrl]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const receptionistUpdateDTO = {
      name,
      email,
      password,
      phone,
    };

    axios
      .put(updateUrl, receptionistUpdateDTO, config)
      .then(() => {
        toast.success("Receptionist details updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewReceptionist"); // Redirect to View Receptionists page
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update receptionist details:", error);
        toast.error("Failed to update receptionist.");
      });
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="edit-receptionist-container">
        <div className="edit-receptionist-form">
          <h2>Edit Receptionist</h2>
          <form onSubmit={handleSubmit}>
            {/* Receptionist Name */}
            <div className="form-group">
              <label>Receptionist Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setReceptionistName(e.target.value)}
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

            {/* Password */}
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit" className="btn w-100">
                Update Receptionist
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditReceptionist;
