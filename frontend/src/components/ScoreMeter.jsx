import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const ScoreMeter = ({ score }) => {
  const percentage = score?.total || 0;

  return (
    <motion.div
      className="mt-10 mx-auto max-w-6xl px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
        
        {/* Left: Score Meter */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-5 text-indigo-900">🎯 Resume Match Score</h2>
          <div className="w-52 h-52 relative animate-glow">
            <CircularProgressbarWithChildren
              value={percentage}
              styles={buildStyles({
                pathColor: `rgba(34, 197, 94, ${percentage / 100})`,
                trailColor: "#e5e7eb",
              })}
            >
              <div className="text-3xl font-bold text-green-600 animate-pulse">
                {percentage}%
              </div>
              <div className="text-xs text-gray-600 mt-2">Overall Match</div>
            </CircularProgressbarWithChildren>
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-xl font-semibold text-gray-800">🔍 Score Breakdown</h3>
          <div className="space-y-2 text-gray-700 text-sm leading-6">
            <p><strong>Similarity:</strong> {score.similarity}%</p>
            <p><strong>Readability:</strong> {score.readability}%</p>
            <p><strong>Completeness:</strong> {score.completeness}%</p>
            <p><strong>Formatting:</strong> {score.formatting}%</p>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 flex items-center gap-1 mb-2 mt-4">
              <CheckCircleIcon className="w-5 h-5" />
              Matched Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {score.matched_keywords.map((kw, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm shadow-sm transition"
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-red-700 flex items-center gap-1 mt-4 mb-2">
              <XCircleIcon className="w-5 h-5" />
              Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {score.missing_keywords.map((kw, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm shadow-sm transition"
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScoreMeter;
