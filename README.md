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

---

## 📁 Estructura del proyecto
```
agendagol-frontend/
├── app/
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

## ⚙️ Instalación y ejecución

### Prerrequisitos
- Node.js 18+
- Backend corriendo (ver [agendaGol](https://github.com/javiermercado1/agendaGol))


## ⚙️ Levantar el proyecto con un solo comando

### 1. Clonar el repositorio
```bash
git clone https://github.com/Diegoalejandro17/Prueba-Tecnica-Naowee-S.A.S.git
cd Prueba-Tecnica-Naowee-S.A.S
```

### 2. Levantar el frontend
```bash
Una vez clonado el repositorio ejecutar los siguientes comandos:
docker build -t agendagol-frontend .
docker run -p 3000:3000 --env-file .env.local agendagol-frontend
```

⚠️ Nota: asegúrate de que el backend ya esté levantado en otro contenedor o localmente, porque el frontend depende de sus endpoints.


Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ✨ Funcionalidades

### 👤 Autenticación
- Registro de nuevos usuarios
- Inicio de sesión con email y contraseña
- Protección de rutas según autenticación y rol
- Persistencia de sesión con localStorage

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
- **Diseño "Campo Nocturno"**: Dark mode con verde (#22c55e) como color acento, tipografía Syne para títulos y DM Sans para cuerpo de texto, creando una estética profesional con identidad deportiva.

---

## 🔐 Credenciales de prueba
```
Email:    admin@test.com
Password: admin123
Rol:      Administrador
```

> **Nota:** Para acceder al Dashboard Admin, el usuario debe tener `is_admin = true` en la base de datos.

---

## 👨‍💻 Autor

**Diego Alejandro** — [@Diegoalejandro17](https://github.com/Diegoalejandro17)
