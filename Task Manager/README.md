# Task Manager

A streamlined, single-page task management app with time tracking, priority ranking, collapsible cards, notes, quick-copy text blocks, a saved links library, configurable completion rules, in-app Settings GUI, and direct integration with the SFC Inventory app.

---

## File Structure

```
task-manager.html    # The application — HTML, CSS, and JavaScript
config.js            # Configuration — edit directly or use the in-app Settings GUI
README.md            # This documentation
```

Both `task-manager.html` and `config.js` must be in the same folder. Open `task-manager.html` in any modern browser. No server required.

---

## Interface Overview

The app has four tabs at the top, a scrollable content area in the middle, and a fixed footer with the task counter and Add Task form (visible only on the Tasks tab).

```
┌─────────────────────────────────────────┐
│  Task Manager                        ☰  │  ← header + menu
├─────────────────────────────────────────┤
│  [Tasks] [Notes] [Text Blocks] [Links]  │  ← tab nav
├─────────────────────────────────────────┤
│                                         │
│  ☐  PART-NUMBER  📄 🔗  [from inv]  ▼  │  ← part number row
│     Type: Option 1      [1] [2] [3]     │  ← type + priority
│     Status: [dropdown]  ☐ Rework        │  ← status + rework
│     FIRST START ×2    LAST STOP         │  ← time fields
│     ── Sessions ─────────────────────   │
│     1  2:45 PM → 3:10 PM               │
│     2  3:30 PM → ● running             │
│     📝  note preview…  [View ERP][⏸][■]│  ← notes + secondary link + timer
│                                   [🗑️] │  ← delete
│                                         │
├─────────────────────────────────────────┤
│  3 active, 1 completed                  │  ← task counter
│  Part Number: [____________]            │
│  Type:        [____________]            │
│  [       ADD TASK        ]              │
└─────────────────────────────────────────┘
```

---

## Features

### Tasks Tab

#### Task Cards

Each task card shows:
- **Completion checkbox** — check to mark complete; any running timer session is closed automatically
- **Part number** — monospace pill, colour-coded by timer state (see below)
- **📄 Copy button** — copies the part number to the clipboard
- **🔗 Link button** — opens the primary URL template configured in `config.js` with the part number substituted in (hidden if no URL template is set)
- **`from inventory` badge** — shown on tasks transferred from the SFC Inventory app
- **`⭐ pending` badge** — shown on tasks auto-created by a Completion Rule and waiting to be activated
- **▼ / ▶ Collapse button** — minimizes the card to just the part number row; state is remembered across reloads
- **Type** — the task type selected at creation
- **Priority buttons (1 / 2 / 3)** — set task priority; hidden on completed and pending-activation tasks
- **Status dropdown** — configurable options from `config.js`
- **Rework checkbox** — flags the task for rework; turns the left border red
- **First Start / Last Stop** — timestamps; click to copy
- **Sessions log** — numbered list of every start/stop pair
- **📝 Note button** — opens the note editor popup
- **Secondary link button** — text-label button near timer controls; configurable in `config.js`
- **Start / Pause / Stop timer buttons** — shown on active tasks
- **⭐ Activate button** — shown on pending tasks; clicking it unlocks the timer
- **🗑️ Delete button** — removes the task after confirmation

#### Timer States and Part Number Colours

| Colour | Meaning |
|--------|---------|
| Yellow pill | Task not started |
| Yellow card border | Pending activation (auto-created by a completion rule) |
| Orange pill / border | Timer running |
| Purple pill / border | Timer paused |
| Green pill / border | Task completed |
| Red pill / border | Rework flagged |

---

### Completion Rules

Completion Rules automate follow-on tasks when specific task types are finished.

**How it works:**
1. Define a rule in **⚙️ Settings → Completion Rules** by selecting a **Trigger Type** and an **Output Type**.
2. When a task whose type matches the Trigger Type is marked complete (via checkbox or Stop button), the app automatically creates a copy with:
   - The same part number, notes, rework flag, and priority
   - The Output Type assigned as the new type
   - A **⭐ pending** state — timer controls are locked until activated
3. A toast notification confirms the new task was created.
4. Click **⭐ Activate** on the new card when ready to begin. The pending badge disappears and the **Start** button appears.

Rules are saved in `tm_config_override` / `config.js` alongside all other settings.

---

### Notes Tab

A freeform text area for general notes. Content saves automatically to localStorage.

---

### Text Blocks Tab

Quick-copy text snippets from `config.js`. Click **📄** on any block to copy its full text.

---

### Links Tab

A personal reference library for saved URLs. Links are managed from **⚙️ Settings → Saved Links** and saved in `config.js` / `tm_config_override` alongside all other settings.

**Adding a link (via Settings):**
1. Enter a **Title** (optional — defaults to the URL if left blank)
2. Enter the **URL** — `https://` is added automatically if omitted
3. Enter a brief **Description** (optional)
4. Click **+ Add** or press **Enter** in the URL field

You can also reorder links with the ▲ / ▼ buttons and edit any field inline.

**Using a link:** Click the blue title on the Links tab — it opens in a new browser window.

**Quick access:** The **⚙️ Manage** button at the top of the Links tab opens Settings and scrolls directly to the Saved Links section.

Links are persisted in `tm_config_override` and included when you download `config.js`, keeping them in sync with the rest of your configuration.

---

### Menu (☰)

| Item | Action |
|------|--------|
| Save CSV | Exports all tasks to `tasks_YYYY-MM-DD.csv` |
| Clear All | Deletes all tasks after confirmation |
| ⚙️ Settings | Opens the in-app Settings GUI |
| Dark Mode | Toggles light/dark theme; preference saved |
| View README | Opens `README.md` in a new tab |

---

### ⚙️ Settings GUI

Open via **☰ → ⚙️ Settings**.

| Section | What you can do |
|---------|----------------|
| **Task Types** | Add, edit, delete, and reorder type options |
| **Status Options** | Add, edit, delete status entries (label + value) |
| **Text Blocks** | Add, edit, delete, reorder quick-copy snippets |
| **URL Settings** | Set primary/secondary link templates and button label |
| **Saved Links** | Add, edit, delete, and reorder saved URLs; each has a Title, URL, and optional Description |
| **Completion Rules** | Add and delete type-based completion rules (Trigger → Output) |

**Saving:** Click **Apply** to persist immediately in the browser. Click **⬇ config.js** to download a file copy.

> **Best practice:** Always download and replace `config.js` after finalizing settings.

**Reset:** Use **Reset to config.js** (bottom-left of Settings) to discard browser overrides and revert to the file.

---

### SFC Inventory Integration

Tasks can be sent from the SFC Inventory app directly into Task Manager via shared localStorage. Task Manager checks for queued items on every page load and window focus event and imports them automatically.

**Requirement:** Both HTML files must be open in the same browser profile.

---

## Configuration — config.js Reference

```js
var TASK_MANAGER_CONFIG = {

    // ── Task Types ────────────────────────────────────────────────────────
    types: ["Option 1", "Option 2", "Option 3"],

    // ── Status Options ────────────────────────────────────────────────────
    statusOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
    ],

    // ── Text Blocks ───────────────────────────────────────────────────────
    // Use \n for a line break inside any text value.
    textBlocks: [
        { label: "Sample", text: "Sample text" }
    ],

    // ── Primary URL Template ──────────────────────────────────────────────
    // {partNumber} is replaced with the actual part number (URL-encoded).
    urlTemplate: "https://example.com/search?q={partNumber}",

    // ── Secondary URL Template ────────────────────────────────────────────
    secondaryUrlTemplate: "https://example.com/erp?q={partNumber}",
    secondaryUrlLabel:    "View ERP",

    // ── Completion Rules ──────────────────────────────────────────────────
    // When a task of triggerType is completed, a pending copy is created
    // with outputType. The copy requires ⭐ Activate before the timer starts.
    completionRules: [
        { triggerType: "Option 1", outputType: "Option 2" }
    ],

};
```

---

## localStorage Keys

| Key | Written by | Purpose |
|-----|-----------|---------|
| `tasks` | Task Manager | Saved task list |
| `notes` | Task Manager | Notes tab content |
| `tm_config_override` | Settings GUI | Browser-saved config overrides |
| `tm_types` | Task Manager | Published type list for SFC Inventory |
| `tm_incoming_queue` | SFC Inventory | Queued items awaiting import |

---

## Troubleshooting

**Completion Rule not firing** — Confirm the task's type exactly matches the Trigger Type (case-sensitive). Verify the rule in Settings and re-apply.

**⭐ Activate not appearing on a follow-on task** — Tasks loaded from a save made before v4.0 won't have `pendingActivation` set. Future clones will behave correctly.

**Links not opening** — Check your browser's popup blocker. Links open in a new window. Also verify the URL is correct in **⚙️ Settings → Saved Links**.

**Config error banner** — `config.js` is missing or has a syntax error. Check the file and hard-refresh (Ctrl+Shift+R / Cmd+Shift+R).

**Tasks disappeared** — Browser localStorage was cleared. Export CSV regularly as a backup.

**Transferred items not appearing from SFC Inventory** — Both files must be open in the same browser. Click the Task Manager tab to trigger the focus event.

---

## Best Practices

- **Keep config.js in sync** — download and replace after every Settings change.
- **Export CSV regularly** — localStorage can be wiped by browser data clears.
- **Hard-refresh after editing config.js** — Ctrl+Shift+R / Cmd+Shift+R.
- **Status values: lowercase, no spaces** — used in CSV exports; keep them clean (e.g. `in_progress`).
- **Completion Rule type names are case-sensitive** — must exactly match a configured task type.
- **Links are stored in config** — they are included in `tm_config_override` and in the downloaded `config.js`, so they survive browser data clears as long as you keep `config.js` in sync.

---

## Changelog

| Version | Changes |
|---------|---------|
| 4.0 | **Links tab** — save URLs with title and description, open in new window; **Completion Rules** — configurable type-based logic auto-creates pending follow-on tasks on completion; **⭐ Activate** workflow for cloned tasks; Completion Rules section in Settings GUI and config.js |
| 4.1 | Links moved to Settings GUI (managed alongside other config, saved in config.js/tm_config_override); delete buttons replaced with ✕ X buttons that highlight red on hover |
| 3.5 | In-app Settings GUI; `tm_config_override` localStorage layer |
| 3.4 | Secondary URL button (text-label, near timer) |
| 3.3 | SFC Inventory integration; `from inventory` badge; `tm_types` publishing |
| 3.2 | Multi-session timer; full sessions log |
| 3.1 | Priority buttons; collapsible cards; Rework checkbox |
| 3.0 | Three-tab layout; dark/light mode; config.js |

---

**Version:** 4.1
**Last updated:** April 2026
**Dependencies:** None (Google Fonts loaded remotely for typography only)
