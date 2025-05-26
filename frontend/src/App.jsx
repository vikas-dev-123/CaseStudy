import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import AdminPanel from './components/AdminPannel';
import MapView from './components/MapView';
import LoadingSpinner from './components/LoadingSpinner';
import CreateProfile from './components/CreateProfile';

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
  const [menuOpen, setMenuOpen] = useState(false);

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
  };

  const closeMap = () => {
    setSelectedProfile(null);
    setMapError(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gray-900 shadow sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400">
              ProfileMapApp
            </Link>
            {/* Desktop Nav */}
            <nav className="space-x-6 text-white text-lg font-medium hidden md:flex">
              <Link to="/" className="hover:underline">Profiles</Link>
              <Link to="/admin" className="hover:underline">Admin</Link>
              <Link to="/create" className="hover:underline">Create</Link> 
            </nav>
            {/* Mobile Menu Icon */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              {/* Hamburger Icon */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Mobile Nav Dropdown */}
          {menuOpen && (
            <div className="md:hidden bg-gray-900 border-t border-gray-700 px-6 py-2 space-y-2">
              <Link
                to="/"
                className="block text-white text-lg font-medium hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Profiles
              </Link>
              <Link
                to="/admin"
                className="block text-white text-lg font-medium hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                to="/create"
                className="block text-white text-lg font-medium hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Create Profile
              </Link>
            </div>
          )}
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
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
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
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-900 border border-red-400 text-white px-6 py-4 rounded shadow-lg z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center space-x-4">
                <p>{mapError}</p>
                <button
                  onClick={() => setMapError(null)}
                  className="font-bold text-white hover:text-red-300"
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
