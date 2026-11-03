import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Between, Repository } from 'typeorm';

import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ListarReservasDto } from './dto/listar-reservas.dto';
import { LoginDto } from './dto/login.dto';

import { MedicoRespuestaDto, ReservaRespuestaDto } from './dto/respuestas.dto';
import { EstadoReserva, EstadoUsuario, RolUsuario } from './enums';

import { Medico } from './medico.entity';
import { Usuario } from './usuario.entity';
import { Reserva } from './reserva.entity';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  getStatus() {
    return {
      status: 'ok',
      service: 'clinica',
      database: 'postgresql',
      message: 'funcionando correctamente con postgresql',
    };
  }

  async login(dato: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ documento: dato.usuario }, { email: dato.usuario }],
    });

    if (!usuario || usuario.clave !== dato.clave) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuario.estado !== EstadoUsuario.ACTIVO) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const { clave, ...datoUsuario } = usuario;
    return datoUsuario;
  }

  async crearReserva(dato: CrearReservaDto) {
    const fecha = new Date(dato.fecha_hora);
    const ahora = new Date();

    const limite = new Date();
    limite.setDate(ahora.getDate() + 30);

    const horaValida =
      fecha.getMinutes() === 0 &&
      fecha.getSeconds() === 0 &&
      fecha.getHours() >= 8 &&
      fecha.getHours() <= 15;

    if (!horaValida) {
      throw new BadRequestException(
        'Los turnos son de 8am a 16pm, y duran 1 hora.',
      );
    }

    if (fecha < ahora || fecha > limite) {
      throw new BadRequestException(
        'La fecha de la reserva debe estar dentro de los próximos 30 días.',
      );
    }

    const medico = await this.medicoRepository.findOne({
      where: { id: dato.id_medico },
    });

    if (!medico) {
      throw new NotFoundException(
        'El médico no es prestador de la institución.',
      );
    }

    const paciente = await this.usuarioRepository.findOne({
      where: { id: dato.id_paciente, rol: RolUsuario.PACIENTE },
    });

    if (!paciente) {
      throw new NotFoundException(
        'El paciente no es usuario de la institución.',
      );
    }

    const ocupado = await this.reservaRepository.findOne({
      where: {
        medico: { id: medico.id },
        fecha_hora: fecha,
        estado: EstadoReserva.ACTIVO,
      },
    });

    if (ocupado) {
      throw new ConflictException(
        'El médico ya tiene un turno reservado en ese horario.',
      );
    }

    const reserva = await this.reservaRepository.save(
      this.reservaRepository.create({
        medico: medico,
        paciente: paciente,
        fecha_hora: fecha,
        valor_consulta: medico.valor_consulta,
      }),
    );

    return this.aRespuesta(reserva);
  }

  async listarMedicos(): Promise<MedicoRespuestaDto[]> {
    const medicos = await this.medicoRepository.find();

    return medicos.map((medico) => ({
      id: medico.id,
      nombre: `${medico.usuario.apellidos}, ${medico.usuario.nombres}`,
      matricula: medico.matricula,
      valor_consulta: medico.valor_consulta,
    }));
  }

  async listarReservas(
    filtros: ListarReservasDto,
  ): Promise<ReservaRespuestaDto[]> {
    const where: any = {};

    if (filtros.id_medico) {
      where.medico = { id: filtros.id_medico };
    }

    if (filtros.id_paciente) {
      where.paciente = { id: filtros.id_paciente };
    }

    if (filtros.fecha) {
      const dia = filtros.fecha.slice(0, 10);
      const fechaInicio = new Date(`${dia}T00:00:00`);
      const fechaFin = new Date(`${dia}T23:59:59`);
      where.fecha_hora = Between(fechaInicio, fechaFin);
    }

    const reservas = await this.reservaRepository.find({
      where,
      order: { fecha_hora: 'ASC' },
    });

    return reservas.map((reserva) => this.aRespuesta(reserva));
  }

  private aRespuesta(reserva: Reserva): ReservaRespuestaDto {
    return {
      id: reserva.id,
      fecha_hora: reserva.fecha_hora,
      estado: reserva.estado,
      valor_consulta: reserva.valor_consulta,
      medico: `${reserva.medico.usuario.apellidos}, ${reserva.medico.usuario.nombres}`,
      paciente: `${reserva.paciente.apellidos}, ${reserva.paciente.nombres}`,
    };
  }
}
