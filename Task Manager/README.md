# Task Manager

A streamlined, single-page task management app with time tracking, priority ranking, collapsible cards, notes, quick-copy text blocks, in-app Settings GUI, and direct integration with the SFC Inventory app.

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
- **▼ / ▶ Collapse button** — minimizes the card to just the part number row to save space; state is remembered across reloads
- **Type** — the task type selected at creation
- **Priority buttons (1 / 2 / 3)** — set task priority; hidden on completed tasks
- **Status dropdown** — configurable options from `config.js`
- **Rework checkbox** — flags the task for rework; turns the left border red
- **First Start** — timestamp of the first timer session; shows a `×N` badge when multiple sessions exist; click to copy
- **Last Stop** — timestamp of the most recent stop; shows `● live` while the timer is running; click to copy
- **Sessions log** — numbered list of every start/stop pair, shown when at least one session exists
- **📝 Note button** — opens the note editor popup; a truncated preview of the note appears inline when one exists
- **Secondary link button** — a text-label button (e.g. "View ERP") near the timer controls; configurable in `config.js`
- **Start / Pause / Stop timer buttons**
- **🗑️ Delete button** — removes the task after confirmation

#### Timer States and Part Number Colours

| Colour | Meaning |
|--------|---------|
| Default (no highlight) | Task not started |
| Green pill | Timer running |
| Yellow pill | Timer paused |
| Faded / strikethrough | Task completed |

#### Primary Link (🔗 icon button)

Appears in the **part number row**. Opens the configured URL with the part number substituted in.

Configured via `urlTemplate` in `config.js`. Set to `""` to hide it entirely.

#### Secondary Link (text label button)

Appears in the **task actions row**, near the Start/Stop timer buttons. Unlike the primary link, this button displays a short text label (e.g. "View ERP", "Jira", "Open SAP") so it is easy to identify at a glance when both links are in use.

Configured in `config.js` via two settings:
- `secondaryUrlTemplate` — the URL to open; use `{partNumber}` as the placeholder. Set to `""` to hide the button entirely.
- `secondaryUrlLabel` — the text shown on the button. Keep it short (1–3 words). Defaults to `"Open"` if omitted or blank.

Both link buttons open their target in a popup window sized 1200 × 800 px, the same as one another.

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
| ⚙️ Settings | Opens the in-app Settings GUI |
| Dark Mode | Toggles light/dark theme; preference saved |
| View README | Opens `README.md` in a new tab |

---

### ⚙️ Settings GUI

All configuration options can be edited directly from within the app — no text editor or file reload required.

Open via **☰ → ⚙️ Settings**.

#### What you can configure

| Section | What you can do |
|---------|----------------|
| **Task Types** | Add, edit, delete, and reorder the type options shown in the Add Task form and on each card |
| **Status Options** | Add, edit, and delete status dropdown entries; each has a **Label** (shown in the UI) and a **Value** (stored internally and exported to CSV) |
| **Text Blocks** | Add, edit, delete, and reorder quick-copy snippets; each has a label and a body (multi-line supported) |
| **URL Settings** | Set the primary link template, secondary link template, and secondary button label |

#### How changes are saved

The Settings GUI uses a **two-layer save strategy**:

1. **Apply** — clicking **Apply** saves your settings to browser localStorage (`tm_config_override`) and applies them immediately. No page refresh needed. Changes persist across sessions.

2. **Download config.js** — clicking **⬇ config.js** generates and downloads an updated `config.js` file that matches your current settings. Replace the existing `config.js` in your project folder with this file to make the changes permanent on disk.

> **Best practice:** After finalizing your settings, always download and replace `config.js`. This keeps the file in sync and ensures the app works correctly in any browser (not just the one where you used the Settings GUI).

#### Reset to config.js

The **Reset to config.js** link (bottom-left of the Settings panel) discards all browser-saved overrides and reverts the app to whatever is in `config.js`. Use this if your localStorage overrides get out of sync with the file.

#### Storage key

The browser-saved settings are stored under the localStorage key `tm_config_override`. This key takes precedence over `config.js` at startup when present.

---

### SFC Inventory Integration

Tasks can be sent directly from the SFC Inventory app into Task Manager using the send icon button on each inventory item.

**What Task Manager does:**
- On every page load and every time the browser tab regains focus, Task Manager checks for queued items in the shared `tm_incoming_queue` localStorage key
- Any queued items are imported as new tasks immediately — no manual action required
- Task Manager switches to the Tasks tab automatically and shows a **📥 N task(s) imported from SFC Inventory** toast notification
- Imported tasks have `fromInventory: true`, which displays a `from inventory` badge next to the part number and adds a `From Inventory: Yes` column in CSV exports

**Type publishing:**
Every time Task Manager loads and parses `config.js`, it writes its configured task types to the `tm_types` localStorage key.

SFC Inventory reads this key to populate the type dropdown in its Send dialog. This happens automatically — no setup needed beyond opening Task Manager at least once.

**Requirement:** Both HTML files must be open in the same browser (same browser profile). The bridge is entirely localStorage — no network is involved.

---

## Configuration

All customization lives in `config.js` — a plain JavaScript file in the same folder as `task-manager.html`. You can edit it in two ways:

**Option A — In-app Settings GUI (recommended)**
Open **☰ → ⚙️ Settings**, make your changes, click **Apply** to take effect immediately, then click **⬇ config.js** to download and replace the file on disk.

**Option B — Text editor**
Edit `config.js` directly in any text editor, save, and hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R).

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

    // ── Primary URL Template ──────────────────────────────────────────────
    // Enables the 🔗 icon button in the part number row.
    // {partNumber} is replaced with the actual part number (URL-encoded).
    // Set to "" to hide the button entirely.
    urlTemplate: "https://example.com/search?q={partNumber}",

    // ── Secondary URL Template ────────────────────────────────────────────
    // Enables a text-label button near the Start / Stop timer buttons.
    // {partNumber} is replaced with the actual part number (URL-encoded).
    // Set secondaryUrlTemplate to "" to hide the button entirely.
    // secondaryUrlLabel sets the text on the button (keep it short: 1–3 words).
    secondaryUrlTemplate: "https://example.com/erp?q={partNumber}",
    secondaryUrlLabel:    "View ERP",

};
```

---

## localStorage Keys

| Key | Written by | Purpose |
|-----|-----------|---------|
| `tm_tasks` | Task Manager | Saved task list |
| `tm_notes` | Task Manager | Notes tab content |
| `tm_config_override` | Settings GUI | Browser-saved config overrides (takes precedence over config.js) |
| `tm_types` | Task Manager (on load) | Published type list for SFC Inventory |
| `tm_incoming_queue` | SFC Inventory (on send) | Queued items awaiting Task Manager import |

---

## Troubleshooting

**Config error banner at the top**
`config.js` is missing from the folder, or it contains a JavaScript syntax error. Check the file location and open the browser console (F12) for the specific error message. Hard-refresh after fixing (Ctrl+Shift+R / Cmd+Shift+R). This bypasses the script cache.

**Settings applied in the GUI but not showing after refresh**
The browser-saved settings (`tm_config_override`) should load automatically. If they don't, check that localStorage is available (disabled in some private/incognito modes). Re-apply in Settings and refresh.

**Settings GUI showing old values after editing config.js directly**
The `tm_config_override` localStorage key takes precedence over `config.js`. Open **⚙️ Settings → Reset to config.js** to clear the override and reload from the file.

**Tasks disappeared**
Browser localStorage was cleared (e.g. by clearing browsing history). Export to CSV regularly to keep a backup outside the browser.

**Secondary link button not appearing**
Verify that `secondaryUrlTemplate` is set to a non-empty string in `config.js` (or via Settings) and that you have refreshed after saving the file.

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

## Best Practices

- **Keep config.js in sync** — after making changes in the Settings GUI, always use **⬇ config.js** to download and replace the file. This ensures that if you clear your browser data or open the app in a different browser, your settings are not lost.
- **Export CSV regularly** — task data lives in localStorage. Any browser history clear or site data wipe will erase your tasks. Export a CSV backup periodically.
- **Hard-refresh after editing config.js** — if you edit `config.js` directly in a text editor, use Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac) to ensure the browser loads the new version rather than a cached copy.
- **Status values should be lowercase, no spaces** — `value` fields in `statusOptions` are stored in CSV exports. Use simple lowercase identifiers (e.g. `in_progress` not `In Progress`) for clean data.
- **Text Block line breaks** — in `config.js`, use the literal two-character sequence `\n` inside a string to insert a line break. In the Settings GUI text block editor, press Enter normally.
- **URL templates** — always test your URL templates with a representative part number. If the part number contains special characters, they are URL-encoded automatically.

---

## Changelog

| Version | Changes |
|---------|---------|
| 3.5 | In-app Settings GUI: edit all config.js options from the browser with live apply; download updated config.js; `tm_config_override` localStorage layer for immediate persistence |
| 3.4 | Secondary URL button: configurable text-label link button near timer controls, set via `secondaryUrlTemplate` and `secondaryUrlLabel` in config.js |
| 3.3 | SFC Inventory integration: incoming queue processing on page load and window focus; `from inventory` badge on imported tasks; `From Inventory` column in CSV; publishes `tm_types` to localStorage on every config load |
| 3.2 | Multi-session timer with full sessions log; Stop button available from both running and paused states |
| 3.1 | Priority ranking (1/2/3 buttons); collapsible task cards; Rework checkbox |
| 3.0 | Three-tab layout (Tasks / Notes / Text Blocks); dark/light mode; config.js external configuration |

---

**Version:** 3.5  
**Last updated:** April 2026  
**Dependencies:** None (Google Fonts loaded remotely for typography only)
