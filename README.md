# 🚫 NoTube

> **Break your habits** — A Chrome extension that offers the chance to break the automatic Youtube opening and try something else..

![Chrome](https://img.shields.io/badge/platform-Chrome-yellow)

---

## 📖 Overview

**NoTube** is a Chrome extension designed to help you reclaim your time and attention. When you visit YouTube, NoTube automatically presents you with a curated list of productive and enriching alternatives — from photography blogs to coding resources to book recommendations.

Instead of falling into the endless scroll, you'll be gently redirected toward content that aligns with your goals and interests.

---

## ✨ Features

### 🎯 **Auto-Popup on YouTube**
- Automatically displays when you visit YouTube.com
- Elegant, non-intrusive overlay that appears in the top-right corner
- Reminds you to choose a more productive alternative

### 📚 **Curated Alternatives**
Pre-loaded with high-quality resources across multiple categories:
- **📷 Photography** — PetaPixel, DIY Photography, Strobist, Fstoppers, and more
- **📖 Books & Literature** — Book Riot, Literary Hub, The Millions, Goodreads Blog
- **💻 Software Development** — Coding Horror, Hacker Noon, freeCodeCamp, Stack Overflow Blog, Smashing Magazine

### ➕ **Add Custom Sites**
- Click the **+** button to add the current website to your personal list
- Build your own collection of productive alternatives
- Custom sites are stored locally and persist across sessions

### 🎨 **Beautiful Modern UI**
- Sleek dark theme with gradient accents
- Smooth animations and hover effects
- Glassmorphic design with subtle blur effects
- Fully responsive and polished interface

### 🔀 **Randomized Display**
- Alternatives are shuffled on each load
- Discover new resources every time
- Keeps the experience fresh and engaging

### 🎛️ **Manual Toggle**
- Click the extension icon in your toolbar to toggle the popup on any page
- Close the popup by clicking outside of it or using the "Close Extension" button

---

## 🚀 Installation

### **From Source (Developer Mode)**

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/notube.git
   cd notube
   ```

2. **Build the React app**
   ```bash
   cd app
   npm install
   npm run build
   cd ..
   ```

3. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the `/notube` directory (the root folder containing `manifest.json`)

4. **Pin the extension** (optional)
   - Click the puzzle icon in Chrome's toolbar
   - Find **NoTube** and click the pin icon

---

## 🛠️ Tech Stack

### **Frontend**
- **React** — Modern UI library for building the popup interface
- **Vite** — Fast build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework for styling

### **Extension Architecture**
- **Manifest V3** — Latest Chrome extension platform
- **Content Scripts** — Inject the popup iframe into web pages
- **Background Service Worker** — Handle extension icon clicks
- **Chrome Storage API** — Persist user-added alternatives

### **Project Structure**
```
notube/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for extension icon
├── content.js             # Content script for popup injection
├── images/                # Extension icons
└── app/                   # React application
    ├── src/
    │   ├── App.jsx        # Main React component
    │   └── index.css      # Tailwind styles
    ├── public/
    │   └── alternatives.json  # Curated alternatives data
    └── dist/              # Built files (generated)
```

---

## 📝 How It Works

1. **Content Script Injection**
   - When you visit any webpage, `content.js` is loaded
   - On YouTube, it automatically creates an iframe popup after 1 second

2. **React App Display**
   - The iframe loads the built React app from `app/dist/index.html`
   - The app fetches alternatives from `alternatives.json`
   - User-added sites are loaded from Chrome's local storage

3. **Randomization & Display**
   - All alternatives (curated + custom) are combined and shuffled
   - Displayed in a beautiful card-based layout
   - Each card is clickable and opens in a new tab

4. **User Interaction**
   - Click outside the popup to dismiss it
   - Click the extension icon to toggle it on any page
   - Click the **+** button to add the current site to your list

---

## 🎨 Customization

### **Adding More Curated Alternatives**

Edit `app/public/alternatives.json`:

```json
{
  "title": "Your Site Name",
  "url": "https://example.com",
  "description": "A brief description of the site",
  "category": "software" // or "photography", "books", "custom"
}
```

After editing, rebuild the app:
```bash
cd app
npm run build
```

---

## 🔮 Potential Features

### **🎯 Smart Blocking**
- [ ] Customizable blocklist (add any distracting websites)
- [ ] Time-based blocking (e.g., block during work hours)
- [ ] Whitelist specific YouTube channels for educational content

### **📊 Analytics & Insights**
- [ ] See which alternatives you visit most
- [ ] Weekly/monthly productivity reports

### **🧠 Smart Recommendations**
- [ ] AI-powered alternative suggestions based on browsing history
- [ ] Category preferences and personalization
- [ ] Trending alternatives from the community
- [ ] Context-aware suggestions (e.g., coding resources during work hours)

### **🎨 Customization**
- [ ] Multiple theme options (light mode, custom colors)
- [ ] Adjustable popup size and position
- [ ] Custom motivational quotes or reminders
- [ ] Import/export alternative lists

### **📱 Cross-Platform**
- [ ] Firefox extension support
- [ ] Safari extension support
- [ ] Mobile browser support
- [ ] Sync alternatives across devices

### **🎓 Educational Mode**
- [ ] Whitelist educational YouTube channels
- [ ] Separate lists for work vs. leisure
- [ ] Study timer integration
- [ ] Pomodoro technique support

### **🔍 Search & Filter**
- [ ] Search through alternatives
- [ ] Filter by category
- [ ] Sort by recently added, most visited, etc.
- [ ] Tag system for better organization

### **💾 Data Management**
- [ ] Backup and restore settings
- [ ] Export alternatives as JSON/CSV
- [ ] Import alternatives from other productivity tools
- [ ] Cloud sync (optional)

---

### **Development Workflow**

```bash
# Install dependencies
cd app
npm install

# Run dev server (for testing UI changes)
npm run dev

# Build for production
npm run build

# Reload extension in Chrome after changes
# Go to chrome://extensions/ and click the reload icon
```

---

## 🙏 Acknowledgments

- thanks gemini ur the goat
