import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <motion.div
      className="text-center py-20 px-6 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
        Optimize Your Resume with AI
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Upload your resume and job description to get an instant score and improvement tips using AI.
      </p>
      <Link
        to="/home"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </motion.div>
  );
};

export default Landing;
