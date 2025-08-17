import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UploadForm = ({ onScoreReceived }) => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jd.trim()) {
      alert("Please provide both resume and job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jd);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/analyze", formData);
      onScoreReceived(res.data.score);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div>
        <label className="block font-semibold">Resume File</label>
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          className="border rounded w-full px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Job Description</label>
        <textarea
    value={jd}
    onChange={(e) => setJd(e.target.value)}
    rows="15"
    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-sm resize-none"
    placeholder="Paste job description here..."
  />
</div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        type="submit"
        disabled={loading}
        className={`w-full text-white py-2 rounded transition duration-300 ease-in-out ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "🎯 Get My Score"}
      </motion.button>
    </motion.form>
  );
};

export default UploadForm;
