import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function KarenWorldWhitepaper () {
  const sections = [
    {
      title: "🌎 What is Karen World?",
      content:
        "Karen World is a meme-driven blockchain movement led by the most vocal character in pop culture — Karen. It’s a platform for humor, rebellion, and tokenized complaints.",
    },
    {
      title: "🎯 Token Utility",
      content:
        "$KAREN is not just for laughs. It fuels access to community voting (DAO), meme contests, staking rewards, and unlocks NFTs & merchandise.",
    },
    {
      title: "📊 Token Distribution",
      content: `• Team: 35% (3-month lock, 25% quarterly vesting)\n• Liquidity: 25%\n• Marketing & Partnerships: 20%\n• DAO Community Treasury: 10%\n• Airdrop & Rewards: 10%`,
    },
    {
      title: "🔥 Burn Policy",
      content:
        "Every $KAREN transaction burns 1.5% on sale, 0.5% on mint. A self-deflationary model — the more you complain, the more we burn.",
    },
    {
      title: "🗳 Governance & Vision",
      content:
        "$KAREN holders can propose and vote on community decisions. From meme proposals to treasury allocation — no manager needed.",
    },
  ];

  return (
    <div className="bg-[url('./assets/karen-bg-pattern.png')] bg-cover bg-center min-h-screen text-white font-karen">
      <Header />

      <main className="px-6 py-24">
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-yellow-300 mb-12 drop-shadow">
          📖 Karen World Litepaper
        </h1>

        <div className="max-w-4xl mx-auto space-y-10">
          {sections.map((sec, i) => (
            <div
              key={i}
              className="bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-xl border-l-4 border-yellow-400"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-2">
                {sec.title}
              </h2>
              <p className="whitespace-pre-line text-lg sm:text-xl leading-relaxed text-white/90">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
