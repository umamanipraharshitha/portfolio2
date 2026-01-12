
# 🧠 AI-Powered Full-Stack Developer Portfolio

A production-grade personal portfolio built using **React** and **Node.js**, enhanced with an **AI assistant** that provides contextual, real-time responses based on verified professional data such as resume content, GitHub repositories, and curated profile information.

This project demonstrates **frontend engineering discipline, backend system design, scalable API architecture, and real-world AI integration**.

---

## 📌 Overview

This portfolio is not a static website.
It is an **interactive system** that allows recruiters, engineers, and interviewers to query professional information dynamically through an AI assistant, similar to modern enterprise AI interfaces.

---

## ✨ Key Capabilities

### 🎨 Frontend Application

* Component-driven React architecture
* Theme management using Context API
* Intro animation flow control
* Section-based navigation
* Embedded AI chatbot interface
* Responsive and accessible UI

### 🤖 AI Assistant

* Answers queries about:

  * Professional summary
  * Skills and technologies
  * Projects and implementations
  * GitHub repositories
* Generates responses using only validated contextual data
* Streams responses in real time for improved user experience

### ⚙️ Backend Services

* Resume parsing from PDF
* GitHub repository analysis with pagination handling
* README content extraction with token-safe limits
* Context aggregation and trimming
* In-memory caching for performance optimization

---

## 🏗 System Architecture

```
Client (React)
     │
     │ User Query
     ▼
API Gateway (Express)
     │
     ├── Resume Parser (PDF)
     ├── GitHub Data Service
     ├── Profile Context Builder
     │
     ▼
Generative AI Engine (Gemini)
     │
     ▼
Streaming Response (SSE)
     │
     ▼
Client UI (Live Output)
```

---

## 🛠 Technology Stack

### Frontend

* React
* Context API
* Fetch API
* Server-Sent Events (SSE)

### Backend

* Node.js
* Express.js
* Google Gemini AI
* GitHub REST API
* pdf-parse
* Axios
* dotenv
* CORS

---

## 📂 Project Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── theme/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── public/
│   │   └── resume.pdf
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🔄 Application Flow (Frontend)

```
App.jsx
 ├── ThemeProvider
 ├── Intro
 ├── Navigation
 ├── Hero
 ├── About
 ├── Skills
 ├── Projects
 ├── Contact
 ├── Footer
 └── AI Chatbot
```

---

## 🔐 Environment Configuration

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
```

---

## ▶️ Local Development

### Backend

```bash
cd backend
npm install
node index.js
```

Server:

```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Application:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### 🤖 AI Assistant

```
POST /api/assistant
```

### 🩺 Health Check

```
GET /api/status
```


