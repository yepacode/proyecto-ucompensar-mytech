import { Component } from '@angular/core';
import { ContactoComponent } from '../../components/contacto/contacto.component';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [ContactoComponent],
  templateUrl: './contacto-page.component.html',
  styleUrls: ['./contacto-page.component.scss']
})
export class ContactoPageComponent {}