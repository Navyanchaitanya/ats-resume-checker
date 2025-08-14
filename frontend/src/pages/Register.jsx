import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    location: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <input name="name" onChange={handleChange} value={formData.name} placeholder="Name" className="input" required />
        <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" className="input" required />
        <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" className="input" required />
        <input name="profession" onChange={handleChange} value={formData.profession} placeholder="Profession" className="input" />
        <input name="location" onChange={handleChange} value={formData.location} placeholder="Location" className="input" />
        <textarea name="bio" onChange={handleChange} value={formData.bio} placeholder="Short Bio" className="input" rows={3}></textarea>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}

export default Register;
