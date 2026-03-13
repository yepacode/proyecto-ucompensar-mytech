import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../../services/contacto.service';

@Component({
  selector: 'app-admin-contactos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contactos.component.html',
  styleUrls: ['../../../../styles/_admin-shared.scss']
})
export class AdminContactosComponent implements OnInit {
  contactos: any[] = [];
  mensaje = '';
  tipoMensaje = '';

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.contactoService.obtenerContactos().subscribe({
      next: (res) => { if (res.success) this.contactos = res.data; },
      error: () => this.mostrarMensaje('Error al cargar contactos', 'error')
    });
  }

  eliminar(item: any): void {
    if (!confirm(`¿Eliminar el mensaje de "${item.nombre}"?`)) return;
    this.contactoService.eliminarContacto(item.id).subscribe({
      next: () => { this.cargar(); this.mostrarMensaje('Contacto eliminado', 'exito'); },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
