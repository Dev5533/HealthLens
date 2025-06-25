
import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = async e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);
         console.log("Login success:", res.data);
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true); 
      navigate('/');
    } catch (err) {
        console.error("Login error:", err.response || err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="bg-light-subtle dark-bg-dark text-dark dark-text-light" style={{ minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center py-5">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="shadow-lg rounded-4 border-0 bg-white dark-bg-secondary text-dark dark-text-light">
              <Card.Body>
                <h3 className="text-center mb-4 text-primary">Login to <span className="fw-bold">HealthLens</span></h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="form-control"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="form-control"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 fw-semibold">
                    Login
                  </Button>
                </Form>
                <p className="mt-3 text-center">
                  Don't have an account? <a href="/register">Register</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
