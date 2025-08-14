import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    profession: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setForm({
        name: parsedUser.name || '',
        profession: parsedUser.profession || '',
        location: parsedUser.location || '',
        bio: parsedUser.bio || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  if (!user) return <div className="text-center mt-10">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left: Avatar */}
          <div className="md:w-1/3 bg-indigo-600 text-white flex flex-col items-center justify-center p-8">
            <div className="w-32 h-32 bg-white text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{user.name || 'Unnamed'}</h2>
            <p className="text-sm opacity-80 mt-1">{user.profession || 'No Profession'}</p>
            <p className="text-sm opacity-80">{user.location || 'No Location'}</p>
          </div>

          {/* Right: Profile Info */}
          <div className="md:w-2/3 p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
            <div className="space-y-2">
              <div><strong>Email:</strong> <span className="text-gray-700">{user.email}</span></div>
              <div><strong>Profession:</strong> <span className="text-gray-700">{user.profession || 'N/A'}</span></div>
              <div><strong>Location:</strong> <span className="text-gray-700">{user.location || 'N/A'}</span></div>
              <div><strong>Bio:</strong> <p className="text-gray-700 mt-1">{user.bio || 'No bio provided'}</p></div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-lg p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Edit Your Profile</h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={form.profession}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
            <textarea
              name="bio"
              rows="4"
              placeholder="Your bio..."
              value={form.bio}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
