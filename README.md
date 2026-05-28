# 🍽️ TableTrack — Gestor de Reservas

Aplicación web SPA desarrollada como prueba técnica para el cargo de **Desarrollador Frontend Junior (React)**. Permite a los anfitriones de un restaurante gestionar reservas de mesas de forma eficiente desde cualquier dispositivo.

---

## 🚀 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Framework principal de UI |
| Vite | 6 | Bundler y servidor de desarrollo |
| React Router DOM | 7 | Enrutamiento SPA |
| SweetAlert2 | 11 | Alertas y confirmaciones |
| Lucide React | 0.383 | Íconos |
| LocalStorage | — | Persistencia de sesión |
| MockAPI | — | API REST simulada |

---

## 🌐 API

El proyecto consume una API REST creada en **MockAPI**:

**Base URL:** `https://67f9d2c42466325443ebd0cb.mockapi.io/api/v1`

**Recurso:** `/reservas`

**Campos de la entidad Reserva:**

```json
{
  "id": "1",
  "nombreCliente": "Carlos Ramírez",
  "fechaHora": "2026-05-27T20:00",
  "cantidadPersonas": 4,
  "estado": "Confirmada"
}
```

> **Estados válidos:** `Confirmada`, `En Espera`, `Finalizada`

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Barra superior con info del anfitrión
│   ├── TarjetaReserva.jsx  # Tarjeta individual de reserva
│   ├── FormularioReserva.jsx # Modal para crear/editar
│   ├── SkeletonReserva.jsx # Skeleton loader de carga
│   └── EstadoVacio.jsx     # Estado cuando no hay reservas
├── pages/
│   ├── Login.jsx           # Módulo de ingreso de anfitrión
│   └── Panel.jsx           # Dashboard principal CRUD
├── router/
│   ├── AppRouter.jsx       # Configuración de rutas
│   └── RutaProtegida.jsx   # Guard de autenticación
├── services/
│   └── reservasService.js  # Peticiones HTTP a la API
└── utils/
    ├── localStorage.js     # Manejo de sesión
    └── alerts.js           # Configuración de SweetAlert2
```

---

## ⚙️ Instalación y Ejecución Local

### Prerrequisitos
- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/table-track.git

# 2. Entrar al proyecto
cd table-track

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🌿 Flujo GitFlow

```
main         → código estable / producción
develop      → integración del equipo
feature/*    → desarrollo de funcionalidades
```

**Convención de commits:**
- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `style:` cambios de estilos
- `refactor:` refactorización de código
- `docs:` cambios en documentación

---

## ✨ Funcionalidades

- ✅ Login de anfitrión con nombre y turno (LocalStorage)
- ✅ Protección de rutas — redirige al login si no hay sesión
- ✅ GET — Listado de todas las reservas con skeletons de carga
- ✅ POST — Crear nueva reserva con validaciones
- ✅ PUT — Editar reserva existente
- ✅ PUT — Marcar como "Finalizada" con un clic
- ✅ DELETE — Cancelar reserva con confirmación SweetAlert2
- ✅ Filtros por estado (Todas / Confirmada / En Espera / Finalizada)
- ✅ Estadísticas en tiempo real por estado
- ✅ Manejo de errores de API con banner y opción de reintento
- ✅ Diseño responsivo (móvil y escritorio)
- ✅ Tema oscuro con acentos ámbar

---

## 📄 Licencia

Proyecto académico — Prueba técnica 2026.
