import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarEntriesPageComponent } from './calendar-entries-page.component';
import { CalendarEntriesService } from '../../services/calendar-entries.service';

describe('CalendarEntriesPageComponent', () => {
  let component: CalendarEntriesPageComponent;
  let fixture: ComponentFixture<CalendarEntriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEntriesPageComponent],
      providers: [CalendarEntriesService],
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

  it('should have editable top bar metadata', () => {
    expect(component.status()).toBe('00 READY TO REVIEW');
    expect(component.contributors()).toContain('HARDIK');
    component.onStatusChange('DONE');
    expect(component.status()).toBe('DONE');
    component.onContributorsChange('Alice, Bob');
    expect(component.contributors()).toBe('Alice, Bob');
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
