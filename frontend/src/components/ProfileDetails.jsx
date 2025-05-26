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
        <p className="text-red-600 font-semibold text-lg">Profile not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
        className="mb-6 text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        &larr; Back to Profiles
      </button>
      <article className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6" aria-label={`Profile details of ${profile.name}`}>
        <img
          src={profile.photo}
          alt={`Profile photo of ${profile.name}`}
          className="w-48 h-48 rounded-full object-cover self-center md:self-start"
        />
        <section className="flex flex-col justify-start">
          <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
          <p className="mt-2 text-gray-700">{profile.description}</p>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Contact:</strong> {profile.contact}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Location:</strong> {profile.address.formatted}
          </p>
          <div className="mt-4">
            <strong>Interests:</strong>
            <ul className="list-disc list-inside text-gray-700">
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
