import { Controller, Get } from '@nestjs/common';
import { ClinicaService } from './clinica.service';

@Controller('clinica')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Get('status')
  getStatus() {
    return this.clinicaService.getStatus();
  }
}