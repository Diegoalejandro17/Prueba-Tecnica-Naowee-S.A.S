# 🏟️ AgendaGol — Prueba Técnica Naowee S.A.S

Plataforma web para la gestión y reserva de canchas de fútbol. Desarrollada como prueba técnica para la empresa Naowee S.A.S.

---

## 🚀 Tecnologías utilizadas

- **Next.js 15** — Framework de React con App Router
- **TypeScript** — Tipado estático
- **Tailwind CSS** — Estilos utilitarios
- **Axios** — Peticiones HTTP al backend
- **Zustand** — Manejo de estado global

---

## 📁 Estructura del proyecto

```
├── app/                  # Rutas y páginas (App Router)
│   ├── (auth)/           # Páginas de autenticación
│   └── (dashboard)/      # Páginas del dashboard
│       ├── admin/        # Panel de administración
│       ├── canchas/      # Gestión de canchas
│       └── reservas/     # Gestión de reservas
├── components/           # Componentes reutilizables
├── lib/                  # Configuración de axios y utilidades
├── store/                # Estado global con Zustand
├── types/                # Tipos TypeScript
└── public/               # Archivos estáticos
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Diegoalejandro17/Prueba-Tecnica-Naowee-S.A.S.git
cd Prueba-Tecnica-Naowee-S.A.S
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_AUTH_API_URL=http://localhost:8001
NEXT_PUBLIC_FIELDS_API_URL=http://localhost:8002
NEXT_PUBLIC_RESERVATIONS_API_URL=http://localhost:8003
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ✨ Funcionalidades

- **Autenticación** — Login y registro de usuarios
- **Gestión de canchas** — Listado y disponibilidad de canchas
- **Reservas** — Crear, ver y cancelar reservas
- **Panel de administración** — Gestión completa para administradores
- **Disponibilidad en tiempo real** — Consulta de horarios disponibles por cancha y fecha

---

## 🏗️ Arquitectura

El frontend consume una API basada en **microservicios**:

| Servicio | Descripción |
|---|---|
| `auth_service` | Autenticación y manejo de usuarios |
| `fields_service` | Gestión de canchas y disponibilidad |
| `reservations_service` | Gestión de reservas |

---

## 👨‍💻 Autor

**Diego Alejandro** — [@Diegoalejandro17](https://github.com/Diegoalejandro17)
