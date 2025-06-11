import { useState } from "react";

export default function AirdropTestPage() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");

  const handleAirdrop = async () => {
    try {
      const res = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const text = await res.text(); // JSON이 아닐 경우 대비
      try {
        const json = JSON.parse(text);
        setResult(JSON.stringify(json, null, 2));
      } catch (e) {
        setResult(text); // HTML 에러 페이지 등
      }
    } catch (err) {
      setResult("❌ 요청 실패: " + err);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Airdrop API 테스트</h1>
      <input
        type="text"
        placeholder="0x 지갑 주소 입력"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleAirdrop}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        에어드랍 요청
      </button>
      <pre className="mt-6 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
        {result}
      </pre>
    </main>
  );
}
