import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TurnoApi {
  id: number;
  fecha: string;
  motivo: string;
  estado: 'pendiente' | 'confirmado' | 'cancelado';
  paciente: {
    id: number;
    nombre?: string;
    apellido?: string;
  };
  medico: {
    id: number;
    nombre?: string;
    apellido?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Turnos {
  private readonly apiUrl = 'http://localhost:3000/clinica/turnos';

  constructor(private http: HttpClient) {}

  obtenerTurnos(): Observable<TurnoApi[]> {
    return this.http.get<TurnoApi[]>(this.apiUrl);
  }

  obtenerTurnoPorId(id: number): Observable<TurnoApi> {
    return this.http.get<TurnoApi>(`${this.apiUrl}/${id}`);
  }
}