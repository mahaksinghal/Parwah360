import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import { useNavigate } from "react-router-dom";
import { BsCalendarCheck, BsFileEarmarkArrowDown, BsCreditCard2Front, BsXCircle } from "react-icons/bs";
import "./ViewAppointments.css";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get(
          `http://localhost:8080/patient/getAppointmentsByPatientId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchAppointments();
  }, []);

  const handleDownload = async (appointmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/patient/download/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Prescription_${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Prescription downloaded successfully!");
    } catch (error) {
      console.error("Error downloading prescription:", error);
      toast.error("Failed to download prescription.");
    }
  };

  const handlePayment = (appointmentId, amount) => {
    navigate(`/payment/${appointmentId}/${amount}`);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(
          `http://localhost:8080/patient/cancelAppointment/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );

        // Remove the cancelled appointment from the state
        setAppointments(appointments.filter(appt => appt.id !== appointmentId));
        toast.success("Appointment cancelled successfully!");
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        toast.error("Failed to cancel appointment. Please try again.");
      }
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="appointments-container">
        <ToastContainer />
        <h2 className="appointments-header">
          <BsCalendarCheck className="me-2" />
          Your Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="text-center text-muted mt-5">No appointments found.</div>
        ) : (
          <div className="container">
            <div className="row justify-content-center">
              {appointments.map((appt) => (
                <div className="col-md-6 col-lg-4 mb-4" key={appt.id}>
                  <div className="card shadow h-100">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{appt.doctorName}</h5>
                      <h6 className="text-muted mb-2">{appt.doctorSpecialization}</h6>
                      <p className="mb-1"><strong>Phone:</strong> {appt.doctorPhone}</p>
                      <p className="mb-1"><strong>Date:</strong> {appt.appointmentDate}</p>
                      <p className="mb-1"><strong>Disease:</strong> {appt.diseaseDescription}</p>
                      <p className="mb-1"><strong>Amount:</strong> ₹{appt.amount}</p>
                      <p className="mb-1">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${appt.status === "ACCEPTED"
                            ? "bg-success"
                            : appt.status === "DECLINED"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                            }`}
                        >
                          {appt.status}
                        </span>
                      </p>
                      <p>
                        <strong>Payment:</strong>{" "}
                        <span
                          className={`badge ${appt.paymentStatus === "PAID" ? "bg-success" : "bg-secondary"
                            }`}
                        >
                          {appt.paymentStatus}
                        </span>
                      </p>
                    </div>

                    <div className="card-footer bg-transparent border-top-0 d-flex justify-content-center gap-2">
                      {appt.status === "DECLINED" ? (
                        <div className="text-center text-muted p-2">
                          <small>Appointment Declined</small>
                        </div>
                      ) : appt.paymentStatus !== "PAID" ? (
                        <>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handlePayment(appt.id, appt.amount)}
                            disabled={appt.status !== "ACCEPTED"}
                            style={{
                              border: '2px solid #007bff',
                              borderRadius: '6px'
                            }}
                          >
                            <BsCreditCard2Front className="me-1" />
                            Pay Now
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancelAppointment(appt.id)}
                            style={{
                              border: '2px solid #dc3545',
                              borderRadius: '6px'
                            }}
                          >
                            <BsXCircle className="me-1" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleDownload(appt.id)}
                          disabled={appt.status !== "ACCEPTED"}
                          style={{
                            border: '2px solid #28a745',
                            borderRadius: '6px'
                          }}
                        >
                          <BsFileEarmarkArrowDown className="me-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAppointments;
