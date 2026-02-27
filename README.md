# 🏟️ AgendaGol — Prueba Técnica Naowee S.A.S

Plataforma web para la gestión y reserva de canchas de fútbol. Desarrollada como prueba técnica para la empresa Naowee S.A.S.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **Next.js 15** | Framework de React con App Router |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Tailwind CSS v4** | Estilos utilitarios |
| **Axios** | Peticiones HTTP a los microservicios |
| **Zustand** | Manejo de estado global (autenticación) |
| **JWT** | Autenticación stateless con tokens |
| **Docker** | Contenedorización del frontend |

---

## 📁 Estructura del proyecto
```
agendagol-frontend/
├── app/
│   ├── page.tsx            # Página principal (landing)
│   ├── (auth)/
│   │   ├── login/          # Página de inicio de sesión
│   │   └── register/       # Página de registro
│   └── (dashboard)/
│       ├── canchas/        # Listado y disponibilidad de canchas
│       ├── reservas/       # Crear, ver y cancelar reservas
│       └── admin/          # Dashboard administrativo (solo admin)
├── components/
│   ├── ui/                 # Button, Card, Input, Badge, LoadingSpinner
│   └── layout/             # Navbar, DashboardLayout
├── lib/
│   └── axios.ts            # Instancias de Axios por microservicio
├── store/
│   └── authStore.ts        # Estado global de autenticación (Zustand)
└── types/
    └── index.ts            # Interfaces TypeScript del dominio
```

---

## ⚙️ Prerrequisitos

- Docker instalado
- Backend corriendo — ver instrucciones en 👉 [agendaGol Backend](https://github.com/javiermercado1/agendaGol)

---

## 🐳 Levantar el frontend con Docker

### 1. Clonar el repositorio
```bash
git clone https://github.com/Diegoalejandro17/Prueba-Tecnica-Naowee-S.A.S.git
cd Prueba-Tecnica-Naowee-S.A.S
```

### 2. Levantar el contenedor
```bash
docker-compose up --build
```

### 3. Abrir en el navegador
```
http://localhost:3000
```

> ⚠️ El backend debe estar levantado antes de usar el frontend. Las peticiones se hacen a `localhost:8000-8004`.

---

## ✨ Funcionalidades

### 👤 Autenticación
- Registro de nuevos usuarios
- Inicio de sesión con email y contraseña
- Protección de rutas según autenticación y rol
- Persistencia de sesión con localStorage
- Totalmente responsive

### 🏟️ Canchas
- Listado de todas las canchas disponibles
- Visualización de nombre, ubicación, capacidad y precio por hora
- Consulta de disponibilidad por fecha en tiempo real

### 📅 Reservas
- Creación de reservas (1 o 2 horas)
- Visualización de reservas activas y canceladas
- Cancelación de reservas activas

### 📊 Dashboard Admin
- Estadísticas globales del sistema (usuarios, canchas, ingresos)
- Tasa de ocupación y cancelaciones
- Estadísticas detalladas por cancha
- Acceso exclusivo para administradores

---

## 🏗️ Arquitectura de microservicios

El frontend consume una API basada en microservicios:

| Servicio | Puerto | Descripción |
|---|---|---|
| `auth_service` | 8000 | Autenticación y manejo de usuarios |
| `roles_service` | 8001 | Roles y permisos |
| `fields_service` | 8002 | Gestión de canchas y disponibilidad |
| `reservations_service` | 8003 | Gestión de reservas |
| `admin_dashboard` | 8004 | Estadísticas administrativas |

---

## 🎨 Decisiones técnicas

- **App Router de Next.js 15**: Uso de route groups `(auth)` y `(dashboard)` para organizar rutas sin afectar las URLs y aplicar layouts específicos.
- **Zustand sobre Redux**: Estado global liviano y sin boilerplate, ideal para manejar solo el estado de autenticación.
- **Una instancia de Axios por microservicio**: Permite configurar baseURL independiente para cada servicio y agregar interceptores de autenticación de forma centralizada.
- **Estilos inline sobre Tailwind**: Dado que el proyecto usa Tailwind v4 (que cambió su sistema de configuración), se optó por estilos inline para garantizar consistencia visual en todos los componentes.

---

## 🔧 Configurar usuario Admin

Después de levantar el backend con Docker, sigue estos pasos para crear un usuario admin:

### 1. Registra un usuario desde la app
Ve a `http://localhost:3000/register` y crea una cuenta normal.

### 2. Conviértelo en admin desde la base de datos

Primero necesitas conocer el nombre exacto del contenedor de auth. Ejecuta este comando en la terminal donde tienes corriendo el backend:
```bash
docker ps
```

Busca en la columna `NAMES` el contenedor que tenga `auth` en el nombre. Por ejemplo: `agendagol-auth_service-1`.

Luego ejecuta el siguiente comando reemplazando:
- `agendagol-auth_service-1` → por el nombre real de tu contenedor
- `tu@email.com` → por el email del usuario que registraste

**En Linux/Mac:**
```bash
docker exec -it agendagol-auth_service-1 python3 -c "import sqlite3; conn=sqlite3.connect('auth.db'); conn.execute('UPDATE users SET is_admin=1 WHERE email=\"tu@email.com\"'); conn.commit(); print('OK')"
```

**En Windows (PowerShell):**
```powershell
docker exec -it agendagol-auth_service-1 python3 -c "import sqlite3; conn=sqlite3.connect('auth.db'); conn.execute('UPDATE users SET is_admin=1 WHERE email=""tu@email.com""'); conn.commit(); print('OK')"
```

Si el comando fue exitoso verás `OK` en la consola.

> **¿Por qué este paso?** El backend no expone un endpoint público para crear admins por seguridad. La única forma es modificar directamente la base de datos SQLite dentro del contenedor de Docker.

### 3. Vuelve a iniciar sesión
Cierra sesión y vuelve a entrar con el mismo usuario. Ahora verás la opción **Dashboard** en el navbar con acceso al panel de administración.

---

## 🌐 Despliegue

Frontend desplegado en Vercel 👉 [Ver demo](https://prueba-tecnica-naowee-s-a-i5jzqsc07-diegoalejandro17s-projects.vercel.app/)

> La demo requiere el backend corriendo localmente para funcionar completamente.

---

## 👨‍💻 Autor

**Diego Alejandro** — [@Diegoalejandro17](https://github.com/Diegoalejandro17)
