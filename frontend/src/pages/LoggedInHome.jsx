// frontend/src/pages/LoggedInHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoggedInHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 px-6 py-12 flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Welcome Back! What would you like to do today?
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
       {/* ✅ Resume Score Checker Card */}
<motion.div
  whileHover={{ scale: 1.03, rotate: -1 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
  onClick={() => navigate('/resume-score')}
  className="cursor-pointer bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-8 flex flex-col items-start hover:shadow-2xl transition duration-300 hover:bg-white/40"
>
  <div className="text-5xl mb-4">📊</div>
  <h2 className="text-2xl font-bold text-gray-800 mb-2">Resume Score Checker</h2>
  <p className="text-gray-600 text-sm mb-4">
    Instantly analyze how well your resume matches a job description. Get insights on keywords, grammar, and more.
  </p>
  <span className="text-indigo-600 font-medium mt-auto">→ Start Scoring</span>
</motion.div>


        {/* Resume Builder */}
        <motion.div
          whileHover={{ scale: 1.03, rotate: 1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          onClick={() => navigate('/resume-builder')}
          className="cursor-pointer bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-8 flex flex-col items-start hover:shadow-2xl transition duration-300 hover:bg-white/40"
        >
          <div className="text-5xl mb-4">🧰</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Resume Builder</h2>
          <p className="text-gray-600 text-sm mb-4">
            Craft a stunning, professional resume using beautiful templates and AI-suggestions — export it in seconds.
          </p>
          <span className="text-pink-600 font-medium mt-auto">→ Build Resume</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LoggedInHome;
