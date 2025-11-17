import { Component } from '@angular/core';
import { PortafolioComponent } from '../../components/portafolio/portafolio.component';

@Component({
  selector: 'app-portafolio-page',
  standalone: true,
  imports: [PortafolioComponent],
  templateUrl: './portafolio-page.component.html',
  styleUrls: ['./portafolio-page.component.scss']
})
export class PortafolioPageComponent {}