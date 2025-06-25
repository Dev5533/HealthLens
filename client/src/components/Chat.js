import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import api from '../api';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSend = async () => {
    try {
      const res = await api.post(
        '/api/auth/analyze',
        { question },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setAnswer(res.data.answer);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to get AI response');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 bg-white">
            <Card.Body className="p-4">
              <h3 className="text-center text-primary mb-4">Ask a Health Question</h3>

              <Form.Group className="mb-4">
                <Form.Label>Enter your question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type something like: What are symptoms of vitamin D deficiency?"
                />
              </Form.Group>

              <Button variant="primary" className="w-100 mb-4" onClick={handleSend}>
                Get AI Response
              </Button>

              {answer && (
                <>
                  <h5 className="mb-2">AI Response:</h5>
                  <Card className="p-3 bg-light border-start border-4 border-success mb-4 shadow-sm">
                    {/* Renders markdown-like formatting */}
                    <ReactMarkdown>{answer}</ReactMarkdown>
                  </Card>
                </>
              )}

              <Button
                as={Link}
                to="/hospitals"
                variant="outline-primary"
                className="w-100 mb-3 fw-semibold"
              >
                🏥 View Nearby Hospitals
              </Button>

              <Button variant="outline-danger" className="w-100" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
