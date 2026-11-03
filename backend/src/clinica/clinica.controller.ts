import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { LoginDto } from './dto/login.dto';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ListarReservasDto } from './dto/listar-reservas.dto';

@Controller('clinica')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Get('status')
  getStatus() {
    return this.clinicaService.getStatus()
  }

  @Post('login')
  login(@Body() dato: LoginDto) {
    return this.clinicaService.login(dato)
  }

  @Post('reservas')
  crearReserva(@Body() dato: CrearReservaDto) {
    return this.clinicaService.crearReserva(dato)
  }

  @Get('reservas')
  listarReservas(@Query() filtros: ListarReservasDto) {
    return this.clinicaService.listarReservas(filtros);
  }

  @Get('medicos')
  listarMedicos() {
    return this.clinicaService.listarMedicos();
  }

}