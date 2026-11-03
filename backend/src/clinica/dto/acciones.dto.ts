import { IsIn, IsInt, IsPositive } from 'class-validator';
import { EstadoReserva, RolUsuario } from '../enums';

export class CancelarReservaDto {
  @IsIn([RolUsuario.PACIENTE, RolUsuario.ADMINISTRADOR])
  rol: RolUsuario;
}

export class CambiarEstadoDto {
  @IsIn([EstadoReserva.ATENDIDO, EstadoReserva.AUSENTE])
  estado: EstadoReserva;
}

export class ModificarValorDto {
  @IsInt()
  @IsPositive()
  valor_consulta: number;
}