import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { PortafolioComponent } from '../../components/portafolio/portafolio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServiciosComponent,
    PortafolioComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}