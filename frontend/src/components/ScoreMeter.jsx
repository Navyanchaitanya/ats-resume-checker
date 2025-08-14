// frontend/src/components/ScoreMeter.jsx
import React from "react";
import { motion } from "framer-motion";

const ScoreMeter = ({ score }) => {
  const rawTotal = score?.total;
  const total = typeof rawTotal === "number" && !isNaN(rawTotal)
    ? rawTotal.toFixed(1)
    : 0;

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const percentage = Math.min(total, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="w-full flex justify-center items-center mt-10 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-[150px] h-[150px]">
        <svg height="150" width="150">
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="75"
            cy="75"
          />
          <motion.circle
            stroke="#4f46e5"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx="75"
            cy="75"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <div className="text-4xl font-bold text-indigo-700">{total}%</div>
          <div className="text-xs font-semibold text-gray-600">Total Score</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreMeter;
