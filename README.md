# StadiumMap 2026

## Descripción del proyecto
StadiumMap 2026 es una aplicación web desarrollada para la gestión de estadios relacionados con el Mundial 2026. El proyecto está pensado como una solución con arquitectura MVC, usando React para la interfaz y Flask para la lógica de la API.

La aplicación permite:
- visualizar estadios y partidos
- registrarse e iniciar sesión
- acceder a vistas protegidas según el rol del usuario
- gestionar estadios mediante operaciones CRUD

> Esta versión del parcial se desarrolla sin base de datos, utilizando datos locales/simulados para cumplir con la consigna del docente.

## Objetivo del parcial
Implementar una aplicación web sobre el tema del Mundial de Fútbol, aplicando:
- React con hooks (`useState`, `useEffect`, `useContext`)
- React Router para navegación
- API REST en Flask
- autenticación de usuarios
- CRUD del módulo asignado (estadios)
- control de versiones con Git/GitHub

## Tecnologías utilizadas
### Frontend
- React
- React Router DOM
- Material UI
- Hooks de React

### Backend
- Flask
- Flask REST API
- JWT (en la estructura propuesta)

### Control de versiones
- Git
- GitHub

## Estructura del proyecto
- `backend/` → API en Flask
- `StadiumMap/` → aplicación frontend en React
- `README.md` → documentación del proyecto

## Funcionalidades principales
- Login y registro de usuarios
- Protección de rutas para usuarios autenticados
- Vista principal con partidos del Mundial
- Vista de estadios con filtros
- Vista de detalle de estadio
- Mapa interactivo de sedes
- Panel de administrador para CRUD de estadios
- Perfil de usuario

## Requisitos previos
- Node.js
- npm o yarn
- Python 3.10 o superior
- Git

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/iariis/StadiumMap.git
cd StadiumMap
```

### 2. Instalar dependencias del frontend
```bash
cd StadiumMap
npm install
```

### 3. Ejecutar la aplicación frontend
```bash
npm start
```

### 4. Instalar dependencias del backend
```bash
cd ../backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
# o
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

### 5. Ejecutar el backend
```bash
python run.py
```

## Endpoints principales de la API
### Autenticación
- `POST /api/auth/register` → registrar usuario
- `POST /api/auth/login` → iniciar sesión
- `GET /api/auth/me` → obtener usuario autenticado
- `POST /api/auth/logout` → cerrar sesión

### Estadios
- `GET /api/stadiums` → listar estadios
- `GET /api/stadiums/<id>` → ver un estadio específico
- `POST /api/stadiums` → crear estadio
- `PUT /api/stadiums/<id>` → actualizar estadio
- `DELETE /api/stadiums/<id>` → eliminar estadio

## Ejemplo de json
export const STADIUMS =
  {
    id: 1,
    name: "MetLife Stadium",
    city: "Nueva Jersey",
    country: "USA",
    capacity: 82500,
    year: 2010,
    matches: 4,
    surface: "Césped natural",
    description: "Estadio de los New York Giants y Jets. Sede de la Gran Final del Mundial 2026.",
    lat: 40.8135,
    lng: -74.0745,
  }


### Registro de usuario
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456"
}
```

### Login
```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

## Integrantes
- [Carolina Lopez integrante 1]
- [Iara Fernandez integrante 2]
- [Lara Magallanes integrante 3]
- [Adriana Antunez integrante 4]

## Notas importantes
- El proyecto está orientado a cumplir con la consigna del parcial.
- En esta versión no se utiliza una base de datos externa.
- Los datos pueden manejarse mediante almacenamiento local o datos simulados para la demostración.

## Agradecimientos
Gracias al docente y a los compañeros por el apoyo durante el desarrollo del proyecto.

