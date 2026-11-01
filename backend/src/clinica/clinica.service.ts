import { Injectable } from '@nestjs/common';

@Injectable()
export class ClinicaService {
  getStatus() {
    return {
      ok: true,
      service: 'clinica-backend',
      database: 'postgresql',
      message: 'API funcionando con PostgreSQL',
    };
  }
}