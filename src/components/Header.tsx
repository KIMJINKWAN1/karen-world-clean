import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-sm z-50 px-6 py-4 flex justify-between items-center">
      {/* ✅ 클릭 시 홈으로 이동 */}
      <Link
        to="/"
        className="text-yellow-300 font-karen text-2xl hover:text-yellow-400 transition"
      >
        Karen World
      </Link>

      <nav className="flex gap-4 items-center text-white text-lg">
        <Link to="/about">About</Link>
        <Link to="/roadmap">Roadmap</Link>
        <Link to="/tokenomics">Tokenomics</Link>
        <Link to="/KarenWorldWhitepaper">KarenWorldWhitepaper</Link>
        <Link
          to="/airdrop"
          className="bg-yellow-300 px-4 py-1 rounded-full text-black hover:scale-105"
        >
          Claim
        </Link>
        {/* 🌙 다크모드 토글 */}
        <button
          onClick={toggleDarkMode}
          className="ml-2 px-2 py-1 rounded-full border border-white/40 text-white text-sm hover:bg-white/10 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header;