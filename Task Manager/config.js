// ─────────────────────────────────────────────────────────────────────────────
//  TASK MANAGER CONFIGURATION
//  Edit this file in any text editor, then refresh the app.
//  This file must stay in the same folder as task-manager.html
// ─────────────────────────────────────────────────────────────────────────────

var TASK_MANAGER_CONFIG = {

    // ── TASK TYPES ────────────────────────────────────────────────────────────
    types: [
        "Option 1",
        "Option 2",
        "Option 3"
    ],

    // ── STATUS OPTIONS ────────────────────────────────────────────────────────
    statusOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
    ],

    // ── TEXT BLOCKS ───────────────────────────────────────────────────────────
    //   Use \n for a newline inside a text value.
    textBlocks: [
        { label: "Sample 1", text: "Sample 1" },
        { label: "Sample 2", text: "Sample 2" },
        { label: "Sample 3", text: "Sample 3" }
    ],

    // ── URL TEMPLATE ──────────────────────────────────────────────────────────
    // {partNumber} is replaced with the actual part number (URL-encoded).
    // Set to "" to hide the link button entirely.
    urlTemplate: "https://example.com/search?q={partNumber}",

    // ── SECONDARY URL TEMPLATE ────────────────────────────────────────────────
    secondaryUrlTemplate: "https://example2.com/lookup?id={partNumber}",
    secondaryUrlLabel:    "Data Portal",

    // ── COMPLETION RULES ──────────────────────────────────────────────────────
    // When a task of triggerType is completed, a pending copy is created with outputType.
    // The copy requires the ⭐ Activate button before the timer can start.
    completionRules: [
        { triggerType: "Option 2", outputType: "Option 3" }
    ],

    // ── LINKS ─────────────────────────────────────────────────────────────────
    // Saved links shown in the Links tab.
    //   title = display name; url = full URL; desc = optional description
    links: [
        { title: "Wired News", url: "https://www.wired.com/", desc: "We bring you the future as it happens. From the latest in science and technology to the big stories in business and culture, we've got you covered." }
    ],

};
