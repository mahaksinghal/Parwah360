import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function BookAppointment() {
  const location = useLocation();
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
  const userId = sessionStorage.getItem("userId");

  const doctorData = location.state;

  const [diseaseDescription, setDiseaseDescription] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctorData ? doctorData.id : "");

  useEffect(() => {
    if (!doctorData) {
      toast.error("No doctor selected!", { autoClose: 2000 });
      navigate("/doctors");
    }
  }, [doctorData, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!diseaseDescription || !appointmentDate || !selectedDoctorId) {
      toast.warn("Please fill all the fields!", { autoClose: 2000 });
      return;
    }

    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Appointment date must be today or in the future!", { autoClose: 2000 });
      return;
    }

    try {
      const appointmentData = {
        patientId: userId,
        diseaseDescription,
        appointmentDate,
        doctorId: selectedDoctorId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      await axios.post("http://localhost:8080/patient/bookAppointment", appointmentData, config);

      toast.success("Appointment booked successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate(`/viewAppointments`);
      }, 2500);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to book appointment. Please try again!", { autoClose: 3000 });
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container mt-5">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-lg">
              <h2 className="text-center mb-4 fw-bold text-primary">Book Appointment</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label fw-semibold">Chosen Doctor:</label>
                  <input type="text" className="form-control" value={`${doctorData?.name} - ${doctorData?.specializationName}`} disabled />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">Disease Description:</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={diseaseDescription}
                    onChange={(e) => setDiseaseDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">Appointment Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
