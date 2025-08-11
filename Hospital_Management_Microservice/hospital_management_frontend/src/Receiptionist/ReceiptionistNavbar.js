import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css";
function ReceiptionistNavbar() {
    const navigate = useNavigate(); 
    

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');

      };
      

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="px-5" style={{ border: '2px solid black',backgroundColor:"#076cea" }}>
        <Container fluid>
        <Navbar.Brand as={NavLink} to="/receiptionist" className="d-flex align-items-center text-decoration-none">
        <span className="logo-style">
          Parwah360
        </span>
      </Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex justify-content-between w-100">
              <Nav.Item>
                <NavLink
                  to="/receiptionist"
                  className="nav-link fs-4 text-white fw-semibold"
                >
                 
                </NavLink>
              </Nav.Item>
              <Nav.Item className="d-flex align-items-center">
                <Badge bg="light" className="fs-5 text-dark fw-semibold">
                  <FaUserCircle /> 
                  {sessionStorage.getItem("userName")}
                </Badge>
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </div>
  )
}

export default ReceiptionistNavbar;
