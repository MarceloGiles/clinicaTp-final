import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class ListarReservasDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    id_paciente?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    id_medico?: number;

    @IsOptional()
    @IsDateString()
    fecha?: string;

}