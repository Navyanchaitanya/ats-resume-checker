import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ResultsList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/results')
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <motion.div
      className="max-w-3xl w-full bg-white/50 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl mt-12 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-xl font-semibold mb-6 text-center text-blue-800">Previous Resume Checks</h3>

      <div className="space-y-4 max-h-72 overflow-y-auto px-2">
        {results.length === 0 ? (
          <p className="text-gray-500 text-center">No previous results yet.</p>
        ) : (
          results.map((r, index) => (
            <motion.div
              key={r.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/80 border shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-sm font-medium text-gray-700 truncate">{r.filename}</span>
              <span className={`text-md font-semibold ${
                r.score.total >= 0.8 ? 'text-green-600' : r.score.total >= 0.5 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {Math.round(r.score.total * 100)}%
              </span>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ResultsList;
