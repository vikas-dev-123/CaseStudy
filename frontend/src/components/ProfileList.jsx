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
    <section className="max-w-6xl mx-auto px-4 py-8" aria-label="Profile listing">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">User Profiles</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6 justify-center">
        <input
          type="search"
          aria-label="Search profiles by name"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-md px-4 py-2 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          aria-label="Filter profiles by location"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
          <p className="text-center text-gray-500 mt-12">No profiles found.</p>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProfileList;
