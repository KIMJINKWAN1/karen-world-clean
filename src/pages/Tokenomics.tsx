import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Team (Founder)", value: 35 },
  { name: "Liquidity Pool", value: 25 },
  { name: "Marketing & Partnerships", value: 20 },
  { name: "Community (DAO Treasury)", value: 10 },
  { name: "Selective Airdrop / Reward Pool", value: 10 },
];

const COLORS = ["#FFB800", "#F77272", "#62D3D6", "#A689E1", "#FF69B4"];

const Tokenomics = () => {
  return (
    <div className="bg-[url('./assets/karen-bg-pattern.png')] bg-cover bg-fixed min-h-screen text-white font-karen">
      <Header />

      <main className="py-24 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-10 text-yellow-300 drop-shadow text-center">
          💰 Karen Tokenomics
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="/assets/tokenomics.png"
            alt="Karen Tokenomics Chart"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:scale-105 transition duration-300"
          />

          <div className="w-full max-w-md mx-auto">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="overflow-x-auto max-w-4xl mx-auto mt-14">
          <table className="w-full text-left bg-black/60 rounded-xl shadow-xl border border-yellow-300">
            <thead>
              <tr className="text-yellow-300 text-lg">
                <th className="px-4 py-3 border-b border-yellow-300">Category</th>
                <th className="px-4 py-3 border-b border-yellow-300">Share</th>
                <th className="px-4 py-3 border-b border-yellow-300">Amount</th>
                <th className="px-4 py-3 border-b border-yellow-300">Notes</th>
              </tr>
            </thead>
            <tbody className="text-white text-base">
              <tr>
                <td className="px-4 py-3 border-b">Team (Founder)</td>
                <td className="px-4 py-3 border-b">35%</td>
                <td className="px-4 py-3 border-b">147,241,500</td>
                <td className="px-4 py-3 border-b">6-month lockup, quarterly 25% release</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b">Liquidity Pool</td>
                <td className="px-4 py-3 border-b">25%</td>
                <td className="px-4 py-3 border-b">105,172,500</td>
                <td className="px-4 py-3 border-b">DEX liquidity provisioning</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b">Marketing & Partnerships</td>
                <td className="px-4 py-3 border-b">20%</td>
                <td className="px-4 py-3 border-b">84,138,000</td>
                <td className="px-4 py-3 border-b">Influencers, events</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b">Community (DAO Treasury)</td>
                <td className="px-4 py-3 border-b">10%</td>
                <td className="px-4 py-3 border-b">42,069,000</td>
                <td className="px-4 py-3 border-b">Rewards, governance</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Selective Airdrop / Reward Pool</td>
                <td className="px-4 py-3">10%</td>
                <td className="px-4 py-3">42,069,000</td>
                <td className="px-4 py-3">Conditional rewards (e.g. NFTs, contribution)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-yellow-100 text-lg bg-black/70 p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">🔥 Burn Policy</h2>
          <ul className="list-disc list-inside leading-relaxed">
            <li>1.5% auto-burn on sale</li>
            <li>0.5% auto-burn on mint</li>
            <li>Total supply gradually decreases (deflationary model)</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tokenomics;