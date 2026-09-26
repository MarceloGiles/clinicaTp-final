import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import type {
  CreateMedicoDto,
  CreatePacienteDto,
  CreateTurnoDto,
  UpdateMedicoDto,
  UpdatePacienteDto,
  UpdateTurnoDto,
} from './clinica.service';

@Controller('clinica')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Get('status')
  getStatus() {
    return this.clinicaService.getStatus();
  }

  @Get('pacientes')
  getPacientes() {
    return this.clinicaService.getPacientes();
  }

  @Get('pacientes/:id')
  getPaciente(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaService.getPaciente(id);
  }

  @Post('pacientes')
  createPaciente(@Body() data: CreatePacienteDto) {
    return this.clinicaService.createPaciente(data);
  }

  @Patch('pacientes/:id')
  updatePaciente(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePacienteDto,
  ) {
    return this.clinicaService.updatePaciente(id, data);
  }

  @Delete('pacientes/:id')
  deletePaciente(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaService.deletePaciente(id);
  }

  @Get('medicos')
  getMedicos() {
    return this.clinicaService.getMedicos();
  }

  @Get('medicos/:id')
  getMedico(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaService.getMedico(id);
  }

  @Post('medicos')
  createMedico(@Body() data: CreateMedicoDto) {
    return this.clinicaService.createMedico(data);
  }

  @Patch('medicos/:id')
  updateMedico(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMedicoDto,
  ) {
    return this.clinicaService.updateMedico(id, data);
  }

  @Delete('medicos/:id')
  deleteMedico(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaService.deleteMedico(id);
  }

  @Get('turnos')
  getTurnos() {
    return this.clinicaService.getTurnos();
  }

  @Get('turnos/:id')
  getTurno(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaService.getTurno(id);
  }

  @Post('turnos')
  createTurno(@Body() data: CreateTurnoDto) {
    return this.clinicaService.createTurno(data);
  }

  @Patch('turnos/:id')
  updateTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTurnoDto,
  ) {
    return this.clinicaService.updateTurno(id, data);
  }

  @Delete('turnos/:id')
  deleteTurno(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaService.deleteTurno(id);
  }
}
