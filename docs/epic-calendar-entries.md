## Epic: Calendar Entries (Time Tracker — Nexus)

### Goal

Users can view, add, edit, delete, duplicate, and reorder time entries on a calendar so that effort is tracked per project/task and visible by day or week.

### In Scope

- Calendar view with page title "Calendar Entries", month/week navigation (Today, prev/next arrows), day names, dates, and time slots.
- **Default view:** Week. Week and month views are both in scope; user can switch between them.
- Entry cards showing project, task, duration, with play/pause (timer), duplicate, and delete; selected and active-timer visual states.
- Add/Edit entry: form/modal with description input, project dropdown, task dropdown, **start time**, **end time** (24-hour format), Save/Cancel.
- **Entry form validation:** Required fields — description, start time, end time, select project, select task. End time must be greater than start time. Maximum time entry duration is 8 hours. Invalid input shows a toast with error message (bottom-right).
- **Drag-and-drop** (week view only in this epic): entries between project tasks; **valid drop target** (green highlight) when the slot has no existing entry; **invalid drop target** (red highlight) when a time entry already exists in the same slot (no overlapping entries). Month-view dragging is out of scope for this epic (later).
- Context menu / action panel on entry: fixed options **Delete**, **Duplicate**, **Add entry** (not editable by user).
- Delete: confirmation dialog before delete; no visual change to the entry when "Delete" is chosen before confirmation.
- Top bar / metadata: status (e.g. "00 READY TO REVIEW"), date, contributors — **editable**.
- Summary displays: total hours per day or week.
- Hover and focus states for buttons and entry cards (no disabled state required).
- Empty calendar state (days with no entries).
- **Timer behavior:** Only one timer can run at a time across the calendar. When a timer is running, navigating (e.g. change month/week) or editing another entry does not affect the timer; the other action (navigate/edit) happens as expected.

### Out of Scope

- Backend APIs, persistence, or authentication (UI-only scope from UI Map).
- Permissions, roles, or access control (not defined in UI Map).
- Offline or sync behavior.
- Playground or Components library as a deliverable (design-system only; epic is the Calendar Entries feature).
- **Drag-and-drop in month view** — in scope later; this epic covers week-view dragging only.
- Any behavior or data not visible or implied in the UI Map.

### Known Unknowns

- (None — previous unknowns resolved per clarifications below.)

### Clarifications (resolved)

- **Default view:** Week.
- **Top-bar metadata:** Status, date, and contributors are editable. **Context menu:** Not editable; fixed options only (Delete, Duplicate, Add entry).
- **Drop targets:** Invalid (red) when a time entry already exists in the same slot; valid (green) when the slot is free. Overlapping entries in the same slot are not allowed.
- **Validation:** Required fields are description, start time, end time, select project, select task. Time format is 24-hour. End time must be greater than start time. Maximum entry duration is 8 hours. Errors trigger a toast with the error message (bottom-right).
- **Timer:** Only one timer can run at a time. Timer is unaffected when navigating or editing another entry.
- **Views:** Both week and month views are in scope; default is week.
- **Drag-and-drop:** Week view only in this epic; month-view dragging later.

### User Stories (max 5)

1. **View calendar and entries** — As a user, I can open the Calendar Entries view and see the calendar (week or month) with navigation (Today, prev/next) and existing entries, so that I can review time by date.
2. **Add and edit entries** — As a user, I can add and edit time entries (description, project, task, start time, end time) via the form/modal and see validation errors in a bottom-right toast when required fields are missing or invalid, so that my entries are correct.
3. **Timer and entry actions** — As a user, I can start/stop a timer on an entry and use Duplicate or Delete (with confirmation dialog), so that I can track and manage time; navigating or editing another entry does not stop the timer.
4. **Drag-and-drop entries** — As a user, I can drag an entry to another project/task and slot and see green (valid, slot free) or red (invalid, slot already has an entry) drop targets, so that I never create overlapping entries in the same slot.
5. **Context menu and metadata** — As a user, I can open the entry context menu (fixed options: Delete, Duplicate, Add entry — not editable), edit top-bar metadata (status, date, contributors), and see hover and focus on buttons and entry cards, so that actions and metadata are clear (metadata editable; context menu fixed).

