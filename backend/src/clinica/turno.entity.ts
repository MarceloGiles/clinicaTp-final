import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Medico } from './medico.entity';
import { Paciente } from './paciente.entity';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  motivo: string;

  @Column({ default: 'pendiente' })
  estado: 'pendiente' | 'confirmado' | 'cancelado';

  @ManyToOne(() => Paciente, (paciente) => paciente.turnos, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.turnos, { eager: true })
  medico: Medico;
}
