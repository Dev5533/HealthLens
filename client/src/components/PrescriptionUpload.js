import React, { useState } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a prescription image');

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/prescription/analyze', formData);
      setAiResponse(res.data.aiExplanation);
    } catch (err) {
      alert(err.response?.data?.message || 'Error analyzing prescription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3 className="text-primary text-center mb-4">🧾 AI Prescription Analysis</h3>
        <Form.Group className="mb-3">
          <Form.Label>Select Prescription Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        </Form.Group>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Analyze'}
        </Button>
        {aiResponse && (
          <Card className="mt-4 p-3 bg-light">
            <h5>🧠 AI Response:</h5>
            <p style={{ whiteSpace: 'pre-line' }}>{aiResponse}</p>
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default PrescriptionUpload;
