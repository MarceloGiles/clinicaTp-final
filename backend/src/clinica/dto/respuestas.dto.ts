export class ReservaRespuestaDto {
  id: number;
  fecha_hora: Date;
  estado: string;
  valor_consulta: number;
  medico: string;
  paciente: string;
}

export class MedicoRespuestaDto {
  id: number;
  nombre: string;
  matricula: number;
  valor_consulta: number;
}

export class PacienteRespuestaDto {
  id: number;
  nombre: string;
}
