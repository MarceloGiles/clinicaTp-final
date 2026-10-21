import { Component } from '@angular/core';

interface Turno {
  fecha: string;
  hora: string;
  medico: string;
  estado: 'Confirmado' | 'Pendiente' | 'Cancelado';
  puedeCancelar: boolean;
}

@Component({
  selector: 'app-listado-turnos-paciente',
  standalone: true,
  templateUrl: './listado-turnos-paciente.html',
  styleUrl: './listado-turnos-paciente.scss',
})
export class ListadoTurnosPaciente {
  mensaje = '';

  turnos: Turno[] = [
    {
      fecha: '29/10/2026',
      hora: '09:00',
      medico: 'Dr. García',
      estado: 'Confirmado',
      puedeCancelar: true,
    },
    {
      fecha: '30/10/2026',
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

cancelarTurno(turno: Turno): void {
  if (!turno.puedeCancelar || turno.estado === 'Cancelado') {
    return;
  }

  this.turnos = this.turnos.map((t) =>
    t.fecha === turno.fecha && t.hora === turno.hora
      ? {
          ...t,
          estado: 'Cancelado',
          puedeCancelar: false,
        }
      : t
  );
  
  this.mensaje =
    `El turno del ${turno.fecha} a las ${turno.hora} fue cancelado.`;
  }
}