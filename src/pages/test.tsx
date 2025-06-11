// src/pages/test.tsx

import { useState } from 'react';

export default function AirdropTestPage() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAirdrop = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/airdrop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResult(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>🪂 Airdrop API Test</h1>
      <input
        style={{ width: 400, padding: 8, fontSize: 16 }}
        type="text"
        placeholder="Sui wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <button
        style={{ marginTop: 16, padding: '8px 16px', fontSize: 16 }}
        onClick={handleAirdrop}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Submit to /api/airdrop'}
      </button>
      {result && (
        <pre
          style={{
            marginTop: 24,
            background: '#eee',
            padding: 16,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxWidth: 600,
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}

