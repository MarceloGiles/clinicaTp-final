import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClinicaController } from './clinica/clinica.controller';
import { ClinicaService } from './clinica/clinica.service';
import { Medico } from './clinica/medico.entity';
import { Usuario } from './clinica/usuario.entity';
import { Reserva } from './clinica/reserva.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'clinica_user'),
        password: configService.get<string>('DB_PASSWORD', 'clinica123'),
        database: configService.get<string>('DB_NAME', 'clinica_db'),
        entities: [Usuario, Medico, Reserva],
        synchronize: true,
        logging: false,
      }),
    }),
    TypeOrmModule.forFeature([Usuario, Medico, Reserva]),
  ],
  controllers: [AppController, ClinicaController],
  providers: [AppService, ClinicaService],
})
export class AppModule {}
