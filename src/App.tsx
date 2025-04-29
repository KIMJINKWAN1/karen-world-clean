import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Airdrop from "./pages/Airdrop";
import Tokenomics from "./pages/Tokenomics";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import KarenWorldWhitepaper from "./pages/KarenWorldWhitepaper";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header"; // ✅ 추가

import "./App.css";

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark font-karen" : "font-karen"}>
        <Router>
        <Header /> {/* ✅ 여기 추가 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/about" element={<About />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/KarenWorldWhitepaper" element={<KarenWorldWhitepaper />} />
            <Route path="/admin" element={<AdminDashboard />} /> {/* ✅ 관리자 페이지 */}
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;