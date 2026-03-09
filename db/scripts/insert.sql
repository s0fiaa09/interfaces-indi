-- Script de inserción de datos de ejemplo para poblar todas las tablas
-- Basado en las entidades y relaciones definidas en la aplicación

-- 1. Insertar Permisos
INSERT INTO permissions (name, description) VALUES
('create_game', 'Permite crear nuevos juegos'),
('join_session', 'Permite unirse a sesiones de juego'),
('host_session', 'Permite hospedar sesiones de juego'),
('comment', 'Permite comentar en juegos'),
('admin', 'Acceso administrativo completo');

-- 2. Insertar Roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrador con acceso completo'),
('moderator', 'Moderador con permisos limitados'),
('player', 'Jugador regular');

-- 3. Insertar Relaciones Rol-Permiso
INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),  -- Admin tiene todos los permisos
(2, 1), (2, 2), (2, 3), (2, 4),          -- Moderator tiene create_game, join, host, comment
(3, 2), (3, 4);                          -- Player tiene join y comment

-- 4. Insertar Usuarios
INSERT INTO users (username, email, password_hash, bio, role_id, created_at) VALUES
('admin_user', 'admin@example.com', '$2b$10$dummyhashedpassword1', 'Cuenta de administrador', 1, NOW()),
('juan_perez', 'juan@example.com', '$2b$10$dummyhashedpassword2', 'Amante de los juegos de mesa', 2, NOW()),
('maria_garcia', 'maria@example.com', '$2b$10$dummyhashedpassword3', 'Entusiasta de juegos estratégicos', 3, NOW()),
('carlos_lopez', 'carlos@example.com', '$2b$10$dummyhashedpassword4', 'Fan de juegos de fiesta', 3, NOW()),
('ana_martinez', 'ana@example.com', '$2b$10$dummyhashedpassword5', 'Jugadora competitiva', 3, NOW()),
('luis_fernandez', 'luis@example.com', '$2b$10$dummyhashedpassword6', 'Coleccionista de juegos', 3, NOW());

-- 5. Insertar Juegos
INSERT INTO games (name, description, min_players, max_players, category, created_by) VALUES
('Ajedrez', 'El clásico juego de estrategia de reyes', 2, 2, 'strategy', 2),
('Catan', 'Construye y comercia en una isla', 3, 4, 'strategy', 3),
('Carcassonne', 'Construye un paisaje medieval con fichas', 2, 5, 'abstract', 4),
('Pandemic', 'Salva el mundo de enfermedades cooperativamente', 2, 4, 'cooperative', 5),
('Codenames', 'Adivina las palabras secretas a través de pistas', 2, 8, 'party', 6);

-- 6. Insertar Sesiones
INSERT INTO sessions (game_id, host_id, date_session, status, notes) VALUES
(1, 2, NOW() - INTERVAL '2 days', 'completed', 'Sesión clásica de ajedrez'),
(2, 3, NOW() - INTERVAL '1 day', 'completed', 'Primera partida de Catan'),
(4, 5, NOW(), 'ongoing', 'Partida en curso de Pandemic'),
(5, 6, NOW() + INTERVAL '1 day', 'scheduled', 'Sesión programada de Codenames');

-- 7. Insertar Participantes
INSERT INTO participants (session_id, user_id, score, position, is_winner) VALUES
(1, 2, 1, 1, true),   -- Juan ganó el ajedrez
(1, 3, 0, 2, false),  -- María perdió
(2, 3, 10, 1, true),  -- María ganó Catan
(2, 4, 8, 2, false),  -- Carlos segundo
(2, 5, 6, 3, false),  -- Ana tercera
(3, 5, 0, 1, false),  -- Ana en Pandemic (en curso, sin resultados)
(3, 6, 0, 2, false),  -- Luis en Pandemic
(4, 6, 0, 1, false),  -- Luis hospeda Codenames (programada)
(4, 2, 0, 2, false);  -- Juan se une

-- 8. Insertar Comentarios
INSERT INTO comments (content, created_at, user_id, game_id) VALUES
('¡Excelente juego estratégico!', NOW(), 3, 1),
('Me encanta Catan, muy adictivo', NOW(), 4, 2),
('Carcassonne es perfecto para familias', NOW(), 5, 3),
('Pandemic es genial en cooperativo', NOW(), 6, 4),
('Codenames siempre trae risas', NOW(), 2, 5),
('Recomiendo este juego a todos', NOW(), 3, 1);

-- Insert Comments
INSERT INTO comments (content, user_id, game_id, created_at) VALUES
('Great game! Very strategic and engaging.', 2, 1, NOW() - INTERVAL '2 days'),
('Catan is perfect for game nights with friends!', 3, 2, NOW() - INTERVAL '2 days'),
('Love the tile-placement mechanics in Carcassonne', 4, 3, NOW() - INTERVAL '1 day'),
('Pandemic is an excellent cooperative experience', 5, 4, NOW() - INTERVAL '1 day'),
('Codenames is so much fun with large groups!', 6, 5, NOW() - INTERVAL '12 hours'),
('Chess never gets old', 3, 1, NOW() - INTERVAL '12 hours'),
('Building trade routes in Catan is addictive', 4, 2, NOW() - INTERVAL '6 hours');
