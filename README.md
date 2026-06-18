# Sistema de Pólizas de Faltantes — Frontend

Aplicación Angular para la gestión de pólizas de faltantes en inventario. Permite registrar empleados, controlar el inventario y generar pólizas que descuentan automáticamente la cantidad correspondiente.

## Stack tecnológico

- Angular 17+ con Standalone Components
- TypeScript
- RxJS (BehaviorSubject para estado local)
- SCSS con CSS Custom Properties (dark/light mode)
- Tabler Icons

## Requisitos previos

- Node.js v18 o superior
- Angular CLI (`npm install -g @angular/cli`)
- El backend del proyecto corriendo en `http://localhost:8080`

## Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/Aldordzvn/PolizasFront.git
cd polizasfront
```

Instala las dependencias:

```bash
npm install
```

## Configuración

La URL base de la API se define en los archivos de entorno:

```typescript
// src/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:8080/api'
};
```

Si tu backend corre en otro puerto o dominio, ajusta este valor antes de levantar el proyecto.

## Ejecución en desarrollo

```bash
ng serve
```

La aplicación queda disponible en `http://localhost:4200`.

Asegúrate de que el backend esté corriendo antes de iniciar sesión — sin él, el login y todas las pantallas que consumen datos no funcionarán.

## Credenciales de acceso

El sistema usa un único usuario administrador definido en el backend:

```
Usuario: admin
Contraseña: admin123
```

## Estructura del proyecto

```
src/app/
├── core/
│   ├── interceptors/   # Interceptor JWT — adjunta el token y maneja 401/403
│   ├── guards/         # Guard de autenticación para rutas protegidas
│   └── services/       # AuthService, EmpleadoService, InventarioService, PolizaService
├── features/
│   ├── aside-menu/      # Pantalla del Nav
│   ├── auth/login/      # Pantalla de inicio de sesión
│   ├── dashboard/        # Resumen general con contadores
│   ├── empleados/        # CRUD de empleados
│   ├── inventario/       # CRUD de inventario
│   └── polizas/           # CRUD de pólizas
│   └── form-empleados/           # Pantalla de formulario
│   └── form-inventarios/           # Pantalla de formulario
│   └── form-polizas/           # pantalla de formulario
├── shared/
│   └── models/          # Interfaces de los modelos y DTOs de request
│── styles/              # Estilos reutilizables y fuentes
└── app.routes.ts
```

## Funcionalidades

### Autenticación
- Login contra el endpoint `/api/auth/login`
- Token JWT almacenado en `localStorage`
- Interceptor que adjunta el token automáticamente en cada petición
- Redirección automática al login si el token es inválido o expiró (401/403)
- Rutas protegidas mediante guard de autenticación

### Dashboard
- Conteo de pólizas, empleados activos e inventario total
- Indicador de artículos con stock crítico
- Listado de pólizas recientes

### Empleados
- Listado, creación, edición y eliminación (soft delete)
- Validación de campos requeridos

### Inventario
- Listado, creación, edición y eliminación
- Validación de cantidad mayor a cero

### Pólizas
- Listado con nombre de empleado y artículo relacionado
- Creación con descuento automático de inventario
- Edición con recálculo de inventario según la diferencia
- Eliminación con restauración de inventario
- Manejo de errores de negocio del backend (ej. inventario insuficiente) mostrados directamente en el formulario

## Diseño

El proyecto usa un sistema de diseño propio basado en CSS Custom Properties, con soporte para modo claro y oscuro mediante una clase `.dark` en el elemento raíz. Los tokens de color, tipografía y espaciado están centralizados en `src/styles/_tokens.scss`.

## Mejoras futuras

- Refresh tokens para renovar la sesión sin requerir nuevo login
- Componentes compartidos adicionales (formulario genérico, tabla genérica)
- Paginación en los listados
- Tests unitarios de componentes y servicios
