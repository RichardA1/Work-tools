# SFC Inventory - User Guide

## Overview
SFC Inventory is a simple, browser-based list management tool that helps you organize items into different categories (tabs). Perfect for inventory tracking, task lists, project management, or any scenario where you need to organize information into multiple groups.

## Getting Started

### Opening the Application
1. Open the `sfc-inventory.html` file in any modern web browser (Chrome, Firefox, Safari, Edge)
2. No installation or internet connection required - it runs entirely in your browser
3. Your data is automatically saved in your browser's storage

## Main Features

### 1. Managing Tabs (Categories)

**Creating a New Tab:**
1. Click the menu icon (≡) in the top right corner
2. Select "Add Tab"
3. Enter a name for your tab (e.g., "Inventory", "Shopping List", "Projects")
4. Click "Confirm"

**Renaming a Tab:**
1. Click the pencil icon (✎) on any tab
2. Enter the new name
3. Click "Confirm"

**Deleting a Tab:**
1. Click the × icon on any tab
2. Confirm the deletion (this will permanently remove all items in that tab)
3. Note: You cannot delete the last remaining tab

**Switching Between Tabs:**
- Simply click on any tab name to view its contents

### 2. Adding and Managing List Items

**Adding Items:**
1. Click on a tab to select it
2. Type your item in the text field
3. Press **Enter** to add the item to the list
4. The item will appear with a line number (#1, #2, etc.)

**Removing Items:**
1. Click the × button next to any item to remove it
2. Line numbers will automatically update

### 3. Search Function

**Basic Search:**
1. Enter text in the "Search all lists..." field at the top
2. Click the "Find" button

**How Search Works:**
- **Exact Match (Green)**: If the search finds items that exactly match your text, they'll be highlighted in green
- **Partial Match (Orange)**: If no exact match is found, the search will find items containing your text and highlight them in orange
- **Multiple Results**: All matching items across all tabs will be highlighted
- **Result Summary**: Shows you how many matches were found and where (e.g., "3 matches found: 'General' (#1, #5) | 'Work' (#3)")

**Search Results:**
- Matching tabs are highlighted in the same color as the match type
- The app automatically switches to the first tab with a match
- You can click through tabs to see all highlighted matches

### 4. Import and Export

**Exporting Your Data:**
1. Click the menu icon (≡) in the top right
2. Select "Export XML"
3. A file named `sfc-inventory.xml` will download to your computer
4. Use this to back up your data or transfer it to another device

**Importing Data:**
1. Click the menu icon (≡) in the top right
2. Select "Import XML"
3. Choose an XML file that was previously exported
4. **Warning**: This will replace all current data - make sure to export first if you want to keep it!
5. The imported tabs and items will appear immediately

### 5. Dark Mode

**Enabling Dark Mode:**
1. Click the menu icon (≡) in the top right
2. Toggle the "Dark Mode" switch
3. Your preference is automatically saved

**Benefits:**
- Reduces eye strain in low-light environments
- Saves battery on devices with OLED screens
- Your preference persists between sessions

## Tips and Best Practices

1. **Regular Backups**: Export your data regularly to avoid losing information
2. **Descriptive Tab Names**: Use clear names like "Office Supplies" instead of "Tab 1"
3. **Item Details**: Add as much detail as needed in each item - there's no character limit
4. **Search Shortcuts**: Use partial searches to find groups of related items (e.g., search "apple" to find "apple juice", "apple pie", etc.)
5. **Organization**: Create separate tabs for different categories to keep things organized

## Data Storage

- All data is stored locally in your browser's local storage
- Data persists between sessions (when you close and reopen the browser)
- Data is specific to the browser and device you're using
- Clearing your browser's cache/data will delete your lists (export first!)
- To transfer data between devices or browsers, use the Export/Import feature

## Keyboard Shortcuts

- **Enter**: Add a new item to the current list
- **Escape**: Close modals (when renaming tabs)

## Troubleshooting

**My data disappeared:**
- Check if you're using the same browser
- Make sure you didn't clear browser data
- Import your last export file

**Import isn't working:**
- Make sure you're selecting a valid XML file exported from this app
- Check that the file isn't corrupted
- Try exporting first, then import that file as a test

**Search not finding items:**
- Remember: search is case-insensitive
- Check for typos in your search term
- Try a partial search (fewer characters) if exact match isn't working

## File Format

The XML export format looks like this:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<SFCInventory>
  <Tab name="General">
    <Item>First item</Item>
    <Item>Second item</Item>
  </Tab>
  <Tab name="Work">
    <Item>Project A</Item>
  </Tab>
</SFCInventory>
```

You can manually edit this file with a text editor if needed, then import it back.

## Browser Compatibility

Works best in modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Safari
- Microsoft Edge

Requires JavaScript to be enabled.

## Questions or Issues?

This application runs entirely in your browser with no server connection, so there's no support team. However:
- Export your data regularly as a backup
- Test new features with sample data first
- Keep a copy of the HTML file in case you need to reinstall

---

**Version**: 1.0  
**Last Updated**: February 2025
