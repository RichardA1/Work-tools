// ─────────────────────────────────────────────────────────────────────────────
//  TASK MANAGER CONFIGURATION
//  Edit this file in any text editor, then refresh the app.
//  This file must stay in the same folder as task-manager.html
// ─────────────────────────────────────────────────────────────────────────────

var TASK_MANAGER_CONFIG = {

    // ── TASK TYPES ────────────────────────────────────────────────────────────
    // Options shown in the "Type" dropdown when adding a new task.
    types: [
        "Option 1",
        "Option 2",
        "Option 3"
    ],

    // ── STATUS OPTIONS ────────────────────────────────────────────────────────
    // Dropdown shown on each task card.
    //   label  = text the user sees
    //   value  = what gets stored internally and exported to CSV
    statusOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
    ],

    // ── TEXT BLOCKS ───────────────────────────────────────────────────────────
    // Quick-copy snippets shown in the Text Blocks tab.
    //   label = heading shown on the card
    //   text  = what gets copied to clipboard
    //   Use \n for a newline inside a text value.
    textBlocks: [
        { label: "Sample 1", text: "Sample 1" },
        { label: "Sample 2", text: "Sample 2" },
        { label: "Sample 3", text: "Sample 3" }
    ],

    // ── URL TEMPLATE ──────────────────────────────────────────────────────────
    // Enables the 🔗 link button on each task card.
    // {partNumber} is replaced with the actual part number.
    // Set to "" to hide the link button entirely.
    //
    // Examples:
    //   "http://internal.company.com/part/{partNumber}"
    //   "https://www.google.com/search?q={partNumber}"
    //   "https://example.com/search?q={partNumber}&filter=active"
    urlTemplate: "https://example.com/search?q={partNumber}"

};
