import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Turno } from './turno.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column({ unique: true })
  matricula: string;

  @OneToMany(() => Turno, (turno) => turno.medico)
  turnos: Turno[];
}
