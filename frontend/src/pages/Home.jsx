import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import ScoreMeter from '../components/ScoreMeter';
import { motion } from 'framer-motion';

const Home = () => {
  const [score, setScore] = useState(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-gray-800 bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      
      {/* Sidebar Left */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="md:w-[40%] w-full bg-white/50 backdrop-blur-lg p-6 md:p-10 shadow-2xl border-r border-white/30"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-2 tracking-tight">
            🔍 Resume Analyzer
          </h1>
          <p className="text-sm text-gray-600">Optimize your resume for the job you want.</p>
        </div>

        <UploadForm onScoreReceived={setScore} />

        <div className="mt-10 text-xs text-gray-500 text-center">
          ✨ Build By Navyan💡
        </div>
      </motion.div>

      {/* Main Content Right */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        {score ? (
          <ScoreMeter score={score} />
        ) : (
          <motion.div
            className="text-center max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
              Upload a Resume & JD to Get Started
            </h2>
            <p className="text-gray-600">
              Your smart resume analyzer will break down score, similarity, and important keywords.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
