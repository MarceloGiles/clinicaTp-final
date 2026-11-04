import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { EstadoReserva } from './enums';
import { Medico } from './medico.entity';
import { Usuario } from './usuario.entity';

@Entity('reservas')
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Medico, { eager: true, nullable: false })
    @JoinColumn({ name: 'id_medico' })
    medico: Medico;

    @ManyToOne(() => Usuario, { eager: true, nullable: false })
    @JoinColumn({ name: 'id_paciente' })
    paciente: Usuario;

    @Column({ type: 'timestamp', nullable: false })
    fecha_hora: Date;

    @Column({ type: 'enum', enum: EstadoReserva, enumName: 'estados_reservas', default: EstadoReserva.ACTIVO })
    estado: EstadoReserva;

    @Column({ type: 'int', nullable: false })
    valor_consulta: number;
}