import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Turno {
  id: number;
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
      hora: '08:00',
      paciente: 'Ana Martínez',
      estado: 'Reservado',
    },
    {
      id: 2,
      hora: '09:00',
      paciente: 'Pedro Gómez',
      estado: 'Reservado',
    },
    {
      id: 3,
      hora: '10:00',
      paciente: 'Laura Fernández',
      estado: 'Atendido',
    },
    {
      id: 4,
      hora: '11:00',
      paciente: 'Juan Rodríguez',
      estado: 'Reservado',
    },
    {
      id: 5,
      hora: '13:00',
      paciente: 'Sofía López',
      estado: 'Ausente',
    },
  ];

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