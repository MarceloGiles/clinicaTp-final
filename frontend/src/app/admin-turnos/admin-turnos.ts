import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  paciente: string;
  medico: string;
  estado: 'Reservado' | 'Cancelado';
}

@Component({
  selector: 'app-admin-turnos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-turnos.html',
  styleUrl: './admin-turnos.scss',
})
export class AdminTurnos {
  fechaSeleccionada = '';

  turnos: Turno[] = [
    {
      id: 1,
      fecha: '2026-10-05',
      hora: '08:00',
      paciente: 'Ana Martínez',
      medico: 'Dr. Juan Pérez',
      estado: 'Reservado',
    },
    {
      id: 2,
      fecha: '2026-10-05',
      hora: '09:00',
      paciente: 'Pedro Gómez',
      medico: 'Dra. María González',
      estado: 'Reservado',
    },
    {
      id: 3,
      fecha: '2026-10-06',
      hora: '10:00',
      paciente: 'Laura Fernández',
      medico: 'Dr. Carlos López',
      estado: 'Reservado',
    },
    {
      id: 4,
      fecha: '2026-10-06',
      hora: '11:00',
      paciente: 'Juan Rodríguez',
      medico: 'Dr. Juan Pérez',
      estado: 'Cancelado',
    },
  ];

  mensaje = '';

  get turnosFiltrados(): Turno[] {
    if (!this.fechaSeleccionada) {
      return this.turnos;
    }

    return this.turnos.filter(
      turno => turno.fecha === this.fechaSeleccionada
    );
  }

  cancelarTurno(turno: Turno): void {
    if (turno.estado !== 'Reservado') {
      return;
    }

    turno.estado = 'Cancelado';
    this.mensaje = `El turno del ${turno.fecha} a las ${turno.hora} fue cancelado.`;
  }
}
