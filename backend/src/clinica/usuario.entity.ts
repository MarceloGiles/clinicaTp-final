import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoUsuario, RolUsuario } from './enums';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documento: string;

  @Column()
  apellidos: string;

  @Column()
  nombres: string;

  @Column({ unique: true })
  email: string;

  @Column()
  clave: string;

  @Column({ type: 'enum', enum: RolUsuario, enumName: 'roles_usuarios' })
  rol: RolUsuario;

  @Column({ type: 'enum', enum: EstadoUsuario, enumName: 'estados_usuarios' })
  estado: EstadoUsuario;
}
