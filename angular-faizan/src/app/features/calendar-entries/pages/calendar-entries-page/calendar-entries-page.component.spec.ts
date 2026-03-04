import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CalendarEntriesPageComponent } from './calendar-entries-page.component';
import { CalendarEntriesService } from '../../services/calendar-entries.service';

describe('CalendarEntriesPageComponent', () => {
  let component: CalendarEntriesPageComponent;
  let fixture: ComponentFixture<CalendarEntriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEntriesPageComponent],
      providers: [CalendarEntriesService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarEntriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show week view by default via calendar options', () => {
    const options = component.calendarOptions();
    expect(options).not.toBeNull();
    expect(options?.initialView).toBe('timeGridWeek');
  });

  it('should expose current view and allow switching to day view', () => {
    expect(component.currentView()).toBe('timeGridWeek');
    component.setView('timeGridDay');
    expect(component.currentView()).toBe('timeGridDay');
  });

  it('should load events from service', () => {
    const events = component.events();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
    expect((events[0] as { id?: string }).id).toBeDefined();
    expect((events[0] as { start?: unknown }).start).toBeDefined();
    expect((events[0] as { end?: unknown }).end).toBeDefined();
  });
});
