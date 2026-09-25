import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'valor-consulta-medico',
    loadComponent: () =>
      import('./valor-consulta-medico/valor-consulta-medico')
        .then(m => m.ValorConsultaMedico),
  },
  {
    path: '',
    redirectTo: 'valor-consulta-medico',
    pathMatch: 'full',
  },
];