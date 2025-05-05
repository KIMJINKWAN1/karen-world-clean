import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SLACK_WEBHOOK_URL = process.env.REACT_APP_SLACK_WEBHOOK_URL || "";
const SLACK_CHANNEL_URL = process.env.REACT_APP_SLACK_CHANNEL_URL || "";
const SLACK_TOKEN = process.env.REACT_APP_SLACK_TOKEN || ""; // For checking duplicates (in server-side ideally)

const Airdrop = () => {
  const [address, setAddress] = useState("");
  const [shared, setShared] = useState(false);
  const [airdropStatus, setAirdropStatus] = useState({ totalClaimed: 0, remaining: 0, max: 0, percent: 0 });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/status`)
      .then((res) => res.json())
      .then(setAirdropStatus)
      .catch((err) => console.error("❌ Failed to fetch airdrop status", err));
  }, []);

  const checkIfSubmittedOnSlack = async (walletAddress: string): Promise<boolean> => {
    try {
      const res = await fetch(SLACK_CHANNEL_URL, {
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`,
        },
      });
      const json = await res.json();
      return json.messages.some((msg: any) => msg.text.includes(walletAddress));
    } catch (err) {
      console.error("Slack check failed:", err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!/^0x[a-fA-F0-9]{40,64}$/.test(address)) {
    toast.error("Please enter a valid wallet address!");
    return;
  }

  if (!shared) {
    toast.error("Please share on Twitter before claiming!");
    return;
  }

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Something went wrong");
      return;
    }

    toast.success("🎉 Airdrop request submitted!");
    setAddress("");
    setShared(false);

    const updated = await fetch(`${process.env.REACT_APP_API_URL}/api/status`).then((res) => res.json());
    setAirdropStatus(updated);
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }
};

  const handleTweet = () => {
    const tweetText = encodeURIComponent(
      "I just claimed my $KAREN airdrop! Join the rebellion 💅 #KarenCoin #Airdrop"
    );
    const tweetURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetURL, "_blank");
    setShared(true);
  };

  return (
    <div className="bg-[url('./assets/karen-bg-pattern.png')] bg-cover bg-center min-h-screen flex items-center justify-center px-4 py-16 text-white font-karen">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-black/70 p-10 rounded-2xl shadow-2xl backdrop-blur-sm"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-400 mb-6 text-center">
          🚨 Claim Your Airdrop
        </h1>

        <p className="text-base sm:text-lg text-pink-100 mb-4 text-center">
          Claimed: {airdropStatus.totalClaimed.toLocaleString()} / {airdropStatus.max.toLocaleString()} KAREN ({airdropStatus.percent}%)
          <br />
          Remaining: {airdropStatus.remaining.toLocaleString()} KAREN
        </p>

        <p className="text-base sm:text-lg text-pink-100 mb-6 text-center">
          One wallet. One chance. One Karen. Enter your Sui wallet address below and let the airdrop magic begin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
  {!shared && (
    <p className="text-sm text-red-400 text-center">
      🐦 Please share the tweet first to unlock airdrop submission 💬
    </p>
  )}
  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="0x... (Your Sui Wallet Address)"
    className="w-full p-4 rounded-xl bg-white/10 border border-pink-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
  <button
    type="submit"
    disabled={!shared}
    className={`w-full text-white text-lg py-3 rounded-xl transition-all ${shared ? "bg-pink-500 hover:bg-pink-600" : "bg-pink-900 cursor-not-allowed"}`}
  >
    🎁 Submit
  </button>
</form>

        <button
          onClick={handleTweet}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 rounded-xl transition-all"
        >
          🐦 Share on Twitter
        </button>
      </motion.div>
    </div>
  );
};

export default Airdrop;
