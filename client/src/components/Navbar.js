import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = ({ isLoggedIn, handleLogout }) => {
  const themeColor = '#5c6bc0'; 

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: themeColor }}
      variant="dark"
      className="shadow-sm"
    >
      <Container className="d-flex justify-content-between">
        {/* Left - Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-white fw-bold fs-4 me-auto"
        >
          🩺 HealthLens
        </Navbar.Brand>

        {/* Center - History */}
        <Nav className="mx-auto">
          <Nav.Link
            as={Link}
            to="/history"
            className="text-white fw-semibold fs-6"
          >
            📜 History
          </Nav.Link>
        </Nav>

        {}
        <Nav className="ms-auto align-items-center">
          {}
          <Button
            as={Link}
            to="/news"
            variant="outline-light"
            className="me-2 rounded-pill px-4 fw-semibold"
          >
            📰 News
          </Button>

          {isLoggedIn ? (
            <>
              <Button
                as={Link}
                to="/profile"
                variant="outline-light"
                className="me-2 rounded-pill px-4 fw-semibold"
              >
                Profile
              </Button>
              <Button
                variant="light"
                className="rounded-pill px-4 fw-semibold text-white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid white',
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                className="me-2 rounded-pill px-4 fw-semibold"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="light"
                className="rounded-pill px-4 fw-semibold text-white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid white',
                }}
              >
                Register
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
