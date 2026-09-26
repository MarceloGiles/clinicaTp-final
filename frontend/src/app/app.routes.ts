import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login),
  },
  {
    path: 'mis-turnos',
    loadComponent: () =>
      import('./listado-turnos-paciente/listado-turnos-paciente')
        .then(m => m.ListadoTurnosPaciente),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];