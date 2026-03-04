import {
  Component,
  OnInit,
  signal,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventInput,
  EventClickArg,
  EventDropArg,
  DatesSetArg,
  CalendarApi,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEntriesService, CalendarFilterType } from '../../services/calendar-entries.service';

@Component({
  selector: 'app-calendar-entries-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FullCalendarModule],
  templateUrl: './calendar-entries-page.component.html',
  styleUrl: './calendar-entries-page.component.scss',
})
export class CalendarEntriesPageComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarRef!: FullCalendarComponent;

  calendarEntries = inject(CalendarEntriesService);

  calendarApi: CalendarApi | null = null;
  calendarOptions = signal<CalendarOptions | null>(null);
  events = signal<EventInput[]>([]);
  currentView = signal<'timeGridWeek' | 'timeGridDay'>('timeGridWeek');
  dateRangeLabel = signal('');
  selectedDateStr = signal(this.toDateInputValue(new Date()));
  weekTotalHours = signal(0);

  showEntryModal = signal(false);
  editingEntryId = signal<string | null>(null);
  entryFormModel = {
    description: '',
    project: '',
    task: '',
    startTime: '09:00',
    endTime: '17:00',
    startDate: '',
    endDate: '',
  };
  toastMessage = signal<string | null>(null);

  readonly dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  readonly todayLetter = this.dayLabels[new Date().getDay()];

  ngOnInit(): void {
    this.refreshEvents();
    this.calendarOptions.set({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: false,
      titleFormat: { month: 'long', year: 'numeric' },
      slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
      slotMinTime: '10:00:00',
      slotMaxTime: '22:00:00',
      nowIndicator: true,
      allDaySlot: false,
      height: 'auto',
      editable: true,
      eventClick: (arg) => this.onEventClick(arg),
      dateClick: (arg) => this.onDateClick(arg),
      eventDrop: (arg) => this.onEventDrop(arg),
      datesSet: (arg) => this.onDatesSet(arg),
      eventDidMount: (arg) => this.applyEventBorderColor(arg),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calendarApi = this.calendarRef?.getApi() ?? null;
    });
  }

  onOptionsChange(_opts: CalendarOptions): void {}

  refreshEvents(): void {
    this.events.set(this.calendarEntries.getEvents());
    this.updateWeekTotal();
  }

  private updateWeekTotal(): void {
    const api = this.calendarApi;
    if (api) {
      const view = api.view;
      const start = view.activeStart;
      const end = view.activeEnd;
      const total = this.calendarEntries.getTotalHoursForRange(start, end);
      this.weekTotalHours.set(Math.round(total * 100) / 100);
    }
  }

  onDatesSet(arg: DatesSetArg): void {
    const start = arg.start;
    const end = arg.end;
    this.dateRangeLabel.set(
      `${this.fmt(start)} - ${this.fmt(end)}`
    );
    this.selectedDateStr.set(this.toDateInputValue(start));
    const total = this.calendarEntries.getTotalHoursForRange(start, end);
    this.weekTotalHours.set(Math.round(total * 100) / 100);
  }

  private fmt(d: Date): string {
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  setView(view: 'timeGridDay' | 'timeGridWeek'): void {
    this.calendarApi?.changeView(view);
    this.currentView.set(view);
  }

  onDatePickerChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const date = input.value ? new Date(input.value) : new Date();
    this.calendarApi?.gotoDate(date);
    this.selectedDateStr.set(input.value || this.toDateInputValue(date));
  }

  private toDateInputValue(d: Date): string {
    return d.toISOString().slice(0, 10);
  }

  openAddEntry(date?: Date, startTime?: string): void {
    const d = date ?? this.calendarApi?.getDate() ?? new Date();
    const dateStr = this.toDateInputValue(d);
    this.entryFormModel = {
      description: '',
      project: this.calendarEntries.projects[0]?.name ?? '',
      task: '',
      startTime: startTime ?? '09:00',
      endTime: startTime ?? '10:00',
      startDate: dateStr,
      endDate: dateStr,
    };
    this.editingEntryId.set(null);
    this.showEntryModal.set(true);
  }

  closeEntryModal(): void {
    this.showEntryModal.set(false);
    this.editingEntryId.set(null);
  }

  saveEntry(): void {
    const m = this.entryFormModel;
    const err = this.validateEntry(m);
    if (err) {
      this.toastMessage.set(err);
      setTimeout(() => this.toastMessage.set(null), 4000);
      return;
    }
    const start = new Date(`${m.startDate}T${m.startTime}`);
    const end = new Date(`${m.endDate}T${m.endTime}`);
    const id = this.editingEntryId();
    if (id) {
      this.calendarEntries.updateEntry(id, {
        description: m.description,
        project: m.project,
        task: m.task,
        start,
        end,
      });
    } else {
      const proj = this.calendarEntries.projects.find((p) => p.name === m.project);
      this.calendarEntries.addEntry({
        description: m.description,
        project: m.project,
        task: m.task,
        start,
        end,
        projectColor: proj?.color,
        calendarType: 'logged',
      });
    }
    this.closeEntryModal();
    this.refreshEvents();
  }

  private validateEntry(m: typeof this.entryFormModel): string | null {
    if (!m.description?.trim()) return 'Description is required.';
    if (!m.project?.trim()) return 'Project is required.';
    if (!m.task?.trim()) return 'Task is required.';
    if (!m.startTime || !m.endTime) return 'Start and end time are required.';
    const start = new Date(`${m.startDate}T${m.startTime}`);
    const end = new Date(`${m.endDate}T${m.endTime}`);
    if (end <= start) return 'End time must be after start time.';
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (hours > 8) return 'Maximum entry duration is 8 hours.';
    return null;
  }

  onEventClick(arg: EventClickArg): void {
    const id = arg.event.id;
    const entry = this.calendarEntries.getEntryById(id);
    if (!entry) return;
    const sd = entry.start;
    const ed = entry.end;
    this.entryFormModel = {
      description: entry.description,
      project: entry.project,
      task: entry.task,
      startTime: this.toTimeString(sd),
      endTime: this.toTimeString(ed),
      startDate: this.toDateInputValue(sd),
      endDate: this.toDateInputValue(ed),
    };
    this.editingEntryId.set(id);
    this.showEntryModal.set(true);
  }

  private toTimeString(d: Date): string {
    return d.toTimeString().slice(0, 5);
  }

  onDateClick(arg: { date: Date }): void {
    const startTime = arg.date.toTimeString().slice(0, 5);
    const date = arg.date;
    const dateStr = this.toDateInputValue(date);
    this.entryFormModel = {
      description: '',
      project: this.calendarEntries.projects[0]?.name ?? '',
      task: '',
      startTime,
      endTime: startTime,
      startDate: dateStr,
      endDate: dateStr,
    };
    this.editingEntryId.set(null);
    this.showEntryModal.set(true);
  }

  onEventDrop(arg: EventDropArg): void {
    const id = arg.event.id;
    const newStart = arg.event.start!;
    const newEnd = arg.event.end!;
    const overlaps = this.calendarEntries.wouldOverlap(newStart, newEnd, id);
    if (overlaps) {
      arg.revert();
      this.toastMessage.set('Cannot drop: slot already has an entry.');
      setTimeout(() => this.toastMessage.set(null), 3000);
      return;
    }
    this.calendarEntries.updateEntry(id, { start: newStart, end: newEnd });
    const el = arg.el;
    if (el) {
      el.classList.add('fc-event-drop-valid');
      setTimeout(() => el.classList.remove('fc-event-drop-valid'), 1200);
    }
    this.refreshEvents();
  }

  private applyEventBorderColor(arg: { event: { extendedProps: Record<string, unknown> }; el: HTMLElement }): void {
    const color = arg.event.extendedProps['projectColor'] as string | undefined;
    if (color) {
      arg.el.style.borderLeftWidth = '4px';
      arg.el.style.borderLeftStyle = 'solid';
      arg.el.style.borderLeftColor = color;
    }
  }

  toggleCalendarFilter(type: CalendarFilterType): void {
    this.calendarEntries.toggleCalendarFilter(type);
    this.refreshEvents();
  }

  calendarFilterChecked(type: CalendarFilterType): boolean {
    return this.calendarEntries.calendarFilter().has(type);
  }
}
