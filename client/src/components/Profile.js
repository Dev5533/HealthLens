// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Card } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3 className="text-primary mb-4 text-center">User Profile</h3>
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
