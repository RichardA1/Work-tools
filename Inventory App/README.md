# SFC Inventory

A lightweight, single-file browser app for organizing items into categorized tabs and locating specific SFC codes across your entire inventory.

No installation, no server, no dependencies — open the HTML file and go.

---

## Features

- **Tabs** — organize items into named categories
- **Subcategories** — further organize within each tab; collapsible
- **SFC Lookup** — paste a list of SFC codes to find; returns exact matches, partial matches, and a clear not-found list
- **Sticky controls** — the lookup panel and tab bar stay visible while you scroll through long lists
- **Collapsible lookup panel** — collapses to a compact summary bar when you need more screen space
- **Highlights persist** — found items stay highlighted as you navigate between tabs
- **Import / Export** — XML format for backup and transfer between devices
- **Dark mode** — toggle in the menu; preference saved automatically

---

## Getting Started

1. Download `sfc-inventory.html`
2. Open it in any modern browser (Chrome, Firefox, Safari, Edge)
3. JavaScript must be enabled; no internet connection required
4. Your data saves automatically in browser local storage

To try it immediately with sample data, see **[Sample Data](#sample-data)** below.

---

## User Guide

### Managing Tabs

| Action | How |
|--------|-----|
| Add a tab | Menu (≡) → Add Tab |
| Rename a tab | Click ✎ on the tab |
| Delete a tab | Click ✕ on the tab (cannot delete the last tab) |
| Switch tabs | Click the tab name |

### Adding Items

1. Click a tab to select it
2. Type your item in the text field and press **Enter**
3. Items are numbered automatically (#1, #2, …)
4. Click × next to any item to remove it

### Subcategories

- Click **+ Add Subcategory** inside any tab to create one
- Add items to subcategories the same way — type and press **Enter**
- Click the subcategory header to collapse/expand it
- Rename or delete subcategories with the ✎ and × buttons in the header

---

### SFC Lookup

The SFC Lookup lets you paste a list of codes you need to find. It searches every item across all tabs and subcategories and tells you exactly where each one is — or that it's missing.

**Running a lookup:**
1. Click the **SFC Lookup** header to expand the panel (if collapsed)
2. Paste your codes into the text area, one per line:
   ```
   SFC-007
   SFC-103
   SFC-213
   ```
3. Click **🔍 Find SFCs**

**Results panel — three groups:**

| Group | Colour | Meaning |
|-------|--------|---------|
| Exact Match | Green | The item IS that SFC code (full, exact match) |
| Partial Match | Orange | The SFC code appears *within* a longer item |
| Not Found | Red | Not located anywhere in the inventory |

The header summarises the run, e.g. *"7 of 10 SFCs found (4 partial hits)"*.

Partial match chips show three pieces of information: the **code you searched**, its **location** (tab › subcategory), and the **full item text** so you can see immediately why it was partial rather than exact.

Items already captured by an exact match are automatically suppressed from partial results, so the same location never appears twice.

**Navigating results:**
- **◀ Prev / Next ▶** steps through every found item (exact and partial) in order
- The position counter shows where you are (e.g. "3 of 7")
- Click any chip to jump directly to that item
- Navigation wraps — going past the last returns to the first
- The **active item** gets a solid filled purple background; all other found items show a soft tint so you can see them at a glance without losing your place
- Collapsed subcategories containing matches are automatically expanded
- **Highlights persist when switching tabs** — they only clear when you run a new search or click ✕ Clear

**Collapsing the panel:**
- Click the **SFC Lookup** header (or the ▼ arrow) to collapse the section
- When collapsed after a search, compact summary pills replace the panel:
  `✓ 5 exact  ~  2 partial  ✕  3 not found`
- The Find and Clear buttons remain active even when collapsed

---

### Import and Export

**Export:**
1. Menu (≡) → Export XML
2. Downloads `Inventory-YYYY-MM-DD_HH-MM.xml`

**Import:**
1. Menu (≡) → Import XML
2. Select a previously exported `.xml` file
3. ⚠️ This replaces all current data — export first if you want to keep it

The XML format is human-readable and can be edited in any text editor:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SFCInventory>
  <Tab name="General">
    <Item>SFC-001</Item>
    <Item>SFC-002</Item>
    <Subcategory name="Archived">
      <Item>SFC-006</Item>
      <Item>SFC-007</Item>
    </Subcategory>
  </Tab>
  <Tab name="Work">
    <Item>SFC-042</Item>
    <Subcategory name="Pending">
      <Item>SFC-101</Item>
    </Subcategory>
  </Tab>
</SFCInventory>
```

---

### Dark Mode

Menu (≡) → Dark Mode toggle. Preference is saved and restored automatically.

---

## Sample Data

The repository includes `Inventory-testData.xml` — a ready-to-use dataset with four tabs and multiple subcategories to explore all features.

**To load it:** Menu (≡) → Import XML → select `Inventory-testData.xml`

**Inventory contents:**

| Tab | Root Items | Subcategories |
|-----|-----------|---------------|
| General | SFC-001 – SFC-005 | Archived (SFC-006 – SFC-008) |
| Work | SFC-042 – SFC-044 | Pending (SFC-101 – SFC-104), In Progress (SFC-105 – SFC-107) |
| Maintenance | SFC-200 – SFC-202 | Scheduled (SFC-210 – SFC-213), Overdue (SFC-220 – SFC-222) |
| Logistics | SFC-300 – SFC-302 | Inbound (SFC-310 – SFC-312), Outbound (SFC-320) |

**Sample lookup list** — paste this into the SFC Lookup text area to see all result types in action:

```
SFC-007
SFC-103
SFC-213
SFC-10
SFC-987
SFC-997
SFC-044
SFC-301
```

**Expected results:**

| Code | Result | Location |
|------|--------|----------|
| SFC-007 | ✓ Exact | General › Archived |
| SFC-103 | ✓ Exact | Work › Pending |
| SFC-213 | ✓ Exact | Maintenance › Scheduled |
| SFC-044 | ✓ Exact | Work |
| SFC-301 | ✓ Exact | Logistics |
| SFC-10 | ~ Partial | 6 hits across Work subcategories (SFC-103 suppressed — already exact-matched above) |
| SFC-987 | ✕ Not found | — |
| SFC-997 | ✕ Not found | — |

---

## Data Storage

- All data is stored in **browser local storage** — no server involved
- Data is specific to the browser and device you're using
- **Clearing browser data will delete your lists** — export regularly as a backup
- To move data between browsers or devices, use Export / Import

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Add item to the current list or subcategory |
| Escape | Close the rename/add modal |

---

## Troubleshooting

**Data disappeared** — check you're on the same browser/device; import your last backup.

**Import not working** — confirm the file is a `.xml` exported from this app and isn't corrupted.

**SFC not found when it should be** — the lookup is a full-item exact match; make sure the item in the list is *only* the SFC code with no extra text. For items with surrounding text, partial matching will catch them.

**SFC-42 vs SFC-042** — these are treated as different codes. Formatting must match exactly.

---

## Browser Compatibility

Chrome (recommended), Firefox, Safari, Edge. Requires JavaScript.

---

**Version:** 1.3
**Last Updated:** March 2026
