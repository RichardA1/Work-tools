# Task Manager

A streamlined task management application with dark/light mode, time tracking, notes, quick-copy text blocks, priority ranking, and collapsible task cards.

## File Structure

```
task-manager.html    # Application (HTML, CSS, JavaScript)
config.js            # Configuration — edit this to customize the app
README.md            # This documentation
```

Both files must be in the same folder. Just open `task-manager.html` in a browser — no server required.

---

## Features Overview

### Three-Tab Interface
- **Tasks** — Manage tasks with part numbers, types, time tracking, and status
- **Notes** — Freeform note-taking with auto-save
- **Text Blocks** — Quick-copy text snippets, including multiline content

### Task Management
- **Color-Coded Status**
  - 🟡 **Yellow** — New tasks (not yet started)
  - 🟠 **Orange** — Started tasks (in progress)
  - 🟢 **Green** — Completed tasks
  - 🔴 **Red** — Rework tasks (marked for rework)
- **Add Tasks** — Part number (50 char max) + type selection
- **Delete Tasks** — Individual task deletion with confirmation
- **Copy Actions** — Click part numbers or times to copy instantly
- **Status Dropdown** — Configurable status field for each task
- **Task Notes** — Add notes to any task via popup modal (📝 button)
- **Note Preview** — See note snippets inline with action buttons
- **Rework Indicator** — Checkbox to flag tasks requiring rework
- **URL Links** — Click link button (🔗) to open part number in configured URL

### Priority Ranking
Each incomplete task can be assigned a priority using the **1 / 2 / 3** circle buttons on the Type line:
- **1** — High priority (red)
- **2** — Medium priority (orange)
- **3** — Low priority (yellow)

Clicking an active priority button a second time deselects it. The task list sorts incomplete tasks by priority first (1 → 2 → 3 → unprioritized), then by creation date. Priority is automatically cleared when a task is marked complete.

### Collapsible Tasks
Each task card has a **▼ / ▶ collapse button** at the top-right. Click it to minimize the task to just the part number row, saving vertical space when managing long lists. State is saved in localStorage and persists across reloads.

### Time Tracking
- **Start/Stop/Reset** — Three-state time tracking per task
- **12-Hour Format** — Displays as HH:MM AM/PM
- **Auto-Complete** — Clicking Stop marks the task complete and clears its priority
- **Clickable Times** — Click any start or stop time to copy it

### Menu System
Access the hamburger menu (☰) in the top-right corner for:
- **Save CSV** — Export all tasks to a CSV file
- **Clear All** — Remove all tasks at once
- **Dark Mode Toggle** — Switch between dark and light themes
- **View README** — Open documentation in a new tab

### Data Persistence
- Tasks stored in browser localStorage (including minimize state and priority)
- Notes auto-save as you type
- Theme preference remembered
- Survives page reloads and browser restarts

---

## Getting Started

### Installation
1. Download `task-manager.html` and `config.js` into the same folder
2. Open `task-manager.html` in any modern browser
3. Start using immediately — no setup or server required

### First Launch
The app loads with three example tasks to demonstrate the interface. Delete these and add your own using the form in the footer.

---

## Using the Application

### Adding Tasks
1. Click the **Tasks** tab (if not already active)
2. Scroll to the footer at the bottom
3. Enter a part number (up to 50 characters)
4. Select a type from the dropdown
5. Click **Add Task**

The new task appears at the top with a yellow left border.

### Setting Priority
On any incomplete task, click the **1**, **2**, or **3** circle buttons on the Type line. The list re-sorts automatically. Click the active button again to remove the priority.

### Collapsing Tasks
Click **▼** at the top-right of any task card to collapse it to a single line. Click **▶** to expand it again.

### Time Tracking Workflow
Each task's time button cycles through three states:

1. **Start** — Records the current time as start time; task turns orange
2. **Stop** — Records stop time; task auto-completes, turns green, priority is cleared
3. **Reset** — Clears both times and completion status; task returns to yellow

### Copying Information
Click directly on any of these to copy to clipboard:
- Part numbers (via the 📄 button)
- Start times
- Stop times

### Opening Part Number Links
If a URL template is configured in `config.js`:
1. Click the 🔗 button next to any part number
2. Opens the configured URL with the part number substituted in
3. The window is named after the part number, so clicking again reuses it

### Managing Tasks
- **Mark Complete** — Check the checkbox (or use Stop); priority is cleared automatically
- **Change Status** — Use the status dropdown on the task card
- **Mark as Rework** — Check the "Rework" checkbox; border turns red
- **Delete** — Click 🗑️ with confirmation
- **Clear All** — Menu (☰) → Clear All

### Adding Task Notes
1. Click the 📝 button on any task (bottom-left of the card)
2. Type your note in the popup (supports multiple lines)
3. Click **Save**, press **Escape**, or click outside to close
4. A note preview appears inline next to the 📝 button

### Using the Notes Tab
Click the **Notes** tab and type freely. Notes save automatically after a brief pause — watch for the green "Saved" indicator in the bottom-right.

### Using Text Blocks
1. Click the **Text Blocks** tab
2. Browse your configured snippets — multiline blocks display with full formatting
3. Click 📄 to copy any block's full text to the clipboard

### Switching Themes
Menu (☰) → toggle **Dark Mode**. Preference is saved automatically.

### Exporting Data
Menu (☰) → **Save CSV** — downloads as `tasks_YYYY-MM-DD.csv`.

---

## Interface Layout

```
┌─────────────────────────────────────────┐
│ Task Manager                         ☰  │ ← Header with menu
├─────────────────────────────────────────┤
│ [Tasks] [Notes] [Text Blocks]           │ ← Tabs
├─────────────────────────────────────────┤
│                                         │
│  ☐ PART-NUMBER  📄 🔗              ▼   │ ← Part number row + minimize
│    Type: Option 1        [1] [2] [3]    │ ← Type + priority buttons
│    Status: [dropdown]  □ Rework         │ ← Status + rework
│    📝  note preview...   [Start] [🗑️]   │ ← Notes left, actions right
│                                         │
├─────────────────────────────────────────┤
│ Task Counter                            │
│ [Part Number Input]  [Type Dropdown]    │ ← Footer (Tasks tab only)
│ [Add Task Button]                       │
└─────────────────────────────────────────┘
```

---

## Configuration

All configuration lives in **`config.js`** — a plain JavaScript file in the same folder as `task-manager.html`. Open it in any text editor (Notepad, VS Code, etc.), make your changes, save, and refresh the app.

If `config.js` cannot be found or contains a syntax error, a red error banner appears at the top of the app.

### config.js Structure

```js
var TASK_MANAGER_CONFIG = {

    types: [
        "Option 1",
        "Option 2",
        "Option 3"
    ],

    statusOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
    ],

    textBlocks: [
        { label: "Sample 1",  text: "Sample 1" },
        { label: "Sample 2",  text: "Sample 2" },
        { label: "Multiline", text: "Line one\nLine two\nLine three" }
    ],

    urlTemplate: "https://example.com/search?q={partNumber}"

};
```

### Customizing Task Types
```js
types: [
    "Urgent",
    "Normal",
    "Low Priority",
    "Research"
],
```

### Customizing Status Options
```js
statusOptions: [
    { label: "Pending",     value: "pending"     },
    { label: "In Progress", value: "in_progress" },
    { label: "Complete",    value: "complete"    }
],
```

Each option has:
- **label** — What the user sees in the dropdown
- **value** — What gets stored internally and exported to CSV

### Customizing Text Blocks
```js
textBlocks: [
    { label: "Status Update",   text: "Awaiting review from supervisor" },
    { label: "Email Sign-off",  text: "Thanks,\nJohn Smith\njohn@example.com" },
    { label: "Instructions",    text: "Step 1: Do this\nStep 2: Do that\nStep 3: Done" }
],
```

Use `\n` anywhere in the `text` value to insert a line break. The full formatted text (with real newlines) is what gets copied to the clipboard when you click 📄.

### Customizing the URL Template
```js
// Internal system
urlTemplate: "http://internal.company.com/part/{partNumber}"

// Google search
urlTemplate: "https://www.google.com/search?q={partNumber}"

// Multiple query parameters — & works normally, no escaping needed
urlTemplate: "https://example.com/search?q={partNumber}&filter=active"

// Disable the link button entirely
urlTemplate: ""
```

`{partNumber}` is replaced with the actual part number (URL-encoded automatically).

---

## Technical Details

### File Structure
```
task-manager.html    # Application (HTML + CSS + JavaScript)
config.js            # External configuration file
README.md            # Documentation
```

### Data Storage
**Tasks** — localStorage key: `tasks`
```json
{
  "id": 1704412800000,
  "partNumber": "PCB-2024-001",
  "type": "Option 1",
  "status": "option1",
  "priority": 1,
  "minimized": false,
  "startTime": "2:45 PM",
  "stopTime": "3:30 PM",
  "completed": true,
  "isRework": false,
  "note": "Needs inspection",
  "createdAt": "2025-01-05T12:00:00.000Z"
}
```

**Notes** — localStorage key: `notes` (plain text string)

**Theme** — localStorage key: `theme` (`"dark"` or `"light"`)

### Task Sort Order
Incomplete tasks sort by priority first (1 → 2 → 3 → unprioritized), then by creation date (newest first). Completed tasks always appear at the bottom.

### CSV Export Format
```
Part Number,Type,Status,Start Time,Stop Time,Completed,Rework,Note,Created Date
"PCB-2024-001","Option 1","Pending","2:45 PM","3:30 PM","Yes","No","Needs inspection","2/25/2026"
```

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (modern versions)
- JavaScript required
- localStorage API required
- Clipboard API with fallback
- No external dependencies (except Google Fonts)
- Works when opened directly via `file://` — no server required

---

## Design Features

### Dark Mode (Default)
- Background: `#0f172a` · Surface: `#1e293b` · Primary: `#60a5fa` · Accent: `#fb923c`

### Light Mode
- Background: `#f8fafc` · Surface: `#ffffff` · Primary: `#2563eb` · Accent: `#ea580c`

### Priority Colors
- **1 — High:** Red `#ef4444` · **2 — Medium:** Orange `#f97316` · **3 — Low:** Yellow `#eab308`

### Status Colors
- 🟡 New — `#facc15` · 🟠 Started — `#fb923c` · 🟢 Complete — `#4ade80` · 🔴 Rework — `#ef4444`

### Typography
- **UI Text** — Work Sans · **Part Numbers & Times** — JetBrains Mono

---

## Tips & Best Practices

- Use **priority 1** sparingly to keep rankings meaningful
- Collapse completed tasks (or let them sink to the bottom) to stay focused on active work
- Tasks re-sort instantly when priority changes — no manual reordering needed
- Use `\n` in text block values for email templates, multi-step instructions, or any snippet that needs line breaks
- Export to CSV regularly — localStorage can be cleared by the browser
- Keep `config.js` in version control so your customizations are preserved

---

## Keyboard Shortcuts
- **Enter** — Submit Add Task form (when inputs are focused)
- **Escape** — Close note modal or menu dropdown

---

## Troubleshooting

**Config error banner appears on load**
→ Make sure `config.js` is in the same folder as `task-manager.html` and that the filename is exactly `config.js`.

**Types / statuses not updating after editing config.js**
→ Hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R) to bypass the script cache.

**Syntax error after editing config.js**
→ Check for missing commas between entries, unmatched `{` / `}` brackets, or unescaped quotes inside strings. VS Code will highlight syntax errors as you type.

**Tasks disappeared**
→ Browser localStorage was cleared. Export to CSV regularly as a backup.

**Copy not working**
→ Check browser clipboard permissions. The app falls back to `execCommand` if the Clipboard API is unavailable.

**Notes not saving**
→ Check the browser console for localStorage errors. Some browsers restrict localStorage in private/incognito mode.

---

## Privacy & Security
- All data stored locally in your browser
- No network requests except loading Google Fonts
- No tracking, analytics, or user accounts
- Works fully offline after first load

---

## Version Information
**Version:** 3.1
**Last Updated:** March 2026
**File Type:** Two-file application (HTML + JS config)
**Dependencies:** None (Google Fonts loaded remotely)

---

## License
Free to use and modify for personal or commercial purposes.

---

*Made with ❤️ for efficient task tracking*
