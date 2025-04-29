import express from "express";
import cors from "cors"; // ✅ CORS import 추가
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();

const app = express(); // ✅ express 앱 인스턴스
app.use(cors());       // ✅ 모든 출처 허용 (개발용)
app.use(express.json());
app.use("/airdrop", router); // ✅ 라우터 연결

const { SLACK_CHANNEL_ID, SLACK_TOKEN, SLACK_WEBHOOK } = process.env;

const MAX_AIRDROP = 20000000;
const CLAIM_PER_USER = 2000;
const RECORD_FILE = "./claimed_addresses.json";

function loadClaims() {
  try {
    const data = fs.readFileSync(RECORD_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveClaims(data) {
  fs.writeFileSync(RECORD_FILE, JSON.stringify(data, null, 2));
}

// ✅ 에어드롭 상태 확인 API
router.get("/status", (req, res) => {
  const claims = loadClaims();
  const totalClaimed = claims.length * CLAIM_PER_USER;
  const remaining = Math.max(0, MAX_AIRDROP - totalClaimed);
  const percent = Math.min(100, ((totalClaimed / MAX_AIRDROP) * 100).toFixed(1));

  res.json({ totalClaimed, remaining, max: MAX_AIRDROP, percent });
});

// 👀 중복 체크
router.post("/check", async (req, res) => {
  const { address } = req.body;
  if (!address || !address.startsWith("0x")) return res.status(400).send("Invalid address");

  try {
    const result = await fetch(
      `https://slack.com/api/conversations.history?channel=${SLACK_CHANNEL_ID}`,
      {
        headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
      }
    );
    const json = await result.json();
    const alreadySubmitted = json.messages?.some((msg) => msg.text.includes(address));
    res.json({ alreadySubmitted });
  } catch (err) {
    console.error("Slack check failed", err);
    res.status(500).send("Slack check error");
  }
});

// 📩 Webhook 전송 + 수량 제한 체크
router.post("/submit", async (req, res) => {
  const { address } = req.body;
  if (!address || !address.startsWith("0x")) return res.status(400).send("Invalid address");

  const claims = loadClaims();

  if (claims.includes(address)) {
    return res.status(403).json({ error: "Already claimed." });
  }

  const totalClaimed = claims.length * CLAIM_PER_USER;
  if (totalClaimed >= MAX_AIRDROP) {
    return res.status(403).json({ error: "Airdrop fully claimed." });
  }

  try {
    await fetch(SLACK_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `📥 New airdrop request: ${address}` }),
    });

    claims.push(address);
    saveClaims(claims);

    res.json({ ok: true, claimAmount: CLAIM_PER_USER });
  } catch (err) {
    console.error("Webhook failed", err);
    res.status(500).send("Webhook error");
  }
});

// ✅ 서버 실행
app.listen(4000, () => {
  console.log("✅ Airdrop server running at http://localhost:4000");
});

export default router;