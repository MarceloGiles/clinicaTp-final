import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CrearReservaDto } from './dto/crear-reserva.dto';
import { LoginDto } from './dto/login.dto';

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
        private readonly reservaRepository: Repository<Reserva>
    ){}

    getStatus(){
        return {
            status: 'ok',
            service: 'clinica',
            database: 'postgresql',
            message: 'funcionando correctamente con postgresql'
        }
    }

    async login(dato: LoginDto){
        const usuario = await this.usuarioRepository.findOne({
            where: [{ documento: dato.usuario }, { email: dato.usuario }]
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
    const fecha = new Date(dato.fecha_hora)
    const ahora = new Date()

    const limite = new Date()
    limite.setDate(ahora.getDate() + 30)

    const horaValida = fecha.getMinutes() === 0 && fecha.getSeconds() === 0 && fecha.getHours() >= 8 && fecha.getHours() <=15 

    if( !horaValida ){
        throw new BadRequestException('Los turnos son de 8am a 16pm, y duran 1 hora.');
    }

    if( fecha < ahora || fecha > limite ){
        throw new BadRequestException('La fecha de la reserva debe estar dentro de los próximos 30 días.');
    }

    const medico = await this.medicoRepository.findOne({ where: { id: dato.id_medico}})

    if(!medico){
        throw new NotFoundException('El médico no es prestador de la institución.');
    }

    const paciente = await this.usuarioRepository.findOne({ where: { id: dato.id_paciente, rol: RolUsuario.PACIENTE } })

    if(!paciente){
        throw new NotFoundException('El paciente no es usuario de la institución.');
    }

    const ocupado = await this.reservaRepository.findOne({
        where: { medico: { id: medico.id }, fecha_hora: fecha, estado: EstadoReserva.ACTIVO }
    })

    if(ocupado){
        throw new ConflictException('El médico ya tiene un turno reservado en ese horario.');
    }

    const reserva =  await this.reservaRepository.save(
        this.reservaRepository.create({
            medico: medico,
            paciente: paciente,
            fecha_hora: fecha,
            valor_consulta: medico.valor_consulta,
        })
    )

    return {
        id: reserva.id,
        fecha_hora: reserva.fecha_hora,
        estado: reserva.estado,
        valor_consulta: reserva.valor_consulta,
        medico: `${medico.usuario.apellidos}, ${medico.usuario.nombres}`,
        paciente: `${paciente.apellidos}, ${paciente.nombres}`
    };
  }

}