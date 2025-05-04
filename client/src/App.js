import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 23.1765,
  lng: 75.7885
};

// Predefined location (e.g., Nagpur)
const predefinedLocation = {
  lat: 23.1765,
  lng: 75.7885
};

function haversineDistance(coords1, coords2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(coords1.lat)) *
      Math.cos(toRad(coords2.lat)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(coords);
        setDistance(haversineDistance(coords, predefinedLocation));
      },
      (error) => console.error('Error fetching location:', error),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAZv465T0Uib_XM5SjabRfM2Gddo5gNfqo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {currentLocation && <Marker position={currentLocation} />}
        <Marker position={predefinedLocation} />
      </GoogleMap>
      {distance && (
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: '10px' }}>
          Distance to predefined location: {distance.toFixed(2)} km
        </div>
      )}
    </LoadScript>
  );
}

export default App;