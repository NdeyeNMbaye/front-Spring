import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'secteurs',
    loadComponent: () => import('./components/secteurs/secteurs.component').then(m => m.SecteursComponent),
    canActivate: [authGuard]
  },
  {
    path: 'classes',
    loadComponent: () => import('./components/classes/classes.component').then(m => m.ClassesComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
];
