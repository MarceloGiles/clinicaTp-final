import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';


export interface UsuarioLogueado {
    id: number;
    nombres: string;
    apellidos: string;
    rol: 'ADMINISTRADOR' | 'PACIENTE' | 'MEDICO';
}

export interface Medico {
    id: number;
    nombre: string;
    matricula: number;
    valor_consulta: number;
}

export interface Reserva {
    id: number;
    fecha_hora: string;
    estado: 'ACTIVO' | 'CANCELADO'| 'ATENDIDO' | 'AUSENTE';
    valor_consulta: number;
    medico: any,
    paciente: any
}

@Injectable({ providedIn: 'root'})
export class Clinica {
    private api = '/api/clinica'

    constructor(private http: HttpClient) {}


    // guardo el usuario en sessionStorage para el salto de paginas ya que tienen restricciones
    usuarioActual(): UsuarioLogueado | null {
    try {
      const guardado = sessionStorage.getItem('usuario');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  }

  listarMedicos(): Observable<Medico[]>{
    return this.http.get<Medico[]>(`${this.api}/medicos`)
  }

  listarReservas(filtros: { id_paciente?: number; id_medico?: number; fecha?: string } = {}): Observable<Reserva[]> {
    let params = new HttpParams();
    if (filtros.id_paciente) params = params.set('id_paciente', filtros.id_paciente);
    if (filtros.id_medico) params = params.set('id_medico', filtros.id_medico);
    if (filtros.fecha) params = params.set('fecha', filtros.fecha);
    return this.http.get<Reserva[]>(`${this.api}/reservas`, { params });
  }

  crearReservas(datos: {id_medico: number; id_paciente: number; fecha_hora: string}): Observable<Reserva>{
    return this.http.post<Reserva>(`${this.api}/reservas`, datos)
  }

  cancelarReserva(id: number, rol: 'PACIENTE' | 'ADMINISTRADOR'): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.api}/reservas/${id}/cancelar`, { rol });
  }

  cambiarEstado(id: number, estado: 'ATENDIDO' | 'AUSENTE'): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.api}/reservas/${id}/estado`, { estado });
  }

  modificarValor(id: number, valor_consulta: number): Observable<Medico> {
    return this.http.patch<Medico>(`${this.api}/medicos/${id}/valor`, { valor_consulta });
  }

}
