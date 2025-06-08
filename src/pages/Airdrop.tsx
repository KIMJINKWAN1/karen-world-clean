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

    if (!/^0x[a-fA-F0-9]{40,64}$/.test(wallet)) {
      setStatusMessage("❗ Invalid wallet address format.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("❌ Invalid JSON response from server.");
      }

      if (!res.ok) {
        throw new Error(data?.error || "❌ Submit failed");
      }

      setStatusMessage(`✅ Claimed ${data.amount ?? "some"} $KAREN!`);
      setWallet("");
    } catch (err: any) {
      console.error("❌ Submit error:", err);
      setStatusMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (!wallet) {
      setStatusMessage("❗ Please enter your wallet address.");
      return;
    }

    if (!/^0x[a-fA-F0-9]{40,64}$/.test(wallet)) {
      setStatusMessage("❗ Invalid wallet address format.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch(`/api/status?address=${wallet}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Status check failed");

      if (data.claimed) {
        setStatusMessage(`✅ This wallet already claimed ${data.amount} $KAREN.`);
      } else {
        setStatusMessage("⛔ You haven't claimed yet.");
      }
    } catch (err: any) {
      console.error("❌ Status check error", err);
      setStatusMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetch("/api/status")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/villain5.png')" }}
    >
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
            placeholder="0x..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg text-black font-semibold focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-bold transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Submitting..." : "🚀 Submit for Airdrop"}
          </button>

          <button
            type="button"
            onClick={checkStatus}
            disabled={loading}
            className={`w-full py-2 rounded-lg font-bold transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            {loading ? "Checking..." : "🔍 Check Claim Status"}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-center text-sm text-yellow-300">{statusMessage}</p>
        )}

        {airdropStatus.max > 0 && (
          <div className="mt-6 text-center text-sm text-gray-300">
            Claimed: {airdropStatus.totalClaimed.toLocaleString()} / {airdropStatus.max.toLocaleString()} KAREN ({airdropStatus.percent}%)
            <br />
            Remaining: {airdropStatus.remaining.toLocaleString()} KAREN
          </div>
        )}
      </div>
    </div>
  );
}




