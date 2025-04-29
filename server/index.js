import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import airdropRouter from "./airdrop-server.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 💡 모든 /airdrop 요청은 airdropRouter로 이동
app.use("/airdrop", airdropRouter);

// 서버 실행
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Airdrop backend running at http://localhost:${PORT}`);
});