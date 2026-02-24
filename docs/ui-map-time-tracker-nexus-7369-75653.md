# UI MAP

## Screen: 02.1 Time Tracker — Nexus (Calendar Entries)

Node ID: 7369-75653

### Layout Sections

- **Top bar / metadata** — Horizontal strip at top (status, date, contributors).
- **Page title** — Centered block with title "Calender Entries" (blue-shaded box).
- **Dragging entries flow** — Vertical stack of frames: "Dragging entries through project tasks".
- **Calendar flow (main)** — Long vertical flow of interconnected screens/states (light green background): calendar navigation, grid, entry cards, entry form/modal.
- **Playground** — Section labeled "Playground" with component arrangements.
- **Components** — Section titled "Components" on dark grey background (atoms/patterns).
- **Delete, Duplicate, Add entries** — Section on yellow-cream background for delete/duplicate/add actions.

### Visible Actions

- **Drag:** Entry card from one container to another (drag-and-drop between project tasks).
- **Click:** "Today" button.
- **Click:** Left/right arrow buttons (previous/next period).
- **Click:** Calendar cell or existing entry (select date/slot or entry).
- **Click:** "Add Entry" button.
- **Click:** Entry card (open edit form/modal).
- **Type:** Text fields (description, project, task, time).
- **Select:** Project/task from dropdown.
- **Click:** Play/pause icon on entry (start/stop timer).
- **Click:** "Save" or "Cancel" on entry form.
- **Click:** Trash icon or "Delete" (delete entry).
- **Click:** "Duplicate" option.
- **Click:** "Add entry" option (context/action menu).

### UI Components

- Text labels (metadata, titles).
- Buttons: "Today", navigation arrows, "Add Entry", "Save", "Cancel".
- Calendar grid (day names, dates, time slots).
- Entry cards (project/task label, duration, play/pause, duplicate, trash).
- Entry form/modal: description input, project dropdown, task dropdown, time input, Save/Cancel.
- Context menu / action panel: "Delete", "Duplicate", "Add entry".
- Summary displays (total hours per day/week).
- Reusable atoms: inputs, dropdowns, date displays, timer controls, entry card variants.

### Data Displayed

- **Metadata:** Status (e.g. "00 READY TO REVIEW"), date (e.g. "13TH JUNE 2025"), contributors (e.g. "HARDIK, KRUTA, SHREYASI").
- **Page:** Title "Calender Entries".
- **Calendar:** Month/year (e.g. "November 2023"), day names (Mon, Tue, …), date numbers.
- **Entries:** Project names, task names, descriptions, durations (e.g. "8h", "4h", "00:00:00").
- **Totals:** Total hours for day or week.
- **Actions:** Labels "Delete", "Duplicate", "Add entry".
- **Playground/Components:** Placeholder text (e.g. "Project A", "Task B", "8h").

### Visual States

- **Default:** Calendar view with entries; entry cards at rest.
- **Empty:** Calendar days with no entries.
- **Selected entry:** Entry card highlighted (e.g. different background).
- **Active timer:** Entry with running timer (e.g. green background or prominent play/pause).
- **Dragging:** Entry being dragged (ghost/preview, distinct from source).
- **Entry form/modal:** Add or edit form visible.
- **Action menu/panel:** Shown over or next to entry for Delete/Duplicate/Add entry.

### Explicit Unknowns

- NEEDS CLARIFICATION: Visual cues for valid vs invalid drop targets when dragging entries.
- NEEDS CLARIFICATION: Distinct hover styles for buttons and entry cards.
- NEEDS CLARIFICATION: Validation/error states for form fields (invalid input).
- NEEDS CLARIFICATION: Whether a confirmation dialog is shown before delete.
- NEEDS CLARIFICATION: Whether an entry changes visually when "Delete" is chosen before confirmation.
- NEEDS CLARIFICATION: Disabled, hover, or focus states for each component in the Components section.
- NEEDS CLARIFICATION: Exact copy and spelling of "Calender" vs "Calendar" for page title.

---

## Figma Notes Handling

- No text layers labeled "REQ:", "RULE:", or "EDGE:" were present in the extracted node.
- If such notes exist elsewhere in the file, they must be quoted verbatim and not treated as confirmed requirements; conflicts with the UI must be marked as NEEDS CLARIFICATION.
