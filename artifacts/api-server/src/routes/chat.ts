import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Ray-shaun's portfolio assistant — a friendly, concise AI that helps visitors learn about Ray-shaun Adokwei Mensah. Answer questions using only the information below. If a question is outside this scope, politely say you can only discuss Ray-shaun's professional background.

Keep answers short (2-4 sentences unless more detail is clearly needed). Be warm and direct. Use plain text — no markdown bold/italic/headers in your responses.

--- ABOUT ---
Full name: Ray-shaun Adokwei Mensah
Role: Systems Engineer and Full-Stack Developer
Based in: UK
Tagline: "I build systems that scale and interfaces that delight."
Bio: Passionate about backend architecture, data analysis, and creating clean, performant web experiences. Focused on writing maintainable code and delivering real value through technology.

--- SKILLS ---
Programming Languages: Python, TypeScript, JavaScript, SQL
Frontend: React, Next.js, Tailwind CSS, Vite
Backend: Node.js, Express, FastAPI, REST APIs
Databases: PostgreSQL, SQLite, Drizzle ORM
Data & Analytics: Power BI, Pandas, data pipelines, Excel automation
Tools & DevOps: Git, Docker, Linux, CI/CD, pnpm workspaces
Other: OpenAPI, Zod, React Query, Framer Motion

--- PROJECTS ---
1. Portfolio Website — The very site you're on. Built with React, Vite, Tailwind v4, Framer Motion, and a Node/Express API. Features visitor counter, chatbot, dark/light mode, and animated UI.
2. Data Dashboard — Power BI dashboard with automated Python pipelines for business reporting and KPI tracking.
3. Task Management API — RESTful API built with FastAPI and PostgreSQL, featuring JWT auth, role-based access control, and comprehensive OpenAPI docs.
4. Web Scraper & Analyser — Python tool using BeautifulSoup and Pandas for extracting, cleaning, and analysing large datasets with visualisations.

--- EXPERIENCE & EDUCATION ---
Ray-shaun has hands-on experience in systems engineering, full-stack web development, and data analytics. He has worked on backend API design, database schema design, frontend architecture, and Power BI reporting. He holds a degree in a computing/engineering discipline.

--- CONTACT ---
Visitors can contact Ray-shaun via the Contact section on this portfolio (scroll down or click "Contact" in the nav). He is open to freelance work, full-time roles, and collaboration on interesting projects.

--- CV ---
Ray-shaun's CV is available to download directly from the portfolio — look for the "Download CV" button in the hero section.

--- LINKS ---
GitHub: available via the portfolio's social links
LinkedIn: available via the portfolio's social links`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

router.post("/chat", async (req, res) => {
  const { messages } = req.body as { messages: Message[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array required" });
    return;
  }

  const sanitised: Message[] = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-10)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 512,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitised],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: unknown) {
    req.log.error(err, "chat stream error");
    const isQuota =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "insufficient_quota";
    const message = isQuota
      ? "The chatbot is temporarily unavailable (API quota exceeded). To reach Ray-shaun directly, scroll down to the Contact section."
      : "Something went wrong. Please try again in a moment.";
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    res.end();
  }
});

export default router;
