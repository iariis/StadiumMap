API REST – Stadiums 

📌 Descripción del proyecto

Esta API permite gestionar estadios de fútbol , con autenticación de usuarios y control de roles.

Los usuarios pueden registrarse e iniciar sesión.
Los administradores pueden crear, editar y eliminar estadios.
Los estadios contienen partidos asociados.
Los partidos pertenecen a un estadio específico.

🧱 Modelo de datos
👤 Users
id PK
name VARCHAR
email VARCHAR UNIQUE
password_hash VARCHAR
role ENUM('admin','user')
created_at DATETIME
🏟️ Stadiums
id PK
name VARCHAR
city VARCHAR
country VARCHAR
capacity INT
year INT
surface VARCHAR
description TEXT
created_by FK → Users.id
created_at DATETIME
updated_at DATETIME

📌 Relación:

Users (1) ------< Stadiums (N)
⚽ Matches
id PK
stadium_id FK → Stadiums.id
home_team VARCHAR
away_team VARCHAR
match_date DATETIME
phase VARCHAR
created_at DATETIME

📌 Relación:

Stadiums (1) ------< Matches (N)
🔐 Autenticación

La API utiliza JWT (JSON Web Token).

Header requerido:
Authorization: Bearer <token>
Roles:
Rol	Permisos
user	Solo lectura
admin	CRUD completo
🏟️ ENDPOINTS – Stadiums
📍 GET /api/stadiums

Obtiene todos los estadios.


Response 200
[
  {
    "id": 1,
    "name": "Monumental",
    "city": "Buenos Aires",
    "country": "Argentina",
    "capacity": 84000
  }
]
📍 GET /api/stadiums/{id}

Obtiene un estadio por ID.

Response 200
{
  "id": 1,
  "name": "Monumental",
  "city": "Buenos Aires",
  "country": "Argentina"
}
Response 404
{
  "error": "Estadio no encontrado"
}
📍 POST /api/stadiums

Crea un nuevo estadio.

🔒 Solo ADMIN

Request
{
  "name": "Bombonera",
  "city": "Buenos Aires",
  "country": "Argentina",
  "capacity": 54000,
  "year": 1940,
  "surface": "Césped natural"
}
Response 201
{
  "id": 2,
  "name": "Bombonera",
  "city": "Buenos Aires"
}
📍 PUT /api/stadiums/{id}

Actualiza un estadio.

🔒 Solo ADMIN

Request
{
  "capacity": 55000
}
Response 200
{
  "id": 2,
  "capacity": 55000
}
📍 DELETE /api/stadiums/{id}

Elimina un estadio.

🔒 Solo ADMIN

Response 200
{
  "message": "Estadio eliminado correctamente"
}
⚽ ENDPOINTS – Matches
📍 GET /api/matches

Lista todos los partidos.

📍 GET /api/matches/{id}

Obtiene un partido.

📍 POST /api/matches

Crea un partido.

🔒 Solo ADMIN

{
  "stadium_id": 1,
  "home_team": "River",
  "away_team": "Boca",
  "match_date": "2026-01-10 18:00",
  "phase": "Final"
}
📍 PUT /api/matches/{id}

Actualiza partido.

🔒 Solo ADMIN

📍 DELETE /api/matches/{id}

Elimina partido.

🔒 Solo ADMIN

👤 ENDPOINTS – Auth
📍 POST /auth/register

Registro de usuario.

{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "1234"
}
📍 POST /auth/login

Login y obtención de token.

{
  "email": "juan@mail.com",
  "password": "1234"
}
Response
{
  "access_token": "jwt_token_here",
  "role": "admin"
}