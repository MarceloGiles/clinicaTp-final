import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { LoginDto } from './dto/login.dto';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ListarReservasDto } from './dto/listar-reservas.dto';
import {
  CambiarEstadoDto,
  CancelarReservaDto,
  ModificarValorDto,
} from './dto/acciones.dto';

@Controller('clinica')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Get('status')
  getStatus() {
    return this.clinicaService.getStatus();
  }

  @Post('login')
  login(@Body() dato: LoginDto) {
    return this.clinicaService.login(dato);
  }

  @Post('reservas')
  crearReserva(@Body() dato: CrearReservaDto) {
    return this.clinicaService.crearReserva(dato);
  }

  @Get('reservas')
  listarReservas(@Query() filtros: ListarReservasDto) {
    return this.clinicaService.listarReservas(filtros);
  }

  @Patch('reservas/:id/estado')
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dato: CambiarEstadoDto,
  ) {
    return this.clinicaService.cambiarEstado(id, dato);
  }

  @Patch('reservas/:id/cancelar')
  cancelarReserva(
    @Param('id', ParseIntPipe) id: number,
    @Body() dato: CancelarReservaDto,
  ) {
    return this.clinicaService.cancelarReserva(id, dato);
  }

  @Get('medicos')
  listarMedicos() {
    return this.clinicaService.listarMedicos();
  }

  @Patch('medicos/:id/valor')
  modificarValor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dato: ModificarValorDto,
  ) {
    return this.clinicaService.modificarValorConsulta(id, dato);
  }
}
