/**
 * Time entry as displayed and managed on the calendar.
 * Contract: epic-calendar-entries.md, user-stories-calendar-entries.md
 */
export interface TimeEntry {
  id: string;
  project: string;
  task: string;
  description: string;
  start: Date;
  end: Date;
  /** Display duration e.g. "8h", "4h" — derived from start/end if not set */
  duration?: string;
}
