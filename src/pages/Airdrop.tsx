import { useState, useEffect } from "react";

export default function Airdrop() {
  const [wallet, setWallet] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [airdropStatus, setAirdropStatus] = useState({
    totalClaimed: 0,
    remaining: 0,
    max: 0,
    percent: "0.00",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setStatusMessage("");
  console.log("✅ Submit Triggered!", wallet);  // ← 로그 찍기

  try {
    const res = await fetch("https://karenworldbackend1.vercel.app/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Submit failed");
    setStatusMessage(`🎉 Claimed ${data.amount} $KAREN!`);
  } catch (err: any) {
    console.error("❌ Submit error", err);
    setStatusMessage(`❌ ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetch("https://karenworldbackend1.vercel.app/api/status")
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Status API Data:", data);
        setAirdropStatus({
          totalClaimed: data.claimed,
          remaining: data.remaining,
          max: data.total,
          percent: data.percent,
        });
      })
      .catch((err) => console.error("❌ Failed to fetch airdrop status", err));
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: "url('/assets/villain5.png')" }}>
      <div className="bg-black bg-opacity-80 rounded-2xl p-6 w-full max-w-md text-white shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-4">🎁 Claim Your Airdrop</h1>

        <p className="text-center text-sm mb-4">
          🔔 <strong>Please share the airdrop on Twitter before submitting your wallet address!</strong>
        </p>

        <a
          href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20%24KAREN%20airdrop!%20%F0%9F%92%8E%20https%3A%2F%2Fkaren-world-clean.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-400 underline mb-4"
        >
          ✨ Tweet Now
        </a>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your Sui wallet address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg text-black font-semibold focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-bold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Submitting..." : "🚀 Submit for Airdrop"}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-center text-sm text-yellow-300">{statusMessage}</p>
        )}

        <div className="mt-6 text-center text-sm text-gray-300">
          Claimed: {airdropStatus.totalClaimed} / {airdropStatus.max} KAREN ({airdropStatus.percent}%)
          <br />
          Remaining: {airdropStatus.remaining} KAREN
        </div>
      </div>
    </div>
  );
}