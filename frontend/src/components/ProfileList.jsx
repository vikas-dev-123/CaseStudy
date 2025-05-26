import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileList = ({ profiles, onShowMap }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  // extract unique locations from profiles
  const locationOptions = Array.from(
    new Set(profiles.map(p => p.address.formatted))
  ).sort();

  // filter profiles by name and location
  const filteredProfiles = profiles.filter(profile => {
    const nameMatch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = filterLocation ? profile.address.formatted === filterLocation : true;
    return nameMatch && locationMatch;
  });

  return (
    <section
      className="max-w-6xl mx-auto px-4 py-10 min-h-screen"
      aria-label="Profile listing"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-8"
        style={{
          color: 'rgba(200, 255, 255, 0.85)', 
          textShadow: '0 2px 8px #000, 0 1px 0 #fff2'
        }}
      >
        User Profiles
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6 justify-center">
        <input
          type="search"
          aria-label="Search profiles by name"
          placeholder="Search by name..."
          className="border border-blue-700 bg-black bg-opacity-70 text-blue-200 rounded-md px-4 py-2 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          aria-label="Filter profiles by location"
          className="border border-blue-700 bg-black bg-opacity-70 text-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locationOptions.map(loc => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <AnimatePresence>
        {filteredProfiles.length > 0 ? (
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onShowMap={onShowMap}
              />
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-blue-300 mt-12 text-lg"
          >
            No profiles found.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProfileList;
