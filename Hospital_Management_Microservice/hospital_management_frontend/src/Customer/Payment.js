import React, { useState,useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const { appointmentId, amount } = useParams(); // Retrieve appointmentId and amount from URL
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);
  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    return month > 0 && month <= 12 && year >= new Date().getFullYear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!cardNumber || !cardHolderName || !expiration || !cvv) {
      setError("Please fill in all fields.");
      return;
    }
  
    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }
  
    if (!validateExpirationDate(expiration)) {
      setError("Expiration date is invalid or in the past.");
      return;
    }
  
    setError("");
    setIsSubmitting(true);
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
  
      // Send JSON payload instead of using params
      const paymentData = {
        appointmentId: appointmentId,
        amount: parseFloat(amount), // Ensure amount is in numeric format
      };
  
      // Call processPayment API
      const paymentResponse = await axios.post(
        "http://localhost:8080/patient/makePayment",
        paymentData, // Send JSON payload here
        config
      );
  
      console.log("Payment successful", paymentResponse.data);
      toast.success("Payment successful!", { position: "top-right", autoClose: 2000 });
  
      setTimeout(() => {
        navigate("/viewappointments");
      }, 1500);
    } catch (error) {
      console.error("Error processing payment", error.response || error);
      setError("Failed to complete the transaction. Please try again.");
      toast.error("Payment failed. Please try again.", { position: "top-right", autoClose: 2000 });
    }
  
    setIsSubmitting(false);
  };
  

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex align-items-center">
                  <MDBCol size="9">
                    <MDBInput
                      label="Card Number"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3457"
                      required
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="visa"
                      width="64px"
                    />
                  </MDBCol>

                  <MDBCol size="9">
                    <MDBInput
                      label="Cardholder's Name"
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="Cardholder's Name"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="6">
                    <MDBInput
                      label="Expiration"
                      type="text"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="MM/YYYY"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBInput
                      label="CVV"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="***"
                      required
                    />
                  </MDBCol>

                  {error && <div style={{ color: "red" }}>{error}</div>}

                  <MDBCol size="12" className="text-center mt-3">
                    <h5>Total Price: ₹{amount}</h5> {/* Display amount from URL */}
                  </MDBCol>

                  <MDBCol size="12" className="text-center mt-3">
                    <MDBBtn color="info" rounded size="lg" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : <MDBIcon fas icon="arrow-right" />}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}
