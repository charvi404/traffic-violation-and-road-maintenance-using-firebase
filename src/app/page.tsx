'use client';

import React from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarSeparator } from '@/components/ui/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPotholeIncidents } from '@/services/pothole-detection';
import { getWrongLaneDetections } from '@/services/wrong-lane-detection';
import { getWrongParkingIncidents } from '@/services/wrong-parking';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import type { Icon } from 'leaflet';

// Leaflet import and setup inside useEffect
// let L: {
//   icon: typeof Icon;
// } | null = null;

// Define marker icons
let potholeIcon: Icon | null = null;
let wrongLaneIcon: Icon | null = null;
let wrongParkingIcon: Icon | null = null;

// Leaflet Map component
function LeafletMap({ potholeIncidents, wrongLaneDetections, wrongParkingIncidents, selectedDateRange }) {
  const [mapCenter, setMapCenter] = useState([18.5204, 73.8567]); // Pune coordinates
  const [mapZoom, setMapZoom] = useState(13);
  const [incidentDetails, setIncidentDetails] = useState(null);

  useEffect(() => {
    let L: any = null;
     // Dynamically import leaflet and create icons
    import('leaflet').then((leaflet) => {
      L = leaflet;

      if (L) {
        potholeIcon = new L.icon({
          iconUrl: '/pothole_marker.svg',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        wrongLaneIcon = new L.icon({
          iconUrl: '/wrong_lane_marker.svg',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        wrongParkingIcon = new L.icon({
          iconUrl: '/wrong_parking_marker.svg',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
      }
    });
    // Update map markers when incidents change
  }, []);

  const handleMarkerClick = (incident) => {
    setIncidentDetails(incident);
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
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
          eventHandlers={{
            click: () => handleMarkerClick(incident),
          }}
        >
          <Popup>
            Pothole Details:
            <br />
            Location: {incident.location.lat}, {incident.location.lng}
            <br />
            Timestamp: {incident.timestamp}
          </Popup>
        </Marker> ) : null
      ))}
      {wrongLaneDetections?.map((incident, index) => (
        wrongLaneIcon ? (
        <Marker
          key={`wronglane-${index}`}
          position={[incident.location.lat, incident.location.lng]}
          icon={wrongLaneIcon}
          eventHandlers={{
            click: () => handleMarkerClick(incident),
          }}
        >
          <Popup>
            Wrong Lane Details:
            <br />
            Location: {incident.location.lat}, {incident.location.lng}
            <br />
            Timestamp: {incident.timestamp}
          </Popup>
        </Marker> ) : null
      ))}
      {wrongParkingIncidents?.map((incident, index) => (
        wrongParkingIcon ? (
        <Marker
          key={`wrongparking-${index}`}
          position={[incident.location.lat, incident.location.lng]}
          icon={wrongParkingIcon}
          eventHandlers={{
            click: () => handleMarkerClick(incident),
          }}
        >
          <Popup>
            Wrong Parking Details:
            <br />
            Location: {incident.location.lat}, {incident.location.lng}
            <br />
            Timestamp: {incident.timestamp}
          </Popup>
        </Marker> ) : null
      ))}
       {incidentDetails && (
        <IncidentDetailsModal
          incident={incidentDetails}
          onClose={() => setIncidentDetails(null)}
        />
      )}
    </MapContainer>
  );
}

const IncidentDetailsModal = ({ incident, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-2">Incident Details</h2>
        {incident && (
          <>
            <p>
              <Label>Location:</Label> {incident.location?.lat}, {incident.location?.lng}
            </p>
            <p>
              <Label>Timestamp:</Label> {incident.timestamp}
            </p>
            {incident.imageUrl && (
              <img src={incident.imageUrl} alt="Incident" className="mt-2 rounded-md" />
            )}
            {incident.challanId && (
              <p>
                <Label>Challan ID:</Label> {incident.challanId}
              </p>
            )}
          </>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

// Main Home component
export default function Home() {
  const [selectedDateRange, setSelectedDateRange] = React.useState<undefined | {
    from: Date;
    to: Date;
  }>({
    from: new Date('2024-07-22'),
    to: new Date('2024-07-23'),
  });
  const [potholeIncidents, setPotholeIncidents] = useState([]);
  const [wrongLaneDetections, setWrongLaneDetections] = useState([]);
  const [wrongParkingIncidents, setWrongParkingIncidents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (selectedDateRange?.from && selectedDateRange?.to) {
        const fromDate = selectedDateRange.from.toISOString().split('T')[0];
        const toDate = selectedDateRange.to.toISOString().split('T')[0];

        const potholeData = await getPotholeIncidents(fromDate, toDate);
        setPotholeIncidents(potholeData);

        const wrongLaneData = await getWrongLaneDetections(fromDate, toDate);
        setWrongLaneDetections(wrongLaneData);

        const wrongParkingData = await getWrongParkingIncidents(fromDate, toDate);
        setWrongParkingIncidents(wrongParkingData);
      }
    }
    fetchData();
  }, [selectedDateRange]);

  const totalPotholes = potholeIncidents?.length || 0;
  const totalWrongLane = wrongLaneDetections?.length || 0;
  const totalWrongParking = wrongParkingIncidents?.length || 0;

  return (
    <SidebarProvider>
      <div className="md:flex h-screen w-full">
        <Sidebar className="w-64 flex-none bg-gray-100">
          <SidebarHeader>
            <h2 className="text-lg font-semibold">Pune Road Insights</h2>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
             <Card>
                <CardHeader>
                  <CardTitle>Select Date Range</CardTitle>
                  <CardDescription>Filter data by date</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Calendar
                    mode="range"
                    defaultMonth={new Date()}
                    selected={selectedDateRange}
                    onSelect={setSelectedDateRange}
                  />
                </CardContent>
              </Card>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Potholes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPotholes}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Wrong Lane Detections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalWrongLane}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Wrong Parking Challans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalWrongParking}</div>
                </CardContent>
              </Card>
            </div>

            <LeafletMap
              potholeIncidents={potholeIncidents}
              wrongLaneDetections={wrongLaneDetections}
              wrongParkingIncidents={wrongParkingIncidents}
              selectedDateRange={selectedDateRange}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
