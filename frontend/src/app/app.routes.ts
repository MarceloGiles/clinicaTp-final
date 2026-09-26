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
    path: 'reservar-turno',
    loadComponent: () =>
      import('./reservar-turno-paciente/reservar-turno-paciente')
        .then(m => m.ReservarTurnoPaciente),
  },
  {
    path: 'listado-turnos-medico',
    loadComponent: () =>
      import('./listado-turnos-medico/listado-turnos-medico')
        .then(m => m.ListadoTurnosMedico),
  },
  {
    path: 'cancelar-turno',
    loadComponent: () =>
      import('./cancelar-turno-paciente/cancelar-turno-paciente')
        .then(m => m.CancelarTurnoPaciente),
  },
  {
    path: 'admin-turnos',
    loadComponent: () =>
      import('./admin-turnos/admin-turnos')
        .then(m => m.AdminTurnos),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];