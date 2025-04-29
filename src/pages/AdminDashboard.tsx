import React, { useEffect, useState } from "react";

type SlackMessage = {
  ts: string;
  text: string;
};

const MAX_AIRDROP = 20000000;
const CLAIM_PER_USER = 2000;

export default function AdminDashboard() {
  const [logs, setLogs] = useState<SlackMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "karenisqueen";
  const SLACK_CHANNEL_ID = "C08PFBRD7D0";

  const fetchSlackLogs = async () => {
    try {
      const res = await fetch("https://slack.com/api/conversations.history?channel=" + SLACK_CHANNEL_ID, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SLACK_TOKEN}`,
        },
      });
      const json = await res.json();
      const filtered = json.messages?.filter((msg: any) =>
        msg.text?.includes("airdrop request")
      ) as SlackMessage[];
      setLogs(filtered || []);
    } catch (err) {
      console.error("Slack fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchSlackLogs();
    } else {
      alert("Wrong password");
    }
  };

  const downloadCSV = () => {
    const header = "timestamp,message\n";
    const body = logs.map(log => {
      const time = new Date(parseFloat(log.ts) * 1000).toLocaleString();
      const clean = log.text.replace(/\n/g, " ").replace(/,/g, " "); // CSV-safe
      return `${time},"${clean}"`;
    }).join("\n");

    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "airdrop_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-black/70 p-8 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">🔒 Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:bg-yellow-300"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-300">🛠 Admin Airdrop Dashboard</h1>
        <button
          onClick={downloadCSV}
          className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300"
        >
          📥 Export CSV
        </button>
      </div>

      <p className="text-yellow-200 mb-4">
        Claimed: {logs.length * CLAIM_PER_USER} / {MAX_AIRDROP} KAREN
      </p>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <table className="w-full table-auto border border-yellow-300">
          <thead>
            <tr className="bg-yellow-300 text-black">
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx} className="border-t border-yellow-300">
                <td className="px-4 py-2 text-yellow-100">
                  {new Date(parseFloat(log.ts) * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-white">{log.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}