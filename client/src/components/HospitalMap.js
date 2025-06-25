import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const NearbyHospitalsWithMap = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('map');
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setLocation(userLocation);
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          alert('Location access denied. Cannot find nearby hospitals.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (view === 'map' && location && hospitals.length > 0 && !map) {
      const newMap = L.map('leafletMap').setView([location.lat, location.lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(newMap);

      // User location
      L.marker([location.lat, location.lng]).addTo(newMap).bindPopup('You are here');

      // Hospital markers
      hospitals.forEach((hospital) => {
        const [lat, lng] = [parseFloat(hospital.lat), parseFloat(hospital.lon)];
        L.marker([lat, lng])
          .addTo(newMap)
          .bindPopup(`<b>${hospital.display_name.split(',')[0]}</b><br/><a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Open in Google Maps</a>`);
      });

      setMap(newMap);
    }
  }, [view, location, hospitals, map]);

  const fetchNearbyHospitals = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=10&bounded=1&viewbox=${lng - 0.05},${lat + 0.05},${lng + 0.05},${lat - 0.05}`
      );
      const data = await response.json();
      setHospitals(data);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center text-primary mb-4">Nearby Hospitals</h3>

      <div className="d-flex justify-content-center mb-3">
        <Button
          variant={view === 'map' ? 'primary' : 'outline-primary'}
          className="me-2"
          onClick={() => setView('map')}
        >
          🗌️ Map View
        </Button>
        <Button
          variant={view === 'list' ? 'primary' : 'outline-primary'}
          onClick={() => setView('list')}
        >
          📋 List View
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading hospitals...</p>
        </div>
      ) : view === 'map' ? (
        <div id="leafletMap" style={{ height: '500px', borderRadius: '10px' }}></div>
      ) : (
        <Row>
          {hospitals.map((hospital, idx) => (
            <Col md={6} className="mb-4" key={idx}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{hospital.display_name.split(',')[0]}</Card.Title>
                  <Card.Text>
                    <strong>Address:</strong> {hospital.display_name}
                  </Card.Text>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Open in Google Maps
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NearbyHospitalsWithMap;
