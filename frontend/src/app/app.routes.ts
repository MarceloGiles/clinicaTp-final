import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mis-turnos',
    loadComponent: () =>
      import('./listado-turnos-paciente/listado-turnos-paciente')
        .then(m => m.ListadoTurnosPaciente),
  },
];
