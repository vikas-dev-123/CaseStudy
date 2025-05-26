import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateProfile = ({ profiles, setProfiles }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    lat: '',
    lng: '',
    formatted: '',
    contact: '',
    interests: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.photo.trim()) return 'Photo URL is required';
    if (!formData.lat.trim() || isNaN(+formData.lat)) return 'Valid latitude required';
    if (!formData.lng.trim() || isNaN(+formData.lng)) return 'Valid longitude required';
    return null;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const newProfile = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      photo: formData.photo.trim(),
      description: formData.description.trim(),
      address: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        formatted: formData.formatted.trim() || '',
      },
      contact: formData.contact.trim() || '',
      interests: formData.interests
        .split(',')
        .map(i => i.trim())
        .filter(Boolean),
    };

    setProfiles(prev => [newProfile, ...prev]);
    navigate('/');  
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-2xl"
      style={{
        background: 'rgba(30, 41, 59, 0.7)', // dark glass
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-center text-white drop-shadow"
      >
        Create New Profile
      </motion.h2>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 mb-4 text-center bg-red-900 bg-opacity-40 rounded p-2"
        >
          {error}
        </motion.p>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.input
          name="name"
          placeholder="Name"
          className="w-full border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.03 }}
        />
        <motion.input
          name="photo"
          placeholder="Photo URL"
          className="w-full border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.03 }}
        />
        <motion.textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          rows={3}
          whileFocus={{ scale: 1.03 }}
        />
        <div className="flex space-x-4">
          <motion.input
            name="lat"
            placeholder="Latitude"
            type="number"
            step="any"
            className="w-1/2 border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.03 }}
          />
          <motion.input
            name="lng"
            placeholder="Longitude"
            type="number"
            step="any"
            className="w-1/2 border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.03 }}
          />
        </div>
        <motion.input
          name="formatted"
          placeholder="Formatted Address"
          className="w-full border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          whileFocus={{ scale: 1.03 }}
        />
        <motion.input
          name="contact"
          placeholder="Contact Email"
          className="w-full border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          whileFocus={{ scale: 1.03 }}
        />
        <motion.input
          name="interests"
          placeholder="Interests (comma separated)"
          className="w-full border border-gray-700 bg-black bg-opacity-60 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          onChange={handleChange}
          whileFocus={{ scale: 1.03 }}
        />
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: '#2563eb' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-xl shadow-lg font-semibold text-lg tracking-wide transition"
        >
          Add Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProfile;
