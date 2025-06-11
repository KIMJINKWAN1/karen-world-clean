// src/pages/test-airdrop.tsx
import { useState } from "react";

export default function TestAirdrop() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAirdrop = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://karenworldbackend1.vercel.app/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Airdrop failed");

      setResult(`✅ Airdrop success: ${data.amount || "?"} $KAREN`);
    } catch (err: any) {
      console.error(err);
      setResult(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">🧪 Airdrop API Test</h1>
      <input
        type="text"
        placeholder="0x wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full max-w-md p-2 rounded text-black"
      />
      <button
        onClick={handleAirdrop}
        disabled={loading}
        className={`mt-4 px-4 py-2 rounded ${
          loading ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Sending..." : "🚀 Trigger Airdrop"}
      </button>
      {result && <p className="mt-4 text-yellow-300">{result}</p>}
    </div>
  );
}


