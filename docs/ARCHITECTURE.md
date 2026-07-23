# Discipline Quest — Technical Architecture

## Overview

Discipline Quest is a **client-side PWA** with no backend dependencies. All state is stored locally on the device using browser APIs.

## Core Systems

### 1. Game State (`src/game.js`)

Manages the player's progression:

- **Streaks**: Current and longest streak (days)
- **XP & Levels**: Experience points and character level
- **Cheat Days**: Remaining cheat days for the month
- **Weigh-ins**: Historical weight data
- **Unlocks**: Hero packs and achievements

### 2. Storage Layer (`src/storage.js`)

Abstraction over LocalStorage:

- Serialization/deserialization of game state
- Automatic save on state changes
- Recovery from corruption
- Version migrations for future updates

### 3. UI Rendering (`src/ui.js` — future)

Responsible for:

- Updating DOM elements
- Modal/dialog management
- Time-based UI state changes

### 4. Time & Events (`src/app.js`)

Orchestrates the daily gameplay loop:

- Real-time clock (Sydney timezone)
- Quest prompt scheduling
- Notification triggers
- Event routing to game state

## Data Structures

### Player State

```javascript
{
  currentStreak: 0,
  longestStreak: 0,
  level: 1,
  xp: 0,
  cheatDaysUsed: 0,
  cheatDayResetDate: "2026-01-01",
  weights: [
    { date: "2026-01-10", value: 85.5 },
    { date: "2026-01-17", value: 84.2 }
  ],
  unlockedHeroes: ["hero-1", "hero-2"],
  achievements: ["first-week", "level-5"],
  lastQuestDate: "2026-07-23",
  lastReadyTime: "2026-07-23T07:00:00Z"
}
```

### Moments & Heroes (`data/moments.json`)

```javascript
{
  "hero-1": {
    "id": "hero-1",
    "name": "The Warrior",
    "image": "assets/heroes/warrior.png",
    "quote": "Your discipline is your armor.",
    "trigger": "ready",
    "unlockAt": 0
  }
}
```

## Daily Loop

1. **7:00 AM** — "I'm Ready" quest appears
   - User views hero moment and quote
   - XP awarded
   - Unlocks new hero if threshold met

2. **4:00 PM** — Accountability check
   - "Are you still on track?" prompt
   - Visual streak reinforcement

3. **6:00 PM** — "Kitchen Closed" reminder
   - Encouragement to hold until tomorrow
   - Option to use cheat day if available

4. **Friday 6:45 PM** — Weekly weigh-in
   - Weight input form
   - Historical graph (future)

## PWA & Offline Support

- **Service Worker** (`sw.js`): Caches core assets on first load
- **Manifest** (`manifest.webmanifest`): App metadata for install prompts
- **Offline Gameplay**: Fully functional without internet
- **Data Sync**: No backend, so all state is purely local

## Mobile-First Design

- Single-column layout on small screens
- Touch-friendly buttons and forms
- Viewport scaling for notch/safe areas
- Performance optimized for low-end devices

## Future Considerations

- **Push Notifications**: Native Android wrapper or Firebase Cloud Messaging
- **Hero Packs**: DLC-style content additions
- **Analytics**: Privacy-respecting, on-device metrics
- **Sync Across Devices**: Optional cloud backup
- **Custom Habits**: User-defined daily prompts beyond OMAD/keto
