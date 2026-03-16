# Task Manager

A streamlined, single-page task management app with time tracking, priority ranking, collapsible cards, notes, quick-copy text blocks, and direct integration with the SFC Inventory app.

---

## File Structure

```
task-manager.html    # The application — HTML, CSS, and JavaScript
config.js            # Configuration — edit this to customize the app
README.md            # This documentation
```

Both `task-manager.html` and `config.js` must be in the same folder. Open `task-manager.html` in any modern browser. No server required.

---

## Interface Overview

The app has three tabs at the top, a scrollable task list in the middle, and a fixed footer with the task counter and Add Task form (visible only on the Tasks tab).

```
┌─────────────────────────────────────────┐
│  Task Manager                        ☰  │  ← header + menu
├─────────────────────────────────────────┤
│  [Tasks]  [Notes]  [Text Blocks]        │  ← tab nav
├─────────────────────────────────────────┤
│                                         │
│  ☐  PART-NUMBER  📄 🔗  [from inv]  ▼  │  ← part number row
│     Type: Option 1      [1] [2] [3]     │  ← type + priority
│     Status: [dropdown]  ☐ Rework        │  ← status + rework
│     FIRST START ×2    LAST STOP         │  ← time fields
│     ── Sessions ─────────────────────   │
│     1  2:45 PM → 3:10 PM               │
│     2  3:30 PM → ● running             │
│     📝  note preview…  [⏸ Pause][Stop] │  ← notes + timer
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
- **🔗 Link button** — opens the URL template configured in `config.js` with the part number substituted in (hidden if no URL template is set)
- **`from inventory` badge** — shown on tasks transferred from the SFC Inventory app
- **▼ / ▶ Collapse button** — minimizes the card to just the part number row to save space; state is remembered across reloads
- **Type** — the task type selected at creation
- **Priority buttons (1 / 2 / 3)** — set task priority; hidden on completed tasks
- **Status dropdown** — configurable options from `config.js`
- **Rework checkbox** — flags the task for rework; turns the left border red
- **First Start** — timestamp of the first timer session; shows a `×N` badge when multiple sessions exist; click to copy
- **Last Stop** — timestamp of the most recent stop; shows `● live` while the timer is running; click to copy
- **Sessions log** — numbered list of every start/stop pair, shown when at least one session exists
- **📝 Note button** — opens the note editor popup; a truncated preview of the note appears inline when one exists
- **Timer buttons** — vary by state (see Timer section below)
- **🗑️ Delete button** — deletes the task after confirmation

#### Task Border Colours

The left border colour indicates the current state of the task at a glance:

| Colour | State |
|--------|-------|
| 🟡 Yellow | New — timer not yet started |
| 🟠 Orange | Running — timer is active |
| 🟣 Purple | Paused — timer paused, task not yet complete |
| 🟢 Green | Complete |
| 🔴 Red | Rework flagged (overrides all other colours) |

#### Task Sort Order

Active tasks sort by priority first (1 → 2 → 3 → unprioritized), then by creation date newest-first. Completed tasks always appear at the bottom.

---

### Priority Ranking

Click the **1**, **2**, or **3** circle buttons on a task card to assign a priority. The task list re-sorts immediately. Click the active priority button again to remove it. Priority is automatically cleared when a task is marked complete.

| Button | Priority | Colour |
|--------|----------|--------|
| 1 | High | Red |
| 2 | Medium | Orange |
| 3 | Low | Yellow |

---

### Time Tracking

Tasks use a **multi-session timer** that records every individual work period as a start/stop pair. You can pause and resume as many times as needed; the full history is preserved.

**Timer states and buttons:**

| Current state | Buttons shown | Action |
|--------------|--------------|--------|
| Idle (not started) | **Start** | Begins session 1; task turns orange |
| Running | **⏸ Pause** and **Stop** | Pause closes the current session (task turns purple); Stop closes the session and marks complete (task turns green) |
| Paused | **▶ Resume** and **Stop** | Resume opens a new session (task turns orange); Stop marks complete from paused state |

Clicking **Stop** from either the running or paused state finalizes the task in one action — no separate "mark complete" step needed.

**Completing via checkbox:** If the timer is running when you check the completion checkbox, the current session is closed automatically with the current time.

---

### Notes

Each task has an optional note. Click **📝** on any task card to open the note editor. The note saves when you click **Save**, press **Escape**, or click outside the popup. A truncated preview appears inline on the card when a note exists.

---

### Collapsible Cards

Click **▼** at the top-right of any card to collapse it to just the part number row. Click **▶** to expand. Collapse state is saved in localStorage and persists across page reloads. Collapsed tasks still take up a small amount of space; use them to keep completed or lower-priority tasks out of the way while keeping them accessible.

---

### Notes Tab

A freeform text area for general notes. Content saves automatically to localStorage with a brief debounce — a small "Saved" indicator appears when the save completes.

---

### Text Blocks Tab

Displays quick-copy text snippets configured in `config.js`. Click **📄** on any block to copy its full text to the clipboard. Blocks support multi-line content (use `\n` in the config value).

---

### Menu (☰)

| Item | Action |
|------|--------|
| Save CSV | Exports all tasks to `tasks_YYYY-MM-DD.csv` |
| Clear All | Deletes all tasks after confirmation |
| Dark Mode | Toggles light/dark theme; preference saved |
| View README | Opens `README.md` in a new tab |

---

### SFC Inventory Integration

Tasks can be sent directly from the SFC Inventory app into Task Manager using the send icon button on each inventory item.

**What Task Manager does:**
- On every page load and every time the browser tab regains focus, Task Manager checks for queued items in the shared `tm_incoming_queue` localStorage key
- Any queued items are imported as new tasks immediately — no manual action required
- Task Manager switches to the Tasks tab automatically and shows a **📥 N task(s) imported from SFC Inventory** toast notification
- Imported tasks have `fromInventory: true`, which displays a `from inventory` badge next to the part number and adds a `From Inventory: Yes` column in CSV exports

**Type publishing:**
Every time Task Manager loads and parses `config.js`, it writes its configured task types to the `tm_types` localStorage key. SFC Inventory reads this key to populate the type dropdown in its Send dialog. This happens automatically — no setup needed beyond opening Task Manager at least once.

**Requirement:** Both HTML files must be open in the same browser (same browser profile). The bridge is entirely localStorage — no network is involved.

---

## Configuration

All customization lives in `config.js` — a plain JavaScript file in the same folder as `task-manager.html`. Edit it in any text editor, save, and hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R).

If `config.js` is missing or contains a syntax error, a red error banner appears at the top of the app.

### config.js Reference

```js
var TASK_MANAGER_CONFIG = {

    // ── Task Types ────────────────────────────────────────────────────────
    // Shown in the Type dropdown when adding a task, and on each task card.
    types: [
        "Option 1",
        "Option 2",
        "Option 3"
    ],

    // ── Status Options ────────────────────────────────────────────────────
    // Shown in the Status dropdown on each task card.
    // label = text the user sees; value = stored internally and in CSV export.
    statusOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
    ],

    // ── Text Blocks ───────────────────────────────────────────────────────
    // Quick-copy snippets shown in the Text Blocks tab.
    // Use \n for a line break inside any text value.
    textBlocks: [
        { label: "Sample 1",  text: "Sample text 1" },
        { label: "Sample 2",  text: "Sample text 2" },
        { label: "Multiline", text: "Line one\nLine two\nLine three" }
    ],

    // ── URL Template ─────────────────────────────────────────────────────
    // Enables the 🔗 link button on each task card.
    // {partNumber} is replaced with the actual part number (URL-encoded).
    // Set to "" to hide the link button entirely.
    urlTemplate: "https://example.com/search?q={partNumber}"

};
```

### Customization Examples

**Task types:**
```js
types: ["Urgent", "Standard", "Research", "Follow-up"]
```

**Status options:**
```js
statusOptions: [
    { label: "Pending",     value: "pending"     },
    { label: "In Progress", value: "in_progress" },
    { label: "On Hold",     value: "on_hold"     },
    { label: "Complete",    value: "complete"    }
]
```

**Text blocks with multi-line content:**
```js
textBlocks: [
    { label: "Email sign-off", text: "Thanks,\nYour Name\nyour@email.com" },
    { label: "Status update",  text: "Awaiting review from supervisor." }
]
```

**URL template examples:**
```js
// Internal system
urlTemplate: "http://internal.company.com/parts/{partNumber}"

// Google search
urlTemplate: "https://www.google.com/search?q={partNumber}"

// Disabled
urlTemplate: ""
```

---

## Adding Tasks

1. Click the **Tasks** tab if not already active
2. In the footer, enter a part number (up to 50 characters)
3. Select a type from the dropdown
4. Click **Add Task** or press **Enter**

The new task appears at the top of the active list with a yellow border.

---

## Exporting to CSV

Menu (☰) → **Save CSV** downloads `tasks_YYYY-MM-DD.csv`.

The CSV includes one row per task with these columns:

```
Part Number, Type, Status, Completed, Rework, From Inventory, Note, Created Date,
Session 1 Start, Session 1 Stop, Session 2 Start, Session 2 Stop, …
```

Session columns expand dynamically — the number of `Session N Start / Stop` pairs matches the task with the most sessions. The **From Inventory** column is `Yes` for tasks transferred from SFC Inventory, `No` for all others.

---

## Data Storage

All data is stored in **browser localStorage**. Nothing is sent to any server.

| localStorage key | Contents |
|-----------------|----------|
| `tasks` | All task data as JSON |
| `notes` | Notes tab content (plain text) |
| `theme` | `"dark"` or `"light"` |
| `tm_types` | Configured task types (read by SFC Inventory) |
| `tm_incoming_queue` | Incoming tasks from SFC Inventory (read and cleared on receipt) |

Clearing browser data or site storage will delete tasks and notes. **Export to CSV regularly as a backup.**

### Task Data Schema

```json
{
  "id": 1710500000000,
  "partNumber": "SFC-001",
  "type": "Option 1",
  "status": "option1",
  "priority": 1,
  "minimized": false,
  "fromInventory": true,
  "sessions": [
    { "start": "9:15 AM", "stop": "10:42 AM" },
    { "start": "1:30 PM", "stop": null }
  ],
  "completed": false,
  "isRework": false,
  "note": "Waiting on updated drawing.",
  "createdAt": "2026-03-15T09:15:00.000Z"
}
```

### Timer State Derivation

The timer state is derived from the `sessions` array at render time — no separate state field is stored:

| State | Condition |
|-------|-----------|
| Idle | `sessions` is empty |
| Running | Last session has `stop: null` |
| Paused | Sessions exist and last session has a stop value |
| Completed | `completed: true` |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Submit the Add Task form (when the part number or type field is focused) |
| Escape | Close the note popup modal |

---

## Troubleshooting

**Red config error banner on load**
`config.js` is missing or has a syntax error. Make sure the file is in the same folder as `task-manager.html` and is valid JavaScript. Open it in VS Code to see any syntax errors highlighted.

**Types or status options not updating after editing config.js**
Hard-refresh the browser: Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac. This bypasses the script cache.

**Tasks disappeared**
Browser localStorage was cleared (e.g. by clearing browsing history). Export to CSV regularly to keep a backup outside the browser.

**Transferred items from SFC Inventory not appearing**
Both files must be open in the same browser. Click on the Task Manager tab — it checks for queued items on every focus event. If that doesn't work, try refreshing Task Manager.

**The `from inventory` type dropdown in SFC Inventory shows generic options**
Task Manager has not yet been opened in this browser. Open it once — it publishes its configured types on load.

**Copy not working**
The app uses the Clipboard API with a fallback to `execCommand`. Check that the browser has clipboard permission for local files, or try a different browser.

---

## Browser Compatibility

Chrome, Firefox, Safari, Edge — any modern browser with JavaScript enabled. Works when opened via `file://` with no server. Requires localStorage support (disabled in some private/incognito modes).

The only external resource is Google Fonts (Work Sans and JetBrains Mono), loaded from `fonts.googleapis.com`. The app functions fully without it — the browser will fall back to system fonts.

---

## Changelog

| Version | Changes |
|---------|---------|
| 3.3 | SFC Inventory integration: incoming queue processing on page load and window focus; `from inventory` badge on imported tasks; `From Inventory` column in CSV; publishes `tm_types` to localStorage on every config load |
| 3.2 | Multi-session timer with full sessions log; Stop button available from both running and paused states |
| 3.1 | Priority ranking (1/2/3 buttons); collapsible task cards; Rework checkbox |
| 3.0 | Three-tab layout (Tasks / Notes / Text Blocks); dark/light mode; config.js external configuration |

---

**Version:** 3.3  
**Last updated:** March 2026  
**Dependencies:** None (Google Fonts loaded remotely for typography only)
