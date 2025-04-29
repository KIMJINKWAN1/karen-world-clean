import React from "react";
import { motion } from "framer-motion";

const MemePhilosophy = () => {
  return (
    <section className="bg-black text-white py-24 px-4 sm:px-8 lg:px-16 text-center relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-karen text-yellow-400 mb-6 z-10 relative"
      >
        MEME PHILOSOPHY
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 z-10 relative"
      >
        "It takes courage from villains to change the world."
      </motion.p>

      {/* 배경 장식 이모지 효과 */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10">
        <img
          src="/assets/karen-approved.png"
          alt="Karen Approved"
          className="w-48 animate-pulse"
        />
      </div>
    </section>
  );
};

export default MemePhilosophy;