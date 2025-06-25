import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center p-5 shadow" style={{ borderRadius: '20px' }}>
              <h1 className="mb-4 text-primary">Welcome to <strong>HealthLens</strong> 🩺</h1>
              <p className="mb-4 fs-5 text-secondary">
                Your personal AI-powered health assistant for quick, smart answers.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;
