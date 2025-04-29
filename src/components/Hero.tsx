import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/assets/karen-hero.png')" }} // ✅ public 기준 절대경로
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl animate-pulse"
      >
        Can I speak to your Web3 Manager?
      </motion.h1>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <Link
          to="/airdrop"
          className="bg-yellow-400 text-black text-xl px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition font-karen animate-bounce"
        >
          🚀 JOIN AIRDROP
        </Link>

        <Link
          to="/tokenomics"
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xl px-6 py-3 rounded-full shadow-lg hover:scale-105 transition font-karen"
        >
          📊 TOKENOMICS
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;