# SFC Inventory - User Guide

## Overview
SFC Inventory is a simple, browser-based list management tool that helps you organize items into different categories (tabs). Each tab can also contain **subcategories** — named groups within a tab — allowing for more complex, nested organization. Perfect for inventory tracking, task lists, project management, or any scenario where you need to organize information into multiple groups.

## Getting Started

### Opening the Application
1. Open the `sfc-inventory.html` file in any modern web browser (Chrome, Firefox, Safari, Edge)
2. No installation or internet connection required — it runs entirely in your browser
3. Your data is automatically saved in your browser's storage

---

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
2. Confirm the deletion (this will permanently remove all items and subcategories in that tab)
3. Note: You cannot delete the last remaining tab

**Switching Between Tabs:**
- Simply click on any tab name to view its contents

---

### 2. Adding and Managing List Items

Each tab has a **root-level** list at the top for general items, as well as any number of subcategory groups below it.

**Adding Root Items:**
1. Click on a tab to select it
2. Type your item in the text field at the top of the tab
3. Press **Enter** to add the item to the list
4. The item will appear numbered (#1, #2, etc.)

**Removing Items:**
1. Click the × button next to any item to remove it
2. Numbers update automatically

---

### 3. Subcategories

Subcategories allow you to group items within a tab into named sections. For example, a "Warehouse" tab could have subcategories for "Aisle A", "Aisle B", and "Aisle C" — each with their own item lists.

**Adding a Subcategory:**
1. Switch to the tab where you want the subcategory
2. Click the **+ Add Subcategory** button (bottom-right of the tab content area)
3. Enter a name for the subcategory
4. Click "Confirm"

**Adding Items to a Subcategory:**
1. Expand the subcategory (click the header if it's collapsed)
2. Type in the subcategory's input field
3. Press **Enter** to add

**Renaming a Subcategory:**
1. Click the pencil icon (✎) on the subcategory header
2. Enter the new name and click "Confirm"

**Deleting a Subcategory:**
1. Click the × icon on the subcategory header
2. Confirm the deletion (this will remove all items in that subcategory)

**Collapsing / Expanding a Subcategory:**
- Click anywhere on the subcategory header bar to toggle it open or closed
- The item count is always visible in the header, even when collapsed

---

### 4. Search Function

The search scans all root-level lists **and** all subcategory lists across every tab.

**Basic Search:**
1. Enter text in the "Search all lists..." field at the top
2. Click the "Find" button

**How Search Works:**
- **Exact Match (Green):** Items that exactly match your query are highlighted green
- **Partial Match (Orange):** If no exact match exists, items containing your text are highlighted orange
- **Auto-expand:** Subcategories that contain a match are automatically expanded
- **Result Summary:** Shows counts and locations, including subcategory names (e.g., `"Warehouse" (Aisle A:#2, Aisle B:#1)`)

---

### 5. Import and Export

The XML format now includes subcategories. Files from v1.0 (without subcategories) are still fully compatible.

**Exporting Your Data:**
1. Click the menu icon (≡) → "Export XML"
2. A file named `sfc-inventory.xml` will download

**Importing Data:**
1. Click the menu icon (≡) → "Import XML"
2. Choose a previously exported XML file
3. **Warning:** This replaces all current data — export first if you need a backup

---

### 6. Dark Mode

1. Click the menu icon (≡)
2. Toggle the "Dark Mode" switch
3. Your preference is saved automatically

---

## File Format

The XML export format (v2.0) supports both root items and subcategories:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SFCInventory>
  <Tab name="Warehouse">
    <Item>Forklift</Item>
    <Subcategory name="Aisle A">
      <Item>Widget box (qty: 50)</Item>
      <Item>Bolt pack 10mm</Item>
    </Subcategory>
    <Subcategory name="Aisle B">
      <Item>Shelf bracket set</Item>
    </Subcategory>
  </Tab>
  <Tab name="General">
    <Item>Miscellaneous item</Item>
  </Tab>
</SFCInventory>
```

> Files exported from v1.0 (no `<Subcategory>` tags) import correctly — root items are preserved and no subcategories are added.

---

## Tips and Best Practices

1. **Hierarchy design:** Use tabs for broad categories (departments, locations) and subcategories for divisions within them
2. **Collapse for focus:** Collapse subcategories you aren't actively editing to reduce visual clutter
3. **Regular backups:** Export your data regularly to avoid losing information
4. **Search shortcuts:** Subcategory matches show the subcategory name in results so you know exactly where to look
5. **Manual editing:** You can open the exported XML in any text editor to bulk-add items, then import it back

---

## Data Storage

- All data is stored in your browser's local storage
- Data persists between sessions
- Data is tied to your specific browser and device
- Clearing browser cache will delete your data — export first!
- Use Export/Import to transfer between browsers or devices

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Enter** | Add item to the currently focused list |
| **Enter** (in modal) | Confirm tab / subcategory name |

---

## Troubleshooting

**My data disappeared:**
- Check you're using the same browser
- Make sure browser data wasn't cleared
- Import your last export file

**Import isn't working:**
- Confirm the file is a valid `.xml` file exported from this app
- Try exporting a fresh file and re-importing it as a test

**Search not finding items inside subcategories:**
- Search scans all subcategories automatically — check that the term is spelled correctly
- Collapsed subcategories are auto-expanded when a match is found inside them

---

## Browser Compatibility

Works best in modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Safari
- Microsoft Edge

JavaScript must be enabled.

---

**Version:** 2.0  
**Last Updated:** March 2025
