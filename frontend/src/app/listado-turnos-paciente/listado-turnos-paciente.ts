import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Clinica, Reserva } from '../servicios/clinica';

@Component({
  selector: 'app-listado-turnos-paciente',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './listado-turnos-paciente.html',
  styleUrl: './listado-turnos-paciente.scss',
})

export class ListadoTurnosPaciente implements OnInit {
  mensaje = '';

  turnos: Reserva[] = []

constructor(private clinica: Clinica, private cdr: ChangeDetectorRef) {}

ngOnInit(): void {
  this.cargar()
}

// busca las reservas del paciente que este logueado en el momento 
// cdr va a detectar el cambio y va a hacer que angular se actualice 

cargar(): void {
  const usuario = this.clinica.usuarioActual()

  if(!usuario) return;

  this.clinica.listarReservas({ id_paciente: usuario.id }).subscribe({
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

cancelarTurno(turno: Reserva): void {
    this.clinica.cancelarReserva(turno.id, 'PACIENTE').subscribe({
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

// funcionalidad extra para que si no puede cancelarlo no aparezca la opcion
  puedeCancelar(turno: Reserva): boolean {
    if (turno.estado !== 'ACTIVO') return false;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const dia = new Date(turno.fecha_hora);
    dia.setHours(0, 0, 0, 0);
    return dia > hoy;
  }

}