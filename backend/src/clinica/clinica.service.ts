import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { EstadoUsuario } from './enums';
import { Usuario } from './usuario.entity';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  getStatus(){
    return {
      status: 'ok',
      service: 'clinica',
      database: 'postgresql',
      message: 'funcionando correctamente con postgresql'
    }
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

    const { clave,...datoUsuario } = usuario;
    return datoUsuario;

  }
}
