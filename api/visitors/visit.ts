import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const STORE = join("/tmp", "portfolio-visitors.json");

function readCount(): number {
  try {
    return (JSON.parse(readFileSync(STORE, "utf-8")) as { count?: number }).count ?? 0;
  } catch {
    return 0;
  }
}

function writeCount(n: number) {
  try {
    writeFileSync(STORE, JSON.stringify({ count: n }));
  } catch {
    // non-fatal
  }
}

export default function handler(
  req: { method?: string },
  res: {
    status: (code: number) => { json: (d: unknown) => void };
    json: (d: unknown) => void;
    setHeader: (name: string, value: string) => void;
  },
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "GET") {
    return res.json({ count: readCount() });
  }
  if (req.method === "POST") {
    const next = readCount() + 1;
    writeCount(next);
    return res.json({ count: next });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
