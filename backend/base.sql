INSERT INTO usuarios (documento, apellidos, nombres, email, clave, estado, rol) VALUES
('41455078', 'Admin', 'Emiliana', 'admin@clinica.com', 'admin123', 'ACTIVO', 'ADMINISTRADOR'),
('41455076', 'Rago', 'Carlos', 'medico@clinica.com', 'medico123', 'ACTIVO', 'MEDICO'),
('41455079', 'Perez', 'Clara', 'paciente@gmail.com', 'paciente123', 'ACTIVO', 'PACIENTE')
ON CONFLICT (documento) DO NOTHING;

INSERT INTO medicos (id_usuario, matricula, valor_consulta)
SELECT id, 13359, 80000 FROM usuarios WHERE documento = '41455076'
ON CONFLICT DO NOTHING;