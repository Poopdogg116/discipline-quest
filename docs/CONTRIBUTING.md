# Contributing to Discipline Quest

Thanks for your interest in contributing! This document outlines our development practices and guidelines.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/discipline-quest.git`
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes**
5. **Test locally**: `python -m http.server 8000` and open `http://localhost:8000`
6. **Commit with clear messages** (see Commit Message Guidelines below)
7. **Push** to your fork and open a **Pull Request**

## Code Philosophy

- **Readability first**: Prefer clear code over clever code
- **No frameworks**: Vanilla JavaScript only (unless there's a strong reason to deviate)
- **Mobile-first**: Always test on small screens
- **Modularity**: Keep functions small and focused
- **Documentation**: Comment non-obvious logic
- **No external dependencies** (except optional: http-server for local dev)

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
[feature/fix/refactor/docs] Brief description (50 chars)

Optional longer explanation of *why* this change was made.
What problem does it solve? What's the impact?

- Bullet points for multiple changes
- Keep lines under 72 characters
```

### Examples

```
[feature] Add hero gallery with unlock system

Players can now view all unlocked heroes in the gallery.
Heroes unlock at specific XP thresholds. Gallery shows
hero name, unlock date, and associated quote.
```

```
[fix] Fix streak reset logic on failure

The streak was not resetting when a player clicked
"I Slipped". Changed the failure handler to properly
clear currentStreak before saving.
```

```
[refactor] Extract time utilities into separate module

Moves timezone logic and time calculations out of app.js
into utils/time.js for reusability and testability.
```

## Pull Request Process

1. **Describe your changes**: What did you add or fix?
2. **Test on mobile**: Use DevTools to test on small screens
3. **Include a screenshot** if it's a UI change
4. **Link related issues**: "Closes #123" or "Relates to #456"
5. **Keep PRs focused**: One feature or fix per PR

## File Organization

When adding files, follow this structure:

- **Feature logic** → `src/`
- **Styling** → `styles/main.css`
- **Data/content** → `data/`
- **Assets** → `assets/` (with subdirectories by type)
- **Documentation** → `docs/`

## Testing

While we don't have automated tests yet, please manually verify:

- [ ] Feature works on desktop (Chrome/Firefox)
- [ ] Feature works on mobile (DevTools mobile emulation)
- [ ] No console errors
- [ ] Service worker still loads
- [ ] Local storage works (check DevTools Application tab)
- [ ] Changes don't break existing features

## Code Style

### JavaScript

```javascript
// Use const by default, let if needed, avoid var
const MAX_STREAK = 365;

// Use meaningful names
function calculateXPForLevel(level) {
  return level * 100;
}

// Comment complex logic
// Reset streak if today is not consecutive with lastQuestDate
if (daysSinceLastQuest > 1) {
  gameState.currentStreak = 0;
}
```

### CSS

```css
/* Mobile-first: base styles for small screens */
.card {
  padding: 1rem;
  margin-bottom: 1rem;
}

/* Then layer on larger screen styles */
@media (min-width: 640px) {
  .card {
    padding: 2rem;
  }
}
```

## Questions?

Open an issue with the `question` label or start a discussion. We're here to help!

---

**Built with discipline. No frameworks. Just JavaScript.**
