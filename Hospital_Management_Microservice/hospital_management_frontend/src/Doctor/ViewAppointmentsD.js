import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Doctor from "./Doctor";
import "./ViewAppointments.css";

function ViewAppointmentsD() {
  const [appointments, setAppointments] = useState([]);
  const [uploaded, setUploaded] = useState({});
  const userId = sessionStorage.getItem("userId");
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
    } else if (sessionStorage.getItem("userRole") === "RECEPTIONIST") {
      navigate("/receiptionist");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await axios.get(
          `http://localhost:8080/doctor/getDoctorAppointments/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAppointments(res.data);
        
        // Load uploaded status from localStorage
        const uploadedData = JSON.parse(localStorage.getItem("uploadedPrescriptions") || "{}");
        setUploaded(uploadedData);
      } catch (err) {
        toast.error("Failed to load appointments.");
      }
    }
    fetchAppointments();
  }, [userId]);

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/doctor/updateStatus`,
        { appointmentId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointmentId === appointmentId
            ? { ...appt, status: newStatus }
            : appt
        )
      );
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleFileUpload = async (file, appointmentId) => {
    if (!file) return toast.error("Please select a file.");
    if (!["application/pdf", "application/msword"].includes(file.type)) {
      return toast.error("Only PDF or DOC files allowed.");
    }

    // Check if already uploaded to prevent double upload
    if (uploaded[appointmentId]) {
      return toast.error("Prescription already uploaded for this appointment.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:5050/doctor/uploadPrescription/${appointmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Prescription uploaded!", {
          autoClose: 1000,
        });

        // Mark as uploaded immediately to prevent re-upload
        setUploaded((prev) => ({ ...prev, [appointmentId]: true }));

        // Store in localStorage to persist across page reloads
        const uploadedData = JSON.parse(localStorage.getItem("uploadedPrescriptions") || "{}");
        uploadedData[appointmentId] = true;
        localStorage.setItem("uploadedPrescriptions", JSON.stringify(uploadedData));

        setTimeout(() => {
          window.location.reload();
        }, 1200); // wait for toast to finish
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      toast.error("Error uploading file.");
    }
  };

  return (
    <Doctor>
      <div className="doctor-appointments-container">
        <div className="appointments-card">
          <ToastContainer />
          <h2 className="appointments-title">
            Doctor - Appointment Dashboard
          </h2>
          <div className="table-responsive">
            <table className="table appointments-table table-hover table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Disease</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Weight</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="no-appointments">No appointments available.</td>
                  </tr>
                ) : (
                  appointments.map((appt) => (
                    <tr key={appt.appointmentId}>
                      <td>{appt.appointmentId}</td>
                      <td>{appt.appointmentDate}</td>
                      <td>{appt.diseaseDescription}</td>
                      <td>{appt.patientName}</td>
                      <td>{appt.patientAge}</td>
                      <td>{appt.patientGender}</td>
                      <td>{appt.patientWeight}</td>
                      <td>{appt.patientEmail}</td>
                      <td>
                        <span
                          className={`badge status-badge ${
                            appt.status === "PENDING"
                              ? "bg-warning"
                              : appt.status === "ACCEPTED"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {appt.status === "PENDING" && (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  updateStatus(appt.appointmentId, "ACCEPTED")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  updateStatus(appt.appointmentId, "DECLINED")
                                }
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {appt.status === "ACCEPTED" && (
                            <span className="text-success approved-text">Approved</span>
                          )}
                          {appt.status === "DECLINED" && (
                            <span className="text-danger declined-text">Declined</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="prescription-upload-section">
                          {appt.status === "ACCEPTED" && (
                            <div>
                              <label
                                htmlFor={`file-${appt.appointmentId}`}
                                className={`btn btn-sm ${
                                  uploaded[appt.appointmentId]
                                    ? "btn-secondary"
                                    : "btn-primary"
                                }`}
                              >
                                {uploaded[appt.appointmentId]
                                  ? "✓ Uploaded"
                                  : "📄 Upload Prescription"}
                              </label>
                              <input
                                id={`file-${appt.appointmentId}`}
                                type="file"
                                accept=".pdf,.doc"
                                style={{ display: "none" }}
                                disabled={uploaded[appt.appointmentId]}
                                onChange={(e) =>
                                  handleFileUpload(
                                    e.target.files[0],
                                    appt.appointmentId
                                  )
                                }
                              />
                            </div>
                          )}
                          {appt.status === "PENDING" && (
                            <span className="awaiting-text">Awaiting Approval</span>
                          )}
                          {appt.status === "DECLINED" && (
                            <span className="awaiting-text">Not Available</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Doctor>
  );
}

export default ViewAppointmentsD;
