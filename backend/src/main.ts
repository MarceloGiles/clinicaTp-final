import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe( { transform: true }));
  const port = Number(process.env.PORT ?? 3000);

  const config = new DocumentBuilder()
    .setTitle('API Clínica')
    .setDescription('Sistema de turnos de una clínica')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
  console.log(`Backend corriendo en: http://localhost:${port}`);
}

bootstrap();
