import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

const MapView = ({ profile, onClose }) => {
  if (!profile || !profile.address) return null;

  const position = [profile.address.lat, profile.address.lng];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mapview-title"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-gray-700 backdrop-blur-md"
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 id="mapview-title" className="text-lg font-semibold text-white">
            {profile.name}&apos;s Location
          </h2>
          <button
            aria-label="Close Map"
            className="text-white hover:text-blue-400 text-2xl font-bold transition"
            onClick={onClose}
          >
            &times;
          </button>
        </header>

        <main className="flex-grow h-[400px] w-full" tabIndex={-1}>
          <MapContainer center={position} zoom={14} scrollWheelZoom={true} className="h-full w-full z-0 rounded-b-2xl">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span className="font-semibold">{profile.name}</span>
                <br />
                <span>{profile.address.formatted}</span>
              </Popup>
            </Marker>
          </MapContainer>
        </main>
      </motion.div>
    </div>
  );
};

export default MapView;
