import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin-turnos',
    loadComponent: () =>
      import('./admin-turnos/admin-turnos')
        .then(m => m.AdminTurnos),
  },
  {
    path: '',
    redirectTo: 'admin-turnos',
    pathMatch: 'full',
  },
];