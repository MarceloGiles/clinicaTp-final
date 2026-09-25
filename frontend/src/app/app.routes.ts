import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listado-turnos-medico',
    loadComponent: () =>
      import('./listado-turnos-medico/listado-turnos-medico')
        .then(m => m.ListadoTurnosMedico),
  },
];