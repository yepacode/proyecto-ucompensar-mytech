import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  enviarFormulario(): void {
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    // Aquí implementarías la lógica real de envío
  }
}
