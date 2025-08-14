// frontend/src/components/ResumeScore.jsx

import React, { useState } from 'react';
import ScoreMeter from './ScoreMeter';
import ResultsList from './ResultsList';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeScore = ({ token }) => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription) return;

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setScore(data.score);
        setFilename(data.filename);
      } else {
        alert('❌ ' + data.error);
      }
    } catch (error) {
      alert('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: Input Panel */}
        <motion.div
          className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">📤 Analyze Your Resume</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Upload Resume (PDF only)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full border px-4 py-2 rounded-lg shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Paste Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-40 border px-4 py-2 rounded-lg shadow-sm"
                placeholder="Paste the job description here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow-md transition"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
        </motion.div>

        {/* RIGHT: Results Panel */}
        <AnimatePresence>
          {score && (
            <motion.div
              className="flex-1 bg-white rounded-xl shadow-xl p-6 border border-gray-200"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                ✅ Results for: <span className="text-indigo-700">{filename}</span>
              </h3>

              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                >
                  {score && (
  <>
    <ScoreMeter score={score} />
    
  </>
)}

                </motion.div>
              </div>

              <ResultsList score={score} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeScore;
