import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface CollectionPoint {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  acceptedMaterials: string[];
  description: string;
}

const Map: React.FC = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Obter localização do usuário
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Buscar pontos próximos
      axios.get(`http://localhost:8080/api/collection-points/nearby`, {
        params: {
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          radius: 5000
        }
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          setPoints(response.data);
        } else {
          console.warn('API retornou dados inesperados:', response.data);
          setPoints([]);
        }
      })
      .catch(error => console.error('Erro ao buscar pontos:', error));
    }
  }, [userLocation]);

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = userLocation || { lat: -23.550520, lng: -46.633308 }; // São Paulo como fallback

  return (
    <LoadScript googleMapsApiKey="AIzaSyCK2oaJqUy1K_V7ana7LiDKV5Uzb6ghzyA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />
        )}

        {Array.isArray(points) && points.map(point => (
          <Marker
            key={point.id}
            position={{ lat: point.latitude, lng: point.longitude }}
            onClick={() => setSelectedPoint(point)}
          />
        ))}

        {selectedPoint && (
          <InfoWindow
            position={{ lat: selectedPoint.latitude, lng: selectedPoint.longitude }}
            onCloseClick={() => setSelectedPoint(null)}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">{selectedPoint.name}</Typography>
                <Typography variant="body2">{selectedPoint.address}</Typography>
                <Typography variant="body2">Telefone: {selectedPoint.phone}</Typography>
                <Typography variant="subtitle2">Materiais aceitos:</Typography>
                <List dense>
                  {selectedPoint.acceptedMaterials.map((material, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={material} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body2">{selectedPoint.description}</Typography>
              </CardContent>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
