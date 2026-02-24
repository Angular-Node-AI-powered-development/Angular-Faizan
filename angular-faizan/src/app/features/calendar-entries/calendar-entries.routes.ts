import { Routes } from '@angular/router';

export const calendarEntriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/calendar-entries-page/calendar-entries-page.component').then(
        (m) => m.CalendarEntriesPageComponent
      ),
  },
];
