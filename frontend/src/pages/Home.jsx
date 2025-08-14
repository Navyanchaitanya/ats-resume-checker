// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-20 text-center bg-gradient-to-br from-indigo-50 to-white min-h-[80vh]">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-indigo-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Build. Analyze. Improve. Land Your Dream Job.
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Our AI-powered ATS Resume Checker helps you tailor your resume to job descriptions using similarity scoring, keyword matching, grammar feedback, and more.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-lg shadow-lg transition"
        >
          Get Started Free
        </Link>
      </motion.div>
    </main>
  );
};

export default Home;
