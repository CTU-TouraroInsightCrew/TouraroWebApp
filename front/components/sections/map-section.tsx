"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
//import { useEffect } from "react";

// Fix icon (Leaflet trong React thường bị lỗi icon)
const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function MapSection() {
  return (
    <section id ="map" className="w-full h-[500px]">
      <MapContainer
        center={[10.0452, 105.7469]} // toạ độ Cần Thơ
        zoom={13}
        className="w-full h-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          // OpenStreetMap tile source
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Marker */}
        <Marker position={[10.0452, 105.7469]}>
          <Popup>Cần Thơ</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
