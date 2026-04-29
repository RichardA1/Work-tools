# SFC Inventory

A lightweight, single-file browser app for organizing items into categorized tabs and locating specific SFC codes across your entire inventory. No installation, no server, no dependencies — open the HTML file and go.

---

## File Structure

```
sfc-inventory.html       # The entire application — HTML, CSS, and JavaScript
Inventory-testData.xml   # Sample dataset for exploring all features
README.md                # This documentation
```

Open `sfc-inventory.html` directly in any modern browser. No server required.

---

## Features

- **Tabs** — organize items into named categories
- **Subcategories** — group items further within each tab; collapsible
- **Redirect Barcodes** — assign barcode(s) to any tab or subcategory; scanning one silently switches focus to that location
- **SFC Lookup sidebar** — always-visible left panel; paste codes to search across all tabs and subcategories simultaneously
- **Send to Task Manager** — transfer any item directly to the Task Manager app in one click; removes it from inventory automatically
- **Resizable sidebar** — drag the divider between the two columns to adjust the lookup panel width (200–600 px)
- **Sticky header** — title and menu stay visible while scrolling
- **Highlights persist** — found items stay highlighted as you switch tabs; only cleared on a new search or clicking Clear
- **Export XML** — full structured backup, suitable for restore and sharing between browsers
- **Export Plain Text** — indented human-readable snapshot for printing or sharing
- **Import XML** — restore any previously exported backup
- **In-app Help** — this README rendered inside the app, accessible from the menu
- **Dark mode** — toggle in the menu; preference saved automatically

---

## Layout

The app uses a two-column layout on desktop. On screens narrower than 700 px the columns stack vertically (lookup panel above, tabs below).

```
┌─────────────────────────────────────────────────────────┐
│  SFC Inventory                                       ≡  │  ← sticky header
├────────────────────┬─┬──────────────────────────────────┤
│  🔍 SFC Lookup     │▌│  [Tab 1] [Tab 2] [Tab 3] …       │  ← sticky tab bar
│                    │▌│                                   │
│  [textarea]        │▌│  #1  SFC-001   [→][×]            │
│  [Find] [Clear]    │▌│  #2  SFC-002   [→][×]            │
│                    │▌│                                   │
│  ── Results ─────  │▌│  ▼ Subcategory name   (3 items)  │
│  ✓ Exact    (3)   │▌│    #1  SFC-010  [→][×]           │
│  ~ Partial  (2)   │▌│    #2  SFC-011  [→][×]           │
│  ✕ Not found (1)  │▌│                                   │
└────────────────────┴─┴──────────────────────────────────┘
```

The **▌ divider** between the two columns can be dragged left or right to resize the sidebar (minimum 200 px, maximum 600 px).

---

## User Guide

### Managing Tabs

| Action | How |
|--------|-----|
| Add a tab | Menu (≡) → Add Tab |
| Rename a tab | Click ✎ on the tab label |
| Manage redirect barcodes | Click ⚡ on the tab label |
| Delete a tab | Click ✕ on the tab label (cannot delete the last remaining tab) |
| Switch tabs | Click the tab name |

### Adding Items

1. Click a tab to make it active
2. Type your item text in the input field at the top of the tab and press **Enter**
3. Items are numbered automatically (#1, #2, …)
4. Click **×** next to any item to remove it

### Subcategories

- Click **+ Add Subcategory** inside any tab to create a subcategory
- Add items to a subcategory the same way — type in its input field and press **Enter**
- Click the subcategory header to collapse or expand it
- Rename with **✎**, manage redirects with **⚡**, delete with **×** (all in the subcategory header)
- Deleting a subcategory removes all items inside it

---

### Redirect Barcodes

Redirect barcodes let you use a physical scanner to navigate between tabs and subcategories without touching the mouse or keyboard. Assign one or more barcodes to any tab or subcategory; when that barcode is scanned into any input field, the app silently switches focus to the designated location.

**Typical use case:** place a printed barcode label on each physical bin or shelf. Scanning the bin label first routes the scanner to the matching inventory location; subsequent scans add items there normally.

#### Configuring redirect barcodes

1. Click the **⚡** button on a tab label (between ✎ Rename and ✕ Delete) **or** in a subcategory header
2. In the popup, scan or type the barcode string, then click **Add** (or press **Enter**)
3. Repeat for additional barcodes if needed
4. Remove any entry with the **✕** next to it
5. Click **Done** to close

A badge (e.g. `⚡ 2`) appears on the tab or subcategory header when redirect barcodes are active.

#### How redirects behave

| Behaviour | Detail |
|-----------|--------|
| Trigger | Any Enter keypress in any input field across the app |
| Match | Case-insensitive exact string comparison |
| Barcode consumed | Yes — never added as an inventory item |
| Target subcategory collapsed | Automatically expanded |
| Confirmation | Toast: *"⚡ Redirected to Tab › Subcategory"* |
| Duplicate assignment | Each barcode can point to only one target; assigning it to a second location removes it from the first (with a confirmation prompt) |

#### Redirect barcodes in exports

Redirect rules are stored in localStorage alongside all other data and are fully preserved in XML export/import — your routing setup survives a backup/restore cycle.

---

### SFC Lookup

The SFC Lookup panel stays visible on the left at all times. You can search while freely browsing any tab — no need to close the panel first.

**Running a lookup:**
1. Paste one or more SFC codes into the text area, one per line
2. Click **Find SFCs**

**Result groups:**

| Group | Colour | Meaning |
|-------|--------|---------|
| Exact Match | Green | The full item text is exactly the searched code |
| Partial Match | Orange | The code appears somewhere within a longer item |
| Not Found | Red | The code was not found anywhere in the inventory |

Items already captured by an exact match are automatically excluded from partial results, so the same item never appears in both groups.

The results header summarises the run, e.g. *"5 of 8 SFCs found (2 partial hits)"*.

**Navigating results:**
- Click any result chip to jump directly to that item
- Use **◀ Prev** and **Next ▶** to step through all found items in order; navigation wraps
- The active item shows a solid purple background; all other matches show a soft tint
- Collapsed subcategories containing matches are automatically expanded
- Highlights persist when switching tabs — they only clear when you run a new search or click **✕ Clear**

---

### Send to Task Manager

Every item row has a small **send icon** button (an arrow pointing right) between the item text and the × remove button. Clicking it transfers that item to the Task Manager app.

**Workflow:**
1. Click the send icon on any item
2. A dialog appears showing the SFC code and a **Task Type** dropdown
3. Select the type and click **Send →**

On confirm: the item is removed from the inventory immediately and queued for Task Manager to pick up. A green toast confirms the send. Task Manager will show a **📥 imported** notification when it receives the item — either when you switch to its tab, or the next time it is opened.

**Tip:** Open Task Manager at least once before using this feature so it can publish its configured types.

---

### Import & Export

| Action | Menu item |
|--------|-----------|
| Export XML backup | Menu (≡) → Export XML |
| Export plain text snapshot | Menu (≡) → Export Plain Text |
| Import XML backup | Menu (≡) → Import XML |

> **Warning:** Importing replaces all current data. Export a backup first if needed.

---

### Dark Mode

Menu (≡) → Dark Mode toggle. Preference is saved and restored automatically.

---

### In-App Help

Menu (≡) → Help / README opens this documentation inside the app. Close it with **×**, by clicking outside the panel, or by pressing **Escape**.

---

## Sample Data

The repository includes `Inventory-testData.xml` — a ready-to-use dataset with four tabs and multiple subcategories for exploring all features.

**To load it:** Menu (≡) → Import XML → select `Inventory-testData.xml`

| Tab | Root Items | Subcategories |
|-----|-----------|---------------|
| General | SFC-001 – SFC-005 | Archived: SFC-006 – SFC-008 |
| Work | SFC-042 – SFC-044 | Pending: SFC-101 – SFC-104 · In Progress: SFC-105 – SFC-107 |
| Maintenance | SFC-200 – SFC-202 | Scheduled: SFC-210 – SFC-213 · Overdue: SFC-220 – SFC-222 |
| Logistics | SFC-300 – SFC-302 | Inbound: SFC-310 – SFC-312 · Outbound: SFC-320 |

---

## Data Storage

All inventory data is stored in **browser localStorage** — no server, no account needed. Data is tied to the specific browser and device you are using. Clearing browser history or site data will delete your inventory — export regularly as a backup.

To move data between browsers or devices, use Export XML / Import XML.

The Send to Task Manager feature uses two additional localStorage keys as a communication bridge:

| Key | Written by | Purpose |
|-----|-----------|---------|
| `tm_types` | Task Manager (on load) | Type list for the Send dialog dropdown |
| `tm_incoming_queue` | SFC Inventory (on send) | Queued items awaiting Task Manager import |

Redirect barcodes are stored as part of the tab and subcategory objects in the main `sfc_inventory` localStorage key — no separate key is needed.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Add item in the focused input field (or trigger redirect if barcode matches) |
| Escape | Close any open modal or the Help panel |

---

## Troubleshooting

**Inventory data disappeared**
Check you are using the same browser and device. Browser storage clearing wipes localStorage. Import your last XML backup.

**Import not working**
Confirm the file is a `.xml` exported from this app. Manually edited XML must preserve the exact structure shown above — any parse error will be rejected with an alert.

**An SFC is not being found**
The Exact Match lookup requires the item text to be *only* the SFC code with no surrounding characters. Items with extra text (e.g. `SFC-001 – rework`) will show as Partial Matches instead.

**SFC-42 and SFC-042 are treated as different codes**
The lookup is a string comparison. Zero-padding must match exactly between your data and your search queries.

**A redirect barcode is not triggering**
Redirect matching is case-insensitive but must otherwise be an exact string match. Check for leading/trailing spaces in the stored code or in the scanned value.

**A redirect barcode adds the item instead of redirecting**
The barcode was not found in any redirect list — verify it is saved on the correct tab or subcategory by clicking ⚡ on that target.

**The type dropdown shows generic fallback options**
Open `task-manager.html` at least once in the same browser. Task Manager publishes its configured types to localStorage automatically on load — once it has done this, the dropdown will stay current.

**A sent item has not appeared in Task Manager**
Both HTML files must be open in the same browser. Open or click on the Task Manager tab — it processes queued items on load and whenever its window regains focus.

**The sidebar is too narrow or too wide**
Hover over the thin vertical divider between the lookup panel and the tab content until the cursor changes to a resize arrow, then drag left or right. Range: 200–600 px.

---

## Browser Compatibility

Chrome (recommended), Firefox, Safari, Edge — any modern browser with JavaScript enabled. No internet connection required after the file is on your machine.

---

## Changelog

| Version | Changes |
|---------|---------|
| 1.7 | Added Redirect Barcodes: assign barcode(s) to any tab or subcategory via inline ⚡ button; scanning redirects focus silently without adding the code as an item; badge shows active rule count; redirect rules preserved in XML export/import |
| 1.6 | Added Send to Task Manager: icon button on every item row, type-selection dialog, localStorage queue bridge with Task Manager, confirmation toast; in-app Help updated |
| 1.5 | Added Export Plain Text; added in-app Help / README modal; Escape closes all modals |
| 1.4 | Split-panel layout; drag-to-resize sidebar (200–600 px); sticky header and tab bar; responsive stacked layout on narrow screens |
| 1.3 | Collapsible SFC lookup panel; compact summary pills; sticky controls |

---

**Version:** 1.7  
**Last updated:** April 2026
