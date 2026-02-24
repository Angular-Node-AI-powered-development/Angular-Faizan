# User Stories: Calendar Entries (Time Tracker — Nexus)

Epic reference: [epic-calendar-entries.md](epic-calendar-entries.md)  
UI Map reference: [ui-map-time-tracker-nexus-7369-75653.md](ui-map-time-tracker-nexus-7369-75653.md)  
Design: Figma node 7369-75653 — Screen: 02.1 Time Tracker — Nexus (Calendar Entries)

---

### Story 1: View calendar and entries

As a **user**,
I want **to open the Calendar Entries view and see the calendar (week or month) with navigation (Today, prev/next) and existing entries**,
so that **I can review time by date**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus (Calendar Entries)
- Interaction: View calendar; switch week/month; click Today; click left/right arrows; see day names, dates, time slots, entry cards, summary totals.

**Acceptance Criteria**
- Given I am on the Calendar Entries view, when the page loads, then I see the **week view** by default, page title "Calendar Entries", top bar (status, date, contributors), calendar grid with day names and dates, and any existing entry cards with project/task and duration.
- Given I am viewing the calendar, when I click "Today", then the calendar shows the current week or month and today is visually indicated.
- Given I am viewing the calendar, when I click the left (or right) arrow, then the calendar shows the previous (or next) period; week and month views are both available (default is week).
- Given there are no entries for a day, when I view that day, then I see the empty calendar state (no entry cards in that slot).
- Visual state matches design (including all UI elements from Epic/UI Map, even if non-functional).
- **Display-only in this story:** Add Entry button, entry card actions (play/pause, duplicate, trash), entry form/modal, context menu, drag-and-drop affordances — present but disabled or non-interactive until their respective stories.

**Visual Structure Reference**
- Epic specifies: Calendar view with page title "Calendar Entries", month/week navigation (Today, prev/next arrows), day names, dates, time slots; week and month views; entry cards (project, task, duration); summary displays (total hours per day/week); top bar (status, date, contributors); empty calendar state.
- UI Map specifies: Top bar/metadata; page title (blue-shaded box); calendar flow (navigation, grid, entry cards); calendar grid (day names, dates, time slots); entry cards (project/task label, duration); summary displays; default and empty visual states.
- **Note**: Add Entry button, entry card icons (play/pause, duplicate, trash), entry form/modal, context menu, and drag handles are present for layout — mark as disabled/display-only; functionality in Stories 2–5.

**Definition of Done**
- UI matches Figma.
- Interaction works as described.
- No unresolved assumptions.

---

### Story 2: Add and edit entries

As a **user**,
I want **to add and edit time entries (description, project, task, start time, end time) via a form/modal and see validation errors in a bottom-right toast when required fields are missing or invalid**,
so that **my entries are correct**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus (Calendar Entries)
- Interaction: Click "Add Entry" or an entry card to open form/modal; type description; select project and task; set start and end time; Save/Cancel; invalid submit shows toast (bottom-right).

**Acceptance Criteria**
- Given I am on the Calendar Entries view, when I click "Add Entry", then a form/modal opens with fields: description (input), project (dropdown), task (dropdown), start time, end time (24-hour format), and Save/Cancel buttons.
- Given I am viewing an existing entry card, when I click the entry card, then the same form/modal opens with that entry’s data populated (edit mode).
- Given the form is open, when I leave any required field (description, start time, end time, project, task) empty or invalid and click Save, then a toast with the error message appears in the bottom-right and the form does not close.
- Given the form is open, when start time and end time are set, then end time must be greater than start time; otherwise a validation toast is shown (bottom-right).
- Given the form is open, when the entry duration (end time minus start time) exceeds 8 hours, then a validation toast is shown (bottom-right) and the form does not submit.
- Given the form is open and all required fields are valid (end time > start time, duration ≤ 8 hours), when I click Save, then the form closes and the calendar reflects the new or updated entry (or display-only in this story if persistence is out of scope).
- Given the form is open, when I click Cancel, then the form closes without saving.
- Visual state matches design (including all UI elements from Epic/UI Map, even if non-functional).
- **Display-only in this story:** Play/pause (timer), Duplicate, Delete, context menu, drag-and-drop — present but disabled if functionality is in other stories.
**Visual Structure Reference**
- Epic specifies: Add/Edit entry form/modal with description input, project dropdown, task dropdown, start time, end time (24-hour format), Save/Cancel; required fields — description, start time, end time, project, task; validation: end time > start time, max duration 8 hours; validation errors via toast (bottom-right).
- UI Map specifies: Entry form/modal (description input, project dropdown, task dropdown, time input, Save/Cancel); toast (bottom-right; validation/error message); validation error visual state.
- **Note**: Entry cards, timer, duplicate, delete, context menu, and drag are present — mark as disabled/display-only where their behavior is in Stories 1, 3, 4, 5.

**Definition of Done**
- UI matches Figma.
- Interaction works as described.
- No unresolved assumptions.

---

### Story 3: Timer and entry actions (Duplicate, Delete)

As a **user**,
I want **to start/stop a timer on an entry and use Duplicate or Delete (with confirmation dialog), and have the timer continue when I navigate or edit another entry**,
so that **I can track and manage time without losing the running timer**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus (Calendar Entries)
- Interaction: Click play/pause on entry card (start/stop timer); click Duplicate or Delete in context menu; confirm delete in dialog; navigate or edit another entry while timer runs.

**Acceptance Criteria**
- Given I am viewing an entry card, when I click the play icon on that entry, then the timer starts for that entry and the entry shows the active-timer visual state (e.g. green background or prominent play/pause).
- Given a timer is running on an entry, when I click the pause icon on that entry, then the timer stops and the entry returns to default visual state.
- Given I open the context menu on an entry (Delete, Duplicate, Add entry), when I click "Duplicate", then a new entry is created with the same data (or display-only if persistence is elsewhere).
- Given I open the context menu and click "Delete", when the confirmation dialog appears, then the entry does not change visually before I confirm; when I confirm, the entry is removed (or display-only if persistence is elsewhere).
- Given a timer is running on an entry, when I navigate (e.g. change month/week) or open/edit another entry, then the timer is unaffected and the other action (navigate/edit) completes as expected.
- Given no timer is running, when I start a timer on an entry, then that entry's timer runs. Given a timer is already running on another entry, when I start a timer on a different entry, then only one timer runs at a time (the new one starts; the previous one stops — or behavior per product rule).
- Visual state matches design (including all UI elements from Epic/UI Map, even if non-functional).
- **Display-only in this story:** Add/Edit form fields and validation toast — present but behavior covered in Story 2; drag-and-drop covered in Story 4.

**Visual Structure Reference**
- Epic specifies: Entry cards with play/pause (timer), duplicate, delete; only one timer can run at a time; active-timer visual state; context menu (Delete, Duplicate, Add entry — fixed, not editable); delete confirmation dialog; no visual change to entry when "Delete" is chosen before confirm; timer unaffected by navigate/edit.
- UI Map specifies: Entry cards (play/pause, duplicate, trash); context menu/action panel ("Delete", "Duplicate", "Add entry"); confirmation dialog (before delete); active timer state; delete flow (confirmation, no visual change before confirm).
- **Note**: Add Entry button, calendar navigation, entry form/modal, and drag-and-drop are present — mark as disabled/display-only where functionality is in Stories 1, 2, 4.

**Definition of Done**
- UI matches Figma.
- Interaction works as described.
- No unresolved assumptions.

---

### Story 4: Drag-and-drop entries (week view only)

As a **user**,
I want **to drag an entry to another project/task and slot in week view and see green (valid, slot free) or red (invalid, slot already has an entry) drop targets**,
so that **I never create overlapping entries in the same slot**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus (Calendar Entries)
- Interaction: In week view, drag entry card from one container/slot to another; see valid (green) or invalid (red) drop target; drop only when valid. Month-view dragging is out of scope for this epic (later).

**Acceptance Criteria**
- Given I am viewing the calendar in **week view** with at least one entry, when I start dragging an entry card, then a drag preview (ghost) is shown and the source slot remains visible.
- Given I am dragging an entry over a slot that has no existing entry (same or different project/task), when I hover over that slot, then the drop target is highlighted in green (valid).
- Given I am dragging an entry over a slot that already has a time entry, when I hover over that slot, then the drop target is highlighted in red (invalid).
- Given I am over a valid (green) drop target, when I release the drag, then the entry is moved to that slot (or display-only if persistence is elsewhere) and the calendar updates.
- Given I am over an invalid (red) drop target or cancel the drag, when I release, then no move occurs and the entry stays in place (or returns).
- Dragging in month view is out of scope for this epic (to be done later).
- Visual state matches design (including all UI elements from Epic/UI Map, even if non-functional).
- **Display-only in this story:** Add/Edit form, timer, duplicate/delete, top-bar metadata editing — present but behavior in Stories 2, 3, 5.

**Visual Structure Reference**
- Epic specifies: Drag-and-drop entries in **week view only** (month-view dragging later); valid drop target (green) when slot is free; invalid drop target (red) when a time entry already exists in the same slot; no overlapping entries in the same slot.
- UI Map specifies: Drag entry card between containers; dragging visual state (ghost/preview); drop target valid (green highlight); drop target invalid (red highlight); "Dragging entries through project tasks" flow.
- **Note**: Entry form, timer, context menu, and metadata are present — mark as disabled/display-only where functionality is in Stories 2, 3, 5.

**Definition of Done**
- UI matches Figma.
- Interaction works as described.
- No unresolved assumptions.

---

### Story 5: Context menu and editable top-bar metadata

As a **user**,
I want **to open the entry context menu (fixed options: Delete, Duplicate, Add entry — not editable), edit the top-bar metadata (status, date, contributors), and see hover and focus on buttons and entry cards**,
so that **actions are clear and metadata is editable**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus (Calendar Entries)
- Interaction: Open context menu on entry (fixed options only); edit status, date, contributors in top bar; hover/focus on buttons and entry cards.

**Acceptance Criteria**
- Given I am viewing an entry card, when I open the context menu (e.g. right-click or designated control), then I see the fixed options: "Delete", "Duplicate", "Add entry" (context menu is not editable by the user; options are fixed). Choosing an option triggers the behavior defined in Stories 2 and 3 (this story covers opening and displaying the menu).
- Given I am on the Calendar Entries view, when I interact with the top bar (status, date, contributors), then I can edit those fields and the displayed values update.
- Given I hover over a button (Today, arrows, Add Entry, Save, Cancel) or an entry card, when the pointer is over the element, then a distinct hover style is applied per design.
- Given I focus a button or entry card (keyboard or click), when the element has focus, then a distinct focus style is applied per design; disabled state is not required.
- Visual state matches design (including all UI elements from Epic/UI Map, even if non-functional).
- **Display-only in this story:** Timer start/stop, delete confirmation, duplicate result, add-entry form, drag-and-drop — behavior in Stories 2, 3, 4; this story ensures context menu is displayed (fixed options) and top-bar metadata is editable; hover/focus are visible.

**Visual Structure Reference**
- Epic specifies: Context menu/action panel on entry — fixed options (Delete, Duplicate, Add entry), **not editable**; top bar (status, date, contributors) **editable**; hover and focus states for buttons and entry cards (no disabled state required).
- UI Map specifies: Context menu/action panel ("Delete", "Duplicate", "Add entry"); top bar/metadata (status, date, contributors); hover and focus visual states; reusable atoms (hover and focus; no disabled state).
- **Note**: Calendar grid, entry form, timer, and drag are present — mark as disabled/display-only where their primary behavior is in Stories 1–4.

**Definition of Done**
- UI matches Figma.
- Interaction works as described.
- No unresolved assumptions.
