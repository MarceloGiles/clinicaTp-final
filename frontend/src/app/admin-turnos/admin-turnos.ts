import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Clinica, Reserva } from '../servicios/clinica';

@Component({
  selector: 'app-admin-turnos',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './admin-turnos.html',
  styleUrl: './admin-turnos.scss',
})
export class AdminTurnos implements OnInit {
  fechaSeleccionada = '';
  mensaje = '';
  turnos: Reserva[] = [];

  constructor(private clinica: Clinica, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
  }

  // trae todas las reservas; si hay fecha elegida, solo las de ese día
  cargar(): void {
    this.clinica.listarReservas({ fecha: this.fechaSeleccionada || undefined }).subscribe({
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

  mostrarTodos(): void {
    this.fechaSeleccionada = '';
    this.cargar();
  }

  cancelarTurno(turno: Reserva): void {
    this.clinica.cancelarReserva(turno.id, 'ADMINISTRADOR').subscribe({
      next: () => {
        this.mensaje = 'El turno fue cancelado.';
        this.cargar();
      },
      error: (err) => {
        this.mensaje = err.error?.message ?? 'No se pudo cancelar el turno.';
        this.cdr.markForCheck();
      },
    });
  }
}