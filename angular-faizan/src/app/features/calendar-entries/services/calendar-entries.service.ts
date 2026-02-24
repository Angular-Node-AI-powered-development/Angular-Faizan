import { Injectable } from '@angular/core';
import { TimeEntry } from '../models/time-entry.model';

/**
 * Calendar entries feature service. FE only — mock data; no HTTP.
 * Contract: epic-calendar-entries.md
 */
@Injectable({
  providedIn: 'root',
})
export class CalendarEntriesService {
  private entries: TimeEntry[] = this.getMockEntries();

  getEntries(): TimeEntry[] {
    return [...this.entries];
  }

  /** Map TimeEntry to FullCalendar event shape (start/end as ISO string or Date). */
  getEvents(): { id: string; title: string; start: Date; end: Date; extendedProps: { project: string; task: string; duration: string } }[] {
    return this.entries.map((e) => ({
      id: e.id,
      title: `${e.project} — ${e.task}`,
      start: e.start,
      end: e.end,
      extendedProps: {
        project: e.project,
        task: e.task,
        duration: e.duration ?? this.formatDuration(e.start, e.end),
      },
    }));
  }

  private formatDuration(start: Date, end: Date): string {
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (hours < 1) {
      const mins = Math.round(hours * 60);
      return `${mins}m`;
    }
    return `${hours}h`;
  }

  private getMockEntries(): TimeEntry[] {
    const base = new Date();
    const today = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    return [
      {
        id: '1',
        project: 'Project A',
        task: 'Task 1',
        description: 'Development',
        start: new Date(today.getTime() + 9 * 60 * 60 * 1000),
        end: new Date(today.getTime() + 17 * 60 * 60 * 1000),
        duration: '8h',
      },
      {
        id: '2',
        project: 'Project B',
        task: 'Task 2',
        description: 'Meeting',
        start: new Date(today.getTime() + 10 * 60 * 60 * 1000),
        end: new Date(today.getTime() + 12 * 60 * 60 * 1000),
        duration: '2h',
      },
    ];
  }
}
