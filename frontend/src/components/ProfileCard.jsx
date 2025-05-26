import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile, onShowMap }) => {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05, boxShadow: '0px 8px 15px rgba(0,0,0,0.2)' }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 cursor-pointer"
      role="listitem"
      aria-label={`Profile card for ${profile.name}`}
    >
      <img
        src={profile.photo}
        alt={`Profile photo of ${profile.name}`}
        className="rounded-full w-28 h-28 object-cover self-center md:self-start"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
        <p className="text-gray-600 mt-2 flex-grow">{profile.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowMap(profile);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Summary
          </button>
          <Link
            to={`/profiles/${profile.id}`}
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
