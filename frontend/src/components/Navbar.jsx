// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
        ATS Resume Checker
      </Link>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/profile" className="text-gray-700 hover:text-indigo-600 font-medium">
              Profile
            </Link>
            <Link
  to={token ? "/home" : "/"}
  className="text-gray-700 hover:text-indigo-600 font-medium"
>
  Home
</Link>

            <button
              onClick={handleLogoutClick}
              className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-indigo-500 text-white px-4 py-1.5 rounded hover:bg-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
