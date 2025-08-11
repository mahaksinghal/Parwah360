import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AddDoctor.css";
import Admin from "./Admin";

function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    degree: "",
    phone: "",
    specializationId: "",
    password: "",
    amount: "",
  });
  const [doctorImage, setDoctorImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState("");

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
    const fetchSpecializations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get(
          "http://localhost:8080/admin/getAllSpecialization",
          config
        );
        setSpecializations(res.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };
    fetchSpecializations();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, phone, password, amount } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!name || !email || !form.degree || !phone || !form.specializationId || !doctorImage || !password || !amount) {
      return "All fields are required.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    if (!phoneRegex.test(phone)) {
      return "Phone must be a valid 10-digit number.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      return "Amount must be a positive number.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append("doctorImage", doctorImage);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("http://localhost:8080/admin/addDoctor", formData, config);
      if (res.status === 201) {
        alert("Doctor added successfully!");
        setForm({
          name: "",
          email: "",
          degree: "",
          phone: "",
          specializationId: "",
          password: "",
          amount: "",
        });
        setDoctorImage(null);
        setError("");
      } else {
        alert("Failed to add doctor.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Admin>
      <div className="add-doctor-container">
        <h3>Add New Doctor</h3>
        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-group">
            <label>Doctor Name</label>
            <input type="text" name="name" value={form.name} onChange={handleInput} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleInput} />
          </div>

          <div className="form-group">
            <label>Degree</label>
            <input type="text" name="degree" value={form.degree} onChange={handleInput} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleInput} />
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <select name="specializationId" value={form.specializationId} onChange={handleInput}>
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>{spec.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Doctor Image</label>
            <input type="file" accept="image/*" onChange={(e) => setDoctorImage(e.target.files[0])} />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input type="number" name="amount" value={form.amount} onChange={handleInput} />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleInput}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </Admin>
  );
}

export default AddDoctor;
