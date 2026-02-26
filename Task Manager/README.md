# Task Manager

A streamlined, single-file task management application with dark/light mode support, time tracking, notes, and quick-copy text blocks.

## Features Overview

### Three-Tab Interface
- **Tasks** — Manage tasks with part numbers, types, time tracking, and status
- **Notes** — Freeform note-taking with auto-save
- **Text Blocks** — Quick-copy text snippets for common phrases

### Task Management
- **Color-Coded Status**
  - 🟡 **Yellow** — New tasks (not yet started)
  - 🟠 **Orange** — Started tasks (in progress)
  - 🟢 **Green** — Completed tasks
  - 🔴 **Red** — Rework tasks (marked for rework)
- **Add Tasks** — Part number (50 char max) + type selection
- **Delete Tasks** — Individual task deletion with confirmation
- **Copy Actions** — Click part numbers or times to copy instantly
- **Status Dropdown** — Configurable status field for each task (e.g., Pending, In Progress, Complete)
- **Task Notes** — Add notes to any task via popup modal (📝 button)
- **Note Preview** — See note snippets inline with action buttons
- **Rework Indicator** — Checkbox to flag tasks requiring rework
- **URL Links** — Click link button (🔗) to open part number in configured URL

### Time Tracking
- **Start/Stop/Reset** — Three-state time tracking
- **12-Hour Format** — Displays as HH:MM AM/PM
- **Auto-Complete** — Clicking Stop automatically marks task complete
- **Clickable Times** — Click any start or stop time to copy it

### Menu System
Access the hamburger menu (☰) in the top-right corner for:
- **Save CSV** — Export all tasks to CSV file
- **Clear All** — Remove all tasks at once
- **Dark Mode Toggle** — Switch between dark and light themes
- **View README** — Open documentation in new tab

### Data Persistence
- Tasks stored in browser localStorage
- Notes auto-save as you type
- Theme preference remembered
- Survives page reloads and browser restarts

## Getting Started

### Installation
1. Download `task-manager.html`
2. Open it in any modern web browser
3. Start using immediately — no setup required

### First Launch
The app loads with three example tasks to demonstrate the interface. Delete these and add your own tasks using the form in the footer.

## Using the Application

### Adding Tasks
1. Click the **Tasks** tab (if not already active)
2. Scroll to the footer at the bottom
3. Enter a part number (up to 50 characters)
4. Select a type from the dropdown
5. Click **Add Task**

The new task appears at the top with a yellow left border.

### Time Tracking Workflow
Each task has a time tracking button that cycles through three states:

1. **Start** — Records the current time as start time
   - Task turns orange
2. **Stop** — Records the current time as stop time
   - Task automatically marks as complete and turns green
3. **Reset** — Clears both times and completion status
   - Task returns to yellow

### Copying Information
Click directly on any of these to copy to clipboard:
- Part numbers (via the 📄 button)
- Start times
- Stop times

### Opening Part Number Links
If a URL template is configured:
1. Click the 🔗 button next to any part number
2. Opens the configured URL with the part number in a new window
3. Window is named after the part number (clicking again reuses the same window)

**Note:** Whether links open in tabs or windows depends on your browser settings.

### Managing Tasks
- **Mark Complete** — Check the checkbox (or use Stop button)
- **Change Status** — Use the status dropdown to set task status (e.g., Pending, In Progress)
- **Mark as Rework** — Check the "Rework" checkbox (inline with status dropdown)
  - Task border turns red
  - Part number badge turns light red
  - Rework status saved and exported in CSV
- **Delete** — Click the 🗑️ icon with confirmation
- **Clear All** — Use the menu (☰) → Clear All option

### Adding Task Notes
Each task can have an optional note:
1. Click the 📝 button on any task
2. Modal popup appears with a text area
3. Type your note (supports multiple lines)
4. Click **Save** to save the note, or **Cancel** to discard
5. Note preview appears inline with action buttons
6. Notes are included in CSV export

**Shortcuts:**
- Press **Escape** to close the modal
- Click outside the modal to close it

### Using the Notes Tab
1. Click the **Notes** tab
2. Type freely in the text area
3. Notes save automatically after a brief pause
4. Watch for the green "Saved" indicator

### Using Text Blocks
1. Click the **Text Blocks** tab
2. See all configured text snippets
3. Click the 📄 button next to any block to copy its text

### Switching Themes
1. Click the menu icon (☰) in the top-right
2. Toggle the **Dark Mode** switch
3. Theme preference is saved automatically

### Exporting Data
1. Open the menu (☰)
2. Click **Save CSV**
3. File downloads as `tasks_YYYY-MM-DD.csv`

## Interface Layout

```
┌─────────────────────────────────────────┐
│ Task Manager                         ☰  │ ← Header with menu
├─────────────────────────────────────────┤
│ [Tasks] [Notes] [Text Blocks]           │ ← Tabs
├─────────────────────────────────────────┤
│                                         │
│  Task List / Notes Area / Text Blocks  │ ← Active tab content
│  (scrollable)                           │
│                                         │
├─────────────────────────────────────────┤
│ Task Counter                            │
│ [Part Number Input]                     │ ← Footer (Tasks tab only)
│ [Type Dropdown]                         │
│ [Add Task Button]                       │
└─────────────────────────────────────────┘
```

## Configuration

All configuration is embedded in `task-manager.html` as XML. Find the `CONFIG_XML` constant near the top of the `<script>` section.

### Current Default Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <types>
        <type>Option 1</type>
        <type>Option 2</type>
        <type>Option 3</type>
    </types>

    <textblocks>
        <block label="Sample 1">Sample 1</block>
        <block label="Sample 2">Sample 2</block>
        <block label="Sample 3">Sample 3</block>
    </textblocks>

    <!-- Status dropdown options. Each option has a label (shown to user) and value (stored in data) -->
    <status_options>
        <option label="Option 1" value="option1" />
        <option label="Option 2" value="option2" />
        <option label="Option 3" value="option3" />
    </status_options>

    <!-- URL template for part number links. Use {partNumber} as placeholder -->
    <!-- IMPORTANT: Use &amp; instead of & in URLs (XML requires this) -->
    <!-- Example: https://example.com/search?q={partNumber}&amp;filter=active -->
    <url_template>https://example.com/search?q={partNumber}</url_template>
</config>
```

### Customizing Task Types
Edit the `<types>` section to change dropdown options:

```xml
<types>
    <type>Urgent</type>
    <type>Normal</type>
    <type>Low Priority</type>
    <type>Research</type>
</types>
```

### Customizing Status Options
Edit the `<status_options>` section to change the status dropdown:

```xml
<!-- Example: Workflow statuses -->
<status_options>
    <option label="Pending" value="pending" />
    <option label="In Progress" value="in_progress" />
    <option label="Complete" value="complete" />
</status_options>

<!-- Example: Priority levels -->
<status_options>
    <option label="Low" value="low" />
    <option label="Medium" value="medium" />
    <option label="High" value="high" />
</status_options>
```

Each option has:
- **label** — What the user sees in the dropdown
- **value** — What gets stored in the data and exported to CSV

### Customizing Text Blocks
Edit the `<textblocks>` section to add quick-copy snippets:

```xml
<textblocks>
    <block label="Status - Pending">Awaiting review from supervisor</block>
    <block label="Status - Complete">Task completed and verified</block>
    <block label="Email Sign-off">Best regards,\nYour Name</block>
</textblocks>
```

The `label` attribute appears as the card header. The text content is what gets copied.

### Customizing URL Template
Edit the `<url_template>` section to configure part number links:

```xml
<!-- Internal system lookup -->
<url_template>http://internal-system.company.com/part/{partNumber}</url_template>

<!-- Google search -->
<url_template>https://www.google.com/search?q={partNumber}</url_template>

<!-- Amazon product page with multiple parameters -->
<url_template>https://www.amazon.com/dp/{partNumber}?pd_rd_w=kqCoJ&amp;th=1</url_template>

<!-- Inventory database -->
<url_template>https://inventory.company.com/lookup?id={partNumber}</url_template>
```

**IMPORTANT - XML Escaping:**
When your URL contains multiple query parameters, you must escape the `&` character as `&amp;` in the XML:
- ❌ **Wrong:** `?param1=value&param2=value`
- ✅ **Correct:** `?param1=value&amp;param2=value`

This is required because `&` is a special character in XML. The parser will automatically convert `&amp;` back to `&` when the URL is used.

**How it works:**
- The `{partNumber}` placeholder is replaced with the actual part number
- Part numbers are automatically URL-encoded (spaces become %20, etc.)
- If this element is empty or missing, the 🔗 link button won't appear
- Links open in a new window named after the part number

**Browser behavior:**
Whether links open in tabs or windows depends on browser settings. To force windows:
- **Chrome/Edge:** Settings → Appearance → Turn off "Open new pages in tabs"
- **Firefox:** Settings → General → Tabs → Uncheck "Open links in tabs"
- **Safari:** Preferences → Tabs → Set to "Never"

### Saving Changes
1. Open `task-manager.html` in a text editor
2. Find the `CONFIG_XML` constant (around line 940)
3. Edit the XML content
4. Save the file
5. Refresh your browser

## Technical Details

### File Structure
```
task-manager.html    # Single-file application
README.md            # This documentation
```

Everything (HTML, CSS, JavaScript, and configuration) is in one file for maximum portability.

### Data Storage
**Tasks** — localStorage key: `tasks`
```json
{
  "id": 1704412800000,
  "partNumber": "PCB-2024-001",
  "type": "Option 1",
  "status": "option1",
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

### CSV Export Format
```
Part Number,Type,Status,Start Time,Stop Time,Completed,Rework,Note,Created Date
"PCB-2024-001","Option 1","Option 1","2:45 PM","3:30 PM","Yes","No","Needs inspection","2/25/2026"
```

**Columns:**
- **Part Number** — Task part number
- **Type** — Task type
- **Status** — Status dropdown label (e.g., "Pending", "In Progress")
- **Start Time** — 12-hour format (e.g., "2:45 PM")
- **Stop Time** — 12-hour format
- **Completed** — Yes/No
- **Rework** — Yes/No
- **Note** — Task note text (quotes escaped as "")
- **Created Date** — Short date format (e.g., "2/25/2026")

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (modern versions)
- JavaScript required
- localStorage API required
- Clipboard API with fallback
- No external dependencies
- Works offline

## Design Features

### Dark Mode (Default)
- Background: Dark slate (#0f172a)
- Surface: Lighter slate (#1e293b)
- Primary: Blue (#60a5fa)
- Accent: Orange (#fb923c)
- Text: Light gray (#f1f5f9)

### Light Mode
- Background: Off-white (#f8fafc)
- Surface: White (#ffffff)
- Primary: Blue (#2563eb)
- Accent: Orange (#ea580c)
- Text: Dark slate (#0f172a)

### Typography
- **UI Text** — Work Sans
- **Part Numbers & Times** — JetBrains Mono (monospace)

### Status Colors
- 🟡 **New Tasks** — Yellow (#facc15)
- 🟠 **Started Tasks** — Orange (#fb923c)
- 🟢 **Completed Tasks** — Green (#4ade80)
- 🔴 **Rework Tasks** — Red (#ef4444)

### Responsive Design
- Optimized for desktop and mobile
- Compact spacing for information density
- Touch-friendly buttons and controls

## Tips & Best Practices

### Task Management
- Tasks sort automatically: incomplete first, then by creation date
- Part numbers can include letters, numbers, and special characters
- Long part numbers truncate with ellipsis but copy in full
- Mark tasks as rework to highlight them with a red border
- Rework status is independent of completion status
- Configure URL template to enable quick lookup links for part numbers
- Use Clear All for a fresh start (requires confirmation)

### Time Tracking
- Click Start when beginning work
- Click Stop when done (automatically marks complete)
- Click Reset to reuse a task entry
- Times are clickable — no need to select/copy manually

### Notes
- Auto-save triggers after ~600ms of no typing
- Watch for "Saved" confirmation in bottom-right
- Notes persist indefinitely in localStorage
- Plain text only (no formatting)

### Text Blocks
- Great for email templates, status updates, or common phrases
- Keep snippets short for the preview to show more
- Use newlines in the XML for multi-line text
- Can include any text — no length limit

### Data Safety
- Export to CSV regularly as backup
- Browser data persists until manually cleared
- Clearing browser data will delete tasks and notes
- No undo for Clear All or individual deletions

### Customization
- Edit `CONFIG_XML` directly in the HTML file
- Add as many types or text blocks as needed
- XML structure allows future expansion
- No external files required

## Keyboard Shortcuts
- **Enter** — Submit Add Task form (when focused on inputs)
- **Escape** — Close menu dropdown (when open)

## Storage Limits
- Browser localStorage: typically 5-10MB
- Each task: ~200-300 bytes
- Capacity: thousands of tasks before hitting limits

## Troubleshooting

**Types aren't loading**
→ Check that `CONFIG_XML` constant is valid XML syntax

**Tasks disappeared**
→ Check if browser data was cleared. Export to CSV regularly.

**Theme won't change**
→ Try clearing localStorage key `theme` and reload

**Copy not working**
→ Check browser permissions for clipboard access

**Notes not saving**
→ Check browser console for localStorage errors

## Privacy & Security
- All data stored locally in your browser
- No network requests (except opening README)
- No tracking or analytics
- No user accounts or authentication
- Works entirely offline after first load

## Version Information
**Version:** 2.1  
**Last Updated:** February 2026  
**File Type:** Single-file HTML application  
**Dependencies:** None

## Support
For questions or issues:
1. Check this README thoroughly
2. Inspect browser console for errors
3. Verify localStorage is enabled
4. Try in a different browser

## License
Free to use and modify for personal or commercial purposes.

---

**Made with ❤️ for efficient task tracking**
