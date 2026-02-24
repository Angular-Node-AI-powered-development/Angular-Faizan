import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar-entries',
    pathMatch: 'full',
  },
  {
    path: 'calendar-entries',
    loadComponent: () =>
      import(
        './features/calendar-entries/pages/calendar-entries-page/calendar-entries-page.component'
      ).then((m) => m.CalendarEntriesPageComponent),
  },
];
