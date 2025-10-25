import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { PortafolioComponent } from './components/portafolio/portafolio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    ServiciosComponent,
    PortafolioComponent,
    ContactoComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'MyTech Solutions - Desarrollo Web Profesional';
}
