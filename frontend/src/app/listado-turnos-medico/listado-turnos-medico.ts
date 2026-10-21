import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  paciente: string;
  estado: 'Reservado' | 'Atendido' | 'Ausente';
}

@Component({
  selector: 'app-listado-turnos-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listado-turnos-medico.html',
  styleUrl: './listado-turnos-medico.scss',
})
export class ListadoTurnosMedico {
  fechaSeleccionada = '';

  turnos: Turno[] = [
    {
      id: 1,
      fecha: '2026-10-21',
      hora: '08:00',
      paciente: 'Ana Martínez',
      estado: 'Reservado',
    },
    {
      id: 2,
      fecha: '2026-10-21',
      hora: '09:00',
      paciente: 'Pedro Gómez',
      estado: 'Reservado',
    },
    {
      id: 3,
      fecha: '2026-10-21',
      hora: '10:00',
      paciente: 'Laura Fernández',
      estado: 'Atendido',
    },
    {
      id: 4,
      fecha: '2026-10-22',
      hora: '11:00',
      paciente: 'Juan Rodríguez',
      estado: 'Reservado',
    },
    {
      id: 5,
      fecha: '2026-10-22',
      hora: '13:00',
      paciente: 'Sofía López',
      estado: 'Ausente',
    },
  ];

  get turnosFiltrados(): Turno[] {
    if (!this.fechaSeleccionada) {
      return this.turnos;
    }

    return this.turnos.filter(
      (turno) => turno.fecha === this.fechaSeleccionada,
    );
  }

  marcarAtendido(turno: Turno): void {
    if (turno.estado !== 'Reservado') {
      return;
    }

    turno.estado = 'Atendido';
  }

  marcarAusente(turno: Turno): void {
    if (turno.estado !== 'Reservado') {
      return;
    }

    turno.estado = 'Ausente';
  }
}