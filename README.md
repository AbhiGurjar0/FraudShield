# 🚨 FraudShield AI
> *AI-powered Scam Detection & Regulatory Dashboard*  
A lightweight MVP to detect fraudulent investment messages, flag high-risk scams, and provide a real-time dashboard for regulators and investors.

---

## 📜 Overview
FraudShield AI is a *prototype platform* built to combat financial fraud in the securities market.  
It allows users to *scan suspicious messages* (from Telegram, WhatsApp, X, etc.), calculates a *fraud risk score, and displays **real-time scam trends* on a dashboard for regulators and exchanges.

This MVP was built in *48 hours* for a hackathon and demonstrates a *scalable approach* to fraud prevention using AI and NLP.

---

## ✨ Features
### 🔍 Scam Message Detection (Core Feature)
- Paste or type any suspicious message.
- NLP model (BERT/LLaMA-based) + rule-based filters analyze the text.
- Returns:
  - Risk label: ⚠ High / Medium / Low
  - Fraud score (0–100%).
  - Keywords triggering the alert.

### 📊 Regulator Dashboard
- Real-time *live feed* of flagged scam messages.
- *Trending suspicious stocks* with abnormal activity.
- Fraud *heatmap* to visualize scam activity by region.
- Quick insights: Total scams detected, source platforms, high-risk cases.

---

## 🏗 Tech Stack
- *Frontend:* ejs + TailwindCSS  
- *Backend:* Nodejs  
- *ML/NLP:* Hugging Face Transformers (BERT or LLaMA)  
- *Database:* MongoDB
- *Visualization:* Mapbox (Heatmap), Chart.js/Recharts (Graphs)

