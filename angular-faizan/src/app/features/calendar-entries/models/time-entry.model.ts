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
  /** Project color for left border (e.g. #e53935, #43a047, #8e24aa) */
  projectColor?: string;
  /** Calendar source for filtering: mentioned | logged | integrated */
  calendarType?: 'mentioned' | 'logged' | 'integrated';
}

/** Project with color for sidebar and event styling */
export interface ProjectTask {
  id: string;
  name: string;
  color: string;
}
