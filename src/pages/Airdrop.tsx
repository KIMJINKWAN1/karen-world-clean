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

    try {
      const res = await fetch("https://karenworldbackend1.vercel.app/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage(`✅ Airdrop completed! ${data.amount} $KAREN sent.`);
      } else {
        setStatusMessage(`❌ ${data.error || "An error occurred."}`);
      }
    } catch (err) {
      console.error("❌ Failed to submit wallet", err);
      setStatusMessage("⚠️ Server error. Please try again.");
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
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🚀 $KAREN Airdrop</h1>

      {/* ✅ Twitter notice */}
      <p className="text-sm text-center text-gray-600 mb-4">
        📢 Please share the airdrop on Twitter before submitting!
        <br />
        <a
          href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20%24KAREN%20airdrop!%20%F0%9F%92%8E%20https%3A%2F%2Fkaren-world-clean.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Tweet Now
        </a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-bold py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "✅ Submit for Airdrop"}
        </button>
      </form>

      {statusMessage && (
        <p className="mt-4 text-center text-sm text-red-600">{statusMessage}</p>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        Claimed: {airdropStatus.totalClaimed} / {airdropStatus.max} KAREN (
        {airdropStatus.percent}%)
        <br />
        Remaining: {airdropStatus.remaining} KAREN
      </div>
    </div>
  );
}