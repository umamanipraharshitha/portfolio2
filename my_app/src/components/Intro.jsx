// Intro.jsx - CLEAN Hexagon + P + Nodes (your original good one)
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./intro.css";

export default function Intro({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 3300); // +0.5s duration
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <motion.div
      className="intro-wrapper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg className="intro-mark" viewBox="0 0 240 280" fill="none">
        {/* Hexagon frame */}
        <motion.path
          d="M120 60 L170 90 L170 150 L120 180 L70 150 L70 90 Z"
          stroke="url(#grad)"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* PERFECT P - static crisp text */}
        <motion.text
          x="120"
          y="135"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="48"
          fontWeight="700"
          fill="url(#grad)"
          textAnchor="middle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          P
        </motion.text>

        {/* 3 Tech nodes */}
        <motion.circle
          cx="90"
          cy="95"
          r="6"
          fill="#5be7ff"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 1.8, duration: 0.4 }}
        />
        <motion.circle
          cx="170"
          cy="95"
          r="6"
          fill="#00eaff"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 1.9, duration: 0.4 }}
        />
        <motion.circle
          cx="130"
          cy="175"
          r="6"
          fill="#7af5ff"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 2.0, duration: 0.4 }}
        />

        <defs>
          <linearGradient id="grad" x1="70%" y1="20%" x2="30%" y2="80%">
            <stop offset="0%" stopColor="#5be7ff" />
            <stop offset="50%" stopColor="#00eaff" />
            <stop offset="100%" stopColor="#7af5ff" />
          </linearGradient>
        </defs>
      </svg>

      <motion.span
        className="intro-label"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.4 }}
      >
        Portfolio
      </motion.span>
    </motion.div>
  );
}
