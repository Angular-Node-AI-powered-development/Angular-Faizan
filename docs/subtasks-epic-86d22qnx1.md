# Subtasks: Calendar Entries Epic

**Contract:** [epic-calendar-entries.md](epic-calendar-entries.md)  
**ClickUp Story:** [86d22qnx1](https://app.clickup.com/t/86d22qnx1)  
Per [contract-to-subtask.mdc](.cursor/rules/contract-to-subtask.mdc): by responsibility only; max 3 ([FE], [BE], [DB]); one FE subtask for all UI; no API changes.

---

## [FE] Calendar Entries — frontend

**Title:** `[FE] Calendar Entries — frontend`

**Description:**

Implement the Calendar Entries screen per approved Epic (epic-calendar-entries.md). Single frontend subtask for all UI; no subtasks per component, page, or section.

**In scope (all in this subtask):**
- Calendar view: page title "Calendar Entries"; default view **week**; week and month views with toggle; Today button; prev/next arrows; day names, dates, time slots; empty calendar state.
- Top bar: status, date, contributors — **editable**.
- Entry cards: project, task, duration; play/pause (timer), duplicate, delete; selected and active-timer visual states. Only one timer at a time; timer unaffected when navigating or editing another entry.
- Add/Edit entry form/modal: description input, project dropdown, task dropdown, start time, end time (24-hour format), Save/Cancel. Validation: required fields (description, start time, end time, project, task); end time > start time; max duration 8 hours. Show validation errors in a **toast bottom-right**; form does not close on invalid submit.
- Drag-and-drop (week view only): valid drop target (green), invalid drop target (red when slot has an entry); ghost/preview while dragging; no overlapping entries in same slot. Month-view dragging out of scope.
- Context menu on entry: fixed options Delete, Duplicate, Add entry (not editable). Delete: confirmation dialog; no visual change to entry before confirm.
- Summary displays: total hours per day or week.
- Hover and focus states for buttons and entry cards (no disabled state required).

**Critical:** Implement all visual structure from the contract (layout, columns, buttons, icons, formatting). Include any display-only or disabled elements as specified. Handle loading, empty, and error states. Do not add or change APIs.

**Done when:** UI matches Figma/contract; all states implemented; unit tests added.

---

## [BE] Calendar Entries — backend

**Title:** `[BE] Calendar Entries — backend`

**Description:**

Implement backend support for Calendar Entries as required by the approved Epic (epic-calendar-entries.md). Do **not** add or change API contracts; use existing endpoints only.

**In scope (all in this subtask):**
- Time entries: create (add entry), update (edit entry), delete (with confirmation flow), duplicate (same data), move (reassign slot/project/task; week view; no overlapping entries in same slot).
- Validation aligned with frontend: required fields; end time > start time; max 8h duration; return errors suitable for bottom-right toast.
- Top-bar metadata: persist and return status, date, contributors (editable).
- Timer: support single active timer and “unaffected by navigate/edit” behavior as needed by existing API.

**Done when:** Backend behavior matches contract; no new or changed APIs; unit tests added.

---

## [DB] — not created

No [DB] subtask: contract does not specify schema or database changes. Do not add or change APIs.

---

## Summary

| Subtask | Title |
|--------|--------|
| 1 | [FE] Calendar Entries — frontend |
| 2 | [BE] Calendar Entries — backend |

Create these two subtasks under ClickUp story [86d22qnx1](https://app.clickup.com/t/86d22qnx1).
