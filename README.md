# Clínica TP - Backend API

Este repositorio contiene el backend de una aplicación de clínica desarrollado con NestJS + PostgreSQL + TypeORM.

## 🚀 Tecnologías

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- TypeScript

## 📁 Estructura principal

- `backend/` - backend de la aplicación
- `frontend/` - frontend Angular
- `INSTRUCCIONES_EQUIPO.txt` - guía rápida para el equipo

## 🛠️ Requisitos

- PostgreSQL instalado localmente
- Node.js y npm instalados

## 🗄️ Base de datos

La base de datos usada por la API es:

- Host: `localhost`
- Puerto: `5432`
- Usuario: `clinica_user`
- Password: `clinica123`
- Base: `clinica_db`

Archivo de configuración del backend:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=clinica_user
DB_PASSWORD=clinica123
DB_NAME=clinica_db
PORT=3000
```

## ▶️ Cómo arrancar el backend

```bash
cd backend
npm install
npm run start
```

La API queda levantada en:

```text
http://localhost:3000
```

Si el puerto 3000 está ocupado, liberar el proceso anterior:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
kill -9 <PID>
```

Luego arrancar nuevamente:

```bash
npm run start
```

## 📌 Endpoints disponibles

### Estado

```http
GET /clinica/status
```

### Pacientes

```http
GET /clinica/pacientes
GET /clinica/pacientes/:id
POST /clinica/pacientes
PATCH /clinica/pacientes/:id
DELETE /clinica/pacientes/:id
```

### Médicos

```http
GET /clinica/medicos
GET /clinica/medicos/:id
POST /clinica/medicos
PATCH /clinica/medicos/:id
DELETE /clinica/medicos/:id
```

### Turnos

```http
GET /clinica/turnos
GET /clinica/turnos/:id
POST /clinica/turnos
PATCH /clinica/turnos/:id
DELETE /clinica/turnos/:id
```

## 🧪 Ejemplos de uso

### Crear paciente

```bash
curl -X POST http://localhost:3000/clinica/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Lopez",
    "dni": "12345678",
    "email": "ana@test.com",
    "telefono": "1122334455"
  }'
```

### Ver pacientes

```bash
curl http://localhost:3000/clinica/pacientes
```

### Crear médico

```bash
curl -X POST http://localhost:3000/clinica/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Dr. Gómez",
    "especialidad": "Cardiología",
    "matricula": "MN-2024"
  }'
```

### Crear turno

```bash
curl -X POST http://localhost:3000/clinica/turnos \
  -H "Content-Type: application/json" \
  -d '{
    "fecha": "2026-09-30T10:30:00.000Z",
    "motivo": "Consulta general",
    "estado": "pendiente",
    "paciente": 1,
    "medico": 1
  }'
```

## 📎 Notas para el equipo

- La base de datos tiene `synchronize: true` para facilitar el desarrollo.
- El backend ya contiene las entidades: `Paciente`, `Medico` y `Turno`.
- La documentación rápida del equipo está en `INSTRUCCIONES_EQUIPO.txt`.
- La API fue validada en localhost y responde correctamente en el puerto 3000.

## 🔁 Git

El repositorio está configurado para GitHub y el proyecto quedó subido al remoto principal.

```bash
git status
git add .
git commit -m "mensaje"
git push origin main
```
