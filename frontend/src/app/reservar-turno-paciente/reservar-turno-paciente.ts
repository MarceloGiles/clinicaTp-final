import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Medico {
  id: number;
  nombre: string;
}

interface Horario {
  hora: string;
  ocupado: boolean;
}

@Component({
  selector: 'app-reservar-turno-paciente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservar-turno-paciente.html',
  styleUrl: './reservar-turno-paciente.scss',
})
export class ReservarTurnoPaciente {
  medicos: Medico[] = [
    { id: 1, nombre: 'Dr. Juan Pérez' },
    { id: 2, nombre: 'Dra. María González' },
    { id: 3, nombre: 'Dr. Carlos López' },
  ];

  horarios: Horario[] = [
    { hora: '08:00', ocupado: false },
    { hora: '09:00', ocupado: true },
    { hora: '10:00', ocupado: false },
    { hora: '11:00', ocupado: false },
    { hora: '12:00', ocupado: true },
    { hora: '13:00', ocupado: false },
    { hora: '14:00', ocupado: false },
    { hora: '15:00', ocupado: false },
  ];

  fechaSeleccionada = '';
  medicoSeleccionado = '';
  horarioSeleccionado = '';

  mensaje = '';

  get fechaMinima(): string {
    return this.formatearFecha(new Date());
  }

  get fechaMaxima(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 30);
    return this.formatearFecha(fecha);
  }

  seleccionarHorario(hora: string, ocupado: boolean): void {
    if (ocupado) {
      return;
    }

    this.horarioSeleccionado = hora;
    this.mensaje = '';
  }

  reservarTurno(): void {
    if (
      !this.fechaSeleccionada ||
      !this.medicoSeleccionado ||
      !this.horarioSeleccionado
    ) {
      this.mensaje = 'Completá todos los datos para reservar el turno.';
      return;
    }

    this.mensaje = 'Datos del turno seleccionados correctamente.';
  }

  private formatearFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }
}