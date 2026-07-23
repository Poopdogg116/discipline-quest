# Discipline Quest

**A retro RPG-inspired accountability companion for building unbreakable daily habits.**

Discipline Quest gamifies real-world discipline through SNES-style gameplay mechanics. The first release focuses on OMAD (One Meal A Day) and keto consistency, with timed prompts, achievement streaks, cheat-day rules, weekly weigh-ins, hero moments, and inspirational quotes.

## 🎮 Core Features

- **Timed Quest Prompts**: Morning motivation (7 AM), accountability check (4 PM), evening encouragement (6 PM), and weekly weigh-in (Friday 6:45 PM)
- **Progression System**: XP, leveling, and unlockable hero packs
- **Streak Tracking**: Current and personal best streaks with visual feedback
- **Cheat Day System**: One strategic cheat day per calendar month
- **Hero Gallery**: Unlock and view retro SNES-style hero moments
- **Local Storage**: All progress saved on-device (no account required)
- **Progressive Web App**: Works offline, installable on mobile and desktop

## 🚀 Getting Started

### Run Locally

Because the app loads JSON files, serve it from a local web server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
http-server
```

Then open `http://localhost:8000`.

### Deploy with GitHub Pages

1. Ensure this repository is public
2. Go to **Settings → Pages**
3. Select **Deploy from a branch**
4. Choose **main** branch and **/(root)** folder
5. Save

Your app will be live at: `https://YOUR-USERNAME.github.io/discipline-quest/`

## 📁 Project Structure

```
discipline-quest/
├── assets/              # Images, icons, and audio
│   ├── icons/          # App icons for PWA
│   ├── heroes/         # SNES-style hero artwork
│   └── sounds/         # SFX and music (future)
├── data/                # JSON data files
│   ├── moments.json    # Hero moment definitions
│   ├── quotes.json     # Motivational quotes
│   └── packs.json      # Unlockable hero packs
├── src/                 # Application logic
│   ├── app.js          # Main application
│   ├── storage.js      # LocalStorage abstraction
│   ├── game.js         # Game state and mechanics
│   └── ui.js           # UI rendering (future)
├── styles/              # CSS
│   └── main.css        # All styles (mobile-first)
├── docs/                # Documentation
│   ├── ARCHITECTURE.md # Technical design
│   ├── ROADMAP.md      # Feature roadmap
│   └── CONTRIBUTING.md # Developer guidelines
├── index.html          # App entry point
├── manifest.webmanifest # PWA configuration
├── sw.js               # Service worker
├── LICENSE             # MIT License
└── README.md           # This file
```

## 🛠 Development

### Tech Stack

- **No frameworks** — Vanilla HTML, CSS, and JavaScript
- **Progressive Web App** — Service worker + manifest for offline support
- **Mobile-first** — Responsive design from the ground up
- **GitHub Pages compatible** — Static hosting ready
- **Android-ready** — Easy path to Capacitor or React Native wrapper

### Code Philosophy

- Readability over cleverness
- Clear separation of concerns
- Well-documented functions and features
- Modular, testable architecture

### Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines, branching strategy, and commit conventions.

## 🔔 Notifications

Browser notifications require HTTPS. When served locally, the app will prompt for permission but can't actually deliver notifications. On GitHub Pages (HTTPS), notifications work when the app is open.

**Future**: Push notifications and native Android wrapper for background notifications.

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Built with discipline. No frameworks. Just JavaScript.**
