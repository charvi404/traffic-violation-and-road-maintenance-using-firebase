'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Icon } from 'leaflet';

interface MapProps {
  center: [number, number];
  zoom: number;
  potholeIncidents: any[];
  wrongLaneDetections: any[];
  wrongParkingIncidents: any[];
  potholeIcon: Icon | null;
  wrongLaneIcon: Icon | null;
  wrongParkingIcon: Icon | null;
}

const Map: React.FC<MapProps> = ({
  center,
  zoom,
  potholeIncidents,
  wrongLaneDetections,
  wrongParkingIncidents,
  potholeIcon,
  wrongLaneIcon,
  wrongParkingIcon,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: 'calc(100vh - 4rem)', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {potholeIncidents?.map((incident, index) => (
        potholeIcon ? (
          <Marker
            key={`pothole-${index}`}
            position={[incident.location.lat, incident.location.lng]}
            icon={potholeIcon}
          >
            <Popup>
              Pothole Details:
              <br />
              Location: {incident.location.lat}, {incident.location.lng}
              <br />
              Timestamp: {incident.timestamp}
            </Popup>
          </Marker>) : null
      ))}
      {wrongLaneDetections?.map((incident, index) => (
        wrongLaneIcon ? (
          <Marker
            key={`wronglane-${index}`}
            position={[incident.location.lat, incident.location.lng]}
            icon={wrongLaneIcon}
          >
            <Popup>
              Wrong Lane Details:
              <br />
              Location: {incident.location.lat}, {incident.location.lng}
              <br />
              Timestamp: {incident.timestamp}
            </Popup>
          </Marker>) : null
      ))}
      {wrongParkingIncidents?.map((incident, index) => (
        wrongParkingIcon ? (
          <Marker
            key={`wrongparking-${index}`}
            position={[incident.location.lat, incident.location.lng]}
            icon={wrongParkingIcon}
          >
            <Popup>
              Wrong Parking Details:
              <br />
              Location: {incident.location.lat}, {incident.location.lng}
              <br />
              Timestamp: {incident.timestamp}
            </Popup>
          </Marker>) : null
      ))}
    </MapContainer>
  );
};

export default Map;
