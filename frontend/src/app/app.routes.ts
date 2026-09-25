import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cancelar-turno',
    loadComponent: () =>
      import('./cancelar-turno-paciente/cancelar-turno-paciente')
        .then(m => m.CancelarTurnoPaciente),
  },
  {
    path: '',
    redirectTo: 'cancelar-turno',
    pathMatch: 'full',
  },
];