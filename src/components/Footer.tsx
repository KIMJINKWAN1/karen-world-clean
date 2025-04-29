import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center text-sm px-4 py-8 text-white bg-black font-karen backdrop-blur-md mt-20 border-t border-yellow-300">
      <p className="text-lg text-yellow-300 font-bold tracking-wide">
        💬 Karen World © {new Date().getFullYear()}
      </p>
      <p className="mt-1 text-pink-400 italic">
        All complaints reserved. Seriously.
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-white/80">
        <a href="/KarenWorldWhitepaper" className="hover:text-yellow-300 transition">
          📄 Whitepaper
        </a>
        <a href="/tokenomics" className="hover:text-yellow-300 transition">
          💰 Tokenomics
        </a>
        <a href="/roadmap" className="hover:text-yellow-300 transition">
          🗺️ Roadmap
        </a>
        <a href="/about" className="hover:text-yellow-300 transition">
          👀 About
        </a>
      </div>
    </footer>
  );
};

export default Footer;