import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Turno } from './turno.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  dni: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @OneToMany(() => Turno, (turno) => turno.paciente)
  turnos: Turno[];
}
