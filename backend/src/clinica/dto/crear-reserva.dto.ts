import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CrearReservaDto {
   @IsInt()
   @IsPositive()
   id_medico: number;

   @IsInt()
   @IsPositive()
   id_paciente: number;

   @IsDateString()
   fecha_hora: string;
}

