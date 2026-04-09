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
    // Enables the 🔗 link button on each task card (shown in the part number row).
    // {partNumber} is replaced with the actual part number (URL-encoded).
    // Set to "" to hide the link button entirely.
    //
    // Examples:
    //   "http://internal.company.com/part/{partNumber}"
    //   "https://www.google.com/search?q={partNumber}"
    //   "https://example.com/search?q={partNumber}&filter=active"
    urlTemplate: "https://example.com/search?q={partNumber}",

    // ── SECONDARY URL TEMPLATE ────────────────────────────────────────────────
    // Enables a second link button shown near the Start / Stop timer buttons.
    // Unlike the icon-only 🔗 button above, this one displays a text label.
    //
    //   secondaryUrlTemplate = URL to open; {partNumber} is replaced with the
    //                          actual part number (URL-encoded).
    //                          Set to "" to hide the button entirely.
    //
    //   secondaryUrlLabel    = Text label shown on the button.
    //                          Keep it short (1–3 words) so it fits the card.
    //
    // Examples:
    //   secondaryUrlTemplate: "http://erp.company.com/orders?sfc={partNumber}"
    //   secondaryUrlLabel:    "View ERP"
    //
    //   secondaryUrlTemplate: "https://jira.company.com/issues/?jql=text+%7E+%22{partNumber}%22"
    //   secondaryUrlLabel:    "Jira"
    //
    //   secondaryUrlTemplate: ""    ← hides the button
    secondaryUrlTemplate: "https://example2.com/lookup?id={partNumber}",
    secondaryUrlLabel: "View Details"

};
