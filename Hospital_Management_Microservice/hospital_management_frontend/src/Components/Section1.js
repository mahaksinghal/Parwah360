import React from "react";

function Section1() {
  return (
    <div
      className="container my-5"
      style={{ margin: "5% auto", padding: "0 20px" }}
    >
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0 pe-lg-5">
          <h2 className="mb-4 fw-bold fs-1" style={{ color: "#076cea" }}>
            Parwah360
          </h2>
          <p className="mb-4 fs-6" style={{ lineHeight: "1.6", textAlign: "justify" }}>
            Parwah360 is committed to providing high-quality, patient-centered 
            healthcare with a focus on innovation and excellence. Equipped with 
            advanced medical technology and a team of experienced professionals, 
            we offer comprehensive services, including consultations, diagnostics, 
            surgeries, and emergency care. Our hospital application enhances patient 
            convenience by enabling seamless appointment booking, digital medical 
            records access, and telemedicine consultations.
            <br /><br />
            Our state-of-the-art facility features specialized departments including 
            cardiology, neurology, orthopedics, pediatrics, and oncology, ensuring 
            expert care across all medical specialties. We pride ourselves on our 
            24/7 emergency services, fully equipped ICU units, and modern diagnostic 
            imaging capabilities. With a strong emphasis on compassionate care and 
            modern healthcare solutions, Parwah360 strives to ensure the well-being 
            and satisfaction of every patient through personalized treatment plans 
            and continuous medical support.
          </p>
        </div>

        <div className="col-lg-5 col-md-6 col-12 ps-lg-4">
          <div className="text-center">
            <img
              src="./assests/img4.jpg"
              alt="Parwah360 Hospital"
              className="img-fluid rounded shadow"
              style={{ 
                maxWidth: "90%", 
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
