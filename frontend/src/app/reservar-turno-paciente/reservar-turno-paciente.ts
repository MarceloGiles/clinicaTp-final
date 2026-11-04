import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Clinica, Medico, Paciente } from '../servicios/clinica';

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
export class ReservarTurnoPaciente implements OnInit {
  medicos: Medico[] = [];
  pacientes: Paciente[] = [];
  horarios: Horario[] = [];

  // horario de atencion fijo - puede ser mejorado
  private horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  esAdmin = false

  fechaSeleccionada = '';
  medicoSeleccionado = '';
  pacienteSeleccionado = '';
  horarioSeleccionado = '';

  mensaje = '';

  constructor(private clinica: Clinica, private cdr: ChangeDetectorRef, private router: Router,) {}

  ngOnInit(): void {
    this.armarHorarios([]);
    this.esAdmin = this.clinica.usuarioActual()?.rol === 'ADMINISTRADOR';

    this.clinica.listarMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        this.cdr.markForCheck();
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar los médicos.';
        this.cdr.markForCheck();
      },
    });

    if(this.esAdmin){
      this.clinica.listarPacientes().subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
          this.cdr.markForCheck();
        }
      })
    }
  }

  get fechaMinima(): string {
    return this.formatearFecha(new Date());
  }

  get fechaMaxima(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 30);
    return this.formatearFecha(fecha);
  }

  armarHorarios(ocupadas: string[]): void {
    this.horarios = this.horas.map((hora) => ({ hora, ocupado: ocupadas.includes(hora) }));
  }

  actualizarHorarios(): void {
    this.horarioSeleccionado = '';

    if (!this.fechaSeleccionada || !this.medicoSeleccionado) {
      this.armarHorarios([]);
      return;
    }

    this.clinica
      .listarReservas({
        id_medico: Number(this.medicoSeleccionado),
        fecha: this.fechaSeleccionada,
      })
      .subscribe({
        next: (reservas) => {
          const ocupadas = reservas
            .filter((r) => r.estado === 'ACTIVO')
            .map((r) => String(new Date(r.fecha_hora).getHours()).padStart(2, '0') + ':00');
          this.armarHorarios(ocupadas);
          this.cdr.markForCheck();
        },
        error: () => {
          this.mensaje = 'No se pudieron cargar los horarios.';
          this.cdr.markForCheck();
        },
      });
  }

  seleccionarHorario(hora: string, ocupado: boolean): void {
    if (ocupado) {
      return;
    }

    this.horarioSeleccionado = hora;
    this.mensaje = '';
  }

  reservarTurno(): void {
    if (!this.fechaSeleccionada || !this.medicoSeleccionado || !this.horarioSeleccionado) {
      this.mensaje = 'Completá todo para reservar el turno.';
      return;
    }

    const usuario = this.clinica.usuarioActual();
    if (!usuario) {
      this.mensaje = 'Tenés que iniciar sesión.';
      return;
    }

    let idPaciente = usuario.id;
    if(this.esAdmin){
      if(!this.pacienteSeleccionado){
        this.mensaje = 'Selecciona el paciente'
        return ;
      }
      idPaciente = Number(this.pacienteSeleccionado)
    }

    this.clinica
      .crearReservas({
        id_medico: Number(this.medicoSeleccionado),
        id_paciente: idPaciente,
        fecha_hora: `${this.fechaSeleccionada}T${this.horarioSeleccionado}:00`,
      })
      .subscribe({
        next: () => {
          this.router.navigate([this.esAdmin ? '/admin-turnos' : '/mis-turnos']);
        },
        error: (err) => {
          this.mensaje = err.error?.message ?? 'No se pudo reservar el turno.';
          this.cdr.markForCheck();
        },
      });
  }

  private formatearFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }
}