import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'empleados',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/empleados/empleados.component')
        .then(m => m.EmpleadosComponent)
  },
  {
    path: 'empleados/nuevo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/form-empleados/form-empleados.component')
        .then(m => m.FormEmpleadosComponent)
  },
  {
    path: 'empleados/:id/editar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/form-empleados/form-empleados.component')
        .then(m => m.FormEmpleadosComponent)
  },
  {
    path: 'inventario',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/inventario/inventario.component')
        .then(m => m.InventarioComponent)
  },
  {
    path: 'inventario/nuevo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/form-inventarios/form-inventarios.component')
        .then(m => m.FormInventariosComponent)
  },
  {
    path: 'inventario/:sku/editar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/form-inventarios/form-inventarios.component')
        .then(m => m.FormInventariosComponent)
  },
  {
    path: 'polizas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/polizas/polizas.component')
        .then(m => m.PolizasComponent)
  },
  { path: '**', redirectTo: 'login' }
];
