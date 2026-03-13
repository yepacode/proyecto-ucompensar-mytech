import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortafolioPageComponent } from './pages/portafolio-page/portafolio-page.component';
import { ContactoPageComponent } from './pages/contacto-page/contacto-page.component';
import { ProyectoDetalleComponent } from './pages/proyecto-detalle/proyecto-detalle.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminServiciosComponent } from './pages/admin/admin-servicios/admin-servicios.component';
import { AdminProyectosComponent } from './pages/admin/admin-proyectos/admin-proyectos.component';
import { AdminTecnologiasComponent } from './pages/admin/admin-tecnologias/admin-tecnologias.component';
import { AdminEstadisticasComponent } from './pages/admin/admin-estadisticas/admin-estadisticas.component';
import { AdminContactosComponent } from './pages/admin/admin-contactos/admin-contactos.component';
import { AdminCategoriasComponent } from './pages/admin/admin-categorias/admin-categorias.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'MyTech Solutions - Inicio'
  },
  {
    path: 'portafolio',
    component: PortafolioPageComponent,
    title: 'MyTech Solutions - Portafolio'
  },
  {
    path: 'portafolio/:id',
    component: ProyectoDetalleComponent,
    title: 'MyTech Solutions - Detalle del Proyecto'
  },
  {
    path: 'contacto',
    component: ContactoPageComponent,
    title: 'MyTech Solutions - Contacto'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'MyTech Solutions - Login'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'servicios', pathMatch: 'full' },
      { path: 'servicios', component: AdminServiciosComponent, title: 'Admin - Servicios' },
      { path: 'proyectos', component: AdminProyectosComponent, title: 'Admin - Proyectos' },
      { path: 'tecnologias', component: AdminTecnologiasComponent, title: 'Admin - Tecnologias' },
      { path: 'estadisticas', component: AdminEstadisticasComponent, title: 'Admin - Estadisticas' },
      { path: 'contactos', component: AdminContactosComponent, title: 'Admin - Contactos' },
      { path: 'categorias', component: AdminCategoriasComponent, title: 'Admin - Categorias' },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];