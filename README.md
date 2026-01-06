# Task Manager

A streamlined, dark-mode task management application for tracking part numbers with time logging and completion status.

## Features

### Task Management
- **Add Tasks**: Create tasks with part numbers (up to 50 characters) and categorize by type
- **Type Categories**
- **Completion Tracking**: Mark tasks as complete with checkboxes
- **Delete Tasks**: Remove tasks with a single click

### Time Tracking
- **Start/Stop Timer**: Record start and stop times in 12-hour format (HH:MM AM/PM)
- **Auto-Complete**: Tasks automatically mark as complete when stopped
- **Reset Timer**: Clear both start and stop times to begin again

### Quick Actions
- **Copy Part Number**: One-click clipboard copy with inline button
- **Visual Status**: Color-coded part numbers (orange for active, green for completed)
- **Task Counter**: Live count of active and completed tasks

### Data Management
- **Local Storage**: All tasks persist in browser localStorage
- **CSV Export**: Download all task data as a CSV file with timestamp
- **Sample Data**: Starts with 3 example tasks on first load

## How to Use

### Getting Started
1. Open `task-manager.html` in any modern web browser
2. The app loads with 3 example tasks to demonstrate functionality

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
- **Copy**: Click the 📄 icon next to the part number to copy it to clipboard
- **Delete**: Click the 🗑️ icon to remove the task (with confirmation)

### Exporting Data
1. Click "Save CSV" at the bottom of the page
2. File downloads as `tasks_YYYY-MM-DD.csv`
3. Includes: Part Number, Type, Start Time, Stop Time, Completed Status, Created Date

## Interface Layout

### Header
- Application title at the top

### Scrollable Task List
- Displays all active and completed tasks
- Auto-scrolls when list grows beyond viewport
- Completed tasks shown with reduced opacity

### Footer (Fixed)
- **Task Counter**: Shows active and completed task counts
- **Add Task Form**: Part number input and type selector
- **Action Buttons**: Add Task and Save CSV side by side

## Technical Details

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage API for data persistence
- Clipboard API with fallback for older browsers

### Data Storage
All tasks stored in browser localStorage as JSON with the following structure:
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
- Long part numbers will be truncated with ellipsis but fully copied
- Tasks are sorted with incomplete tasks first, then by creation date
- Data persists between sessions via browser localStorage
- Use CSV export to backup or analyze your task data

## File Structure
```
task-manager.html    # Single-file application (HTML, CSS, JavaScript)
README.md           # This file
```

## Installation
No installation required! Simply:
1. Download `task-manager.html`
2. Open it in your web browser
3. Start tracking tasks

## Browser Data
- **Storage Location**: Browser localStorage under key `tasks`
- **Data Persistence**: Remains until manually cleared or browser data deleted
- **Storage Limit**: Typically 5-10MB depending on browser

## Future Enhancements
Potential features for future versions:
- Sort by Priority
- Edit existing tasks
- Task duration calculation
- Dark/light theme toggle

## License
Free to use and modify for personal or commercial purposes.

## Support
For issues or questions, refer to the inline tooltips and this documentation.

---

**Version**: 1.0  
**Last Updated**: January 2026
