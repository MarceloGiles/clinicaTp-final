import { Component } from '@angular/core';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  medico: string;
  estado: 'Reservado' | 'Cancelado';
  puedeCancelar: boolean;
}

@Component({
  selector: 'app-cancelar-turno-paciente',
  standalone: true,
  templateUrl: './cancelar-turno-paciente.html',
  styleUrl: './cancelar-turno-paciente.scss',
})
export class CancelarTurnoPaciente {
  turnos: Turno[] = [
    {
      id: 1,
      fecha: '2026-10-05',
      hora: '09:00',
      medico: 'Dr. Juan Pérez',
      estado: 'Reservado',
      puedeCancelar: true,
    },
    {
      id: 2,
      fecha: '2026-09-28',
      hora: '11:00',
      medico: 'Dra. María González',
      estado: 'Reservado',
      puedeCancelar: false,
    },
    {
      id: 3,
      fecha: '2026-10-15',
      hora: '14:00',
      medico: 'Dr. Carlos López',
      estado: 'Reservado',
      puedeCancelar: true,
    },
  ];

  mensaje = '';

  cancelarTurno(turno: Turno): void {
    if (!turno.puedeCancelar || turno.estado !== 'Reservado') {
      return;
    }

    turno.estado = 'Cancelado';
    turno.puedeCancelar = false;

    this.mensaje = `El turno del ${turno.fecha} a las ${turno.hora} fue cancelado.`;
  }
}
