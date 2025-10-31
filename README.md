# 🧠 SensAI Chrome  
### Learn, Understand & Simplify Anything — Right From Your Browser

SensAI Chrome is an AI-powered Chrome extension that acts like a personal mentor embedded in your browsing experience.  
Highlight any text — code, article, Tweet, tutorial, research paper — and SensAI explains, summarizes, translates, or simplifies it instantly.

No tab switching.  
No copy-pasting into ChatGPT.  
No friction.  
Just **learning on the fly**.

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| **Explain Any Text** | Break down complex concepts into simple, clear explanations |
| **Summarize Content** | Generate short, digestible summaries instantly |
| **Translate Instantly** | Translate selected text using **Gemini Translator API** |
| **Explain Code Like a Mentor** | Get code explanations in plain English (great for developers & students) |
| **Beginner & Expert Modes** | Choose between simplified or technical explanations |

---

## 🤖 Powered by Google Chrome AI (On-Device)

SensAI runs using **Gemini Nano** — directly on your device.

- ✅ **Private** — Data never leaves your machine
- ✅ **Fast** — No network calls = instant results
- ✅ **Free** — No API keys required

Technologies used:
- **Gemini Nano** Prompt API
- **Gemini Nano** Translator API
- **Chrome Extension** (Manifest V3)
- **React + TailwindCSS** (Vite + Typescript)


---

## 🧩 How It Works

1. Select text on any webpage.
2. Right-click → **“Explain with SensAI Chrome”**
3. A full-screen tab opens with your AI explanation interface.
4. Choose:  
   - Explain   
   - Translate  
   - Simplify  

---

Here is a **cleaner, clearer, step-by-step “Install & Test” section** you can paste directly into your README:

---

## 💻 Installation (Developer Mode)

Follow these steps to install and test the extension locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/leo-ndl/sensai-chrome.git
   cd sensai-chrome
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   npm run build
   ```

   This will generate a `dist/` folder containing the production build used by Chrome.

4. **Load the extension in Chrome**

   1. Open Chrome and go to:

      ```
      chrome://extensions
      ```
   2. Enable **Developer Mode** (top right toggle).
   3. Click **Load unpacked**.
   4. Select the **`dist/`** folder from this project.

5. **Test the extension**

   * Highlight any text on a webpage.
   * Right-click → **Explain This**
   * The popup will open and you can try **Explain**, **Simplify**, or **Translate**.



## 🏆 Built for Google Chrome AI Hackathon 2025

Made to demonstrate the power of on-device AI for personal learning acceleration.

## ❤️ Credits

Created by Leonel Nguefack
(Solo Dev — Software Engineer)