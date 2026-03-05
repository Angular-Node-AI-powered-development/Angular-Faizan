import { Injectable, signal, computed } from '@angular/core';
import { TimeEntry } from '../models/time-entry.model';

export type CalendarFilterType = 'mentioned' | 'logged' | 'integrated';

/**
 * Calendar entries feature service. FE only — mock data; no HTTP.
 * Contract: epic-calendar-entries.md. Ticket 2: add/edit/delete, drag, filter.
 */
@Injectable({
  providedIn: 'root',
})
export class CalendarEntriesService {
  private entriesSignal = signal<TimeEntry[]>(this.getMockEntries());
  private projectFilterSignal = signal<Set<string>>(new Set());
  private calendarFilterSignal = signal<Set<CalendarFilterType>>(new Set(['mentioned', 'logged']));
  /** Story 3: only one timer runs at a time; id of entry whose timer is running, or null */
  private runningTimerEntryIdSignal = signal<string | null>(null);

  readonly entries = this.entriesSignal.asReadonly();
  readonly projectFilter = this.projectFilterSignal.asReadonly();
  readonly calendarFilter = this.calendarFilterSignal.asReadonly();
  readonly runningTimerEntryId = this.runningTimerEntryIdSignal.asReadonly();

  readonly projects: { id: string; name: string; color: string }[] = [
    { id: 'p1', name: 'FPE Powerbank', color: '#e53935' },
    { id: 'p2', name: 'ACE - Program', color: '#8e24aa' },
    { id: 'p3', name: 'FPE-Solar Link', color: '#43a047' },
    { id: 'p4', name: 'Aub Design Standards', color: '#8e24aa' },
  ];

  private nextId = 10;

  getEntries(): TimeEntry[] {
    return [...this.entriesSignal()];
  }

  getFilteredEvents(): TimeEntry[] {
    const entries = this.entriesSignal();
    const byProject = this.projectFilterSignal();
    const byCalendar = this.calendarFilterSignal();
    return entries.filter((e) => {
      const projectKey = e.project;
      if (byProject.size > 0 && !byProject.has(projectKey)) return false;
      const type = e.calendarType ?? 'logged';
      if (byCalendar.size > 0 && !byCalendar.has(type)) return false;
      return true;
    });
  }

  /** Map TimeEntry to FullCalendar event shape. */
  getEvents(): { id: string; title: string; start: Date; end: Date; extendedProps: Record<string, unknown>; classNames?: string[] }[] {
    const runningId = this.runningTimerEntryIdSignal();
    return this.getFilteredEvents().map((e) => ({
      id: e.id,
      title: `${e.project} | ${e.task}`,
      start: e.start,
      end: e.end,
      extendedProps: {
        project: e.project,
        task: e.task,
        duration: e.duration ?? this.formatDuration(e.start, e.end),
        description: e.description,
        projectColor: e.projectColor,
        calendarType: e.calendarType ?? 'logged',
      },
      classNames: [
        ...(e.projectColor ? ['fc-event--project-border'] : []),
        ...(e.id === runningId ? ['fc-event--timer-running'] : []),
      ],
    }));
  }

  getEntryById(id: string): TimeEntry | undefined {
    return this.entriesSignal().find((e) => e.id === id);
  }

  addEntry(entry: Omit<TimeEntry, 'id'>): TimeEntry {
    const newEntry: TimeEntry = {
      ...entry,
      id: String(this.nextId++),
      duration: entry.duration ?? this.formatDuration(entry.start, entry.end),
    };
    this.entriesSignal.update((list) => [...list, newEntry]);
    return newEntry;
  }

  updateEntry(id: string, updates: Partial<Omit<TimeEntry, 'id'>>): void {
    this.entriesSignal.update((list) =>
      list.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  }

  removeEntry(id: string): void {
    if (this.runningTimerEntryIdSignal() === id) {
      this.runningTimerEntryIdSignal.set(null);
    }
    this.entriesSignal.update((list) => list.filter((e) => e.id !== id));
  }

  isTimerRunning(entryId: string): boolean {
    return this.runningTimerEntryIdSignal() === entryId;
  }

  startTimer(entryId: string): void {
    this.runningTimerEntryIdSignal.set(entryId);
  }

  stopTimer(): void {
    this.runningTimerEntryIdSignal.set(null);
  }

  duplicateEntry(entryId: string): TimeEntry | undefined {
    const entry = this.entriesSignal().find((e) => e.id === entryId);
    if (!entry) return undefined;
    const { id: _id, ...rest } = entry;
    return this.addEntry(rest);
  }

  setProjectFilter(projectIds: Set<string>): void {
    this.projectFilterSignal.set(projectIds);
  }

  setCalendarFilter(types: Set<CalendarFilterType>): void {
    this.calendarFilterSignal.set(types);
  }

  toggleCalendarFilter(type: CalendarFilterType): void {
    this.calendarFilterSignal.update((set) => {
      const next = new Set(set);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  /** Total hours for a date range (for week's log). */
  getTotalHoursForRange(start: Date, end: Date): number {
    const entries = this.getFilteredEvents();
    let totalMs = 0;
    const rangeStart = start.getTime();
    const rangeEnd = end.getTime();
    for (const e of entries) {
      const eStart = Math.max(e.start.getTime(), rangeStart);
      const eEnd = Math.min(e.end.getTime(), rangeEnd);
      if (eEnd > eStart) totalMs += eEnd - eStart;
    }
    return totalMs / (1000 * 60 * 60);
  }

  /** Check if dropping at new start/end would overlap another entry (excluding eventId). */
  wouldOverlap(newStart: Date, newEnd: Date, excludeEventId: string): boolean {
    return this.getFilteredEvents().some(
      (e) => e.id !== excludeEventId && e.start < newEnd && e.end > newStart
    );
  }

  private formatDuration(start: Date, end: Date): string {
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (hours < 1) {
      const mins = Math.round(hours * 60);
      return `${mins} min`;
    }
    return `${hours.toFixed(2)} hrs`;
  }

  private getMockEntries(): TimeEntry[] {
    const base = new Date();
    const today = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    const mon = new Date(today);
    mon.setDate(today.getDate() - today.getDay() + 1);
    return [
      {
        id: '1',
        project: 'FPE-Solar Link',
        task: 'Daily Scrum',
        description: 'Billable',
        start: new Date(mon.getTime() + 10 * 60 * 60 * 1000),
        end: new Date(mon.getTime() + 11 * 60 * 60 * 1000),
        duration: '1:00 hrs',
        projectColor: '#43a047',
        calendarType: 'logged',
      },
      {
        id: '2',
        project: 'Project A',
        task: 'Task 1',
        description: 'Development',
        start: new Date(mon.getTime() + 9 * 60 * 60 * 1000),
        end: new Date(mon.getTime() + 17 * 60 * 60 * 1000),
        duration: '8h',
        projectColor: '#8e24aa',
        calendarType: 'logged',
      },
      {
        id: '3',
        project: 'Project B',
        task: 'Task 2',
        description: 'Meeting',
        start: new Date(mon.getTime() + 10 * 60 * 60 * 1000),
        end: new Date(mon.getTime() + 12 * 60 * 60 * 1000),
        duration: '2h',
        projectColor: '#e53935',
        calendarType: 'mentioned',
      },
    ];
  }
}
