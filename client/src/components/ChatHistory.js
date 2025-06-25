import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import api from '../api';

const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/chat/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHistory(res.data);
      } catch (err) {
        setError('Failed to load chat history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="text-center text-primary mb-4">🗂️ Your Chat History</h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : history.length === 0 ? (
        <Alert variant="info" className="text-center">
          No chat history yet.
        </Alert>
      ) : (
        <ListGroup>
          {history.map((chat, index) => (
            <ListGroup.Item key={index} className="mb-3 shadow-sm rounded">
              <Card className="p-3">
                <Card.Subtitle className="text-muted mb-2">
                  {new Date(chat.createdAt).toLocaleString()}
                </Card.Subtitle>
                <Card.Text><strong>Question:</strong> {chat.question}</Card.Text>
                <Card.Text><strong>AI Answer:</strong> {chat.answer}</Card.Text>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ChatHistory;
