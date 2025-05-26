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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Create New Profile</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="photo"
          placeholder="Photo URL"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="lat"
          placeholder="Latitude"
          type="number"
          step="any"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="lng"
          placeholder="Longitude"
          type="number"
          step="any"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="formatted"
          placeholder="Formatted Address"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact Email"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="interests"
          placeholder="Interests (comma separated)"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md transition duration-300"
        >
          Add Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProfile;
