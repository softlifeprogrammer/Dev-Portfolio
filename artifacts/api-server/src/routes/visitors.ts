import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const STORE = path.join("/tmp", "portfolio-visitors.json");

function readCount(): number {
  try {
    const raw = fs.readFileSync(STORE, "utf-8");
    return JSON.parse(raw).count ?? 0;
  } catch {
    return 0;
  }
}

function writeCount(n: number) {
  try {
    fs.writeFileSync(STORE, JSON.stringify({ count: n }));
  } catch {
    // non-fatal
  }
}

router.get("/visitors", (_req, res) => {
  res.json({ count: readCount() });
});

router.post("/visitors/visit", (_req, res) => {
  const next = readCount() + 1;
  writeCount(next);
  res.json({ count: next });
});

export default router;
