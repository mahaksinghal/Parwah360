import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";


// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ShowDoctor from "./Components/ShowDoctor";
import Payment from "./Customer/Payment";


// Admin Components
import AddSpeciality from "./Admin/AddSpeciality";
import AddDoctor from "./Admin/AddDoctor";
import AddReceptionist from "./Admin/AddReceptionist";
import ViewDoctors from "./Admin/ViewDoctors";
import EditDoctor from "./Admin/EditDoctor";
import EditReceptionist from "./Admin/EditReceptionist";


// Customer Components
import EditProfile from "./Customer/EditProfile";
import BookAppointment from "./Customer/BookAppointment";
import ViewAppointments from "./Customer/ViewAppointments";


//Receiptionist Components
import ViewReceiptionist from "./Admin/ViewReceiptionist";
import AddPatient from "./Receiptionist/AddPatient";
import ViewPatients from "./Receiptionist/ViewPatients";
import ViewAllAppointments from "./Receiptionist/ViewAllAppointments";

//Doctor Components
import Doctor from "./Doctor/Doctor";
import ViewAppointmentsD from "./Doctor/ViewAppointmentsD";
import UpdateSpecialization from "./Admin/UpdateSpecialization";



function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* Admin Routes */}
            <Route path="/admin" element={<AddSpeciality />} />
            <Route path="/admin/addSpeciality" element={<AddSpeciality />} />
            <Route path="/admin/updateSpecialization" element={<UpdateSpecialization />} />
            <Route path="/admin/addDoctor" element={<AddDoctor />} />
            <Route path="/admin/addReceptionist" element={<AddReceptionist />} />
            <Route path="/admin/viewDoctors" element={<ViewDoctors />} />
            <Route path="/admin/viewReceptionist" element={<ViewReceiptionist/>}/>
            <Route path="/admin/editDoctor/:id" element={<EditDoctor/>}/>
            <Route path="/admin/editreceptionist/:id" element={<EditReceptionist/>}/>

            {/* Receiptionist Routes */}
            <Route path="/receiptionist" element={<AddPatient />} />
            <Route path="/receiptionist/addPatient" element={<AddPatient />} />
            <Route path="/receiptionist/viewPatients" element={<ViewPatients/>}/>
            <Route path="/receiptionist/viewAllAppointments" element={<ViewAllAppointments/>}/>
            

            {/* Customer Routes */}
            <Route path="/doctors/:id" element={<ShowDoctor/>}/>
            <Route path="/bookappointment" element={<BookAppointment />} />
            <Route path="/viewappointments" element={<ViewAppointments />} />
            <Route path="/payment/:appointmentId/:amount" element={<Payment/>}/>
            <Route path="/editprofile/:id" element={<EditProfile/>}/>

            <Route path="/doctor" element={<ViewAppointmentsD/>}/>
            <Route path="/doctor/viewAppointments" element={<ViewAppointmentsD/>}/>
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
