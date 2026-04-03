<div align="center">

# 🎯 AKJEE
### 60-Day JEE Foundation Study Tracker

[![Deploy to GitHub Pages](https://github.com/akashkumar2k01/akjee/actions/workflows/deploy.yml/badge.svg)](https://github.com/akashkumar2k01/akjee/actions/workflows/deploy.yml)
[![Validate PR](https://github.com/akashkumar2k01/akjee/actions/workflows/validate-pr.yml/badge.svg)](https://github.com/akashkumar2k01/akjee/actions/workflows/validate-pr.yml)
[![MCP Build](https://github.com/akashkumar2k01/akjee/actions/workflows/mcp-build.yml/badge.svg)](https://github.com/akashkumar2k01/akjee/actions/workflows/mcp-build.yml)
[![PWA](https://img.shields.io/badge/PWA-ready-blueviolet?logo=pwa)](#)
[![No Framework](https://img.shields.io/badge/framework-none-success)](#)
[![Firebase](https://img.shields.io/badge/sync-Firebase-orange?logo=firebase)](#)
[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-blue?logo=github)](#)

**[🌐 Open App](https://akashkumar2k01.github.io/akjee/)** &nbsp;|&nbsp; **[📁 Repository](https://github.com/akashkumar2k01/akjee)**

</div>

---

## 📖 What is AKJEE?

AKJEE is a **pure vanilla PWA** (no framework, no bundler, no backend) that helps a JEE aspirant track daily Physics, Chemistry, and Math study across a structured 60-day plan. It combines schedule tracking, gamification, quizzes, AI prompt generation, offline support, and Firebase cloud sync — all in static HTML/CSS/JS.

> Built for **JEE Main + Advanced** preparation. Runs on any browser, installs as a mobile app, works offline.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📅 **60-Day Schedule** | Structured study plan across 4 phases — Physics, Chemistry, Math daily |
| ✅ **Daily Tracker** | Mark topics as done, in-progress, or skipped with reschedule support |
| 📊 **Progress Dashboard** | Subject rings, phase heatmap, bar charts, completion streaks |
| 🧪 **Quiz System** | 5 modes: Daily Quick, Topic, Subject, Mixed, Weak Area |
| 🤖 **AI Prompts** | Generate video, audio, notes, quiz, and test prompts for any topic |
| 🏆 **Gamification** | XP points, levels, 24 badges, streaks, weekly bonuses, phase rewards |
| ☁️ **Cloud Sync** | 6-character sync code — restore progress on any device via Firebase |
| 📱 **PWA** | Install on phone, works offline, service worker cache |
| 🔧 **MCP Server** | Developer control plane for project operations, content generation, CI |

---

## 🗂 Project Files

```
akjee/
├── index.html          # Full SPA — 7 pages, onboarding, modals
├── style.css           # All CSS — dark theme, animations
├── script.js           # App logic — schedule, progress, gamification, UI
├── schedule.json       # 60-day study calendar data
├── quizBank.js         # MCQ question bank (Physics, Chemistry, Math)
├── prompts.js          # AI prompt generators for 5 content types
├── firebase-sync.js    # Firebase Firestore cloud sync module
├── sw.js               # Service Worker — offline PWA cache
├── manifest.json       # PWA manifest with icons
├── mcp-server/         # MCP server for AI-driven project operations
└── .github/
    ├── workflows/
    │   ├── deploy.yml          # Auto-deploy to GitHub Pages on push
    │   ├── validate-pr.yml     # PR gate — file checks, secrets scan
    │   └── mcp-build.yml       # MCP server TypeScript build check
    ├── PULL_REQUEST_TEMPLATE.md
    ├── CODEOWNERS
    └── ISSUE_TEMPLATE/
        ├── bug.yml
        └── feature.yml
```

---

## 🏗 Tech Stack

- **Frontend:** Vanilla HTML5 + CSS3 + JavaScript (ES6+) — zero dependencies
- **Storage:** Browser `localStorage` as primary data store
- **Cloud:** Firebase Firestore for optional cross-device sync
- **Offline:** Service Worker with cache-first strategy
- **Hosting:** GitHub Pages via GitHub Actions
- **Dev Tools:** MCP Server (Node.js + TypeScript) for AI-assisted project control

---

## 📱 App Pages

1. **Home** — Dashboard, progress ring, today's topics, weekly calendar
2. **Today** — Daily plan with topic cards and completion controls
3. **Progress** — Phase breakdown, heatmap, subject rings, topic list
4. **Quiz** — Multi-mode quiz engine with scoring and feedback
5. **Prompts** — AI prompt generation for study content creation
6. **Achievements** — Badges, levels, streaks, personal records
7. **Settings** — Profile, preferences, cloud sync, import/export

---

## 📅 Study Schedule

| Property | Value |
|---|---|
| Start date | April 1, 2026 |
| End date | June 1, 2026 |
| Total calendar days | 62 |
| Study days | 44 |
| Rest days | 18 (Sat/Sun) |
| Phases | 4 (Phase 1–4, ~15 study days each) |
| Subjects | Physics · Chemistry · Math (one topic each per day) |

---

## 🚀 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/akashkumar2k01/akjee.git
cd akjee
```

### 2. Start a local server

```bash
# Python (recommended)
python3 -m http.server 8080

# Then open:
http://localhost:8080
```

> **Important:** Do not open `index.html` directly as a file. Always use a local server — the service worker and Firebase require an HTTP origin.

---

## 🚢 Deployment

AKJEE deploys automatically to GitHub Pages on every push to `main`.

### Automatic deployment

```bash
git add .
git commit -m "Your change message"
git push origin main
# → GitHub Actions deploys automatically
```

### Manual trigger

Go to **Actions → Deploy to GitHub Pages → Run workflow**.

### Pre-deploy checklist (enforced by CI)

- [ ] Bump asset version params in `index.html` — all `?v=X.X.X` references
- [ ] Bump `CACHE_NAME` in `sw.js` — must match new version
- [ ] All 9 core files present
- [ ] No secrets committed to source files

---

## 🔧 Development Rules

These rules must be followed — the CI pipeline checks for violations:

| Rule | Why |
|---|---|
| No frameworks (React, Vue, jQuery, etc.) | Keep the app zero-dependency and fast |
| No bundler | Files served directly — no build step for the app |
| Always bump `?v=X.X.X` after JS/CSS edits | Forces browsers to reload updated assets |
| Always bump `CACHE_NAME` in `sw.js` | Forces service worker to evict old cache |
| Use `Schedule.getStudyDays().length` not hardcoded 60 | Schedule is the source of truth |
| Keep relative paths in `sw.js` | Required for GitHub Pages subdirectory routing |

---

## 🤖 MCP Server

AKJEE includes an MCP (Model Context Protocol) server in `mcp-server/` that allows AI assistants like Claude to directly operate on the project.

### MCP Server Capabilities

| Layer | Tools |
|---|---|
| **Project** | `get_project_overview`, `list_core_files`, `get_project_rules`, `list_pending_todos` |
| **Schedule** | `get_schedule_summary`, `get_study_day`, `search_topics`, `get_schedule_as_json`, `update_study_day`, `add_study_day`, `reorder_study_days` |
| **Quiz** | `get_quiz_stats`, `find_missing_quiz_coverage`, `inject_quiz_questions`, `preview_quiz_injection`, `remove_quiz_question`, `generate_quiz_questions`, `validate_quiz_question` |
| **Content** | `generate_prompt_bundle`, `generate_single_prompt` |
| **File System** | `read_akjee_file`, `write_akjee_file`, `append_akjee_file`, `patch_akjee_file`, `delete_akjee_file`, `list_akjee_dir`, `search_in_file`, `get_file_info` |
| **Code** | `upsert_js_function`, `append_to_script`, `append_css_rule`, `replace_css_rule`, `inject_html_block`, `replace_html_block`, `bump_version` |
| **Git / Shell** | `git_status`, `git_commit_push`, `git_pull`, `run_shell_command`, `start_dev_server`, `stop_port` |
| **Release** | `validate_release_readiness`, `build_mcp_server`, `npm_install` |

### Setup MCP Server locally

```bash
cd mcp-server
npm install
npm run build
```

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "akjee": {
      "command": "node",
      "args": ["/Users/ak/Documents/AKJEE/mcp-server/dist/index.js"],
      "env": {
        "AKJEE_PROJECT_PATH": "/Users/ak/Documents/AKJEE"
      }
    }
  }
}
```

---

## ☁️ Firebase Cloud Sync

AKJEE uses Firebase Firestore for optional cloud sync. Progress is stored under:

```
students/{6-character-sync-code}
```

To restore on a new device, enter your sync code in **Settings → Cloud Sync**.

> ⚠️ Firebase credentials are stored in `firebase-sync.js`. Keep them out of public logs and never commit personal access tokens.

### Required Firestore rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{syncCode} {
      allow read, write: if syncCode.size() == 6;
    }
  }
}
```

---

## 🏆 Gamification System

| Action | Points |
|---|---|
| Topic completed | +10 |
| Full day completed | +20 |
| Quiz attempt | +5 |
| Test completed | +15 |
| Daily streak bonus | +20 |
| Weekly perfect | +50 |
| Phase complete | +100 |

**Levels:** Starter → Beginner → Serious Student → JEE Warrior → JEE Ready

**Badges:** 24 total — streaks, subject completion, quiz milestones, phase completion

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes following all dev rules above
4. Ensure CI passes: file validation, cache-bust check, secrets scan
5. Submit a PR using the provided PR template

All PRs must pass the automated validation workflow before merging.

---

## 📋 Roadmap

- [ ] Expand quiz bank to 200+ questions per subject
- [ ] Push notification reminders
- [ ] PDF notes export
- [ ] Leaderboard / study group support
- [ ] Revision mode with spaced repetition
- [ ] Firebase admin MCP tools
- [ ] GitHub API MCP tools
- [ ] Analytics and study report generation

---

## 📄 License

This project is currently private / personal use. License to be added.

---

<div align="center">
Built with ❤️ by <a href="https://github.com/akashkumar2k01">Akash Kumar</a> · JEE 2026
</div>
