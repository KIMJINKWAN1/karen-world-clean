import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Roadmap() {
  const steps = [
    {
      title: "📦 Phase 1: Birth of Karen",
      desc: "Launch $KAREN token, build core community, go viral with memes."
    },
    {
      title: "🚀 Phase 2: Rise of Rage",
      desc: "Begin selective airdrops, partnerships with meme influencers, and massive shitposting campaigns."
    },
    {
      title: "👠 Phase 3: Retail Rampage",
      desc: "NFT drops, staking, community DAO voting and 'Karen IRL' merch drops."
    },
    {
      title: "🌕 Phase 4: Full Moon Fury",
      desc: "Karen conquers CEX listings, enters top 500 coins, builds mobile game featuring angry voice commands."
    }
  ];

  return (
    <div className="bg-[url('./assets/karen-bg-pattern.png')] bg-cover bg-center min-h-screen text-white font-karen">
      <Header />

      <main className="px-6 py-24">
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-yellow-300 mb-12 drop-shadow">
          🔮 Karen World Roadmap
        </h1>

        <div className="max-w-4xl mx-auto space-y-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-xl border border-yellow-300 hover:scale-[1.02] transition"
            >
              <h2 className="text-2xl sm:text-3xl text-pink-400 font-bold mb-2">{step.title}</h2>
              <p className="text-white/90 text-lg sm:text-xl leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
