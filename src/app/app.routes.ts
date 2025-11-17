import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortafolioPageComponent } from './pages/portafolio-page/portafolio-page.component';
import { ContactoPageComponent } from './pages/contacto-page/contacto-page.component';

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
    path: 'contacto',
    component: ContactoPageComponent,
    title: 'MyTech Solutions - Contacto'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];