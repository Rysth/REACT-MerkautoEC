# MerkautoEC — Sistema de Órdenes de Trabajo

![banner](banner.png)

Aplicación web (SPA) para la gestión de órdenes de recepción de vehículos del taller **MerkautoEC**. Permite registrar clientes, datos del vehículo, equipamiento, marcar daños sobre una silueta del auto, generar órdenes imprimibles y consultar el historial.

> Aplicación interna de un solo operador (admin). Las órdenes se persisten en `localStorage` y se replican al backend SOAP de Cofic vía Axios.

---

## Tecnologías

| Capa | Stack |
|---|---|
| Runtime / Package manager | **Bun 1.3+** |
| Build tool | **Vite 5** |
| UI | **React 18**, **Tailwind CSS 4**, **DaisyUI 5** |
| Estado global | **Zustand 5** |
| Formularios | **react-hook-form** |
| Routing | **react-router-dom 6** |
| HTTP | **axios** (SOAP/XML) |
| Notificaciones | **react-toastify** |
| Impresión | **react-to-print** |

---

## Requisitos previos

- [Bun](https://bun.sh) ≥ 1.3
- Acceso al endpoint SOAP de Cofic (variables de entorno).

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_ENDPOINT=https://<tu-host-cofic>/ServicioWeb.asmx
VITE_TOKEN=<tu-token-de-acceso>
```

> **Seguridad:** las credenciales de login (`admin@merkautoec.com` / `@MerkautoEC`) están hardcodeadas en `src/stores/useAuthStore.js`. Para uso en producción se recomienda mover la validación al backend.

---

## Comandos

```bash
bun install        # instalar dependencias
bun run dev        # servidor de desarrollo (http://localhost:5173/merkautoec)
bun run build      # build de producción → carpeta build/
bun run serve      # preview del build
```

---

## Estructura del proyecto

```
src/
├── App.jsx                 # Router + rutas protegidas
├── index.jsx               # Bootstrap React
├── index.css               # Tailwind v4 + DaisyUI v5 (CSS-first config)
│
├── assets/images/          # Imágenes de marca y silueta del auto
│
├── components/
│   ├── Accordion/          # Item desplegable para listado de órdenes
│   ├── Auto/               # Canvas para marcar daños sobre el auto (drag & drop)
│   ├── Forms/
│   │   ├── Checkbox/       # Checkbox de equipamiento
│   │   ├── Input/          # Input genérico con react-hook-form
│   │   └── TextArea/       # Textarea genérico
│   ├── Header/             # Cabecera + navegación condicional
│   ├── Heading/            # Título de página + fecha
│   ├── NavBar/             # Menú principal
│   └── ProtectedRoute/     # HOC de autenticación
│
├── pages/
│   ├── Login/              # Pantalla de inicio de sesión
│   ├── Order/
│   │   ├── Order.jsx       # Formulario de nueva orden
│   │   └── OrderList.jsx   # Listado de órdenes guardadas
│   └── Vehicle/            # Búsqueda por placa + historial (sin ruta activa)
│
└── stores/                 # Stores Zustand
    ├── soapClient.js       # Helper Axios + envoltorio SOAP/XML
    ├── useAuthStore.js     # Autenticación (login, logout, sesión activa)
    ├── useOrderStore.js    # CRUD órdenes + checkCedula (servicio TRXCONCLI)
    ├── useVehicleStore.js  # CRUD vehículos locales
    └── equipmentFields.js  # Catálogo estático de equipamiento (24 ítems)
```

---

## Rutas

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | Login | Solo si NO hay sesión activa |
| `/orden` | Nueva orden | Requiere sesión |
| `/listado` | Listado de órdenes | Requiere sesión (link comentado en NavBar) |
| `*` | Redirige a `/orden` | Requiere sesión |

> El componente `Vehicle.jsx` existe pero no está registrado como ruta.

---

## Estado global (Zustand)

Cada store es un hook `useXxxStore`. Ejemplo de consumo:

```jsx
import { useAuthStore } from './stores/useAuthStore';

function Header() {
  const active = useAuthStore((s) => s.userCredentials.active);
  const logout = useAuthStore((s) => s.logout);
  // ...
}
```

| Store | Estado clave | Persistencia |
|---|---|---|
| `useAuthStore` | `userCredentials.active`, `loading` | `localStorage.active` |
| `useOrderStore` | `orderArray`, `selectedOrder`, `cedulaExists` | `localStorage.ordenes` |
| `useVehicleStore` | `vehicleArray`, `selectedVehicle` | `localStorage.vehiculos` |

---

## API (SOAP/XML)

Todas las llamadas pasan por `src/stores/soapClient.js`, que envuelve el JSON en un sobre SOAP 1.2 dirigido a `coficeptrx.asvesot.com`. El campo `servicio` discrimina la operación:

| Servicio | Descripción |
|---|---|
| `LOGIN` | Autenticación |
| `TRXINGORD` | Guardar nueva orden |
| `TRXCONCLI` | Consultar cliente por cédula |

---

## Notas sobre el deploy

- En `vite.config.ts` el `base` apunta a `https://www.asvesot.com/merkautoec`. Ajustar si se publica en otro dominio.
- Salida del build: carpeta `build/` (no `dist/`).

---

## Linters

```bash
bunx stylelint "**/*.{css,scss}" --fix
bunx eslint "**/*.{js,jsx}" --fix
```

---

## Autor

**John Palacios** — [LinkedIn](https://www.linkedin.com/in/john-rysthcraft/) · [GitHub](https://github.com/Rysth)

## Licencia

[MIT](./LICENSE.md)
