import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import AdminPanel from './components/AdminPannel';
import MapView from './components/MapView';
import LoadingSpinner from './components/LoadingSpinner';
import CreateProfile from './components/CreateProfile'; // Import CreateProfile

function App() {
  // Initial profiles data 
  const initialProfiles = [];

  const [profiles, setProfiles] = useState(() => {
    const stored = localStorage.getItem('profiles');
    return stored ? JSON.parse(stored) : initialProfiles;
  });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapError, setMapError] = useState(null);

  // On profiles change, save to localStorage
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Show map modal with loading simulation
 const showMap = (profile) => {
  setLoading(true);
  setTimeout(() => {
    setSelectedProfile(profile);  
    setLoading(false);
    setMapError(null);
  }, 500); 
 }

  const closeMap = () => {
  setSelectedProfile(null);
  setMapError(null);
};

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-blue-900">
              ProfileMapApp
            </Link>
            <nav className="space-x-6 text-blue-700 text-lg font-medium">
              <Link to="/" className="hover:underline">Profiles</Link>
              <Link to="/admin" className="hover:underline">Admin</Link>
              <Link to="/create" className="hover:underline">Create</Link> 
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<ProfileList profiles={profiles} onShowMap={showMap} />} />
            <Route path="/profiles/:id" element={<ProfileDetails profiles={profiles} />} />
            <Route path="/admin" element={<AdminPanel profiles={profiles} setProfiles={setProfiles} />} />
            <Route path="/create" element={<CreateProfile profiles={profiles} setProfiles={setProfiles} />} />  
          </Routes>
        </main>

        {/* Loading overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map modal */}
        <AnimatePresence>
          {selectedProfile && !loading && !mapError && (
            <MapView profile={selectedProfile} onClose={closeMap} />
          )}
        </AnimatePresence>

        {/* Map error alert */}
        <AnimatePresence>
          {mapError && !loading && (
            <motion.div
              key="mapError"
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-lg z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center space-x-4">
                <p>{mapError}</p>
                <button
                  onClick={() => setMapError(null)}
                  className="font-bold text-red-700 hover:text-red-900"
                  aria-label="Close error message"
                >
                  &times;
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
