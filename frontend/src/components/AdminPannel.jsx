import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminPanel = ({ profiles, setProfiles }) => {
  const [editingProfile, setEditingProfile] = useState(null);
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

  useEffect(() => {
    if (editingProfile) {
      setFormData({
        name: editingProfile.name,
        photo: editingProfile.photo,
        description: editingProfile.description,
        lat: editingProfile.address.lat.toString(),
        lng: editingProfile.address.lng.toString(),
        formatted: editingProfile.address.formatted,
        contact: editingProfile.contact,
        interests: editingProfile.interests.join(', '),
      });
      setError('');
    } else {
      resetForm();
    }
  }, [editingProfile]);

  const resetForm = () => {
    setFormData({
      name: '',
      photo: '',
      description: '',
      lat: '',
      lng: '',
      formatted: '',
      contact: '',
      interests: '',
    });
    setError('');
  };

  const handleInputChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.photo.trim()) return 'Photo URL is required.';
    if (!formData.description.trim()) return 'Description is required.';
    if (!formData.lat.trim() || isNaN(Number(formData.lat))) return 'Valid latitude is required.';
    if (!formData.lng.trim() || isNaN(Number(formData.lng))) return 'Valid longitude is required.';
    if (!formData.formatted.trim()) return 'Formatted address is required.';
    if (!formData.contact.trim()) return 'Contact info is required.';
    return null;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const newProfile = {
      id: editingProfile ? editingProfile.id : Date.now().toString(),
      name: formData.name.trim(),
      photo: formData.photo.trim(),
      description: formData.description.trim(),
      address: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        formatted: formData.formatted.trim(),
      },
      contact: formData.contact.trim(),
      interests: formData.interests
        .split(',')
        .map(i => i.trim())
        .filter(Boolean),
    };

    if (editingProfile) {
      setProfiles(prev => prev.map(p => (p.id === editingProfile.id ? newProfile : p)));
    } else {
      setProfiles(prev => [newProfile, ...prev]);
    }
    setEditingProfile(null);
    resetForm();
    navigate('/');
  };

  const handleEditClick = profile => {
    setEditingProfile(profile);
    navigate('/admin');
  };

  const handleDeleteClick = id => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setProfiles(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Admin Panel - Manage Profiles</h1>
      <button
        onClick={() => {
          setEditingProfile(null);
          resetForm();
          navigate('/admin');
        }}
        className="mb-6 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
      >
        Add New Profile
      </button>

      <div className="mb-8">
        {profiles.length === 0 ? (
          <p className="text-center text-gray-400">No profiles available.</p>
        ) : (
          <div className="space-y-4" role="list">
            {profiles.map(profile => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between bg-gray-900 rounded-lg shadow p-3"
                role="listitem"
                aria-label={`Admin profile row for ${profile.name}`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={profile.photo}
                    alt={`Profile photo of ${profile.name}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{profile.name}</h3>
                    <p className="text-sm text-gray-400">{profile.address.formatted}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(profile)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(profile.id)}
                    className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <section aria-label={editingProfile ? 'Edit profile form' : 'Add new profile form'}>
        <h2 className="text-2xl font-semibold mb-4">{editingProfile ? 'Edit Profile' : 'Add New Profile'}</h2>
        {error && (
          <p className="text-red-400 font-semibold bg-red-900 p-2 rounded mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-white">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
              value={formData.name}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block font-medium mb-1 text-white">
              Photo URL <span className="text-red-400">*</span>
            </label>
            <input
              id="photo"
              name="photo"
              type="url"
              className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
              value={formData.photo}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1 text-white">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
              value={formData.description}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="lat" className="block font-medium mb-1 text-white">
                Latitude <span className="text-red-400">*</span>
              </label>
              <input
                id="lat"
                name="lat"
                type="number"
                step="any"
                className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
                value={formData.lat}
                onChange={handleInputChange}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="lng" className="block font-medium mb-1 text-white">
                Longitude <span className="text-red-400">*</span>
              </label>
              <input
                id="lng"
                name="lng"
                type="number"
                step="any"
                className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
                value={formData.lng}
                onChange={handleInputChange}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="formatted" className="block font-medium mb-1 text-white">
                Formatted Address <span className="text-red-400">*</span>
              </label>
              <input
                id="formatted"
                name="formatted"
                type="text"
                className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
                value={formData.formatted}
                onChange={handleInputChange}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact" className="block font-medium mb-1 text-white">
              Contact Email <span className="text-red-400">*</span>
            </label>
            <input
              id="contact"
              name="contact"
              type="email"
              className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
              value={formData.contact}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="interests" className="block font-medium mb-1 text-white">
              Interests (comma separated)
            </label>
            <input
              id="interests"
              name="interests"
              type="text"
              className="w-full border border-gray-700 bg-gray-900 text-white rounded px-3 py-2"
              value={formData.interests}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingProfile ? 'Update Profile' : 'Add Profile'}
            </button>
            {editingProfile && (
              <button
                type="button"
                className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => {
                  setEditingProfile(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminPanel;
