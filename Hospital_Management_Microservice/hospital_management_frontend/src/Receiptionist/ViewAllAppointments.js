import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Receiptionist from "./Receiptionist";
import "./ViewAppointments.css";
function ViewAllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Role-based redirection
  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const name = sessionStorage.getItem("userName");

    if (!name) {
      navigate("/");
    } else if (role === "DOCTOR") {
      navigate("/doctor");
    } else if (role === "PATIENT") {
      navigate("/");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "RECEPTIONIST") {
      navigate("/receiptionist");
    }
  }, [navigate]);

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8080/receptionist/allAppointmentsForReceptionist",
          config
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Receiptionist>
      <ToastContainer />
      <div className="view-appointments-container">
        <h2>All Appointments</h2>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Paitent Name</th>
              <th>Disease Description</th>
              <th>Appointment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={index}>
                  <td>{appt.doctorName}</td>
                  <td>{appt.patientName}</td>
                  <td>{appt.diseaseDescription}</td>
                  <td>{appt.appointmentDate}</td>
                  <td>{appt.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No appointments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Receiptionist>
  );
}

export default ViewAllAppointments;
