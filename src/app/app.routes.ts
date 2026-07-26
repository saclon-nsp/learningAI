import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from '../app/auth/signup/signup';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Documents } from './features/documents/documents';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login1', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
   path: 'create-society',
   canActivate: [AuthGuard],
   loadComponent: () =>
      import('./features/society/create-society/create-society')
      .then(m => m.CreateSociety)
  },
  {
   path: 'documents',
   canActivate: [AuthGuard],
   loadComponent: () =>
      import('./features/documents/documents')
      .then(m => m.Documents)
  },
  { path: '**', redirectTo: '/login' }
];
