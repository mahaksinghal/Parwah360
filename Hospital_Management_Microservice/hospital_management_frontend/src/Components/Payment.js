import React, { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  const { vehicleId, vehicleName, startDate, endDate, totalPrice } = location.state || {};

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
      const userId = sessionStorage.getItem("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
      const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

      // 1. Call rentVehicle API
      const rentResponse = await axios.post(
        `http://localhost:8080/customer/rent`,
        null,
        {
          params: {
            userId: userId,
            vehicleId: vehicleId,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
          ...config,
        }
      );

      const rentalId = rentResponse.data;
      console.log('Rental ID:', rentalId);
      // alert(`Vehicle rented successfully! Rental ID: ${rentalId}`);
      if (!rentalId) {
        throw new Error("Rental ID not received from rentVehicle API");
      }

      // 2. Call processPayment API
      const paymentResponse = await axios.post(
        `http://localhost:8080/customer/processPayment`,
        null,
        {
          params: {
            rentalId: rentalId,
            amount: totalPrice,
          },
          ...config,
        }
      );

      console.log("Payment successful", paymentResponse.data);
        setTimeout(() => {
          navigate(`/viewrental/${userId}`);
        }, 1500);
     
    } catch (error) {
      console.error("Error processing order/payment", error.response || error);
      setError("Failed to complete the transaction. Please try again.");
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
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
                      id="form1"
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
                      id="form2"
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
                      id="form2"
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
                      id="form2"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="&#9679;&#9679;&#9679;"
                      required
                    />
                  </MDBCol>

                  {error && <div style={{ color: "red" }}>{error}</div>}

                  <MDBCol size="12" className="text-center mt-3">
                    <h5>Total Price: ₹{totalPrice.toFixed(2)}</h5>
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBBtn
                      color="info"
                      rounded
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
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
