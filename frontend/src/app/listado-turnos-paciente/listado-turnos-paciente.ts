import { Component } from '@angular/core';

interface Turno {
  fecha: string;
  hora: string;
  medico: string;
  estado: string;
  puedeCancelar: boolean;
}

@Component({
  selector: 'app-listado-turnos-paciente',
  templateUrl: './listado-turnos-paciente.html',
  styleUrl: './listado-turnos-paciente.scss',
})
export class ListadoTurnosPaciente {
  turnos: Turno[] = [
    {
      fecha: '29/09/2026',
      hora: '09:00',
      medico: 'Dr. García',
      estado: 'Confirmado',
      puedeCancelar: true,
    },
    {
      fecha: '02/10/2026',
      hora: '10:30',
      medico: 'Dra. López',
      estado: 'Pendiente',
      puedeCancelar: true,
    },
    {
      fecha: '07/10/2026',
      hora: '16:00',
      medico: 'Dr. Martínez',
      estado: 'Confirmado',
      puedeCancelar: false,
    },
  ];
}
