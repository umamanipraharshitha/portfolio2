require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const axios = require("axios");
const pdfParseLib = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

/* ================= PDF PARSE FIX ================= */
const pdfParse =
  typeof pdfParseLib === "function"
    ? pdfParseLib
    : pdfParseLib.default || pdfParseLib.pdfParse;

/* ================= CONFIG ================= */
const PORT = 5000;
const RESUME_PATH =
  "C:/Users/mprah/reactfolio/new/my_app/public/resume.pdf";

const LINKEDIN_CONTENT = "LinkedIn summary: ...";

/* ================= APP SETUP ================= */
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ================= CACHES ================= */
let cachedResumeText = null;
let cachedGithubContext = null;

/* ================= READ RESUME (CACHED) ================= */
async function getResumeText() {
  if (cachedResumeText) return cachedResumeText;

  const buffer = await fs.readFile(RESUME_PATH);
  const data = await pdfParse(buffer);

  cachedResumeText = data.text;
  return cachedResumeText;
}

/* ================= FETCH GITHUB + README (CACHED) ================= */
async function fetchGithubWithReadme(username) {
  if (cachedGithubContext) return cachedGithubContext;

  try {
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=50`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const repos = reposRes.data;
    if (!repos || repos.length === 0) {
      return "No GitHub repositories found.";
    }

    let context = "";
    const MAX_README_CHARS = 1500;

    for (const repo of repos) {
      let readmeText = "README not available.";

      try {
        const readmeRes = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/readme`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
          }
        );

        readmeText = Buffer.from(
          readmeRes.data.content,
          "base64"
        ).toString("utf-8");

        readmeText = readmeText.slice(0, MAX_README_CHARS);
      } catch (_) {}

      context += `
PROJECT: ${repo.name}
DESCRIPTION: ${repo.description || "No description"}
PRIMARY LANGUAGE: ${repo.language || "Not specified"}
README:
${readmeText}
------------------------------
`;
    }

    cachedGithubContext = context;
    return cachedGithubContext;
  } catch (err) {
    console.error("GitHub fetch error:", err.message);
    return "Failed to fetch GitHub data.";
  }
}

/* ================= CONTEXT BUILDER ================= */
async function buildContext(resumeText, githubUsername) {
  const MAX_RESUME_CHARS = 12000;
  const trimmedResume = resumeText.slice(0, MAX_RESUME_CHARS);

  const githubContext = await fetchGithubWithReadme(githubUsername);

  return `
RESUME:
${trimmedResume}

GITHUB PROJECTS:
${githubContext}

LINKEDIN:
${LINKEDIN_CONTENT}
`;
}

/* ================= GEMINI ================= */
async function askAssistant(question, context) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an AI assistant for Praharshitha's portfolio.
Answer professionally and concisely.
Use ONLY the given context.

Context:
${context}

Question:
${question}
`;

  const result = await model.generateContent(prompt);
  return result.response.text().replace(/\n\*/g, "\n•");
}

/* ================= API ================= */
app.post("/api/assistant", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const resumeText = await getResumeText();
    const context = await buildContext(
      resumeText,
      "umamanipraharshitha"
    );

    const answer = await askAssistant(question, context);
    res.json({ answer });
  } catch (err) {
    console.error("Assistant error:", err);
    res.status(500).json({ error: "Assistant failed" });
  }
});

/* ================= HEALTH CHECK ================= */
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    resumeCached: !!cachedResumeText,
    githubCached: !!cachedGithubContext,
  });
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 AI Assistant running at http://localhost:${PORT}`);
});
