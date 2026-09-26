import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';
import { Paciente } from './paciente.entity';
import { Turno } from './turno.entity';

export type CreatePacienteDto = Pick<Paciente, 'nombre' | 'dni' | 'email' | 'telefono'>;
export type UpdatePacienteDto = Partial<CreatePacienteDto>;
export type CreateMedicoDto = Pick<Medico, 'nombre' | 'especialidad' | 'matricula'>;
export type UpdateMedicoDto = Partial<CreateMedicoDto>;
export type CreateTurnoDto = Pick<Turno, 'paciente' | 'medico' | 'fecha' | 'motivo' | 'estado'>;
export type UpdateTurnoDto = Partial<CreateTurnoDto>;

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  getStatus() {
    return {
      ok: true,
      service: 'clinica-backend',
      database: 'postgresql',
      message: 'API funcionando con PostgreSQL',
    };
  }

  async getPacientes() {
    return this.pacienteRepository.find();
  }

  async getPaciente(id: number) {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!paciente) throw new NotFoundException(`Paciente ${id} no encontrado`);
    return paciente;
  }

  async createPaciente(data: CreatePacienteDto) {
    const paciente = this.pacienteRepository.create(data);
    return this.pacienteRepository.save(paciente);
  }

  async updatePaciente(id: number, data: UpdatePacienteDto) {
    const paciente = await this.getPaciente(id);
    Object.assign(paciente, data);
    return this.pacienteRepository.save(paciente);
  }

  async deletePaciente(id: number) {
    const paciente = await this.getPaciente(id);
    await this.pacienteRepository.remove(paciente);
    return { deleted: true };
  }

  async getMedicos() {
    return this.medicoRepository.find();
  }

  async getMedico(id: number) {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) throw new NotFoundException(`Médico ${id} no encontrado`);
    return medico;
  }

  async createMedico(data: CreateMedicoDto) {
    const medico = this.medicoRepository.create(data);
    return this.medicoRepository.save(medico);
  }

  async updateMedico(id: number, data: UpdateMedicoDto) {
    const medico = await this.getMedico(id);
    Object.assign(medico, data);
    return this.medicoRepository.save(medico);
  }

  async deleteMedico(id: number) {
    const medico = await this.getMedico(id);
    await this.medicoRepository.remove(medico);
    return { deleted: true };
  }

  async getTurnos() {
    return this.turnoRepository.find({
      relations: {
        paciente: true,
        medico: true,
      },
    });
  }

  async getTurno(id: number) {
    const turno = await this.turnoRepository.findOne({
      where: { id },
      relations: {
        paciente: true,
        medico: true,
      },
    });
    if (!turno) throw new NotFoundException(`Turno ${id} no encontrado`);
    return turno;
  }

  async createTurno(data: CreateTurnoDto) {
    const turno = this.turnoRepository.create(data);
    return this.turnoRepository.save(turno);
  }

  async updateTurno(id: number, data: UpdateTurnoDto) {
    const turno = await this.getTurno(id);
    Object.assign(turno, data);
    return this.turnoRepository.save(turno);
  }

  async deleteTurno(id: number) {
    const turno = await this.getTurno(id);
    await this.turnoRepository.remove(turno);
    return { deleted: true };
  }
}
