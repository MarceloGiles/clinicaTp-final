Sistema de turnos - Clínica

Trabajo Final Integrador de Desarrollo de Aplicaciones Web (2026).
Sistema de turnos para una clínica, con tres roles: médico, paciente y administrador.
Tecnologías: NestJS, TypeORM, PostgreSQL, Angular, nginx y PM2.

COMO EJECUTARLO

Requisitos: Node.js 22.22.3 o superior y PostgreSQL 16.

1. Crear la base de datos (como usuario postgres):
   CREATE USER clinica_user WITH PASSWORD 'clinica123';
   CREATE DATABASE clinica_db OWNER clinica_user;

2. Iniciar el backend:
   cd backend
   cp .env.example .env
   npm install
   npm run start:dev

3. Cargar los usuarios de prueba (con el backend iniciado):
   psql -h localhost -U clinica_user -d clinica_db -f backend/base.sql

4. Iniciar el frontend:
   cd frontend
   npm ci
   npm start
   Se abre en http://localhost:4200

USUARIOS DE PRUEBA

Se puede entrar con el documento o con el email.

Administrador: 41455078 (admin@clinica.com) - clave admin123
Médico: 41455076 (medico@clinica.com) - clave medico123
Paciente: 41455079 (paciente@gmail.com) - clave paciente123

DOCUMENTACION

Swagger: con el backend iniciado, en http://localhost:3000/docs
Compodoc: cd backend y npm run docs. Queda en backend/documentation/index.html

PM2 Y NGINX

1. Backend con PM2:
   cd backend
   npm run build
   pm2 start ecosystem.config.js

2. Compilar el frontend:
   cd frontend
   npx ng build

3. nginx: copiar nginx/clinica.conf como conf/nginx.conf de nginx, cambiar la ruta
   de root por la de frontend/dist/frontend/browser y arrancarlo.
   La aplicación queda en http://localhost:8080