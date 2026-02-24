import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEntriesService } from '../../services/calendar-entries.service';

/**
 * Calendar Entries page. Contract: epic-calendar-entries.md, user-stories-calendar-entries.md.
 * - Default view: week. Week and month views; Today, prev/next.
 * - Top bar: status, date, contributors (editable).
 * - Page title: "Calendar Entries".
 * - Entry cards: project, task, duration; Add Entry button and entry actions present (display-only until respective stories).
 */
@Component({
  selector: 'app-calendar-entries-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './calendar-entries-page.component.html',
  styleUrl: './calendar-entries-page.component.scss',
})
export class CalendarEntriesPageComponent implements OnInit {
  /** Top bar metadata — editable per contract */
  status = signal('00 READY TO REVIEW');
  date = signal(this.formatTopBarDate(new Date()));
  contributors = signal('HARDIK, KRUTA, SHREYASI');

  calendarOptions = signal<CalendarOptions | null>(null);
  events = signal<EventInput[]>([]);

  constructor(private calendarEntries: CalendarEntriesService) {}

  ngOnInit(): void {
    this.events.set(this.calendarEntries.getEvents());
    this.calendarOptions.set({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth',
      },
      titleFormat: { month: 'long', year: 'numeric' },
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
      nowIndicator: true,
      slotMinTime: '00:00:00',
      slotMaxTime: '24:00:00',
      allDaySlot: false,
      height: 'auto',
    });
  }

  private formatTopBarDate(d: Date): string {
    const day = d.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? 'ST'
        : day === 2 || day === 22
          ? 'ND'
          : day === 3 || day === 23
            ? 'RD'
            : 'TH';
    const months = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
    ];
    return `${day}${suffix} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  onStatusChange(value: string): void {
    this.status.set(value);
  }

  onDateChange(value: string): void {
    this.date.set(value);
  }

  onContributorsChange(value: string): void {
    this.contributors.set(value);
  }
}
