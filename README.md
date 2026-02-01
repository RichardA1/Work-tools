# Task Manager

A streamlined, dark-mode task management application for tracking part numbers with time logging and completion status.

## Features

### Task Management
- **Add Tasks**: Create tasks with part numbers (up to 50 characters) and categorize by type
- **Type Categories**: Configurable via embedded XML (defaults: S1, OPAMP, LUFA, S2, PHOCA, 5S)
- **Completion Tracking**: Mark tasks as complete with checkboxes
- **Delete Tasks**: Remove individual tasks with the 🗑️ icon
- **Clear All**: Wipe all tasks at once with the Clear All button

### Time Tracking
- **Start/Stop Timer**: Record start and stop times in 12-hour format (HH:MM AM/PM)
- **Auto-Complete**: Tasks automatically mark as complete when stopped
- **Reset Timer**: Clear both start and stop times to begin again
- **Copy Times**: Click any recorded start or stop time to copy it to clipboard

### Quick Actions
- **Copy Part Number**: One-click clipboard copy with the inline 📄 button
- **Copy Times**: Click a start or stop time directly to copy it
- **Visual Status**: Color-coded part numbers (orange for active, green for completed)
- **Task Counter**: Live count of active and completed tasks

### Notes
- **Freeform Notes**: A dedicated tab for writing notes
- **Auto-Save**: Notes save automatically as you type (with a short debounce)
- **Persistent**: Notes survive page reloads via browser localStorage

### Text Blocks
- **Quick-Copy Snippets**: A dedicated tab listing text blocks defined in the config
- **One-Click Copy**: Each block has a 📄 button to copy its content to clipboard
- **Config-Driven**: Add, remove, or change blocks by editing the embedded XML

### Data Management
- **Local Storage**: All tasks and notes persist in browser localStorage
- **CSV Export**: Download all task data as a CSV file with timestamp
- **Sample Data**: Starts with 3 example tasks on first load

## How to Use

### Getting Started
1. Open `task-manager.html` in any modern web browser
2. The app loads with 3 example tasks on the Tasks tab

### Switching Tabs
The three tabs at the top switch between the main views:
- **Tasks** — the task list and the add-task form in the footer
- **Notes** — freeform notes area
- **Text Blocks** — quick-copy snippets from your config

The footer (task counter, add-task form, action buttons) is only visible on the Tasks tab.

### Adding a Task
1. Enter a part number in the "Part Number" field (up to 50 characters)
2. Select a type from the dropdown menu
3. Click "Add Task"

### Time Tracking
1. Click "Start" to record the current time
2. Click "Stop" to record completion time (automatically marks task as done)
3. Click "Reset" to clear both times and start over

### Managing Tasks
- **Complete**: Check the checkbox to mark as complete (or let Stop do it automatically)
- **Copy Part Number**: Click the 📄 icon next to the part number
- **Copy a Time**: Click directly on any recorded start or stop time
- **Delete**: Click the 🗑️ icon to remove a single task (with confirmation)
- **Clear All**: Click "Clear All" in the footer to remove every task (with confirmation)

### Using Notes
1. Click the **Notes** tab
2. Type freely — notes auto-save after a short pause
3. A small status indicator confirms when the save completes

### Using Text Blocks
1. Click the **Text Blocks** tab
2. Each block defined in the config appears as a card with its label and text
3. Click the 📄 button on any block to copy its text to clipboard

### Exporting Data
1. Click "Save CSV" in the footer (Tasks tab)
2. File downloads as `tasks_YYYY-MM-DD.csv`
3. Includes: Part Number, Type, Start Time, Stop Time, Completed Status, Created Date

## Interface Layout

### Header
- Application title
- Tab navigation bar (Tasks / Notes / Text Blocks)

### Tasks Tab
- Scrollable list of all active and completed tasks
- Completed tasks shown with reduced opacity and a green left border
- Auto-scrolls when the list grows beyond the viewport

### Notes Tab
- Full-height text area for freeform notes
- Auto-save status indicator in the bottom-right corner

### Text Blocks Tab
- List of copyable text snippets defined in the config
- Each card shows a label and a preview of the text

### Footer (Tasks tab only)
- **Task Counter**: Shows active and completed task counts
- **Add Task Form**: Part number input and type selector
- **Action Buttons**: Add Task, Save CSV, and Clear All

## Technical Details

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage API for data and notes persistence
- Clipboard API with fallback for older browsers
- DOMParser for XML processing (embedded config)

### Data Storage
Tasks are stored in browser localStorage under the key `tasks` as a JSON array:
```json
{
  "id": 1704412800000,
  "partNumber": "PCB-2024-001",
  "type": "S1",
  "startTime": "2:45 PM",
  "stopTime": "3:30 PM",
  "completed": true,
  "createdAt": "2025-01-05T12:00:00.000Z"
}
```

Notes are stored separately under the key `notes` as a plain string.

### CSV Export Format
```
Part Number,Type,Start Time,Stop Time,Completed,Created At
"PCB-2024-001","S1","2:45 PM","3:30 PM","Yes","1/5/2025, 12:00:00 PM"
```

## Design Features

### Color Scheme (Dark Mode)
- Background: Dark slate (#0f172a)
- Surface: Lighter slate (#1e293b)
- Primary Accent: Blue (#60a5fa)
- Task Accent: Orange (#fb923c)
- Success: Green (#4ade80)
- Text: Light gray (#f1f5f9)

### Typography
- **Headers/Body**: Work Sans
- **Part Numbers/Times**: JetBrains Mono (monospace)

### Responsive Design
- Optimized for desktop and mobile
- Buttons adapt to screen size
- Compact layout for maximum information density

## Keyboard Shortcuts
- **Enter**: Submit the Add Task form when focused on inputs

## Tips
- Part numbers can include letters, numbers, and special characters
- Long part numbers will be truncated with ellipsis but fully copied when you click the copy button
- Tasks are sorted with incomplete tasks first, then by creation date
- Click any recorded start or stop time to copy it directly — no button needed
- Notes auto-save after a short pause; the green "Saved" indicator confirms it
- Text blocks are purely for quick-copying — edit them in the `CONFIG_XML` section of the HTML file
- Data persists between sessions via browser localStorage
- Use CSV export to backup or analyze your task data

## File Structure
```
task-manager.html    # Single-file application (HTML, CSS, JavaScript, and config)
README.md            # This file
```

## Configuration

All configuration lives inside `task-manager.html` as an XML string near the top of the `<script>` section. Look for the constant called `CONFIG_XML`. It is real XML — just embedded in the file so the app works when opened directly from your desktop without a server.

### Current config structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <!-- Task type options for the dropdown -->
    <types>
        <type>S1</type>
        <type>OPAMP</type>
        <type>LUFA</type>
        <type>S2</type>
        <type>PHOCA</type>
        <type>5S</type>
    </types>

    <!-- Text blocks shown on the Text Blocks tab -->
    <textblocks>
        <block label="Sample 1">Sample 1</block>
        <block label="Sample 2">Sample 2</block>
        <block label="Sample 3">Sample 3</block>
    </textblocks>
</config>
```

### Adding or changing task types
Edit the `<types>` section. Each `<type>` element becomes one option in the dropdown:
```xml
<types>
    <type>S1</type>
    <type>OPAMP</type>
    <type>LUFA</type>
    <type>NEWTYPE</type>
</types>
```
Save the file and refresh the browser.

### Adding or changing text blocks
Edit the `<textblocks>` section. Each `<block>` element becomes one card on the Text Blocks tab:
- The `label` attribute is the small header shown on the card.
- The text content between the tags is what gets copied to clipboard when you click the copy button.

```xml
<textblocks>
    <block label="Part Prefix">PCB-2024-</block>
    <block label="Status Note">Awaiting inspection</block>
    <block label="Sample 3">Sample 3</block>
</textblocks>
```

### Extensibility
The XML structure is designed to accept new sections in the future without changing anything else. For example, theme or display settings could be added as a new top-level element inside `<config>` later on.

## Installation
No installation required. Simply:
1. Download `task-manager.html`
2. Open it in any modern web browser
3. Start tracking tasks

Everything — config, data logic, and UI — is in the single HTML file.

## Browser Data
- **Tasks**: Stored in localStorage under the key `tasks`
- **Notes**: Stored in localStorage under the key `notes`
- **Data Persistence**: Remains until manually cleared or browser data deleted
- **Storage Limit**: Typically 5-10MB depending on browser

## Future Enhancements
Potential features for future versions:
- Search/filter tasks
- Sort by different criteria
- Edit existing tasks
- Task duration calculation
- Import CSV data
- Print-friendly view
- Dark/light theme toggle

## License
Free to use and modify for personal or commercial purposes.

## Support
For issues or questions, refer to the inline tooltips and this documentation.

---

**Version**: 1.0  
**Last Updated**: January 2026
