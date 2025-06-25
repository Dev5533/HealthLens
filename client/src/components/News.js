import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import api from '../api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/news/latest')
      .then(res => setNews(res.data))
      .catch(() => setError('Failed to load news'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="my-5">
      <h3 className="text-center text-primary mb-4">📰 Latest Medical News</h3>
      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && news.length === 0 && <Alert variant="info">No news available.</Alert>}
      {news.map(item => (
        <Card key={item.Id || item.key} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{item.Title}</Card.Title>
            <Card.Text>
              {item.Summary_ContentBlock?.[0]?.content || item.Brief || 'No summary available.'}
            </Card.Text>
            <Button href={`https://www.who.int/news/${item.UrlName}`} target="_blank">
              Read More
            </Button>
            <small className="text-muted float-end">
              {new Date(item.PublicationDateTime || item.PublicationDate).toLocaleString()}
            </small>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default News;
