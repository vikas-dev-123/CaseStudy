import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfileDetails = ({ profiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profile = profiles.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <p className="text-red-400 font-semibold text-lg">Profile not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="max-w-3xl mx-auto p-6"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-400 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        &larr; Back to Profiles
      </button>
      <article
        className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 border border-gray-700 backdrop-blur-lg"
        aria-label={`Profile details of ${profile.name}`}
        style={{
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1.5px solid rgba(255,255,255,0.18)',
        }}
      >
        <img
          src={profile.photo}
          alt={`Profile photo of ${profile.name}`}
          className="w-48 h-48 rounded-full object-cover self-center md:self-start border-4 border-gray-800 shadow-lg"
        />
        <section className="flex flex-col justify-start">
          <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
          <p className="mt-2 text-gray-300">{profile.description}</p>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Contact:</strong> {profile.contact}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            <strong>Location:</strong> {profile.address.formatted}
          </p>
          <div className="mt-4">
            <strong className="text-gray-200">Interests:</strong>
            <ul className="list-disc list-inside text-gray-300">
              {profile.interests.map((interest, idx) => (
                <li key={idx}>{interest}</li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </motion.div>
  );
};

export default ProfileDetails;
