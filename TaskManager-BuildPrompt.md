# TASK MANAGER APP BUILD PROMPT

## Overview

You are tasked with building a **Task Manager web application** using **React/JavaScript**. This is a feature-rich, single-page task management app with time tracking, priority ranking, collapsible cards, notes management, customizable settings, completion rule automation, and integration capabilities.

The app can use modern build tools and can be organized into separate component files, CSS modules, and npm packages for better code organization and maintainability.

---

## Core Application Architecture

### Technology Stack
- **Framework:** React with modern tooling (Create React App, Vite, Next.js, or similar)
- **Styling:** CSS Modules, Tailwind CSS, or CSS-in-JS (your choice)
- **State Management:** React hooks (useState, useEffect, useCallback, useRef) or Redux/Zustand if needed
- **Persistence:** Browser localStorage
- **Build Tool:** Any modern bundler (webpack, Vite, etc.)
- **Package Manager:** npm, yarn, or pnpm
- **Browser Support:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### File Structure

```
task-manager/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TabNav.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TasksTab.jsx
│   │   ├── NotesTab.jsx
│   │   ├── TextBlocksTab.jsx
│   │   ├── LinksTab.jsx
│   │   ├── TaskFooter.jsx
│   │   ├── SettingsModal.jsx
│   │   ├── NoteEditorModal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── ToastContainer.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTimer.js
│   │   └── useConfig.js
│   ├── utils/
│   │   ├── taskHelpers.js
│   │   ├── storageHelpers.js
│   │   ├── csvExport.js
│   │   └── dateFormatting.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── public/
│   └── config.js                 (Optional: initial configuration)
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── config.js                     (Configuration file - in repo root for easy editing)
```

**Key points:**
- `src/` contains all application code
- `components/` folder for React components
- `hooks/` folder for custom React hooks
- `utils/` folder for helper functions
- `styles/` folder for CSS files (or co-locate with components if using CSS Modules)
- `config.js` in the root or `public/` folder for user configuration
- Modern project structure allows for scalability and better code organization

---

## Data Model

### Task Object Structure

Each task is a JavaScript object with the following properties:

```javascript
{
  id: string,                    // Unique identifier (UUID or timestamp-based)
  partNumber: string,            // Main identifier (e.g., "PART-12345")
  type: string,                  // Task type (from config.types)
  status: string,                // Status value (from config.statusOptions)
  priority: number,              // Priority level: 1, 2, or 3
  rework: boolean,               // Rework flag (affects visual styling)
  notes: string,                 // Freeform task notes
  firstStart: string|null,       // ISO timestamp of first timer start
  lastStop: string|null,         // ISO timestamp of last timer stop
  sessions: [                    // Array of timer sessions
    {
      start: string,             // ISO timestamp
      stop: string|null          // ISO timestamp (null if running)
    }
  ],
  pendingActivation: boolean,    // True if auto-created by completion rule
  collapsed: boolean,            // Collapse state (persisted)
  fromInventory: boolean,        // Badge indicator (task from SFC Inventory)
  createdAt: string,             // ISO timestamp of task creation
}
```

### localStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `tasks` | JSON array | All task objects |
| `notes` | string | Notes tab freeform text |
| `tm_config_override` | JSON object | Browser-side config overrides |
| `tm_dark_mode` | boolean | Dark mode preference |
| `tm_types` | JSON array | Published task types (for SFC Inventory) |
| `tm_incoming_queue` | JSON array | Tasks from SFC Inventory awaiting import |

### Configuration Object (config.js)

```javascript
var TASK_MANAGER_CONFIG = {
  types: [string, ...],                    // Array of task type names
  statusOptions: [{label: string, value: string}, ...],  // Status dropdown options
  textBlocks: [{label: string, text: string}, ...],      // Quick-copy text snippets
  urlTemplate: string,                     // Primary URL with {partNumber} placeholder
  secondaryUrlTemplate: string,            // Secondary URL with {partNumber} placeholder
  secondaryUrlLabel: string,               // Label for secondary link button
  completionRules: [{triggerType: string, outputType: string}, ...],  // Auto-create rules
  links: [{title: string, url: string, desc: string}, ...] // Saved reference links
};
```

---

## User Interface Layout

### Overall Structure

```
┌─────────────────────────────────────────────────────────┐
│  Task Manager                                        ☰  │  Header
├─────────────────────────────────────────────────────────┤
│  [Tasks] [Notes] [Text Blocks] [Links]                 │  Tab Navigation
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Task Cards - scrollable content area]                │  Main Content
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Task Counter | Add Task Form (Tasks tab only)         │  Footer
└─────────────────────────────────────────────────────────┘
```

### Header
- **Title:** "Task Manager"
- **Menu button (☰):** Hamburger menu in top-right
  - Save CSV
  - Clear All (with confirmation)
  - ⚙️ Settings
  - Dark Mode toggle
  - View README (opens in new tab)

### Tab Navigation
- **Tabs:** Tasks | Notes | Text Blocks | Links
- **Appearance:** Horizontal tab buttons, active tab highlighted
- **Active state:** Underline or background color change

### Tasks Tab Layout

#### Task Card (Expanded)
Each task is displayed as a card with the following structure:

```
┌───────────────────────────────────────────────────────┐
│ ☐  PART-NUMBER  📄 🔗  [from inventory]  ⭐ pending  ▼│  Row 1
│    Type: Option 1      [1] [2] [3]                   │  Row 2
│    Status: [dropdown]  ☐ Rework                      │  Row 3
│    FIRST START ×2    LAST STOP ×2                    │  Row 4
│    ── Sessions ──────────────────────────────────────│  Row 5
│    1  2:45 PM → 3:10 PM                              │  Session 1
│    2  3:30 PM → ● running                            │  Session 2
│    📝  note preview…  [Secondary][⏸][■]  [🗑️]      │  Row 6
│                                                       │
└───────────────────────────────────────────────────────┘
```

**Row 1: Header Row**
- **☐ Checkbox:** Mark task complete; stops any running timer
- **Part number pill:** Monospace font, color-coded by timer state
  - Yellow: Not started
  - Orange: Running
  - Purple: Paused
  - Green: Completed
  - Red: Rework flagged
  - Yellow with border: Pending activation
- **📄 Copy button:** Copies part number to clipboard
- **🔗 Link button:** Opens primary URL (hidden if no template configured)
- **[from inventory] badge:** Shown if task came from SFC Inventory
- **⭐ pending badge:** Shown if task is awaiting activation
- **▼/▶ Collapse button:** Toggles card expanded/collapsed state

**Row 2: Type & Priority**
- **Type label:** Non-editable display
- **Priority buttons [1] [2] [3]:** Hidden on completed and pending tasks
  - Visual indicator of selected priority
  - Click to set priority

**Row 3: Status & Rework**
- **Status dropdown:** Populated from config.statusOptions
  - Displays {label, value}
- **☐ Rework checkbox:** Toggles rework flag; turns left border red when checked

**Row 4: Time Fields**
- **FIRST START label and value:** ISO timestamp (or "not started"), click to copy
- **×2 button:** Duplicates the first start time to lastStop (for preset time spans)
- **LAST STOP label and value:** ISO timestamp, click to copy
- **×2 button:** Similar functionality

**Row 5: Sessions Log Header**
- **"── Sessions ────"** — visual separator

**Session Rows:**
- **Session number, start time → stop time** (e.g., "1  2:45 PM → 3:10 PM")
- **Running session:** Shows "● running" instead of stop time
- Format times in HH:MM AM/PM
- Each session on its own line

**Row 6: Notes & Timer Controls**
- **📝 Note button:** Opens modal editor; shows preview text
- **Secondary link button:** Text-labeled button (e.g., "[View ERP]") using config.secondaryUrlLabel; hidden if no template
- **Timer buttons (contextual):**
  - **⏸ Pause:** Shown when timer is running
  - **■ Resume:** Shown when timer is paused
  - **⭐ Activate:** Shown only on pending tasks; unlocks timer controls
- **🗑️ Delete button:** Removes task after confirmation

**Card Styling:**
- **Border:** Left border color indicates status
  - Yellow border: Not started
  - Orange border: Running
  - Purple border: Paused
  - Green border: Completed
  - Red border: Rework flagged
  - Yellow with badge: Pending activation
- **Disabled state:** Completed and pending tasks have reduced opacity
- **Spacing:** Cards stacked vertically with consistent padding and margins

#### Task Card (Collapsed)
When collapsed, only show:
```
☐  PART-NUMBER  📄 🔗  [badges]  ▶
```

#### Task Counter & Add Task Form (Footer)
Shown **only on Tasks tab** in a fixed footer:

```
┌─────────────────────────────────────────────────────┐
│ X active, Y completed                              │
│ Part Number: [__________]                          │
│ Type:        [dropdown]                            │
│                 [ADD TASK]                          │
└─────────────────────────────────────────────────────┘
```

- **Task Counter:** "X active, Y completed" (auto-updated)
- **Part Number input:** Text field for new task ID
- **Type dropdown:** Populated from config.types
- **Add Task button:** Creates task; clears form fields; focuses part number input

### Notes Tab
- **Simple text area:** Freeform notes
- **Auto-save:** Saves to localStorage on every keystroke (debounced)
- **Placeholder:** "Your notes here…"

### Text Blocks Tab
- **List of blocks:** Each with label and content
- **Layout:** One block per row
  - Block label (bold or highlighted)
  - Preview of text content (truncated to ~100 chars)
  - **📄 Copy button:** Copies full text to clipboard
  - **Toast notification:** "Copied to clipboard"

### Links Tab
- **List of saved links:** Each clickable
- **Layout:**
  - **Title:** Blue, underlined (link style)
  - **Description:** Gray text below title
  - **⚙️ Manage button:** Opens Settings, scrolls to Saved Links section
- **On click:** Opens link in new window/tab

---

## Settings GUI (⚙️ Settings Modal)

Modal dialog accessible from ☰ Menu → ⚙️ Settings.

### Structure
- **Header:** "Settings"
- **Sections:** Scrollable form with expandable/collapsible sections
- **Buttons at bottom:**
  - **Apply:** Saves all changes to `tm_config_override` in localStorage
  - **⬇ config.js:** Downloads a file copy of current config
  - **Reset to config.js:** Discards browser overrides, reverts to file config

### Sections

#### 1. Task Types
- **Label:** "Task Types"
- **List of type entries:**
  - Text input field (current type name)
  - **⬆ / ⬇ buttons:** Reorder (move up/down)
  - **✕ Delete button:** Remove type
- **+ Add Type button:** Creates new empty type entry

#### 2. Status Options
- **Label:** "Status Options"
- **List of status entries:**
  - **Label field:** Display text
  - **Value field:** Actual value (lowercase, no spaces recommended)
  - **⬆ / ⬇ buttons:** Reorder
  - **✕ Delete button:** Remove status
- **+ Add Status button:** Creates new entry

#### 3. Text Blocks
- **Label:** "Text Blocks"
- **List of block entries:**
  - **Label field:** Block title
  - **Text area:** Block content
  - **⬆ / ⬇ buttons:** Reorder
  - **✕ Delete button:** Remove block
- **+ Add Block button:** Creates new entry
- **Note:** "Use \n for line breaks in text content"

#### 4. URL Settings
- **Label:** "URL Settings"
- **Primary URL Template:**
  - Input field
  - Placeholder: "https://example.com/search?q={partNumber}"
  - Note: "{partNumber} is replaced with the actual part number (URL-encoded)"
- **Secondary URL Template:**
  - Input field
  - Placeholder: "https://example.com/erp?q={partNumber}"
- **Secondary URL Button Label:**
  - Input field
  - Placeholder: "View ERP"
  - Note: "Button hidden if URL template is empty"

#### 5. Saved Links
- **Label:** "Saved Links"
- **List of link entries:**
  - **Title field:** Link name (optional)
  - **URL field:** Full URL
  - **Description field:** Brief description (optional)
  - **⬆ / ⬇ buttons:** Reorder
  - **✕ Delete button:** Remove link
- **+ Add Link button:** Creates new entry
- **Auto-behavior:** If URL lacks `https://`, prepend it automatically

#### 6. Completion Rules
- **Label:** "Completion Rules"
- **List of rule entries:**
  - **Trigger Type dropdown:** Select from configured types
  - **→ arrow:** Visual separator
  - **Output Type dropdown:** Select from configured types
  - **✕ Delete button:** Remove rule
- **+ Add Rule button:** Creates new entry
- **Explanation text:** "When a task of the Trigger Type is completed, a pending copy is created with the Output Type. You must click ⭐ Activate on the copy to start its timer."

---

## Features & Functionality

### 1. Task Creation

**Entry point:** Part Number and Type fields in footer (Tasks tab only)

**Behavior:**
1. User enters part number and selects a type
2. Click "ADD TASK" or press Enter
3. New task is created with:
   - Generated UUID (id)
   - Part number (from input)
   - Type (from dropdown)
   - Status: First status option from config
   - Priority: 1 (default)
   - Rework: false
   - Notes: empty string
   - Sessions: empty array
   - firstStart, lastStop: null
   - pendingActivation: false
   - collapsed: false
   - fromInventory: false
4. Task added to tasks array
5. Form fields cleared, focus returns to part number input
6. Task counter updates
7. Tasks array saved to localStorage
8. New task displays as expanded card at top of list

**Validation:**
- Part number is required (non-empty string)
- Type is required (selected from dropdown)
- If either is missing, show toast error: "Part number and type are required"

### 2. Task Editing

**Part Number:** Not directly editable; display only

**Type:** Not directly editable; display only

**Status:** Dropdown selection; updates immediately on change; saved to localStorage

**Priority:** Buttons [1] [2] [3]; click to set; hidden on completed/pending tasks

**Rework:** Checkbox toggle; changes card border to red when checked

**Notes:** Click 📝 button to open modal editor with textarea; auto-save on close

**First Start / Last Stop:** Click to copy to clipboard; show copy confirmation toast

**Sessions:** Display only; auto-populated by timer

**Collapse:** Click ▶/▼ button to toggle; state persisted in task object and localStorage

### 3. Task Completion

**Method 1: Checkbox**
- Click ☐ checkbox in header
- Task status changes to "Completed" (or equivalent final status from config)
- Any running timer immediately stops
- Task border turns green
- Part number pill turns green
- Priority buttons disappear
- Rework checkbox disappears
- Check if task type matches any completion rule
- If match found, trigger completion rule automation

**Method 2: Stop Button**
- Click ■ (Stop) button in timer controls
- Timer stops; last session records end time
- Task status set to "Completed"
- Triggers completion rule check (same as Method 1)

**Completion Rule Automation:**
1. When a task with type = `completionRule.triggerType` is completed
2. Create a new task with:
   - Same partNumber
   - Type = completionRule.outputType
   - Same notes, priority, rework flag
   - pendingActivation: true
   - All other fields reset (sessions empty, firstStart/lastStop null, etc.)
3. Add new task to tasks array
4. Save to localStorage
5. Display toast: "Follow-on task created and is awaiting activation"

### 4. Timer System

**State Machine:**

```
Not Started
    ↓ (Click Start)
Running
    ↓ (Click Pause)
Paused
    ↓ (Click Resume)
Running
    ↓ (Click Stop)
Completed
```

**Timer Controls:**
- **Start button:** Appears when timer is not running and task is not completed/pending
  - Starts a new session with current timestamp
  - Button changes to Pause
  - Part number pill turns orange
  - Card border turns orange
  - Elapsed time display updates every second

- **Pause button:** Appears when timer is running
  - Records current timestamp as session.stop (but doesn't mark complete)
  - Button changes to Resume
  - Part number pill turns purple
  - Card border turns purple

- **Resume button:** Appears when timer is paused
  - Closes current session (records timestamp)
  - Starts new session with current timestamp
  - Button changes to Pause
  - Colors update to orange

- **Stop button:** Appears when timer is running or paused
  - Records current timestamp as final session.stop
  - Marks task as completed
  - Updates lastStop timestamp
  - Sets status to completed
  - Colors update to green

**Session Tracking:**
- Each session = {start: ISO timestamp, stop: ISO timestamp or null}
- sessions array grows with each start/pause/resume/stop cycle
- Display in UI as numbered list: "1  2:45 PM → 3:10 PM" (formatted in 12-hour time)
- Running session shows "● running" instead of stop time
- lastStop is always set to the timestamp of the most recent stop

**Pending Activation:**
- If task.pendingActivation === true:
  - All timer buttons are hidden or disabled
  - Show **⭐ Activate button** instead
  - Clicking Activate sets pendingActivation = false
  - Removes ⭐ pending badge
  - Shows normal timer buttons
  - Does NOT start the timer (user must click Start)

**Elapsed Time Display:**
- Current session elapsed time shown near timer buttons
- Format: "HH:MM:SS"
- Updates every second while running
- Calculated from Date.now() - session.start

### 5. Rework Flag

**Behavior:**
- Checkbox in task card (Row 3)
- When checked:
  - Card left border turns red
  - Part number pill background turns red
  - Visual emphasis to alert user

**Purpose:** User flag for tasks that need to be reworked or reviewed

**Persistence:** Saved in task.rework boolean; persisted in localStorage

### 6. Collapse / Expand Cards

**Default:** All cards expanded on first load

**Behavior:**
- Click ▶/▼ button in header row
- Collapsed view shows only: `☐  PART-NUMBER  📄 🔗  [badges]  ▶`
- Expanded view shows full card
- Click again to expand
- State persisted in task.collapsed boolean
- State survives page reload

**Use case:** Manage screen real estate when working with many tasks

### 7. Copy Part Number

**Icon:** 📄 button in header row

**Behavior:**
- Click to copy part number to clipboard
- Show toast notification: "Part number copied"
- Uses Clipboard API (navigator.clipboard.writeText)
- Fallback: Show modal with text selected for manual copy if API unavailable

### 8. Primary URL Link

**Icon:** 🔗 button in header row

**Configuration:** `config.urlTemplate` (e.g., "https://example.com/search?q={partNumber}")

**Behavior:**
- If urlTemplate is empty (""), button is hidden
- On click:
  - Replace {partNumber} with task.partNumber (URL-encoded)
  - Open URL in new browser tab/window
  - Example: {partNumber} = "PART-123" → "https://example.com/search?q=PART-123"

**Edge case:** Handle special characters in part number (URL encoding)

### 9. Secondary URL Link

**Display:** Text-labeled button (e.g., "[View ERP]") in Row 6, near timer controls

**Configuration:**
- `config.secondaryUrlTemplate` (URL with {partNumber} placeholder)
- `config.secondaryUrlLabel` (button label text)

**Behavior:**
- If secondaryUrlTemplate is empty, button is hidden
- Otherwise, functions like primary URL but opens a different link
- Button label uses config.secondaryUrlLabel
- Useful for secondary reference (e.g., ERP system, data portal)

### 10. Notes Editor

**Icon:** 📝 button in Row 6

**Behavior:**
- Click to open modal dialog
- Modal shows:
  - Title: "Edit Notes"
  - Textarea with current task.notes content
  - "Save" and "Cancel" buttons
- On "Save":
  - Update task.notes
  - Close modal
  - Refresh task card to show updated preview
  - Save to localStorage
- Preview in card shows first ~100 characters of notes (or first line)
- Placeholder: "No notes"

### 11. Delete Task

**Icon:** 🗑️ button in Row 6

**Behavior:**
- Click to show confirmation modal
- Confirm dialog: "Delete this task? This cannot be undone."
- Options: "Delete" and "Cancel"
- On "Delete":
  - Remove task from tasks array
  - Save to localStorage
  - Update task counter
  - Remove card from DOM
  - Show toast: "Task deleted"
- Prevents accidental deletion

### 12. CSV Export

**Menu:** ☰ Menu → Save CSV

**Behavior:**
- Export all tasks to CSV file
- Filename: `tasks_YYYY-MM-DD.csv` (current date)
- Columns: partNumber, type, status, priority, rework, notes, firstStart, lastStop, totalTime, sessions, createdAt
- Rows: one per task
- Formatting:
  - Boolean values as "true" / "false"
  - Sessions formatted as comma-separated "start→stop" pairs
  - Times in ISO format or human-readable format (configurable)
- Trigger browser download dialog
- Uses Blob API to generate file

### 13. Clear All Tasks

**Menu:** ☰ Menu → Clear All

**Behavior:**
- Show confirmation modal: "Delete all tasks? This cannot be undone."
- On confirm:
  - Clear tasks array
  - Clear localStorage 'tasks' key
  - Remove all task cards from DOM
  - Task counter shows "0 active, 0 completed"
  - Show toast: "All tasks cleared"

### 14. Dark Mode

**Menu:** ☰ Menu → Dark Mode

**Behavior:**
- Toggle between light and dark themes
- Preference saved to localStorage as `tm_dark_mode` boolean
- Preference persists across sessions
- Affects:
  - Background color (white → dark gray/charcoal)
  - Text color (black → white)
  - Card backgrounds (light → dark)
  - Input/select backgrounds
  - Border colors
  - All UI elements adapt for readability

**CSS Variables (Recommended):**
```css
--bg-primary: #ffffff (light) / #1a1a1a (dark)
--bg-secondary: #f5f5f5 (light) / #2d2d2d (dark)
--text-primary: #000000 (light) / #ffffff (dark)
--text-secondary: #666666 (light) / #999999 (dark)
--border-color: #dddddd (light) / #444444 (dark)
-- accent-color: #007bff (blue)
--success-color: #28a745 (green)
--danger-color: #dc3545 (red)
--warning-color: #ffc107 (yellow)
```

### 15. SFC Inventory Integration

**Purpose:** Tasks can be sent from a separate SFC Inventory app into Task Manager

**Mechanism:**
1. SFC Inventory app places items in localStorage key `tm_incoming_queue`
2. Task Manager checks for `tm_incoming_queue` on:
   - Page load
   - Window focus event (user switches tabs)
3. For each item in queue:
   - Extract partNumber, type, notes (if provided)
   - Create task with fromInventory = true
   - Add to tasks array
   - Show toast: "Imported X task(s) from Inventory"
4. Clear `tm_incoming_queue` after import
5. Add "from inventory" badge to imported tasks

**Data Format (incoming queue item):**
```javascript
{
  partNumber: string,
  type: string,
  notes: string (optional)
}
```

**Publishing Task Types:**
- After config loads, publish `config.types` to localStorage key `tm_types`
- SFC Inventory reads this to populate its task type options
- Keep in sync when user adds/removes types in Settings

### 16. Settings GUI Persistence

**localStorage Key:** `tm_config_override`

**Behavior:**
1. On app startup:
   - Load config from `config.js` (if present)
   - Check localStorage for `tm_config_override`
   - If override exists, merge with config.js (override takes precedence)
2. When user clicks "Apply" in Settings:
   - Save current Settings state to `tm_config_override`
   - Update published types in `tm_types`
   - Show toast: "Settings saved"
3. When user clicks "Reset to config.js":
   - Delete `tm_config_override`
   - Reload config from `config.js`
   - Refresh app UI
   - Show toast: "Reset to config.js"
4. When user clicks "⬇ config.js":
   - Generate config.js file with current settings
   - Trigger browser download
   - Filename: `config.js`

**Merge Logic:**
- If both config.js and tm_config_override exist, override takes precedence
- Array fields (types, statusOptions, etc.) are completely replaced, not merged
- Preserve structure of nested objects

---

## Color & Timer State Mapping

### Part Number Pill & Card Border Colors

| State | Pill Color | Border Color | Condition |
|-------|-----------|---|-----------|
| Not Started | Yellow | Yellow | firstStart = null AND completed = false |
| Running | Orange | Orange | currentSession.stop = null AND not completed |
| Paused | Purple | Purple | Has sessions, not running, not completed |
| Completed | Green | Green | Task status = completed |
| Rework | Red | Red | rework = true (overrides other colors) |
| Pending Activation | Yellow | Yellow + ⭐ badge | pendingActivation = true |

### Priority Indicator
- Priority buttons show selected state (highlighted or toggled appearance)
- No color coding per priority level; button state indicates selection
- Default priority: 1

---

## Accessibility & Best Practices

### Keyboard Navigation
- Tab through form inputs, buttons, dropdowns
- Enter to submit forms
- Escape to close modals
- Arrow keys to navigate dropdowns and reorder lists

### Color Contrast
- Text on backgrounds must meet WCAG AA standards
- Especially important for dark mode
- Ensure pill colors are distinct from background

### ARIA Labels
- Add aria-label or aria-labelledby to buttons without visible text (☰, ☐, 📄, 🔗, 📝, 🗑️, etc.)
- Form inputs should have associated labels
- Modals should have aria-modal and role attributes
- Toast notifications: use role="status" or role="alert"

### Touch-Friendly UI
- Buttons minimum 44×44 pixels
- Adequate spacing between interactive elements
- Text inputs clearly visible with sufficient padding

### Form Validation
- Required fields: indicate visually (asterisk or required attribute)
- Error messages: clear and actionable
- Toast notifications for feedback (success, error, info)

### Data Persistence Best Practices
- Always save to localStorage after significant changes
- Implement debouncing for frequently-updated fields (notes textarea)
- Backup mechanism: regularly prompt users to export CSV
- Handle localStorage quota limits gracefully (show warning if storage is full)

### Settings Best Practice
- Status option values should be lowercase, no spaces (e.g., "in_progress" not "In Progress")
- Completion Rule type names are case-sensitive; must exactly match a configured type
- Always download and replace config.js after Settings changes to keep file in sync
- Warn user if browser localStorage is cleared (tasks will be lost if no backup)

---

## Error Handling & Edge Cases

### Config Loading
- If `config.js` is missing: show error banner; allow user to create default config or reset from browser
- If `config.js` has syntax error: show error message; fallback to tm_config_override or defaults
- Provide "Reset Config" button in header when error detected

### Timer Edge Cases
- If page is closed while timer is running: session remains open (no stop time)
  - On reload, show "Resume" button to close orphaned session and optionally start new one
- If user navigates away and returns: timer state persists; elapsed time recalculated from timestamps
- Prevent negative elapsed times due to clock skew (use lastStop as fallback)

### Completion Rule Edge Cases
- If Trigger Type is deleted from config after creating rule: show warning but don't break the rule
- If Output Type is deleted: create task but mark as "unknown type" or use first available type
- Multiple rules can share the same triggerType (all fire on completion)
- Only one rule per triggerType pair is typical; multiple are allowed

### localStorage Issues
- If localStorage is full (quota exceeded):
  - Show error toast: "Storage is full. Please export CSV and clear old tasks."
  - Attempt to save fails gracefully; user data not lost
- If localStorage is cleared by browser:
  - Warn user on next session
  - Suggest re-importing from CSV backup
  - Restore to factory defaults

### Cross-Tab Synchronization
- If user opens Task Manager in multiple tabs:
  - Each tab maintains its own in-memory state
  - localStorage is shared; last write wins
  - Consider storage event listener to detect changes in other tabs (nice-to-have)
  - Warn user if editing in multiple tabs simultaneously

---

## UI/UX Patterns

### Modals
- **Styles:** Dark overlay, centered card with padding
- **Close:** Escape key, Cancel button, or X button (top-right)
- **Focus trap:** Keep focus within modal when open
- **Backdrop click:** Usually close modal (implement thoughtfully)

### Dropdowns
- **Display:** Show current selection
- **On click:** Expand list or open select menu
- **Keyboard:** Arrow keys to navigate, Enter to select, Escape to close
- **Mobile:** Native select element or custom dropdown with touchable targets

### Toast Notifications
- **Position:** Bottom-right or top-center (consistent)
- **Duration:** 3-4 seconds auto-dismiss (unless error)
- **Types:** Success (green), Error (red), Info (blue)
- **Multiple toasts:** Stack vertically
- **Dismissible:** Click X or wait for auto-dismiss

### Confirmation Dialogs
- **Destructive actions:** Always confirm before delete/clear
- **Buttons:** "Confirm" (primary, red for danger), "Cancel" (secondary)
- **Message:** Clear description of action and consequences

### Form Inputs
- **Labels:** Always present (above or beside input)
- **Placeholders:** Hint text, not replacement for label
- **Feedback:** Visual error state (red border, error message below)
- **Auto-focus:** On modal open, focus first input

### Scrollable Areas
- **Main content:** Scrollable; fixed header and footer
- **Settings modal:** Scrollable form with sticky buttons at bottom
- **Lists (Text Blocks, Links):** Scrollable if many items

---

## Implementation Guidelines

### React Hooks Usage
- Use `useState` for task list, current tab, dark mode, settings state
- Use `useEffect` for:
  - Initial config load (on mount)
  - localStorage save (on data change)
  - Window focus listener (for Inventory integration)
  - Timer updates (every second)
- Use `useCallback` for event handlers to prevent unnecessary re-renders
- Use `useRef` for DOM focus management (modal inputs, etc.)

### Component Structure (Suggested)
```
<TaskManager>
  ├── <Header>
  ├── <TabNav>
  ├── <TasksTab>
  │   └── <TaskCard /> (multiple)
  ├── <NotesTab>
  ├── <TextBlocksTab>
  ├── <LinksTab>
  ├── <TaskFooter>
  ├── <SettingsModal>
  ├── <NoteEditorModal>
  ├── <ConfirmDialog>
  └── <ToastContainer>
```

### Performance Considerations
- Use code splitting and lazy loading for components (React.lazy, Suspense)
- Implement React.memo for TaskCard to prevent unnecessary re-renders
- Debounce localStorage saves (100-200ms)
- Debounce notes textarea input
- Optimize bundle size; consider tree-shaking unused code
- Implement virtual scrolling for large task lists (>500 tasks)
- Use development and production builds appropriately

### Project Setup
```bash
# Create project
npm create vite@latest task-manager -- --template react
# or
npx create-react-app task-manager

# Install dependencies (if needed)
npm install

# Development
npm run dev

# Production build
npm run build
```

### Configuration File
- **Location:** `config.js` in the `public/` folder or project root
- **Access:** Load via fetch() or import as ES module
- **Hot reload:** Consider implementing hot reload for config changes during development

### Browser APIs Used
- `localStorage` — data persistence
- `fetch()` or ES `import` — load config.js
- `navigator.clipboard.writeText()` — copy to clipboard
- `Blob` & `URL.createObjectURL()` — CSV file generation and download
- `Date` — timestamps, formatting
- `setInterval()` / `setTimeout()` — timer updates and debouncing
- `window.open()` — open URLs in new tabs
- `FileReader` API (optional) — if implementing file import features

### File Size Considerations
- Single HTML file should remain <200KB (unminified)
- Inline all CSS and JavaScript
- Minify before production deployment
- Compress if delivered over HTTP
- No external libraries (pure React + DOM APIs)

---

## Testing Checklist

### Core Features
- [ ] Create a task; verify it appears in list
- [ ] Edit task properties (type, status, priority, rework, notes)
- [ ] Delete a task; confirm dialog appears
- [ ] Collapse and expand cards; verify state persists after reload
- [ ] Copy part number; verify clipboard and toast
- [ ] Open primary URL link; verify substitution of {partNumber}
- [ ] Open secondary URL link; verify label and functionality

### Timer
- [ ] Start timer; verify elapsed time updates every second
- [ ] Pause timer; verify button changes to Resume
- [ ] Resume timer; verify new session created
- [ ] Stop timer; verify task marked complete and status updates
- [ ] Session logs display correctly (times formatted)
- [ ] Running session shows "● running" instead of stop time
- [ ] Complete task with running timer; timer stops automatically

### Completion Rules
- [ ] Create a completion rule (Trigger → Output)
- [ ] Complete a task matching the Trigger Type
- [ ] Verify follow-on task created with Output Type and ⭐ pending badge
- [ ] Click ⭐ Activate; verify badge disappears and Start button appears
- [ ] Delete completion rule; verify no new tasks created on completion

### Settings & Configuration
- [ ] Add task type in Settings; verify it appears in Add Task dropdown
- [ ] Delete task type; verify it's removed from dropdown
- [ ] Reorder task types; verify order is saved and persisted
- [ ] Add status option; verify it appears in Status dropdown
- [ ] Edit status label and value; verify changes reflected
- [ ] Add text block; verify it appears in Text Blocks tab
- [ ] Click 📄 copy button on text block; verify toast and clipboard content
- [ ] Set URL template; verify 🔗 button appears/disappears correctly
- [ ] Set secondary URL template and label; verify button displays with correct label
- [ ] Click "Apply"; verify settings saved to localStorage
- [ ] Click "⬇ config.js"; verify file downloads
- [ ] Click "Reset to config.js"; verify browser overrides cleared

### Persistence & Storage
- [ ] Reload page; verify all tasks are restored
- [ ] Clear browser localStorage; verify app reverts to config.js defaults
- [ ] Export CSV; verify file contains all tasks with correct columns
- [ ] Add tasks, export CSV; verify exported data includes new tasks
- [ ] Dark mode toggle; verify setting persists after reload
- [ ] Collapse card; reload page; verify card remains collapsed

### Dark Mode
- [ ] Toggle dark mode; verify all UI elements adapt
- [ ] Verify text contrast in dark mode meets accessibility standards
- [ ] Verify all colors (pills, borders, buttons) are visible in dark mode

### SFC Inventory Integration
- [ ] Place task in `tm_incoming_queue` localStorage (simulate SFC Inventory)
- [ ] Focus/reload Task Manager; verify task is imported
- [ ] Verify imported task has "from inventory" badge
- [ ] Verify `tm_incoming_queue` is cleared after import
- [ ] Verify published task types in `tm_types` key are current

### Responsive Design
- [ ] Test on desktop (1200px+)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px)
- [ ] Verify layout adapts, buttons remain clickable
- [ ] Verify modals are readable and usable on small screens

### Error Handling
- [ ] Close config.js file; reload page; verify error message and recovery
- [ ] Simulate localStorage quota exceeded; verify error handling
- [ ] Test with invalid config.js JSON; verify fallback behavior
- [ ] Fill up localStorage and attempt to save; verify graceful handling

### Browser Compatibility
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Verify clipboard API works (or fallback to manual copy)
- [ ] Verify file download works across browsers
- [ ] Test keyboard navigation and screen reader (basic ARIA)

---

## Success Criteria

The completed app should:

1. ✅ Load and display a clean, professional UI with four functional tabs
2. ✅ Allow users to create, edit, and delete tasks with all specified properties
3. ✅ Implement a fully functional multi-session timer with pause/resume
4. ✅ Support customizable task types, statuses, and text blocks via Settings GUI
5. ✅ Automatically create follow-on tasks via Completion Rules
6. ✅ Persist all data to localStorage and survive page reloads
7. ✅ Export tasks to CSV with proper formatting
8. ✅ Support dark/light theme toggle with persistence
9. ✅ Integrate with SFC Inventory app via shared localStorage
10. ✅ Provide a polished, responsive UI that works on desktop and mobile
11. ✅ Be organized into a proper React project with clean component structure
12. ✅ Use modern tooling and best practices (Vite/CRA, separate files, CSS organization)
13. ✅ Handle errors gracefully with helpful user feedback
14. ✅ Follow accessibility best practices (ARIA labels, keyboard navigation, color contrast)

---

## Version & Documentation

- **Current Version:** 4.1
- **Last Updated:** May 2026
- **Tech Stack:** React 18+ with modern tooling (Vite, Create React App, etc.)
- **Dependencies:** React, ReactDOM, and optional: utility libraries (lodash, date-fns, etc.)
- **Browser Support:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Node.js:** v16 or higher recommended

---

**This prompt is comprehensive and detailed enough for another AI to build the Task Manager app from scratch. Use it as a specification document and reference guide throughout development.**

---

## Appendix: Quick Reference

### localStorage Keys Overview
```javascript
// Main data
localStorage.tasks                   // JSON array of task objects
localStorage.notes                   // String (Notes tab content)
localStorage.tm_config_override      // JSON object (settings overrides)
localStorage.tm_dark_mode            // Boolean
localStorage.tm_types                // JSON array (published for SFC Inventory)
localStorage.tm_incoming_queue       // JSON array (from SFC Inventory)
```

### Config Structure
```javascript
var TASK_MANAGER_CONFIG = {
  types: [...string],
  statusOptions: [{label, value}, ...],
  textBlocks: [{label, text}, ...],
  urlTemplate: string,
  secondaryUrlTemplate: string,
  secondaryUrlLabel: string,
  completionRules: [{triggerType, outputType}, ...],
  links: [{title, url, desc}, ...]
};
```

### Task Object Template
```javascript
{
  id: "uuid-or-timestamp",
  partNumber: "PART-12345",
  type: "Option 1",
  status: "option1",
  priority: 1,
  rework: false,
  notes: "",
  firstStart: null,
  lastStop: null,
  sessions: [],
  pendingActivation: false,
  collapsed: false,
  fromInventory: false,
  createdAt: "2024-01-01T00:00:00Z"
}
```

### Common Task Calculations
```javascript
// Total time spent
const totalMs = task.sessions.reduce((sum, session) => {
  const start = new Date(session.start);
  const stop = session.stop ? new Date(session.stop) : new Date();
  return sum + (stop - start);
}, 0);

// Format elapsed time
const hours = Math.floor(totalMs / 3600000);
const minutes = Math.floor((totalMs % 3600000) / 60000);
const seconds = Math.floor((totalMs % 60000) / 1000);
const formatted = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

// Check if timer is running
const isRunning = task.sessions.length > 0 && !task.sessions[task.sessions.length - 1].stop;

// Format time in HH:MM AM/PM
const date = new Date(isoString);
const formatted = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
```

---

END OF PROMPT
