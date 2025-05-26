import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile, onShowMap }) => {
  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.04,
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
        backdropFilter: 'blur(8px) saturate(180%)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        border: '1.5px solid rgba(255,255,255,0.18)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      className="bg-gray-900 bg-opacity-70 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 cursor-pointer border border-gray-700 backdrop-blur-lg"
      role="listitem"
      aria-label={`Profile card for ${profile.name}`}
      style={{
        backdropFilter: 'blur(8px) saturate(180%)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        border: '1.5px solid rgba(255,255,255,0.18)',
      }}
    >
      <motion.img
        src={profile.photo}
        alt={`Profile photo of ${profile.name}`}
        className="rounded-full w-28 h-28 object-cover self-center md:self-start border-4 border-gray-800 shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white drop-shadow">{profile.name}</h3>
        <p className="text-gray-300 mt-2 flex-grow">{profile.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.07, backgroundColor: '#2563eb' }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              onShowMap(profile);
            }}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Summary
          </motion.button>
          <Link
            to={`/profiles/${profile.id}`}
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 border border-blue-600 text-blue-400 rounded-lg hover:bg-blue-900 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              background: 'rgba(30,41,59,0.5)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
