require("dotenv").config();

const express = require("express");
const path = require("path");

const cors = require("cors");
const fs = require("fs/promises");
const axios = require("axios"); // GitHub fetch

// ✅ Stable pdf-parse import
const pdfParseLib = require("pdf-parse");
const pdfParse =
  typeof pdfParseLib === "function"
    ? pdfParseLib
    : pdfParseLib.default || pdfParseLib.pdfParse;

const { GoogleGenerativeAI } = require("@google/generative-ai");

/* ================= CONFIG ================= */
const PORT = 5000;
const RESUME_PATH = path.join(process.cwd(), "public", "resume.pdf");


const LINKEDIN_CONTENT = "LinkedIn summary: ...";

/* ================= APP SETUP ================= */
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ================= CACHES ================= */
let cachedResumeText = null;
let cachedGithubSummary = null;

/* ================= READ PDF (CACHED) ================= */
async function getResumeText() {
  if (cachedResumeText) return cachedResumeText;

  const buffer = await fs.readFile(RESUME_PATH);
  const data = await pdfParse(buffer);

  cachedResumeText = data.text;
  return cachedResumeText;
}

/* ================= FETCH GITHUB SUMMARY WITH TOKEN + CACHE ================= */
async function fetchGithubSummary(username) {
  if (cachedGithubSummary) return cachedGithubSummary;

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // token from .env
        },
      }
    );

    const repos = response.data;
    if (!repos || repos.length === 0) return "No GitHub projects found.";

    const totalRepos = repos.length;
    const projectList = repos.map((repo) => `• ${repo.name}`).join("\n");

    cachedGithubSummary = `GitHub Projects (${totalRepos} public/private repos):\n${projectList}`;
    return cachedGithubSummary;
  } catch (err) {
    console.error("GitHub fetch error:", err.message);
    return "Could not fetch GitHub projects.";
  }
}

/* ================= CONTEXT BUILDER ================= */
async function buildContextWithGithub(resumeText, githubUsername) {
  const MAX_CHARS = 12000;
  const trimmedResume = resumeText.slice(0, MAX_CHARS);

  const githubSummary = await fetchGithubSummary(githubUsername);

  return `
RESUME:
${trimmedResume}

GITHUB:
${githubSummary}

LINKEDIN:
${LINKEDIN_CONTENT}
`;
}

/* ================= GEMINI ================= */
async function askAssistant(question, context) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Replace with your valid model
  });

  const prompt = `
You are an AI assistant for Praharshitha's portfolio.
Answer concisely and professionally using ONLY the provided context.

Context:
${context}

Question:
${question}
  `;

  const result = await model.generateContent(prompt);

  // Format bullets nicely if Gemini uses "\n*"
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
    const context = await buildContextWithGithub(resumeText, "umamanipraharshitha");

    const answer = await askAssistant(question, context);

    res.json({ answer });
  } catch (err) {
    console.error("Assistant Error:", err);
    res.status(500).json({ error: "Assistant failed" });
  }
});
/* ================= HEALTH CHECK ================= */
app.get("/api/status", (req, res) => {
  try {
    res.json({
      status: "ok",
      message: "AI Assistant backend is running",
      cachedResume: cachedResumeText ? true : false,
      cachedGithub: cachedGithubSummary ? true : false,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server check failed" });
  }
});


/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 AI Assistant running at http://localhost:${PORT}`);
});
