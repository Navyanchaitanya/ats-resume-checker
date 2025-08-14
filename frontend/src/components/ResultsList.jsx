// frontend/src/components/ResultsList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpellCheck,
  FaList,
  FaChartPie,
  FaBookOpen,
  FaAlignLeft,
} from 'react-icons/fa';

const ResultsList = ({ score }) => {
  if (!score) return null;

  const {
    similarity,
    readability,
    completeness,
    formatting,
    grammar_score,
    grammar_issues,
    matched_keywords,
    missing_keywords,
  } = score;

  const metricBlock = (icon, title, value, color) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`rounded-xl p-5 shadow bg-white/60 backdrop-blur-md border-l-4 ${color}`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-xl">{icon}</div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{title}</span>
          <span className="text-lg text-gray-700">{value}%</span>
        </div>
      </div>
    </motion.div>
  );

  const tag = (text, type) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'matched'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {text}
    </span>
  );

  return (
    <motion.div
      className="mt-10 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricBlock(<FaChartPie />, 'Similarity', similarity.toFixed(1), 'border-indigo-400')}
        {metricBlock(<FaBookOpen />, 'Readability', readability.toFixed(1), 'border-pink-400')}
        {metricBlock(<FaCheckCircle />, 'Completeness', completeness.toFixed(1), 'border-yellow-400')}
        {metricBlock(<FaAlignLeft />, 'Formatting', formatting.toFixed(1), 'border-blue-400')}
        {metricBlock(<FaSpellCheck />, 'Grammar', grammar_score.toFixed(1), 'border-rose-400')}
      </div>

      {/* Keyword Matches */}
      <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow border">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FaList /> Matched Keywords:
        </h3>
        <div className="flex flex-wrap gap-2">
          {matched_keywords.map((kw, i) => tag(kw, 'matched'))}
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow border">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FaTimesCircle /> Missing Keywords:
        </h3>
        <div className="flex flex-wrap gap-2">
          {missing_keywords.map((kw, i) => tag(kw, 'missing'))}
        </div>
      </div>

      {/* Grammar Issues */}
      <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow border">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaSpellCheck /> Grammar Issues:
        </h3>
        <div className="max-h-40 overflow-y-auto text-sm space-y-2 text-gray-700 px-1">
          {grammar_issues.length > 0 ? (
            grammar_issues.map((issue, i) => (
              <div
                key={i}
                className="flex items-start space-x-2 bg-red-50 border border-red-200 p-2 rounded-md"
              >
                <span className="text-red-500">⚠️</span>
                <span>{issue}</span>
              </div>
            ))
          ) : (
            <p className="text-green-700">✅ No grammar issues found!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsList;
