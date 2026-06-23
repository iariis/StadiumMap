# StadiumMap 2026

## Descripción
StadiumMap 2026 es una aplicación web para visualizar y gestionar estadios y partidos del Mundial 2026. Usa una arquitectura MVC: frontend en React (Material UI) y backend en Flask (API REST). El backend está configurado para conectar con una base de datos MySQL y los modelos aplican principios de Programación Orientada a Objetos.

## Objetivo
Desarrollar un módulo completo (estadios) que permita crear, consultar, modificar y eliminar estadios; proveer autenticación de usuarios (roles Admin/User); y aplicar POO en el backend.

## Tecnologías
- Frontend: React, React Router, Material UI
- Backend: Flask, Flask-JWT-Extended, Flask-SQLAlchemy
- Base de datos: MySQL
- Control de versiones: Git, GitHub

## Arquitectura y archivos clave
- Frontend principal: `StadiumMap/src/App.jsx`
- Contexto de autenticación: `StadiumMap/src/context/AuthContext.jsx`
- Hook personalizado / CRUD simulado: `StadiumMap/src/hooks/useStadiums.js`
- Datos estáticos (demo): `StadiumMap/src/data/stadiums.js`
- Backend app factory: `backend/app/__init__.py` (configura `SQLALCHEMY_DATABASE_URI`)
- Modelos POO (backend): `backend/app/models/base_model.py`, `backend/app/models/user.py`, `backend/app/models/stadium.py`
- Rutas (API): `backend/app/routes/auth.py`, `backend/app/routes/stadiums.py`

## Requisitos previos
- Node.js
- npm
- Python 3.10+
- MySQL server
- Git

## Instalación y puesta en marcha

1) Clonar el repositorio

```bash
git clone https://github.com/iariis/StadiumMap.git
cd StadiumMap
```

2) Frontend

```bash
cd StadiumMap
npm install
npm start
```

3) Backend (entorno virtual y dependencias)

```bash
cd backend
python -m venv venv
# Linux / macOS
source venv/bin/activate
# Windows (PowerShell)
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

4) Configurar MySQL

Edita `backend/app/__init__.py` o exporta la variable de entorno `DATABASE_URL` para ajustar la cadena de conexión. Por defecto el proyecto usa:

```py
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://stadiummap:password@localhost/stadiummap_db"
```

Crear la base de datos y el usuario (ejemplo MySQL):

```sql
CREATE DATABASE stadiummap_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'stadiummap'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON stadiummap_db.* TO 'stadiummap'@'localhost';
FLUSH PRIVILEGES;
```

5) Crear tablas y ejecutar el backend

```bash
# desde la carpeta backend con el virtualenv activado
python run.py
```

El script `run.py` ejecuta `db.create_all()` dentro del contexto de la app para crear las tablas iniciales.

## Endpoints (resumen)

### Autenticación
- `POST /api/auth/register` — Registrar usuario
- `POST /api/auth/login` — Iniciar sesión (devuelve JWT)
- `GET /api/auth/me` — Obtener usuario autenticado
- `POST /api/auth/logout` — Cerrar sesión

### Estadios (requieren JWT y, para crear/editar/eliminar, rol admin)
- `GET /api/stadiums` — Listar estadios
- `GET /api/stadiums/<id>` — Obtener estadio
- `POST /api/stadiums` — Crear estadio
- `PUT /api/stadiums/<id>` — Actualizar estadio
- `DELETE /api/stadiums/<id>` — Eliminar estadio

### Ejemplo: crear estadio (request)

```json
{
  "name": "MetLife Stadium",
  "city": "East Rutherford",
  "country": "USA",
  "capacity": 82500,
  "year": 2010,
  "matches": 4,
  "surface": "Césped natural",
  "description": "Sede de la final"
}
```

Ejemplo de respuesta (201):

```json
{
  "id": 1,
  "name": "MetLife Stadium",
  "city": "East Rutherford",
  "country": "USA",
  "capacity": 82500,
  "year": 2010,
  "matches": 4,
  "surface": "Césped natural",
  "description": "Sede de la final",
  "created_at": "2026-06-22T12:00:00Z"
}
```

## Programación Orientada a Objetos (POO)
El backend aplica los principios de POO. A continuación dónde encontrarlos en el proyecto:

- **Abstracción** — `backend/app/models/base_model.py` (clase `BaseModel` que define `to_dict()` y campos comunes)
- **Herencia** — `backend/app/models/user.py` y `backend/app/models/stadium.py` (ambas heredan de `BaseModel`)
- **Encapsulamiento** — setters y `@property` en `user.py` y `stadium.py` validan y protegen los atributos
- **Polimorfismo** — cada modelo implementa su propio `to_dict()`

### Diagrama de clases (UML)

```mermaid
classDiagram
    class BaseModel {
        <<abstract>>
        +created_at
        +updated_at
        +to_dict()
    }

    class User {
        -_name
        -_email
        -_password_hash
        -_role
        +check_password()
        +is_admin()
        +to_dict()
    }

    class Stadium {
        -_name
        -_city
        -_country
        -_capacity
        -_year
        -_matches
        +update_from_dict()
        +to_dict()
    }

    BaseModel <|-- User
    BaseModel <|-- Stadium

    class AuthRoutes {
        +register()
        +login()
        +logout()
        +me()
    }

    class StadiumRoutes {
        +get_stadiums()
        +get_stadium()
        +create_stadium()
        +update_stadium()
        +delete_stadium()
    }

    AuthRoutes ..> User
    StadiumRoutes ..> Stadium
```

## Datos y modo demo
El frontend incluye datos de ejemplo en `StadiumMap/src/data/stadiums.js` y algunos hooks usan `localStorage` para simular API durante la demostración. El backend, en cambio, está preparado para funcionar con MySQL (recomendado para entrega final).

## Control de versiones
- Ramas: usar `feature/*` para nuevas funcionalidades
- Commits: mensajes descriptivos y frecuentes
- Repositorio remoto: GitHub (poner link si aplica)

## Integrantes
- Carolina Lopez
- Iara Fernandez
- Lara Magallanes
- Adriana Antunez

## Notas finales



