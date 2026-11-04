import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Clinica, Reserva } from '../servicios/clinica'

@Component({
  selector: 'app-listado-turnos-medico',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './listado-turnos-medico.html',
  styleUrl: './listado-turnos-medico.scss',
})

export class ListadoTurnosMedico implements OnInit {
  constructor(private clinica: Clinica, private cdr: ChangeDetectorRef) {}

  fechaSeleccionada = '';
  mensaje = '';
  idMedico = 0;
  turnos: Reserva[] = [];

  ngOnInit(): void {
    this.clinica.medicoActual().subscribe((medico) => {
      if (!medico) {
        this.mensaje = 'No se encontró el médico.';
        this.cdr.markForCheck();
        return;
      }
      this.idMedico = medico.id;
      this.cargar();
    });
  }

  cargar(): void {
    this.clinica
      .listarReservas({ id_medico: this.idMedico, fecha: this.fechaSeleccionada || undefined })
      .subscribe({
        next: (reservas) => {
          this.turnos = reservas;
          this.cdr.markForCheck();
        },
        error: () => {
          this.mensaje = 'No se pudieron cargar los turnos.';
          this.cdr.markForCheck();
        },
      });
  }

  verTodas(): void {
    this.fechaSeleccionada = '';
    this.cargar();
  }

  marcarAtendido(turno: Reserva): void {
    this.cambiarEstado(turno, 'ATENDIDO')
  }

  marcarAusente(turno: Reserva): void {
    this.cambiarEstado(turno, 'AUSENTE')
  }

  private cambiarEstado(turno: Reserva, estado: 'ATENDIDO' | 'AUSENTE'): void {
    this.clinica.cambiarEstado(turno.id, estado).subscribe({
      next: () => {
        this.mensaje = `${turno.paciente} -> ${estado}.`;
        this.cargar();
      },
      error: (err) => {
        this.mensaje = err.error?.message ?? 'No se pudo cambiar el estado.';
        this.cdr.markForCheck();
      },
    });
  }
}