# 🚫 NoTube

## ✨ Concise Feature Overview

- **Auto‑popup on YouTube**: Instantly appears in the top‑right corner when visiting YouTube.
- **Curated alternatives**: High‑quality resources across photography, books, development, etc., pre‑loaded.
- **AI‑generated descriptions**: Custom sites get engaging blurbs via Groq AI (via Cloudflare worker).
- **Custom site management**: Add, and long‑press delete sites; persisted with Chrome storage.
- **Randomized display**: Alternatives shuffle on each load for fresh discovery.
- **Manual toggle**: Extension icon toggles the popup on any page.
- **Robust sync logic**: Uses Firestore transactions (via shared library) to keep local and cloud data consistent.

## 🛠️ Implementation Highlights

- **React + Vite**: Fast development and build pipeline.
- **Tailwind CSS**: Utility‑first styling for responsive, modern UI.
- **Manifest V3**: Service worker handles icon clicks; content script injects the popup.
- **Shared library (`@rooshi/notube-shared`)**: Provides common models, default alternatives, and sync utilities.
- **Cloudflare worker**: Proxies Groq API calls, keeping API keys secret.
- **Unit & integration tests**: Ensures core functionality and UI stability.

## 🚀 Quick Start (Developer Mode)

```bash
# Install dependencies
cd app && npm install

# Build the extension UI
npm run build

# Load the extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked" and select the repository root
```

*After rebuilding, reload the extension via chrome://extensions/ to see changes.*
